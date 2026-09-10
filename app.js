const correctionStyles = document.createElement('link');
correctionStyles.rel = 'stylesheet';
correctionStyles.href = 'fixes.css';
document.head.append(correctionStyles);

const STORE = 'anorArabicStudents';
const SESSION = 'anorArabicCurrentStudent';
const TEST_ORDER = [
  { key: 'Grammatika', file: 'grammar.html', label: 'Grammatika' },
  { key: 'Tinglash', file: 'listening.html', label: 'Tinglash' },
  { key: 'O‘qish', file: 'reading.html', label: 'O‘qish' },
  { key: 'Yozish', file: 'writing.html', label: 'Yozish' },
  { key: 'Gapirish', file: 'speaking.html', label: 'Gapirish' },
];
const QUESTION_STORE = 'anorArabicQuestionBank';
const LANGUAGE_STORE = 'anorArabicLanguage';
const GRADING_MODE_STORE = 'anorArabicGradingMode';
const RUSSIAN = {
  'Chiqish': 'Выйти', 'Bosh sahifa': 'Главная', 'BOSHLASH': 'НАЧАТЬ', 'O‘z profilingizga kiring': 'Войдите в свой профиль',
  'Xush kelibsiz': 'Добро пожаловать', 'Testni boshlash uchun akkauntingizga kiring. O‘qituvchi:': 'Войдите в аккаунт, чтобы начать тест. Учитель:',
  'Ism familiya': 'Имя и фамилия', 'Parol': 'Пароль', 'Kirish': 'Войти', 'YANGI O‘QUVCHI': 'НОВЫЙ УЧЕНИК', 'Ro‘yxatdan o‘tish': 'Регистрация',
  'Ma’lumotlaringiz faqat sizning profilingizda saqlanadi.': 'Ваши данные сохраняются только в вашем профиле.', 'Sinf': 'Класс', 'Profil yaratish': 'Создать профиль',
  'Sinfingizni tanlang': 'Выберите класс', 'Masalan: Ali Valiyev': 'Например: Али Валиев', 'Parolingizni kiriting': 'Введите пароль', 'Kamida 4 ta belgi': 'Минимум 4 символа',
  'Tilni bilish —': 'Знание языка —', 'yangi olamga': 'путь в новый мир', 'ochilgan eshik.': 'открытая дверь.',
  'Anor School o‘quvchilari uchun arab tili bo‘yicha qulay va zamonaviy daraja aniqlash platformasi.': 'Современная платформа для определения уровня арабского языка учеников Anor School.',
  'SIZNING PROFILINGIZ': 'ВАШ ПРОФИЛЬ', 'xush kelibsiz!': 'добро пожаловать!', 'Arab tili diagnostikasi': 'Диагностика арабского языка',
  'Har bir bo‘lim yakunida natijangiz profilingizga saqlanadi. Barcha besh bo‘limni bajaring.': 'Результат каждого раздела сохраняется в вашем профиле. Выполните все пять разделов.',
  'Grammatika': 'Грамматика', 'Tinglash': 'Аудирование', 'O‘qish': 'Чтение', 'Yozish': 'Письмо', 'Gapirish': 'Говорение',
  'Gap tuzilishi va so‘z boyligi': 'Структура предложений и словарный запас', 'Eshitib tushunish': 'Понимание на слух', 'Matn va ierogliflarni anglash': 'Понимание текстов и иероглифов', 'Gaplar va ierogliflar': 'Предложения и иероглифы', 'Talaffuz va og‘zaki nutq': 'Произношение и устная речь', 'Boshlash →': 'Начать →',
  'DIAGNOSTIKA YAKUNLANDI': 'ДИАГНОСТИКА ЗАВЕРШЕНА', 'Umumiy natijangiz': 'Ваш общий результат', 'Beshta bo‘lim ham bajarildi. Quyida har bir bo‘lim natijasi jamlangan.': 'Все пять разделов выполнены. Ниже приведены результаты каждого раздела.', 'Natijani PDF sifatida yuklab olish ↓': 'Скачать результат в PDF ↓',
  'Grammatika testi': 'Тест по грамматике', 'Tinglash testi': 'Тест по аудированию', 'O‘qish testi': 'Тест по чтению', 'Yozish testi': 'Тест по письму', 'Gapirish testi': 'Тест по говорению',
  'To‘g‘ri javobni tanlang. Har savol 1 ball.': 'Выберите правильный ответ. Каждый вопрос — 1 балл.', 'Har audioni eshiting va to‘g‘ri javobni belgilang.': 'Прослушайте каждую аудиозапись и выберите правильный ответ.', 'Matnni o‘qing va savollarga javob bering.': 'Прочитайте текст и ответьте на вопросы.',
  'Javoblaringizni arab tilida yozing. O‘qituvchi mazmun va grammatikani baholaydi.': 'Пишите ответы на арабском языке. Учитель оценит содержание и грамматику.', 'Ovoz yozuvingiz orqali talaffuz va og‘zaki nutqingiz tekshiriladi.': 'Произношение и устная речь будут проверены с помощью аудиозаписи.',
  'Bosh sahifaga qaytish': 'Вернуться на главную', 'Javoblarni tekshirish →': 'Проверить ответы →', 'Yozma javobni yuborish →': 'Отправить письменный ответ →', 'Og‘zaki javobni yuborish →': 'Отправить устный ответ →',
  'O‘QITUVCHI PANELI': 'ПАНЕЛЬ УЧИТЕЛЯ', 'O‘quvchilar natijalari': 'Результаты учеников', 'Har o‘quvchining oxirgi 5 ta yakunlangan diagnostikasi saqlanadi.': 'Сохраняются последние 5 завершённых диагностик каждого ученика.',
  'Test savollarini boshqarish': 'Управление вопросами', 'SAVOLLAR BANKI': 'БАНК ВОПРОСОВ', 'Test savolini qo‘shish': 'Добавить вопрос теста', 'Bu yerdan kiritilgan savol o‘quvchi testida paydo bo‘ladi.': 'Добавленный здесь вопрос появится в тесте ученика.', 'Test turi': 'Тип теста', 'Savolni qo‘shish': 'Добавить вопрос', 'Mavjud savollar': 'Текущие вопросы',
  '“Men o‘quvchiman” jumlasining to‘g‘ri tarjimasi qaysi?': 'Какой перевод предложения «Я ученик» правильный?', 'Bo‘sh joyni to‘ldiring: هذا ___ جميل. (Bu chiroyli kitob.)': 'Заполните пропуск: هذا ___ جميل. (Это красивая книга.)', '“Men maktabga boraman” jumlasini toping.': 'Выберите предложение «Я иду в школу».', '“هل” so‘roq yuklamasi qaysi gapda to‘g‘ri ishlatilgan?': 'В каком предложении вопросительная частица «هل» использована верно?',
  'Gapirayotgan bolaning ismi nima?': 'Как зовут говорящего мальчика?', 'Bugun haftaning qaysi kuni?': 'Какой сегодня день недели?', 'U nimani yoqtiradi?': 'Что ему нравится?', '“مدرسة” so‘zi nimani anglatadi?': 'Что означает слово «مدرسة»?', '“أنا أحب اللغة العربية” gapining ma’nosi qaysi?': 'Что означает предложение «أنا أحب اللغة العربية»?', '“عشر سنوات” nimani anglatadi?': 'Что означает «عشر سنوات»?',
  'So‘zlardan to‘g‘ri jumla tuzing: أنا / طالب / مجتهد': 'Составьте правильное предложение из слов: أنا / طالب / مجتهد', 'Arab tilida ismingiz, sinfingiz va arab tilini yoqtirasizmi yoki yo‘qligi haqida 2–3 ta sodda gap yozing.': 'Напишите по-арабски 2–3 простых предложения о своём имени, классе и отношении к арабскому языку.', '“Bugun havo yaxshi.” jumlasini arab tiliga tarjima qiling.': 'Переведите на арабский предложение: «Сегодня хорошая погода».', 'O‘zingizni arab tilida tanishtiring: ismingiz, sinfingiz va arab tili haqida 2–3 ta gap ayting.': 'Представьтесь по-арабски: назовите имя, класс и скажите 2–3 предложения о арабском языке.',
  'Oila': 'Семья', 'Do‘st': 'Друг', 'Maktab': 'Школа', 'Men arab tilini yaxshi ko‘raman.': 'Я люблю арабский язык.', 'Men arab tilini o‘qimayman.': 'Я не изучаю арабский язык.', 'Men ingliz tilini yaxshi ko‘raman.': 'Я люблю английский язык.', 'O‘n yosh': 'Десять лет', 'Yigirma yosh': 'Двадцать лет', 'O‘n kun': 'Десять дней', 'Dushanba': 'Понедельник', 'Chorshanba': 'Среда', 'Juma': 'Пятница', 'Choy': 'Чай', 'Qahva': 'Кофе', 'Sut': 'Молоко'
  , 'SAVOL': 'ВОПРОС', 'TOPSHIRIQ': 'ЗАДАНИЕ', 'Javobingiz': 'Ваш ответ', 'Javobingizni shu yerga yozing…': 'Введите ответ здесь…', 'Audio': 'Аудио', 'kerak bo‘lsa qayta tinglashingiz mumkin.': 'при необходимости можно прослушать повторно.', 'OG‘ZAKI TOPSHIRIQLAR': 'УСТНЫЕ ЗАДАНИЯ', 'topshiriq': 'задание', 'Baholash:': 'Оценивание:', 'talaffuz va tonlar, gapning aniqligi, so‘z boyligi hamda nutq ravonligi.': 'произношение и тоны, точность речи, словарный запас и беглость.', 'Ovozni yozish': 'Записать голос', 'Yozishni boshlash uchun mikrofon tugmasini bosing.': 'Нажмите кнопку микрофона, чтобы начать запись.',
  'Bu bo‘limda hozircha savol yo‘q.': 'В этом разделе пока нет вопросов.', 'O‘qituvchi savollar bankidan savol qo‘shgach, testni boshlashingiz mumkin.': 'Вы сможете начать тест после добавления вопроса учителем.', 'Savol matni': 'Текст вопроса', 'Savolni yozing': 'Введите вопрос', 'Audio matni': 'Текст аудио', 'Arabcha eshittiriladigan matnni yozing': 'Введите арабский текст для аудио', '1-variant': 'Вариант 1', '2-variant': 'Вариант 2', '3-variant': 'Вариант 3', 'Birinchi javob': 'Первый ответ', 'Ikkinchi javob': 'Второй ответ', 'Uchinchi javob': 'Третий ответ', 'To‘g‘ri javob': 'Правильный ответ', 'Bu ochiq topshiriq. O‘quvchi javobi o‘qituvchi tomonidan baholanadi.': 'Это открытое задание. Ответ ученика оценивает учитель.',
  'Ochiq javobli topshiriq': 'Задание с открытым ответом', 'Savolni olib tashlash': 'Удалить вопрос', 'Bu test turida savol qolmadi. Chap tomondagi forma orqali yangisini qo‘shing.': 'В этом типе теста не осталось вопросов. Добавьте новый вопрос через форму слева.', 'ta savol': 'вопросов', 'Natija:': 'Результат:', 'Bu bo‘lim tugadi. Keyingi test ochildi.': 'Этот раздел завершён. Следующий тест открыт.', 'Barcha natijalarni bosh sahifada ko‘rishingiz mumkin.': 'Все результаты доступны на главной странице.', '2 soniyadan so‘ng bosh sahifaga o‘tasiz…': 'Через 2 секунды вы перейдёте на главную страницу…',
  'Variantlar:': 'Варианты:', 'variant': 'вариант',
  'KIRISH': 'ВХОД', ', xush kelibsiz!': ', добро пожаловать!', '← Bosh sahifa': '← Главная',
  'Anor School bosh sahifa': 'Главная страница Anor School',
  'Natijalarni yopish va testni qayta boshlash': 'Закрыть результаты и начать тест заново',
  'Testni qayta boshlash': 'Начать тест заново',
  'sinf': 'класс', 'DIAGNOSTIKA': 'ДИАГНОСТИКА', 'TEST': 'ТЕСТ', 'ADMIN': 'АДМИН',
  'تشخيص إتقان اللغة العربية · ARAB TILI DIAGNOSTIKASI': 'تشخيص إتقان اللغة العربية · ДИАГНОСТИКА АРАБСКОГО ЯЗЫКА',
  'Hozircha ro‘yxatdan o‘tgan o‘quvchilar yo‘q.': 'Пока нет зарегистрированных учеников.',
  'ENG SO‘NGGI · ': 'ПОСЛЕДНИЙ · ',
  'Hali yakunlangan test yo‘q.': 'Пока нет завершённых тестов.',
  'ta urinish': 'попыток',
  'Tekshiruvda': 'На проверке',
  'Yozma javob yuborildi.': 'Письменный ответ отправлен.',
  'topshiriq bajarildi. Endi keyingi test ochildi.': 'заданий выполнено. Теперь открыт следующий тест.',
  'Yozuv tayyor. Endi javobingizni yuboring.': 'Запись готова. Теперь отправьте ответ.',
  'Yozilmoqda… tugatish uchun tugmani bosing.': 'Идёт запись… нажмите кнопку, чтобы закончить.',
  'Mikrofondan foydalanishga ruxsat bering va qayta urinib ko‘ring.': 'Разрешите доступ к микрофону и попробуйте снова.',
  'Diagnostika yakunlandi.': 'Диагностика завершена.',
  'Umumiy natijani va PDF yuklash tugmasini bosh sahifada ko‘rasiz.': 'Общий результат и кнопку загрузки PDF вы увидите на главной странице.',
  'Audio yozuv topilmadi.': 'Аудиозапись не найдена.',
  'Avval mikrofon tugmasi orqali javobingizni yozib oling.': 'Сначала запишите ответ с помощью кнопки микрофона.',
  'Yangi testni boshlash uchun avval natijalar oynasidagi × belgisini bosing.': 'Чтобы начать новый тест, сначала нажмите × в окне результатов.',
  'Avval ochiq turgan testni yakunlang.': 'Сначала завершите текущий открытый тест.',
  '“admin” nomi faqat o‘qituvchi paneli uchun ajratilgan.': '«admin» — это имя зарезервировано только для панели учителя.',
  'Bu ism va sinf bilan profil allaqachon mavjud. Kirish bo‘limidan foydalaning.': 'Профиль с таким именем и классом уже существует. Используйте вход в систему.',
  'Profil yaratildi. Xush kelibsiz!': 'Профиль создан. Добро пожаловать!',
  'Admin paroli noto‘g‘ri.': 'Неверный пароль администратора.',
  'Ism familiya yoki parol noto‘g‘ri.': 'Неверное имя или пароль.',
  'Kirish muvaffaqiyatli.': 'Вход выполнен успешно.',
  'AI javoblaringizni tekshirmoqda…': 'ИИ проверяет ваши ответы…',
  'AI javobingizni tekshirmoqda…': 'ИИ проверяет ваш ответ…',
  'Yozma javob baholandi.': 'Письменный ответ оценён.',
  'AI tekshiruvida xatolik yuz berdi.': 'Ошибка при проверке ИИ.',
  'Javobingiz saqlandi, o‘qituvchi tomonidan tekshiriladi.': 'Ваш ответ сохранён, его проверит учитель.',
  'Baholash rejimi:': 'Режим оценивания:', 'AI tekshiruvi': 'Проверка ИИ', 'Ustoz tekshiruvi': 'Проверка учителем',
  'Tekshirish': 'Проверка', 'Hozircha tekshirishni kutayotgan javoblar yo‘q.': 'Пока нет ответов, ожидающих проверки.',
  'Ball (0–10)': 'Балл (0–10)', 'Izoh (ixtiyoriy)': 'Комментарий (необязательно)', 'Qisqa izoh…': 'Краткий комментарий…',
  'Baholashni saqlash': 'Сохранить оценку', 'PDF yuklab olish': 'Скачать PDF', 'Audio topilmadi.': 'Аудио не найдено.',
  'Javobingiz ustozga yuborildi.': 'Ваш ответ отправлен учителю.', 'Ustoz tekshirgach, natija profilingizda ko‘rinadi.': 'После проверки учителем результат появится в вашем профиле.',
  'Ba’zi bo‘limlar hali ustoz tomonidan tekshirilmoqda:': 'Некоторые разделы ещё проверяются учителем:', 'Natijalar tayyor bo‘lgach shu yerda ko‘rinadi.': 'Результаты появятся здесь, когда будут готовы.',
  'Xatolik yuz berdi, qayta urinib ko‘ring.': 'Произошла ошибка, попробуйте снова.',
  'Telegramga yuborish': 'Отправить в Telegram', 'Yuborilmoqda…': 'Отправка…', 'Yuborildi ✓': 'Отправлено ✓',
  'Telegramga yuborishda xatolik yuz berdi.': 'Ошибка при отправке в Telegram.', 'Arab tili diagnostikasi natijasi': 'Результат диагностики арабского языка',
  'Telegramga yuborildi ✓': 'Отправлено в Telegram ✓', 'Telegramga yuborilmoqda…': 'Отправляется в Telegram…', 'Telegram guruhga yuborildi.': 'Отправлено в группу Telegram.',
  'Natijalar tayyor. Telegram guruhga yuborilmoqda…': 'Результаты готовы. Отправляются в группу Telegram…',
  'Yangi testni boshlash uchun avval ustoz natijalarni tekshirib, Telegramga yuborishini kuting.': 'Чтобы начать новый тест, дождитесь проверки учителя и отправки в Telegram.'
};
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
  Gapirish: [
    { id: 's1', prompt: 'O‘zingizni arab tilida tanishtiring: ismingiz, sinfingiz va arab tili haqida 2–3 ta gap ayting.' },
  ],
};

async function apiGet(path) { const response = await fetch(path); if (!response.ok) { const error = new Error('server-error'); error.code = (await response.json().catch(() => ({}))).error; throw error; } return response.json(); }
async function apiPost(path, body) { const response = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) }); if (!response.ok) { const error = new Error('server-error'); error.code = (await response.json().catch(() => ({}))).error; throw error; } return response.json(); }
async function apiDelete(path) { const response = await fetch(path, { method: 'DELETE' }); if (!response.ok) throw new Error('server-error'); return response.json(); }
function getStudents() { return JSON.parse(localStorage.getItem(STORE) || '[]'); }
function saveStudents(students) { localStorage.setItem(STORE, JSON.stringify(students)); }
function cacheStudent(student) { const students = getStudents(); const index = students.findIndex(item => item.id === student.id); if (index === -1) students.push(student); else students[index] = student; saveStudents(students); }
function currentStudent() { return JSON.parse(localStorage.getItem(SESSION) || 'null'); }
function setMessage(text, success = false) { const item = document.querySelector('#authMessage'); if (item) { item.textContent = text; item.classList.toggle('success', success); } }
function escapeHtml(value) { const box = document.createElement('span'); box.textContent = String(value); return box.innerHTML; }
function currentLanguage() { return localStorage.getItem(LANGUAGE_STORE) || 'uz'; }
function t(value) { return currentLanguage() === 'ru' ? (RUSSIAN[value] || value) : value; }
function translatePage() {
  document.body.classList.toggle('lang-ru', currentLanguage() === 'ru');
  if (currentLanguage() !== 'ru') return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; let node;
  while ((node = walker.nextNode())) nodes.push(node);
  nodes.forEach(textNode => { const original = textNode.nodeValue; const trimmed = original.trim(); if (RUSSIAN[trimmed]) textNode.nodeValue = original.replace(trimmed, RUSSIAN[trimmed]); });
  document.querySelectorAll('[placeholder]').forEach(element => { if (RUSSIAN[element.placeholder]) element.placeholder = RUSSIAN[element.placeholder]; });
  document.querySelectorAll('[title]').forEach(element => { if (RUSSIAN[element.title]) element.title = RUSSIAN[element.title]; });
  document.querySelectorAll('[aria-label]').forEach(element => { const label = element.getAttribute('aria-label'); if (RUSSIAN[label]) element.setAttribute('aria-label', RUSSIAN[label]); });
}
function setupLanguageSwitch() {
  const header = document.querySelector('.site-header'); if (!header) return;
  const control = document.createElement('div'); control.className = 'language-switch';
  control.innerHTML = `<button type="button" data-language="uz" class="${currentLanguage() === 'uz' ? 'active' : ''}">O‘Z</button><button type="button" data-language="ru" class="${currentLanguage() === 'ru' ? 'active' : ''}">РУ</button>`;
  const logout = document.querySelector('#logoutButton'); if (logout) header.insertBefore(control, logout); else header.append(control);
  control.addEventListener('click', event => { const button = event.target.closest('[data-language]'); if (!button || button.dataset.language === currentLanguage()) return; localStorage.setItem(LANGUAGE_STORE, button.dataset.language); window.location.reload(); });
}
function getQuestionBank() { const saved = localStorage.getItem(QUESTION_STORE); return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)); }
function saveQuestionBank(bank) { localStorage.setItem(QUESTION_STORE, JSON.stringify(bank)); }
const READING_PASSAGE_STORE = 'anorArabicReadingPassage';
function getReadingPassage() { return JSON.parse(localStorage.getItem(READING_PASSAGE_STORE) || '{"content":"","translation":""}'); }
function cacheReadingPassage(passage) { localStorage.setItem(READING_PASSAGE_STORE, JSON.stringify(passage)); }
function gradingMode() { return localStorage.getItem(GRADING_MODE_STORE) || 'teacher'; }
async function setGradingMode(mode) { const data = await apiPost('/api/grading-mode', { mode }); localStorage.setItem(GRADING_MODE_STORE, data.mode); return data.mode; }
async function refreshServerCache() {
  try {
    const [students, questions, mode, passage] = await Promise.all([apiGet('/api/students'), apiGet('/api/questions'), apiGet('/api/grading-mode'), apiGet('/api/reading-passage')]);
    saveStudents(students); saveQuestionBank(questions); localStorage.setItem(GRADING_MODE_STORE, mode.mode); cacheReadingPassage(passage);
    const current = currentStudent(); const freshCurrent = students.find(student => student.id === current?.id); if (freshCurrent) localStorage.setItem(SESSION, JSON.stringify(freshCurrent));
    return true;
  } catch { return false; }
}
function blobToDataUrl(blob) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); }); }

function addClassOptions() {
  const select = document.querySelector('select[name="schoolClass"]');
  if (!select) return;
  for (let grade = 1; grade <= 11; grade += 1) ['A', 'B'].forEach(letter => {
    const option = document.createElement('option'); option.value = `${grade}${letter}`; option.textContent = `${grade}-${letter} ${t('sinf')}`; select.append(option);
  });
}

function isComplete(student, test) { return Boolean(student?.results?.[test.key]); }
function firstAvailableIndex(student) {
  const incomplete = TEST_ORDER.findIndex(test => !isComplete(student, test));
  return incomplete === -1 ? TEST_ORDER.length : incomplete;
}

async function showDashboard() {
  const student = currentStudent();
  const auth = document.querySelector('#authSection'); const dashboard = document.querySelector('#dashboard'); const teacherDashboard = document.querySelector('#teacherDashboard');
  if (!student || !auth || !dashboard || !teacherDashboard) return;
  auth.classList.add('hidden'); document.querySelector('#logoutButton')?.classList.remove('hidden');
  if (student.role === 'admin') { dashboard.classList.add('hidden'); teacherDashboard.classList.remove('hidden'); await renderTeacherDashboard(); return; }
  let activeStudent = student;
  try { activeStudent = await apiGet(`/api/students/${student.id}`); cacheStudent(activeStudent); localStorage.setItem(SESSION, JSON.stringify(activeStudent)); } catch { /* oxirgi keshlangan ma'lumot bilan davom etamiz */ }
  teacherDashboard.classList.add('hidden'); dashboard.classList.remove('hidden');
  document.querySelector('#studentName').textContent = activeStudent.fullName;
  document.querySelector('#studentClass').textContent = `${activeStudent.schoolClass} ${t('sinf')} · ${t('Arab tili diagnostikasi')}`;
  updateTestLocks(activeStudent); renderFinalResults(activeStudent);
}

function scoreForTeacher(result) {
  if (!result) return '—';
  return result.pending ? t('Tekshiruvda') : `${result.score}/${result.total}`;
}

async function renderTeacherDashboard() {
  const container = document.querySelector('#teacherStudentList'); if (!container) return;
  let students = [];
  try { students = await apiGet('/api/students'); saveStudents(students); } catch { students = getStudents(); }
  students = students.sort((a, b) => a.fullName.localeCompare(b.fullName, 'uz'));
  if (!students.length) { container.innerHTML = `<div class="teacher-empty">${t('Hozircha ro‘yxatdan o‘tgan o‘quvchilar yo‘q.')}</div>`; return; }
  const dateLocale = currentLanguage() === 'ru' ? 'ru-RU' : 'uz-UZ';
  container.innerHTML = students.map(student => {
    const attempts = [...(student.attempts || [])].reverse();
    const attemptCards = attempts.length ? attempts.map((attempt, index) => `<article class="attempt-card"><time>${index === 0 ? t('ENG SO‘NGGI · ') : ''}${new Date(attempt.completedAt).toLocaleString(dateLocale)}</time><div class="attempt-scores">${TEST_ORDER.map(test => { const r = attempt.results[test.key]; const note = r?.note && !r.pending ? escapeHtml(r.note) : ''; return `<span>${t(test.label)}</span><b${note ? ` title="${note}"` : ''}>${scoreForTeacher(r)}</b>`; }).join('')}</div></article>`).join('') : `<p class="teacher-empty">${t('Hali yakunlangan test yo‘q.')}</p>`;
    const fullyGraded = student.results && TEST_ORDER.every(test => isComplete(student, test) && !student.results[test.key].pending);
    const pdfButton = fullyGraded ? `<button class="text-button teacher-pdf-button" type="button" data-student-id="${student.id}">${t('PDF yuklab olish')}</button>` : '';
    const telegramStatus = fullyGraded ? (student.telegramSent ? `<span class="telegram-status sent" title="${t('Telegram guruhga yuborildi.')}">${t('Telegramga yuborildi ✓')}</span>` : `<span class="telegram-status pending" title="${escapeHtml(student.telegramError || '')}">${t('Telegramga yuborilmoqda…')}</span>`) : '';
    return `<article class="student-record"><div class="student-record-header"><div><h3>${escapeHtml(student.fullName)}</h3><p>${escapeHtml(student.schoolClass)} ${t('sinf')}</p></div><div class="student-record-actions"><span class="attempt-count">${attempts.length}/5 ${t('ta urinish')}</span>${telegramStatus}${pdfButton}</div></div><div class="attempt-history">${attemptCards}</div></article>`;
  }).join('');
}

function updateTestLocks(student) {
  const unlockedThrough = firstAvailableIndex(student);
  const allComplete = unlockedThrough === TEST_ORDER.length;
  document.querySelectorAll('.test-card').forEach((card, index) => {
    const locked = allComplete || index > unlockedThrough;
    card.classList.toggle('is-locked', locked);
    card.classList.toggle('is-complete-locked', allComplete);
    card.setAttribute('aria-disabled', String(locked));
    if (locked) card.setAttribute('tabindex', '-1'); else card.removeAttribute('tabindex');
  });
}

function renderFinalResults(student) {
  const panel = document.querySelector('#finalResults'); const summary = document.querySelector('#resultSummary');
  const downloadButton = document.querySelector('#downloadPdf');
  if (!panel || !summary) return;
  const complete = TEST_ORDER.every(test => isComplete(student, test));
  panel.classList.toggle('hidden', !complete);
  if (!complete) return;
  const pendingTests = TEST_ORDER.filter(test => student.results[test.key]?.pending);
  if (pendingTests.length) {
    summary.innerHTML = `<div class="summary-pending">${t('Ba’zi bo‘limlar hali ustoz tomonidan tekshirilmoqda:')} ${pendingTests.map(test => t(test.label)).join(', ')}. ${t('Natijalar tayyor bo‘lgach shu yerda ko‘rinadi.')}</div>`;
    downloadButton?.classList.add('hidden');
    return;
  }
  downloadButton?.classList.remove('hidden');
  summary.innerHTML = TEST_ORDER.map(test => {
    const result = student.results[test.key];
    return `<div class="summary-item"><span>${t(test.label)}</span><strong>${result.score} / ${result.total}</strong></div>`;
  }).join('') + (student.telegramSent ? '' : `<div class="summary-pending">${t('Natijalar tayyor. Telegram guruhga yuborilmoqda…')}</div>`);
}

function protectTestPage() {
  if (!document.body.classList.contains('test-page')) return;
  const student = currentStudent();
  if (!student || student.role === 'admin') { window.location.replace('index.html'); return; }
  const testIndex = TEST_ORDER.findIndex(test => test.key === document.body.dataset.section);
  const permitted = firstAvailableIndex(student);
  if (testIndex < 0 || testIndex > permitted || permitted === TEST_ORDER.length) window.location.replace('index.html');
}

async function storeResult(section, score, total, note = '') {
  const student = currentStudent(); if (!student) return;
  const students = getStudents(); const index = students.findIndex(item => item.id === student.id);
  try { const updated = await apiPost(`/api/students/${student.id}/result`, { section, score, total, note }); cacheStudent(updated); localStorage.setItem(SESSION, JSON.stringify(updated)); }
  catch { if (index === -1) return; students[index].results = { ...(students[index].results || {}), [section]: { score, total, note, pending: false, completedAt: new Date().toISOString() } }; saveStudents(students); localStorage.setItem(SESSION, JSON.stringify(students[index])); }
}

async function savePendingSubmission(section, total, content) {
  const student = currentStudent(); if (!student) return;
  const students = getStudents(); const index = students.findIndex(item => item.id === student.id);
  try { const updated = await apiPost(`/api/students/${student.id}/pending`, { section, total, content }); cacheStudent(updated); localStorage.setItem(SESSION, JSON.stringify(updated)); }
  catch { if (index === -1) return; students[index].results = { ...(students[index].results || {}), [section]: { score: null, total, note: '', pending: true, completedAt: new Date().toISOString() } }; students[index].pendingReview = { ...(students[index].pendingReview || {}), [section]: content }; saveStudents(students); localStorage.setItem(SESSION, JSON.stringify(students[index])); }
}

async function gradeSubmission(studentId, section, score, total, comment) {
  const students = getStudents(); const index = students.findIndex(item => item.id === studentId);
  try { const updated = await apiPost(`/api/students/${studentId}/grade`, { section, score, total, comment }); cacheStudent(updated); const current = currentStudent(); if (current?.id === studentId) localStorage.setItem(SESSION, JSON.stringify(updated)); }
  catch { if (index === -1) return; const previous = students[index].results?.[section]; students[index].results = { ...(students[index].results || {}), [section]: { score, total, note: comment || '', pending: false, completedAt: previous?.completedAt || new Date().toISOString() } }; saveStudents(students); }
}

async function renderReviewQueue() {
  const list = document.querySelector('#teacherReviewList'); if (!list) return;
  let students = getStudents(); try { students = await apiGet('/api/students'); saveStudents(students); } catch { /* keshlangan ma'lumot */ }
  const pendingItems = [];
  students.forEach(student => {
    TEST_ORDER.forEach(test => {
      const result = student.results?.[test.key];
      if (result?.pending && (test.key === 'Yozish' || test.key === 'Gapirish')) pendingItems.push({ student, test, content: student.pendingReview?.[test.key] });
    });
  });
  if (!pendingItems.length) { list.innerHTML = `<div class="teacher-empty">${t('Hozircha tekshirishni kutayotgan javoblar yo‘q.')}</div>`; return; }
  list.innerHTML = pendingItems.map(({ student, test, content }) => {
    const body = test.key === 'Yozish'
      ? (content?.answers || []).map((answer, index) => `<div class="review-answer"><p class="review-prompt">${index + 1}. ${escapeHtml(answer.prompt)}</p><p class="review-text">${escapeHtml(answer.answer || '(bo‘sh)')}</p></div>`).join('')
      : `${content?.prompts ? `<p class="review-prompt">${escapeHtml(content.prompts)}</p>` : ''}${content?.audioDataUrl ? `<audio controls src="${content.audioDataUrl}" class="audio-preview"></audio>` : `<p class="teacher-empty">${t('Audio topilmadi.')}</p>`}`;
    return `<article class="review-card" data-student-id="${student.id}" data-section="${test.key}">
      <div class="review-card-header"><h4>${escapeHtml(student.fullName)} · ${escapeHtml(student.schoolClass)} ${t('sinf')}</h4><span class="review-tag">${t(test.label)}</span></div>
      ${body}
      <div class="review-grade-row">
        <label>${t('Ball (0–10)')}<input type="number" min="0" max="10" step="1" class="review-score" /></label>
        <label>${t('Izoh (ixtiyoriy)')}<input type="text" class="review-comment" placeholder="${t('Qisqa izoh…')}" /></label>
        <button type="button" class="primary-button dark-button review-save">${t('Baholashni saqlash')}</button>
      </div>
    </article>`;
  }).join('');
}

function noQuestionsMarkup() {
  return `<div class="question"><h2>${t('Bu bo‘limda hozircha savol yo‘q.')}</h2><p>${t('O‘qituvchi savollar bankidan savol qo‘shgach, testni boshlashingiz mumkin.')}</p><a class="primary-button dark-button" href="index.html">${t('Bosh sahifaga qaytish')}</a></div>`;
}
function renderDynamicTest() {
  if (!document.body.classList.contains('test-page')) return;
  const section = document.body.dataset.section; const questions = getQuestionBank()[section] || [];
  if (['Grammatika', 'Tinglash', 'O‘qish'].includes(section)) {
    const form = document.querySelector('.choice-test'); if (!form) return;
    if (!questions.length) { form.innerHTML = noQuestionsMarkup(); return; }
    const passage = getReadingPassage(); const passageMarkup = section === 'O‘qish' && passage.content ? `<article class="reading-passage" dir="rtl"><span class="question-number" dir="ltr">${t('MATN')}</span><div class="reading-passage-content">${escapeHtml(passage.content).replace(/\n/g, '<br>')}</div>${passage.translation ? `<p class="reading-passage-translation" dir="ltr">${escapeHtml(passage.translation).replace(/\n/g, '<br>')}</p>` : ''}</article>` : '';
    form.innerHTML = `${passageMarkup}${questions.map((question, index) => `<div class="question" data-answer="${question.answer}"><span class="question-number">${t('SAVOL')} ${String(index + 1).padStart(2, '0')}</span>${section === 'Tinglash' ? (question.audioUrl ? `<div class="audio-player uploaded-audio"><audio controls src="${question.audioUrl}"></audio><small>${t('Audio')} ${index + 1} · ${t('kerak bo‘lsa qayta tinglashingiz mumkin.')}</small></div>` : `<div class="audio-player"><button class="play-audio" type="button" data-text="${escapeHtml(question.audioText || question.prompt)}">▶</button><small>${t('Audio')} ${index + 1} · ${t('kerak bo‘lsa qayta tinglashingiz mumkin.')}</small></div>`) : ''}<h2>${escapeHtml(t(question.prompt))}</h2><div class="options">${question.options.map((option, optionIndex) => `<label class="option"><input type="radio" name="q${index}" value="${optionIndex}">${escapeHtml(t(option))}</label>`).join('')}</div></div>`).join('')}<button class="primary-button submit-test ${section === 'Grammatika' ? 'grammar-theme' : section === 'Tinglash' ? 'listening-theme' : 'reading-theme'}" type="submit">${t('Javoblarni tekshirish →')}</button><div id="testResult" class="result-box"></div>`;
  }
  if (section === 'Yozish') {
    const form = document.querySelector('#writingForm'); if (!form) return;
    if (!questions.length) { form.innerHTML = noQuestionsMarkup(); return; }
    form.innerHTML = `${questions.map((question, index) => `<div class="question"><span class="question-number">${t('TOPSHIRIQ')} ${String(index + 1).padStart(2, '0')}</span><h2>${escapeHtml(t(question.prompt))}</h2><label>${t('Javobingiz')}<textarea name="answer${index}" rows="${index === 0 ? 3 : 5}" placeholder="${t('Javobingizni shu yerga yozing…')}"></textarea></label></div>`).join('')}<button class="primary-button submit-test writing-theme" type="submit">${t('Yozma javobni yuborish →')}</button><div id="testResult" class="result-box"></div>`;
  }
  if (section === 'Gapirish') {
    const form = document.querySelector('#speakingForm'); if (!form) return;
    if (!questions.length) { form.innerHTML = noQuestionsMarkup(); return; }
    form.innerHTML = `<div class="question"><span class="question-number">${t('OG‘ZAKI TOPSHIRIQLAR')}</span>${questions.map((question, index) => `<div class="writing-prompt"><strong>${index + 1}-${t('topshiriq')}.</strong> ${escapeHtml(t(question.prompt))}</div>`).join('')}<p><strong>${t('Baholash:')}</strong> ${t('talaffuz va tonlar, gapning aniqligi, so‘z boyligi hamda nutq ravonligi.')}</p><div class="record-area"><button id="recordButton" class="record-button" type="button" aria-label="${t('Ovozni yozish')}">●</button><p id="recordStatus" class="record-status">${t('Yozishni boshlash uchun mikrofon tugmasini bosing.')}</p><audio id="audioPreview" class="audio-preview hidden" controls></audio></div></div><button class="primary-button submit-test speaking-theme" type="submit">${t('Og‘zaki javobni yuborish →')}</button><div id="testResult" class="result-box"></div>`;
  }
}

function renderQuestionFields() {
  const section = document.querySelector('#questionSection')?.value; const fields = document.querySelector('#questionFields'); if (!fields) return;
  const passageManager = document.querySelector('#readingPassageManager');
  if (passageManager) {
    if (section === 'O‘qish') { const passage = getReadingPassage(); passageManager.innerHTML = `<div class="reading-passage-manager"><p class="manager-note">${t('Bu matn o‘quvchiga barcha Reading savollaridan oldin ko‘rinadi.')}</p><label>${t('Asosiy matn')}<textarea id="readingPassageContent" rows="5" dir="rtl" placeholder="اسمي علي…">${escapeHtml(passage.content || '')}</textarea></label><label>${t('Tarjima (ixtiyoriy)')}<textarea id="readingPassageTranslation" rows="3" placeholder="Matnning o‘zbekcha tarjimasi">${escapeHtml(passage.translation || '')}</textarea></label><button id="saveReadingPassage" class="primary-button dark-button" type="button">${t('Matnni saqlash')}</button><p id="readingPassageMessage" class="form-message" role="status"></p></div>`; passageManager.querySelector('#saveReadingPassage').addEventListener('click', async () => { const button = passageManager.querySelector('#saveReadingPassage'); const message = passageManager.querySelector('#readingPassageMessage'); try { button.disabled = true; const saved = await apiPost('/api/reading-passage', { content: passageManager.querySelector('#readingPassageContent').value, translation: passageManager.querySelector('#readingPassageTranslation').value }); cacheReadingPassage(saved); message.textContent = t('Asosiy matn saqlandi.'); message.classList.add('success'); } catch { message.textContent = t('Xatolik yuz berdi, qayta urinib ko‘ring.'); message.classList.remove('success'); } finally { button.disabled = false; } }); } else passageManager.innerHTML = '';
  }
  const choice = ['Grammatika', 'Tinglash', 'O‘qish'].includes(section);
  fields.innerHTML = `<label>${t('Savol matni')}<textarea name="prompt" rows="3" required placeholder="${t('Savolni yozing')}"></textarea></label>${section === 'Tinglash' ? `<label>${t('Audio matni')}<textarea name="audioText" rows="2" placeholder="${t('Arabcha eshittiriladigan matnni yozing')}"></textarea></label><label>${t('Audio faylini yuklang')}<input name="audioFile" type="file" accept="audio/*" /><small>${t('MP3, WAV yoki boshqa audio format')}</small></label>` : ''}${choice ? `<label>${t('1-variant')}<input name="option1" required placeholder="${t('Birinchi javob')}" /></label><label>${t('2-variant')}<input name="option2" required placeholder="${t('Ikkinchi javob')}" /></label><label>${t('3-variant')}<input name="option3" required placeholder="${t('Uchinchi javob')}" /></label><label>${t('To‘g‘ri javob')}<select name="answer"><option value="0">${t('1-variant')}</option><option value="1">${t('2-variant')}</option><option value="2">${t('3-variant')}</option></select></label>` : `<p class="manager-note">${t('Bu ochiq topshiriq. O‘quvchi javobi o‘qituvchi tomonidan baholanadi.')}</p>`}`;
}
function renderTeacherQuestions() {
  const list = document.querySelector('#teacherQuestionList'); const count = document.querySelector('#questionCount'); const section = document.querySelector('#questionSection')?.value;
  if (!list || !section) return;
  const questions = getQuestionBank()[section] || []; count.textContent = `${questions.length} ${t('ta savol')}`;
  if (!questions.length) { list.innerHTML = `<div class="teacher-empty">${t('Bu test turida savol qolmadi. Chap tomondagi forma orqali yangisini qo‘shing.')}</div>`; return; }
  list.innerHTML = questions.map((question, index) => `<article class="teacher-question"><p><strong>${index + 1}.</strong> ${escapeHtml(t(question.prompt))}</p>${question.audioText ? `<small>${t('Audio')}: ${escapeHtml(question.audioText)}</small>` : ''}${question.options ? `<small>${t('Variantlar:')} ${question.options.map((option, optionIndex) => `${optionIndex + 1}) ${escapeHtml(t(option))}`).join(' · ')}<br>${t('To‘g‘ri javob')}: ${Number(question.answer) + 1}-${t('variant')}</small>` : `<small>${t('Ochiq javobli topshiriq')}</small>`}<button class="delete-question" type="button" data-section="${section}" data-id="${question.id}">${t('Savolni olib tashlash')}</button></article>`).join('');
}
function setupGradingModeSwitch() {
  const switchEl = document.querySelector('.grading-mode-switch'); if (!switchEl) return;
  const update = () => switchEl.querySelectorAll('[data-grading-mode]').forEach(button => button.classList.toggle('active', button.dataset.gradingMode === gradingMode()));
  update();
  switchEl.addEventListener('click', event => {
    const button = event.target.closest('[data-grading-mode]'); if (!button) return;
    setGradingMode(button.dataset.gradingMode).then(() => { update(); renderReviewQueue(); }).catch(() => {});
  });
}

function setupQuestionManager() {
  const form = document.querySelector('#questionForm'); if (!form) return;
  const sectionSelect = document.querySelector('#questionSection');
  const switchView = view => { document.querySelectorAll('.teacher-tab').forEach(button => button.classList.toggle('active', button.dataset.teacherView === view)); document.querySelector('#teacherQuestionsPanel')?.classList.toggle('hidden', view !== 'questions'); document.querySelector('#teacherResultsPanel')?.classList.toggle('hidden', view !== 'results'); document.querySelector('#teacherReviewPanel')?.classList.toggle('hidden', view !== 'review'); document.querySelector('#teacherSettingsPanel')?.classList.toggle('hidden', view !== 'settings'); if (view === 'results') renderTeacherDashboard(); if (view === 'review') renderReviewQueue(); };
  renderQuestionFields(); renderTeacherQuestions(); setupGradingModeSwitch();
  sectionSelect.addEventListener('change', () => { renderQuestionFields(); renderTeacherQuestions(); });
  form.addEventListener('submit', async event => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); const choice = ['Grammatika', 'Tinglash', 'O‘qish'].includes(data.section); const question = { section: data.section, prompt: data.prompt.trim() }; if (choice) { question.options = [data.option1.trim(), data.option2.trim(), data.option3.trim()]; question.answer = data.answer; } try { if (data.section === 'Tinglash') { const audioFile = form.querySelector('[name="audioFile"]')?.files?.[0]; if (audioFile) question.audioUrl = await blobToDataUrl(audioFile); else if (data.audioText?.trim()) question.audioText = data.audioText.trim(); else throw new Error('audio-required'); } saveQuestionBank(await apiPost('/api/questions', question)); form.reset(); sectionSelect.value = data.section; renderQuestionFields(); renderTeacherQuestions(); } catch { alert(t('Xatolik yuz berdi, qayta urinib ko‘ring.')); } });
  document.querySelector('#teacherQuestionList')?.addEventListener('click', async event => { const button = event.target.closest('.delete-question'); if (!button) return; try { saveQuestionBank(await apiDelete(`/api/questions/${encodeURIComponent(button.dataset.section)}/${button.dataset.id}`)); renderTeacherQuestions(); } catch { alert(t('Xatolik yuz berdi, qayta urinib ko‘ring.')); } });
  document.querySelector('#teacherStudentList')?.addEventListener('click', event => {
    const pdfButton = event.target.closest('.teacher-pdf-button');
    if (pdfButton) { const student = getStudents().find(item => item.id === pdfButton.dataset.studentId); if (student) makeAndDownloadPdf(student); return; }
  });
  document.querySelector('#teacherReviewList')?.addEventListener('click', async event => {
    const button = event.target.closest('.review-save'); if (!button) return;
    const card = button.closest('.review-card'); const scoreInput = card.querySelector('.review-score'); const commentInput = card.querySelector('.review-comment');
    const score = Number(scoreInput.value);
    if (scoreInput.value === '' || Number.isNaN(score) || score < 0 || score > 10) { scoreInput.focus(); return; }
    await gradeSubmission(card.dataset.studentId, card.dataset.section, score, 10, commentInput.value.trim());
    renderReviewQueue(); renderTeacherDashboard();
  });
  document.querySelectorAll('.teacher-tab').forEach(button => button.addEventListener('click', () => switchView(button.dataset.teacherView)));
}

function returnToDashboardSoon() {
  window.setTimeout(() => { window.location.assign('index.html'); }, 2200);
}

function setUpChoiceTest(section) {
  const form = document.querySelector('.choice-test'); if (!form) return;
  form.addEventListener('submit', async event => {
    event.preventDefault(); let score = 0; const questions = form.querySelectorAll('[data-answer]');
    questions.forEach(question => { if (question.querySelector('input:checked')?.value === question.dataset.answer) score += 1; });
    await storeResult(section, score, questions.length);
    const isLast = TEST_ORDER.at(-1).key === section;
    const result = document.querySelector('#testResult'); result.innerHTML = `<strong>${t('Natija:')} ${score} / ${questions.length}</strong><br>${t(isLast ? 'Barcha natijalarni bosh sahifada ko‘rishingiz mumkin.' : 'Bu bo‘lim tugadi. Keyingi test ochildi.')} <span class="redirect-note">${t('2 soniyadan so‘ng bosh sahifaga o‘tasiz…')}</span>`; result.classList.add('show'); result.scrollIntoView({ behavior: 'smooth', block: 'center' }); returnToDashboardSoon();
  });
}

function speakArabic(button) { const phrase = button.dataset.text; if (!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(phrase); utterance.lang = 'ar-SA'; utterance.rate = .77; window.speechSynthesis.speak(utterance); }
function setupWriting() {
  const form = document.querySelector('#writingForm'); if (!form) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submitButton = form.querySelector('.submit-test');
    const questions = [...form.querySelectorAll('.question')];
    const answers = questions.map(question => ({
      prompt: question.querySelector('h2')?.textContent.trim() || '',
      answer: question.querySelector('textarea')?.value.trim() || '',
    }));
    const result = document.querySelector('#testResult');
    if (submitButton) submitButton.disabled = true;

    if (gradingMode() === 'teacher') {
      await savePendingSubmission('Yozish', 10, { answers, submittedAt: new Date().toISOString() });
      result.innerHTML = `<strong>${t('Javobingiz ustozga yuborildi.')}</strong><br>${t('Ustoz tekshirgach, natija profilingizda ko‘rinadi.')} <span class="redirect-note">${t('2 soniyadan so‘ng bosh sahifaga o‘tasiz…')}</span>`;
      result.classList.add('show'); result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      returnToDashboardSoon();
      if (submitButton) submitButton.disabled = false;
      return;
    }

    result.innerHTML = `<strong>${t('AI javoblaringizni tekshirmoqda…')}</strong>`;
    result.classList.add('show'); result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    try {
      const response = await fetch('/api/grade-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error('server-error');
      const data = await response.json();
      await storeResult('Yozish', data.totalScore, data.totalMax, data.overallComment || '');
      result.innerHTML = `<strong>${t('Yozma javob baholandi.')} ${data.totalScore}/${data.totalMax}</strong><br>${escapeHtml(data.overallComment || '')} <span class="redirect-note">${t('2 soniyadan so‘ng bosh sahifaga o‘tasiz…')}</span>`;
      returnToDashboardSoon();
    } catch (err) {
      await savePendingSubmission('Yozish', 10, { answers, submittedAt: new Date().toISOString() });
      result.innerHTML = `<strong>${t('AI tekshiruvida xatolik yuz berdi.')}</strong><br>${t('Javobingiz saqlandi, o‘qituvchi tomonidan tekshiriladi.')} <span class="redirect-note">${t('2 soniyadan so‘ng bosh sahifaga o‘tasiz…')}</span>`;
      returnToDashboardSoon();
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function setupSpeaking() {
  const form = document.querySelector('#speakingForm'); if (!form) return;
  let recorder, chunks = [], recordedBlob = null;
  const button = document.querySelector('#recordButton'), status = document.querySelector('#recordStatus'), preview = document.querySelector('#audioPreview');
  button?.addEventListener('click', async () => {
    try {
      if (recorder?.state === 'recording') { recorder.stop(); return; }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream); chunks = [];
      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        recordedBlob = new Blob(chunks, { type: 'audio/webm' });
        preview.src = URL.createObjectURL(recordedBlob);
        preview.classList.remove('hidden');
        status.textContent = t('Yozuv tayyor. Endi javobingizni yuboring.');
        button.textContent = '●'; button.classList.remove('recording');
        stream.getTracks().forEach(track => track.stop());
      };
      recorder.start();
      status.textContent = t('Yozilmoqda… tugatish uchun tugmani bosing.');
      button.textContent = '■'; button.classList.add('recording');
    } catch {
      status.textContent = t('Mikrofondan foydalanishga ruxsat bering va qayta urinib ko‘ring.');
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const result = document.querySelector('#testResult');
    if (!recordedBlob) {
      result.innerHTML = `<strong>${t('Audio yozuv topilmadi.')}</strong><br>${t('Avval mikrofon tugmasi orqali javobingizni yozib oling.')}`;
      result.classList.add('show'); result.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const submitButton = form.querySelector('.submit-test'); if (submitButton) submitButton.disabled = true;
    const promptsText = [...form.querySelectorAll('.writing-prompt')].map(el => el.textContent.trim()).join(' ');

    if (gradingMode() === 'teacher') {
      try {
        const audioDataUrl = await blobToDataUrl(recordedBlob);
        await savePendingSubmission('Gapirish', 10, { audioDataUrl, prompts: promptsText, submittedAt: new Date().toISOString() });
        result.innerHTML = `<strong>${t('Javobingiz ustozga yuborildi.')}</strong><br>${t('Ustoz tekshirgach, natija profilingizda ko‘rinadi.')} <span class="redirect-note">${t('2 soniyadan so‘ng bosh sahifaga o‘tasiz…')}</span>`;
        result.classList.add('show'); result.scrollIntoView({ behavior: 'smooth', block: 'center' });
        returnToDashboardSoon();
      } catch {
        result.innerHTML = `<strong>${t('Xatolik yuz berdi, qayta urinib ko‘ring.')}</strong>`;
        result.classList.add('show');
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
      return;
    }

    result.innerHTML = `<strong>${t('AI javobingizni tekshirmoqda…')}</strong>`;
    result.classList.add('show'); result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const formData = new FormData();
    formData.append('audio', recordedBlob, 'javob.webm');
    formData.append('prompts', promptsText);
    try {
      const response = await fetch('/api/grade-speaking', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('server-error');
      const data = await response.json();
      await storeResult('Gapirish', data.score, data.maxScore, data.comment || '');
      result.innerHTML = `<strong>${t('Diagnostika yakunlandi.')} ${data.score}/${data.maxScore}</strong><br>${escapeHtml(data.comment || '')} <span class="redirect-note">${t('2 soniyadan so‘ng bosh sahifaga o‘tasiz…')}</span>`;
      returnToDashboardSoon();
    } catch (err) {
      try {
        const audioDataUrl = await blobToDataUrl(recordedBlob);
        await savePendingSubmission('Gapirish', 10, { audioDataUrl, prompts: promptsText, submittedAt: new Date().toISOString() });
      } catch { }
      result.innerHTML = `<strong>${t('AI tekshiruvida xatolik yuz berdi.')}</strong><br>${t('Javobingiz saqlandi, o‘qituvchi tomonidan tekshiriladi.')}`;
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function pdfSafe(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[‘’]/g, "'").replace(/[^\x20-\x7E]/g, '?').replace(/[\\()]/g, '\\$&'); }
function makePdf(student) {
  const results = TEST_ORDER.map(test => student.results[test.key]);
  const stream = [
    'q', '0.98 0.97 0.94 rg', '0 0 595 842 re f',
    '0.11 0.20 0.28 rg', '0 670 595 172 re f',
    '0.77 0.58 0.22 rg', '0 670 595 6 re f',
    'BT', '/F2 27 Tf', '1 1 1 rg', '57 774 Td', '(ANOR SCHOOL) Tj',
    '/F1 11 Tf', '0 -23 Td', '0.91 0.79 0.48 rg', '(ARABIC LANGUAGE DIAGNOSTIC REPORT) Tj',
    '/F1 10 Tf', '0 -48 Td', '1 1 1 rg', `(Student: ${pdfSafe(student.fullName)}) Tj`,
    '0 -17 Td', `(Class: ${pdfSafe(student.schoolClass)}) Tj`,
    '255 17 Td', `(Date: ${new Date().toLocaleDateString('en-CA')}) Tj`, 'ET',
    '0.11 0.20 0.28 rg', 'BT', '/F2 18 Tf', '57 625 Td', '(Assessment summary) Tj',
    '/F1 10 Tf', '0 -18 Td', '0.35 0.40 0.42 rg', '(Results from the completed Arabic language diagnostic.) Tj', 'ET',
    '0.11 0.20 0.28 rg', '57 556 481 34 re f',
    'BT', '/F2 10 Tf', '1 1 1 rg', '73 569 Td', '(SKILL) Tj', '315 0 Td', '(RESULT) Tj', 'ET'
  ];
  results.forEach((result, index) => {
    const y = 512 - index * 48; const fill = index % 2 === 0 ? '0.94 0.94 0.91' : '0.98 0.97 0.94';
    const score = result.pending ? 'Teacher review pending' : `${result.score} / ${result.total}`;
    stream.push(fill + ' rg', `57 ${y} 481 47 re f`, '0.77 0.58 0.22 rg', `57 ${y} 5 47 re f`,
      '0.13 0.22 0.29 rg', 'BT', '/F2 12 Tf', `75 ${y + 19} Td`, `(${pdfSafe(TEST_ORDER[index].label)}) Tj`, '/F1 9 Tf', '0 -13 Td', `(Arabic language skill ${index + 1}) Tj`, 'ET',
      '0.13 0.22 0.29 rg', 'BT', '/F2 12 Tf', `378 ${y + 18} Td`, `(${pdfSafe(score)}) Tj`, 'ET');
  });
  stream.push('0.77 0.58 0.22 rg', '57 234 481 1 re f',
    '0.13 0.22 0.29 rg', 'BT', '/F2 11 Tf', '57 204 Td', '(Teacher review) Tj',
    '/F1 9 Tf', '0 -15 Td', '0.35 0.40 0.42 rg', '(Writing and speaking scores are confirmed after teacher review.) Tj',
    '0.13 0.22 0.29 rg', '0 -105 Td', '(ANOR INTERNATIONAL SCHOOL) Tj',
    '0.35 0.40 0.42 rg', '0 -14 Td', '(Arabic Language Programme - Student Assessment Report) Tj', 'ET', 'Q');
  const content = stream.join('\n');
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>', `<< /Length ${content.length} >>\nstream\n${content}\nendstream`, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'];
  let pdf = '%PDF-1.4\n'; const offsets = [0]; objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; }); const xref = pdf.length; pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}
function makeAndDownloadPdf(student) { const url = URL.createObjectURL(makePdf(student)); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `Anor-School-natija-${student.fullName.replace(/[^a-z0-9]+/gi, '-')}.pdf`; anchor.click(); URL.revokeObjectURL(url); }
async function sendPdfToTelegram(student, button) {
  const originalLabel = button.textContent;
  button.disabled = true; button.textContent = t('Yuborilmoqda…');
  try {
    const blob = makePdf(student);
    const formData = new FormData();
    formData.append('pdf', blob, `Anor-School-natija-${student.fullName.replace(/[^a-z0-9]+/gi, '-')}.pdf`);
    formData.append('filename', `Anor-School-natija-${student.fullName.replace(/[^a-z0-9]+/gi, '-')}.pdf`);
    formData.append('caption', `${student.fullName} — ${student.schoolClass} ${t('sinf')}\n${t('Arab tili diagnostikasi natijasi')}`);
    const response = await fetch('/api/send-telegram', { method: 'POST', body: formData });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.error || 'error');
    button.textContent = t('Yuborildi ✓');
    window.setTimeout(() => { button.textContent = originalLabel; button.disabled = false; }, 2500);
  } catch (err) {
    alert(`${t('Telegramga yuborishda xatolik yuz berdi.')}${err.message ? ` (${err.message})` : ''}`);
    button.textContent = originalLabel; button.disabled = false;
  }
}
function downloadResultPdf() { const student = currentStudent(); if (!student || !TEST_ORDER.every(test => isComplete(student, test) && !student.results[test.key].pending)) return; makeAndDownloadPdf(student); }

async function resetDiagnostic() {
  const student = currentStudent(); if (!student) return;
  try { const updated = await apiPost(`/api/students/${student.id}/reset`, {}); cacheStudent(updated); localStorage.setItem(SESSION, JSON.stringify(updated)); await showDashboard(); }
  catch { alert(t('Yangi testni boshlash uchun avval ustoz natijalarni tekshirib, Telegramga yuborishini kuting.')); }
}

let dashboardPollTimer = null;
function startDashboardPolling() {
  if (dashboardPollTimer) return;
  dashboardPollTimer = window.setInterval(() => { if (currentStudent()?.role !== 'admin') showDashboard(); else renderTeacherDashboard(); }, 8000);
}

function setupAdminSettings() {
  const form = document.querySelector('#adminSettingsForm');
  const message = document.querySelector('#adminSettingsMessage');
  if (!form) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const { currentPassword, newUsername, newPassword } = Object.fromEntries(new FormData(form));
    try {
      const data = await apiPost('/api/admin/credentials', { currentPassword, newUsername, newPassword });
      const current = currentStudent(); if (current?.role === 'admin') localStorage.setItem(SESSION, JSON.stringify({ ...current, fullName: data.username }));
      form.reset(); if (message) { message.textContent = t('Ma’lumotlar yangilandi.'); message.classList.add('success'); }
    } catch (error) {
      const key = error.code === 'invalid-password' ? 'Joriy parol noto‘g‘ri.' : error.code === 'duplicate-username' ? 'Bu login nomi band, boshqasini tanlang.' : error.code === 'password-too-short' ? 'Parol kamida 4 ta belgidan iborat bo‘lishi kerak.' : 'Xatolik yuz berdi, qayta urinib ko‘ring.';
      if (message) { message.textContent = t(key); message.classList.remove('success'); }
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.toggle('lang-ru', currentLanguage() === 'ru');
  await refreshServerCache();
  protectTestPage(); setupLanguageSwitch(); renderDynamicTest(); addClassOptions(); await showDashboard(); setupQuestionManager(); setupAdminSettings(); translatePage(); startDashboardPolling();
  document.querySelectorAll('.test-card').forEach(card => card.addEventListener('click', event => { if (card.classList.contains('is-locked')) { event.preventDefault(); alert(card.classList.contains('is-complete-locked') ? t('Yangi testni boshlash uchun avval natijalar oynasidagi × belgisini bosing.') : t('Avval ochiq turgan testni yakunlang.')); } }));
  document.querySelector('#registerForm')?.addEventListener('submit', async event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); try { const student = await apiPost('/api/register', data); cacheStudent(student); localStorage.setItem(SESSION, JSON.stringify(student)); setMessage(t('Profil yaratildi. Xush kelibsiz!'), true); await showDashboard(); } catch (error) { setMessage(t(error.code === 'admin-reserved' ? '“admin” nomi faqat o‘qituvchi paneli uchun ajratilgan.' : error.code === 'duplicate' ? 'Bu ism va sinf bilan profil allaqachon mavjud. Kirish bo‘limidan foydalaning.' : 'Xatolik yuz berdi, qayta urinib ko‘ring.')); } });
  document.querySelector('#loginForm')?.addEventListener('submit', async event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); try { const admin = await apiPost('/api/admin/login', { username: data.fullName.trim(), password: data.password }); localStorage.setItem(SESSION, JSON.stringify({ id: 'teacher-admin', fullName: admin.username, role: 'admin' })); await showDashboard(); } catch (adminError) { try { const student = await apiPost('/api/login', data); cacheStudent(student); localStorage.setItem(SESSION, JSON.stringify(student)); setMessage(t('Kirish muvaffaqiyatli.'), true); await showDashboard(); } catch { setMessage(t('Ism familiya yoki parol noto‘g‘ri.')); } } });
  document.querySelector('#logoutButton')?.addEventListener('click', () => { localStorage.removeItem(SESSION); window.location.reload(); });
  document.querySelector('#downloadPdf')?.addEventListener('click', downloadResultPdf);
  document.querySelector('#resetResults')?.addEventListener('click', resetDiagnostic);
  document.querySelectorAll('.play-audio').forEach(button => button.addEventListener('click', () => speakArabic(button)));
  setUpChoiceTest(document.body.dataset.section); setupWriting(); setupSpeaking();
});
