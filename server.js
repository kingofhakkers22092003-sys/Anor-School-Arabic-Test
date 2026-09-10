require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const OpenAI = require('openai');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
  console.warn('DIQQAT: .env faylida OPENAI_API_KEY topilmadi. AI baholash ishlamaydi (talabalar javobi "o\'qituvchi tekshiradi" holatida qoladi).');
}

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

app.use(express.json({ limit: '30mb' }));
app.use(express.static(path.join(__dirname)));

const uploadDir = path.join(__dirname, 'tmp_uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const upload = multer({ dest: uploadDir, limits: { fileSize: 20 * 1024 * 1024 } });

// ---------- Umumiy ma'lumotlar ombori ----------
// Natijalar, savollar va sozlamalar brauzer localStorage'ida emas, serverda
// saqlanadi. Shu sababli barcha qurilmalar bitta dashboardni ko'radi.
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const STUDENTS_FILE = path.join(dataDir, 'students.json');
const QUESTIONS_FILE = path.join(dataDir, 'questions.json');
const SETTINGS_FILE = path.join(dataDir, 'settings.json');
const TEST_KEYS = ['Grammatika', 'Tinglash', 'O‘qish', 'Yozish', 'Gapirish'];
const DEFAULT_QUESTIONS = {
  Grammatika: [
    { id: 'g1', prompt: '“Men o‘quvchiman” jumlasining to‘g‘ri tarjimasi qaysi?', options: ['أنا طالب.', 'طالب أنا.', 'أنا طالبٌ يكون.'], answer: '0' },
    { id: 'g2', prompt: 'Bo‘sh joyni to‘ldiring: هذا ___ جميل. (Bu chiroyli kitob.)', options: ['كتاب', 'سيارة', 'مدرسة'], answer: '0' },
    { id: 'g3', prompt: '“Men maktabga boraman” jumlasini toping.', options: ['أنا أذهب إلى المدرسة.', 'المدرسة أذهب أنا.', 'أنا المدرسة أذهب.'], answer: '0' },
    { id: 'g4', prompt: '“هل” so‘roq yuklamasi qaysi gapda to‘g‘ri ishlatilgan?', options: ['هل أنت طالب؟', 'أنت هل طالب؟', 'أنت طالب هل؟'], answer: '0' },
  ],
  Tinglash: [
    { id: 'l1', prompt: 'Gapirayotgan bolaning ismi nima?', audioText: 'مرحباً! اسمي محمد.', options: ['Ali', 'Muhammad', 'Xolid'], answer: '1' },
    { id: 'l2', prompt: 'Bugun haftaning qaysi kuni?', audioText: 'اليوم يوم الجمعة.', options: ['Dushanba', 'Chorshanba', 'Juma'], answer: '2' },
    { id: 'l3', prompt: 'U nimani yoqtiradi?', audioText: 'أنا أحب الشاي ولا أحب القهوة.', options: ['Choy', 'Qahva', 'Sut'], answer: '0' },
  ],
  'O‘qish': [
    { id: 'r1', prompt: '“مدرسة” so‘zi nimani anglatadi?', options: ['Oila', 'Do‘st', 'Maktab'], answer: '2' },
    { id: 'r2', prompt: '“أنا أحب اللغة العربية” gapining ma’nosi qaysi?', options: ['Men arab tilini yaxshi ko‘raman.', 'Men arab tilini o‘qimayman.', 'Men ingliz tilini yaxshi ko‘raman.'], answer: '0' },
    { id: 'r3', prompt: '“عشر سنوات” nimani anglatadi?', options: ['O‘n yosh', 'Yigirma yosh', 'O‘n kun'], answer: '0' },
  ],
  Yozish: [
    { id: 'w1', prompt: 'So‘zlardan to‘g‘ri jumla tuzing: أنا / طالب / مجتهد' },
    { id: 'w2', prompt: 'Arab tilida ismingiz, sinfingiz va arab tilini yoqtirasizmi yoki yo‘qligi haqida 2–3 ta sodda gap yozing.' },
    { id: 'w3', prompt: '“Bugun havo yaxshi.” jumlasini arab tiliga tarjima qiling.' },
  ],
  Gapirish: [{ id: 's1', prompt: 'O‘zingizni arab tilida tanishtiring: ismingiz, sinfingiz va arab tili haqida 2–3 ta gap ayting.' }],
};
const clone = value => JSON.parse(JSON.stringify(value));
function readJson(file, fallback) { try { return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback; } catch { return fallback; } }
function loadDb() {
  const db = {
    students: readJson(STUDENTS_FILE, []),
    questionBank: readJson(QUESTIONS_FILE, clone(DEFAULT_QUESTIONS)),
    settings: readJson(SETTINGS_FILE, { gradingMode: 'teacher', adminUsername: 'admin', adminPassword: 'admin' }),
  };
  db.students.forEach(student => { student.results ||= {}; student.attempts ||= []; student.pendingReview ||= {}; student.telegramSent ??= false; student.telegramError ??= null; });
  db.settings.gradingMode ||= 'teacher'; db.settings.adminUsername ||= 'admin'; db.settings.adminPassword ||= 'admin'; db.settings.readingPassage ||= { content: '', translation: '' };
  return db;
}
function saveDb(db) {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify(db.students, null, 2));
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(db.questionBank, null, 2));
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(db.settings, null, 2));
}
function publicStudent(student) { if (!student) return null; const { password, ...safe } = student; return safe; }
function findStudent(db, id) { return db.students.find(student => student.id === id); }
function fullyGraded(student) { return TEST_KEYS.every(key => student.results?.[key] && !student.results[key].pending); }
function archiveAttempt(student) {
  if (!fullyGraded(student)) return;
  const completedAt = student.results.Gapirish?.completedAt || new Date().toISOString();
  if (student.attempts.some(attempt => attempt.id === completedAt)) return;
  student.attempts = [...student.attempts, { id: completedAt, completedAt, results: clone(student.results) }].slice(-5);
}
function pdfSafe(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[‘’]/g, "'").replace(/[^\x20-\x7E]/g, '?').replace(/[\\()]/g, '\\$&'); }
function resultPdf(student) {
  const stream = ['q', '0.98 0.97 0.94 rg', '0 0 595 842 re f', '0.11 0.20 0.28 rg', '0 670 595 172 re f', '0.77 0.58 0.22 rg', '0 670 595 6 re f', 'BT', '/F2 27 Tf', '1 1 1 rg', '57 774 Td', '(ANOR SCHOOL) Tj', '/F1 11 Tf', '0 -23 Td', '0.91 0.79 0.48 rg', '(ARABIC LANGUAGE DIAGNOSTIC REPORT) Tj', '/F1 10 Tf', '0 -48 Td', '1 1 1 rg', `(Student: ${pdfSafe(student.fullName)}) Tj`, '0 -17 Td', `(Class: ${pdfSafe(student.schoolClass)}) Tj`, '255 17 Td', `(Date: ${new Date().toLocaleDateString('en-CA')}) Tj`, 'ET', '0.11 0.20 0.28 rg', 'BT', '/F2 18 Tf', '57 625 Td', '(Assessment summary) Tj', '/F1 10 Tf', '0 -18 Td', '0.35 0.40 0.42 rg', '(Results from the completed Arabic language diagnostic.) Tj', 'ET', '0.11 0.20 0.28 rg', '57 556 481 34 re f', 'BT', '/F2 10 Tf', '1 1 1 rg', '73 569 Td', '(SKILL) Tj', '315 0 Td', '(RESULT) Tj', 'ET'];
  TEST_KEYS.forEach((key, index) => { const result = student.results[key]; const y = 512 - index * 48; const score = result?.pending ? 'Teacher review pending' : `${result?.score} / ${result?.total}`; stream.push(index % 2 ? '0.98 0.97 0.94 rg' : '0.94 0.94 0.91 rg', `57 ${y} 481 47 re f`, '0.77 0.58 0.22 rg', `57 ${y} 5 47 re f`, '0.13 0.22 0.29 rg', 'BT', '/F2 12 Tf', `75 ${y + 19} Td`, `(${pdfSafe(key)}) Tj`, '/F1 9 Tf', '0 -13 Td', `(Arabic language skill ${index + 1}) Tj`, 'ET', '0.13 0.22 0.29 rg', 'BT', '/F2 12 Tf', `378 ${y + 18} Td`, `(${pdfSafe(score)}) Tj`, 'ET'); });
  stream.push('0.77 0.58 0.22 rg', '57 234 481 1 re f', '0.13 0.22 0.29 rg', 'BT', '/F2 11 Tf', '57 204 Td', '(Teacher review) Tj', '/F1 9 Tf', '0 -15 Td', '0.35 0.40 0.42 rg', '(Writing and speaking scores are confirmed after teacher review.) Tj', '0.13 0.22 0.29 rg', '0 -105 Td', '(ANOR INTERNATIONAL SCHOOL) Tj', '0.35 0.40 0.42 rg', '0 -14 Td', '(Arabic Language Programme - Student Assessment Report) Tj', 'ET', 'Q');
  const content = stream.join('\n'); const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>', `<< /Length ${content.length} >>\nstream\n${content}\nendstream`, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>']; let pdf = '%PDF-1.4\n'; const offsets = [0]; objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; }); const xref = pdf.length; pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`; return Buffer.from(pdf, 'binary');
}
async function sendResultToTelegram(student) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) throw new Error('Telegram sozlanmagan (.env faylida TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID yo‘q).');
  const form = new FormData(); form.append('chat_id', process.env.TELEGRAM_CHAT_ID); form.append('caption', `${student.fullName} — ${student.schoolClass} sinf\nArab tili diagnostikasi natijasi`); form.append('document', resultPdf(student), { filename: `Anor-School-natija-${student.fullName.replace(/[^a-z0-9]+/gi, '-')}.pdf`, contentType: 'application/pdf' });
  const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`, { method: 'POST', body: form }); const data = await response.json().catch(() => ({})); if (!data.ok) throw new Error(data.description || 'Telegram xatosi.');
}
async function finalize(student) { if (!fullyGraded(student) || student.telegramSent) return; try { await sendResultToTelegram(student); student.telegramSent = true; student.telegramError = null; } catch (error) { student.telegramSent = false; student.telegramError = error.message || 'Telegramga yuborishda xatolik.'; } }

app.get('/api/students', (req, res) => { const db = loadDb(); res.json(db.students.map(publicStudent)); });
app.get('/api/students/:id', async (req, res) => { const db = loadDb(); const student = findStudent(db, req.params.id); if (!student) return res.status(404).json({ error: 'not-found' }); archiveAttempt(student); await finalize(student); saveDb(db); res.json(publicStudent(student)); });
app.post('/api/register', (req, res) => { const { fullName, schoolClass, password } = req.body || {}; if (!fullName || !schoolClass || !password) return res.status(400).json({ error: 'invalid' }); const db = loadDb(); if (fullName.trim().toLowerCase() === db.settings.adminUsername.toLowerCase()) return res.status(400).json({ error: 'admin-reserved' }); if (db.students.some(item => item.fullName.toLowerCase() === fullName.trim().toLowerCase() && item.schoolClass === schoolClass)) return res.status(409).json({ error: 'duplicate' }); const student = { id: crypto.randomUUID(), fullName: fullName.trim(), schoolClass, password, results: {}, attempts: [], pendingReview: {}, telegramSent: false, telegramError: null }; db.students.push(student); saveDb(db); res.json(publicStudent(student)); });
app.post('/api/login', (req, res) => { const { fullName, password } = req.body || {}; const db = loadDb(); const student = db.students.find(item => item.fullName.toLowerCase() === String(fullName || '').trim().toLowerCase() && item.password === password); if (!student) return res.status(401).json({ error: 'invalid-credentials' }); res.json(publicStudent(student)); });
app.post('/api/students/:id/result', async (req, res) => { const { section, score, total, note } = req.body || {}; const db = loadDb(); const student = findStudent(db, req.params.id); if (!student || !TEST_KEYS.includes(section)) return res.status(404).json({ error: 'not-found' }); student.results[section] = { score, total, note: note || '', pending: false, completedAt: new Date().toISOString() }; delete student.pendingReview[section]; archiveAttempt(student); await finalize(student); saveDb(db); res.json(publicStudent(student)); });
app.post('/api/students/:id/pending', (req, res) => { const { section, total, content } = req.body || {}; const db = loadDb(); const student = findStudent(db, req.params.id); if (!student || !TEST_KEYS.includes(section)) return res.status(404).json({ error: 'not-found' }); student.results[section] = { score: null, total, note: '', pending: true, completedAt: new Date().toISOString() }; student.pendingReview[section] = content; saveDb(db); res.json(publicStudent(student)); });
app.post('/api/students/:id/grade', async (req, res) => { const { section, score, total, comment } = req.body || {}; const db = loadDb(); const student = findStudent(db, req.params.id); if (!student || !TEST_KEYS.includes(section)) return res.status(404).json({ error: 'not-found' }); student.results[section] = { score, total, note: comment || '', pending: false, completedAt: student.results[section]?.completedAt || new Date().toISOString() }; delete student.pendingReview[section]; archiveAttempt(student); await finalize(student); saveDb(db); res.json(publicStudent(student)); });
app.post('/api/students/:id/reset', async (req, res) => { const db = loadDb(); const student = findStudent(db, req.params.id); if (!student) return res.status(404).json({ error: 'not-found' }); await finalize(student); if (!fullyGraded(student) || !student.telegramSent) { saveDb(db); return res.status(400).json({ error: 'not-ready' }); } student.results = {}; student.pendingReview = {}; student.telegramSent = false; student.telegramError = null; saveDb(db); res.json(publicStudent(student)); });
app.get('/api/questions', (req, res) => res.json(loadDb().questionBank));
app.post('/api/questions', (req, res) => { const { section, prompt, audioText, audioUrl, options, answer } = req.body || {}; if (!TEST_KEYS.includes(section) || !prompt) return res.status(400).json({ error: 'invalid' }); const db = loadDb(); const question = { id: crypto.randomUUID(), prompt, ...(options ? { options } : {}), ...(answer !== undefined ? { answer } : {}), ...(audioUrl ? { audioUrl } : audioText ? { audioText } : {}) }; db.questionBank[section].push(question); saveDb(db); res.json(db.questionBank); });
app.delete('/api/questions/:section/:id', (req, res) => { const db = loadDb(); if (!TEST_KEYS.includes(req.params.section)) return res.status(400).json({ error: 'invalid' }); db.questionBank[req.params.section] = db.questionBank[req.params.section].filter(question => question.id !== req.params.id); saveDb(db); res.json(db.questionBank); });
app.get('/api/reading-passage', (req, res) => res.json(loadDb().settings.readingPassage || { content: '', translation: '' }));
app.post('/api/reading-passage', (req, res) => { const { content, translation } = req.body || {}; if (typeof content !== 'string' || typeof translation !== 'string') return res.status(400).json({ error: 'invalid' }); const db = loadDb(); db.settings.readingPassage = { content: content.trim(), translation: translation.trim() }; saveDb(db); res.json(db.settings.readingPassage); });
app.get('/api/grading-mode', (req, res) => res.json({ mode: loadDb().settings.gradingMode }));
app.post('/api/grading-mode', (req, res) => { if (!['ai', 'teacher'].includes(req.body?.mode)) return res.status(400).json({ error: 'invalid' }); const db = loadDb(); db.settings.gradingMode = req.body.mode; saveDb(db); res.json({ mode: db.settings.gradingMode }); });
app.post('/api/admin/login', (req, res) => { const db = loadDb(); const { username, password } = req.body || {}; if (String(username || '').trim().toLowerCase() !== db.settings.adminUsername.toLowerCase()) return res.status(404).json({ error: 'invalid-username' }); if (password !== db.settings.adminPassword) return res.status(401).json({ error: 'invalid-password' }); res.json({ ok: true, username: db.settings.adminUsername }); });
app.post('/api/admin/credentials', (req, res) => { const db = loadDb(); const { currentPassword, newUsername, newPassword } = req.body || {}; if (currentPassword !== db.settings.adminPassword) return res.status(401).json({ error: 'invalid-password' }); const username = String(newUsername || '').trim(); const password = String(newPassword || '').trim(); if (!username && !password) return res.status(400).json({ error: 'nothing-to-change' }); if (username && db.students.some(student => student.fullName.toLowerCase() === username.toLowerCase())) return res.status(409).json({ error: 'duplicate-username' }); if (password && password.length < 4) return res.status(400).json({ error: 'password-too-short' }); if (username) db.settings.adminUsername = username; if (password) db.settings.adminPassword = password; saveDb(db); res.json({ ok: true, username: db.settings.adminUsername }); });

// ---------- Yozish (Writing) baholash ----------
app.post('/api/grade-writing', async (req, res) => {
  try {
    if (!openai) return res.status(503).json({ error: 'OPENAI_API_KEY sozlanmagan.' });
    const { answers } = req.body; // [{ prompt, answer }]
    if (!Array.isArray(answers) || !answers.length) {
      return res.status(400).json({ error: 'answers required' });
    }

    const systemPrompt = `Siz arab tili (boshlang'ich daraja) o'qituvchisiz. O'quvchining yozma javoblarini baholaysiz.
Har bir javobni grammatika, so'z boyligi va topshiriqqa mosligiga qarab 0 dan 10 gacha ball bilan baholang.
Agar javob bo'sh yoki mutlaqo mos bo'lmasa, 0 ball qo'ying.
Faqat quyidagi JSON formatida javob bering, boshqa hech qanday matn yozmang:
{"items":[{"score": number, "maxScore": 10, "comment": "qisqa fikr o'zbek tilida"}],"totalScore": number, "totalMax": number, "overallComment": "umumiy fikr o'zbek tilida, 1-2 gap"}`;

    const userContent = answers
      .map((a, i) => `Topshiriq ${i + 1}: ${a.prompt}\nO'quvchi javobi: ${a.answer && a.answer.trim() ? a.answer.trim() : '(bo\'sh javob)'}`)
      .join('\n\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    res.json(parsed);
  } catch (err) {
    console.error('grade-writing error:', err.message);
    res.status(500).json({ error: 'AI baholashda xatolik yuz berdi.' });
  }
});

// ---------- Gapirish (Speaking) baholash ----------
app.post('/api/grade-speaking', upload.single('audio'), async (req, res) => {
  try {
    if (!openai) return res.status(503).json({ error: 'OPENAI_API_KEY sozlanmagan.' });
    if (!req.file) return res.status(400).json({ error: 'audio file required' });
    const promptsText = req.body.prompts || '';

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: 'whisper-1',
      language: 'ar',
    });

    fs.unlink(req.file.path, () => {});

    const systemPrompt = `Siz arab tili o'qituvchisiz. Sizga o'quvchining ovozli javobi matnga o'girilgan holda (transkripsiya) beriladi.
Talaffuz va tonlarni to'g'ridan-to'g'ri eshita olmaysiz, shuning uchun grammatika, so'z boyligi, gap tuzilishi va topshiriqqa mosligiga qarab baholang.
0 dan 10 gacha umumiy ball bering. Agar transkripsiya bo'sh yoki mavzuga mutlaqo aloqasi bo'lmasa, past ball bering.
Faqat quyidagi JSON formatida javob bering, boshqa hech narsa yozmang:
{"score": number, "maxScore": 10, "comment": "qisqa fikr o'zbek tilida, 1-2 gap"}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Topshiriq: ${promptsText}\n\nTranskripsiya: ${transcription.text || '(bo\'sh)'}` },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    parsed.transcript = transcription.text || '';
    res.json(parsed);
  } catch (err) {
    console.error('grade-speaking error:', err.message);
    res.status(500).json({ error: 'AI baholashda xatolik yuz berdi.' });
  }
});

// ---------- Telegramga PDF yuborish ----------
app.post('/api/send-telegram', upload.single('pdf'), async (req, res) => {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(400).json({ error: 'Telegram sozlanmagan. .env faylida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni kiriting.' });
    }
    if (!req.file) return res.status(400).json({ error: 'pdf file required' });

    const form = new FormData();
    form.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    if (req.body.caption) form.append('caption', req.body.caption);
    form.append('document', fs.createReadStream(req.file.path), {
      filename: req.body.filename || 'natija.pdf',
      contentType: 'application/pdf',
    });

    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`;
    const telegramResponse = await fetch(telegramUrl, { method: 'POST', body: form });
    const data = await telegramResponse.json();
    fs.unlink(req.file.path, () => {});

    if (!data.ok) {
      console.error('Telegram error:', data);
      return res.status(502).json({ error: `Telegram xatosi: ${data.description || 'noma\'lum xato'}` });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('send-telegram error:', err.message);
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ error: 'Telegramga yuborishda xatolik yuz berdi.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
  console.log('Maktabdagi boshqa kompyuterlar shu tarmoqdagi IP orqali ulanadi, masalan: http://192.168.1.XX:' + PORT);
  console.log('Kompyuteringizning tarmoq IP manzilini bilish uchun: Windows -> ipconfig, Mac/Linux -> ifconfig');
});
