require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('../supabase');

const root = path.join(__dirname, '..');
const read = (name, fallback) => {
  const file = path.join(root, 'data', name);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback;
};

const TEST_KEYS = ['Grammatika', 'Tinglash', 'O‘qish', 'Yozish', 'Gapirish'];

(async () => {
  const students = read('students.json', []);
  const questions = read('questions.json', {});
  const settings = read('settings.json', {});

  for (const student of students) await db.saveStudent(student);
  for (const section of TEST_KEYS) {
    for (const question of questions[section] || []) await db.addQuestion(question, section);
  }
  await db.saveSettings(settings);
  console.log(`Ko‘chirildi: ${students.length} o‘quvchi va ${Object.values(questions).flat().length} savol.`);
})().catch(error => { console.error(error.message); process.exit(1); });
