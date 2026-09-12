const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error('SUPABASE_URL va SUPABASE_SECRET_KEY environment variablelari sozlanmagan.');
}

// Bu kalit faqat serverda ishlatiladi. Uni brauzer JavaScriptiga qo‘shmang.
const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function throwOnError(error) {
  if (error) throw new Error(`Supabase xatosi: ${error.message}`);
}

function studentFromRow(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    schoolClass: row.school_class,
    password: row.password,
    results: row.results || {},
    attempts: row.attempts || [],
    pendingReview: row.pending_review || {},
    telegramSent: row.telegram_sent || false,
    telegramError: row.telegram_error || null,
  };
}

function studentToRow(student) {
  return {
    id: student.id,
    full_name: student.fullName,
    school_class: student.schoolClass,
    password: student.password,
    results: student.results || {},
    attempts: student.attempts || [],
    pending_review: student.pendingReview || {},
    telegram_sent: Boolean(student.telegramSent),
    telegram_error: student.telegramError || null,
  };
}

async function getStudents() {
  const { data, error } = await supabase.from('students').select('*').order('created_at');
  throwOnError(error);
  return data.map(studentFromRow);
}

async function getStudent(id) {
  const { data, error } = await supabase.from('students').select('*').eq('id', id).maybeSingle();
  throwOnError(error);
  return data ? studentFromRow(data) : null;
}

async function saveStudent(student) {
  const { error } = await supabase.from('students').upsert(studentToRow(student));
  throwOnError(error);
}

async function getQuestionBank(testKeys) {
  const { data, error } = await supabase.from('questions').select('*').order('created_at');
  throwOnError(error);
  const bank = Object.fromEntries(testKeys.map(key => [key, []]));
  data.forEach(row => {
    if (!bank[row.section]) return;
    bank[row.section].push({
      id: row.id, grade: row.grade, prompt: row.prompt,
      ...(row.options ? { options: row.options } : {}),
      ...(row.answer !== null && row.answer !== undefined ? { answer: row.answer } : {}),
      ...(row.audio_url ? { audioUrl: row.audio_url } : row.audio_text ? { audioText: row.audio_text } : {}),
    });
  });
  return bank;
}

async function addQuestion(question, section) {
  const row = {
    id: question.id, section, grade: question.grade, prompt: question.prompt,
    options: question.options || null, answer: question.answer ?? null,
    audio_text: question.audioText || null, audio_url: question.audioUrl || null,
  };
  const { error } = await supabase.from('questions').upsert(row);
  throwOnError(error);
}

async function updateQuestionGrade(id, grade) {
  const { error } = await supabase.from('questions').update({ grade }).eq('id', id);
  throwOnError(error);
}

async function removeQuestion(id) {
  const { error } = await supabase.from('questions').delete().eq('id', id);
  throwOnError(error);
}

async function getSettings(fallback) {
  const { data, error } = await supabase.from('app_settings').select('value').eq('key', 'main').maybeSingle();
  throwOnError(error);
  return { ...fallback, ...(data?.value || {}) };
}

async function saveSettings(settings) {
  const { error } = await supabase.from('app_settings').upsert({ key: 'main', value: settings });
  throwOnError(error);
}

module.exports = { getStudents, getStudent, saveStudent, getQuestionBank, addQuestion, updateQuestionGrade, removeQuestion, getSettings, saveSettings };
