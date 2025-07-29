// script.js (Полная версия с кнопкой "Поделиться")

document.addEventListener('DOMContentLoaded', () => {

    // Сначала проверяем, что скрипт запущен внутри Telegram
    if (typeof window.Telegram === 'undefined' || !window.Telegram.WebApp) {
        console.error("Это приложение предназначено для запуска внутри Telegram.");
        document.body.innerHTML = `<div style="text-align:center; padding: 40px; font-family: sans-serif;"><h1>Ошибка</h1><p>Пожалуйста, откройте это приложение внутри Telegram.</p></div>`;
        return;
    }

    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // --- ВАША ПАРТНЕРСКАЯ ССЫЛКА ---
    const PARTNER_LINK = "https://myblogshop.top/r/oKdUJPWx/s";

    // --- ПОИСК ЭЛЕМЕНТОВ DOM ---
    const screens = {
        start: document.getElementById('start-screen'),
        quiz: document.getElementById('quiz-screen'),
        loading: document.getElementById('loading-screen'),
        report: document.getElementById('report-screen')
    };
    const startBtn = document.getElementById('start-btn');
    const buyBtn = document.getElementById('buy-btn');
    const shareBtn = document.getElementById('share-btn'); // <-- Находим новую кнопку
    const questionTextEl = document.getElementById('question-text');
    const answersContainerEl = document.getElementById('answers-container');
    const progressInnerEl = document.getElementById('progress-inner');
    const loadingTextEl = document.getElementById('loading-text');
    
    const userData = {};
    let currentQuestionIndex = 0;
    
    const questions = [
        { key: 'main_goal', text: "Что для тебя самое желанное в преображении тела?", answers: ["Увидеть конкретную цифру на весах", "Чувствовать себя легкой и полной энергии", "С уверенностью носить любую одежду", "Улучшить здоровье и самочувствие"] },
        { key: 'eating_trigger', text: "Что чаще всего заставляет тебя переедать или есть вредное?", answers: ["Настоящий голод", "Стресс или скука", "За компанию с другими", "Просто привычка, 'под сериал'"] },
        { key: 'activity_type', text: "Какой тип активности тебе кажется наиболее приемлемым?", answers: ["Спокойные прогулки или йога", "Короткие, но интенсивные домашние тренировки", "Танцы или активные игры", "Мне сложно заставить себя двигаться"] },
        { key: 'sleep_quality', text: "Как ты себя чувствуешь утром после сна?", answers: ["Отлично, я полон(-на) сил", "Более-менее, но хочется спать еще", "Разбитым(-ой), как будто не спал(а)"] },
        { key: 'water_balance', text: "Сколько чистой воды ты выпиваешь в день?", answers: ["Много, 1.5-2 литра", "Пару стаканов, в основном чай/кофе", "Очень мало, почти не пью"] },
        { key: 'metabolism_feel', text: "Как бы ты описал(а) свой метаболизм?", answers: ["Быстрый, могу есть и не толстеть", "Средний, вес держится, если следить", "Медленный, поправляюсь от всего"] },
        { key: 'stress_reaction', text: "Как ты обычно реагируешь на стрессовые ситуации?", answers: ["Стараюсь отвлечься (прогулка, хобби)", "Тянет на сладкое или вредную еду", "Теряю аппетит", "Раздражаюсь и срываюсь на близких"] },
        { key: 'readiness', text: "Насколько ты готов(а) к изменениям прямо сейчас?", answers: ["На 100%, больше не могу ждать!", "Готов(а), но нужна поддержка", "Сомневаюсь, что у меня получится"] }
    ];

    function showScreen(screenId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        screens[screenId].classList.remove('hidden');
    }

    function showQuestion() {
        // ... (код этой функции не меняется)
        const question = questions[currentQuestionIndex];
        questionTextEl.innerText = question.text;
        answersContainerEl.innerHTML = '';
        question.answers.forEach(answerText => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.innerText = answerText;
            button.addEventListener('click', () => selectAnswer(question.key, answerText));
            answersContainerEl.appendChild(button);
        });
        progressInnerEl.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    }

    function selectAnswer(key, value) {
        // ... (код этой функции не меняется)
        userData[key] = value;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showLoadingScreen();
        }
    }

    function showLoadingScreen() {
        // ... (код этой функции не меняется)
        showScreen('loading');
        const phrases = ["Анализируем пищевые привычки...", "Оцениваем уровень активности...", "Проверяем факторы стресса...", "Составляем твой уникальный Wellness-профиль..."];
        let phraseIndex = 0;
        if (loadingTextEl) loadingTextEl.innerText = phrases[phraseIndex];
        const interval = setInterval(() => {
            phraseIndex++;
            if (phraseIndex < phrases.length) {
                if (loadingTextEl) loadingTextEl.innerText = phrases[phraseIndex];
            } else {
                clearInterval(interval);
                generateReport();
            }
        }, 1200);
    }
    
    function generateReport() {
        // ... (код этой функции не меняется)
        const nutritionText = document.getElementById('nutrition-text');
        const activityText = document.getElementById('activity-text');
        const stressText = document.getElementById('stress-text');
        const nutritionRec = document.getElementById('nutrition-rec');
        const activityRec = document.getElementById('activity-rec');
        if (userData.eating_trigger === "Стресс или скука" || userData.stress_reaction === "Тянет на сладкое или вредную еду") {
            nutritionText.innerHTML = "Твой главный барьер — <strong>эмоциональное переедание.</strong> Ты используешь еду не для утоления голода, а для борьбы со стрессом и скукой. Это ключевая зона для работы.";
            nutritionRec.innerText = "Научись распознавать настоящий голод. Перед тем как что-то съесть, спроси себя: 'Я действительно голоден(на)?'. Ищи альтернативные способы борьбы со стрессом.";
        } else if (userData.metabolism_feel === "Медленный, поправляюсь от всего") {
            nutritionText.innerHTML = "Похоже, твой метаболизм замедлен. Это может быть связано с недостатком движения или несбалансированным питанием. <strong>Хорошая новость — его можно 'разогнать'.</strong>";
            nutritionRec.innerText = "Сосредоточься на белковой пище и достаточном количестве воды. Это основа для ускорения обмена веществ.";
        } else {
            nutritionText.innerHTML = "Твои пищевые привычки в целом осознанные. Главная задача — поддерживать баланс и не допускать срывов из-за внешних факторов.";
            nutritionRec.innerText = "Продолжай следить за качеством еды. Добавь в рацион больше зеленых овощей для улучшения пищеварения.";
        }
        if (userData.activity_type === "Мне сложно заставить себя двигаться") {
            activityText.innerHTML = "Твоя главная сложность — начать двигаться. Отсутствие регулярной активности сильно замедляет метаболизм и снижает уровень энергии. <strong>Даже минимальные изменения дадут быстрый эффект.</strong>";
            activityRec.innerText = "Не думай о 'тренировках'. Начни с цели 20-минутной прогулки каждый день под любимую музыку или подкаст. Это изменит всё.";
        } else {
            activityText.innerHTML = "У тебя есть понимание, какой тип активности тебе нравится, и это отлично! Главное — превратить это в регулярную привычку.";
            activityRec.innerText = "Выбери 2-3 дня в неделю и внеси активность в свой календарь, как важную встречу. Регулярность важнее интенсивности.";
        }
        if (userData.sleep_quality === "Разбитым(-ой), как будто не спал(а)") {
            stressText.innerHTML = "Твой сон — 'красная зона'. Плохое восстановление ночью напрямую влияет на гормоны голода (грелин) и стресса (кортизол), <strong>заставляя тело накапливать жир.</strong>";
        } else if (userData.water_balance === "Очень мало, почти не пью") {
            stressText.innerHTML = "Обезвоживание — скрытый враг. Тело часто путает жажду с голодом, а недостаток воды замедляет все обменные процессы в организме. <strong>Это легко исправить!</strong>";
        } else {
            stressText.innerHTML = "Твое тело получает достаточно ресурсов для восстановления. Это твой мощный фундамент для быстрого и здорового преображения.";
        }
        showScreen('report');
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            showScreen('quiz');
            showQuestion();
        });
    }

    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            const finalLink = `${PARTNER_LINK}?sub1=tg_wellness_quiz`;
            tg.openLink(finalLink);
        });
    }

    // ================== НОВЫЙ ОБРАБОТЧИК ==================
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // !!! ОБЯЗАТЕЛЬНО ЗАМЕНИТЕ 'YourBotUsername' НА ЮЗЕРНЕЙМ ВАШЕГО БОТА !!!
            const botUsername = 'YourBotUsername'; 

            // Этот текст будет вставлен в поле ввода пользователя, когда он выберет, кому отправить
            const queryText = `Привет! 👋 Прошла тут крутой тест, который анализирует образ жизни и дает персональные рекомендации по питанию. Очень интересно, попробуй тоже! 👉 @${botUsername}`;

            // Используем специальный метод для переключения в инлайн-режим с готовым текстом
            // Первый параметр '' означает, что мы ищем во всех чатах
            // Второй параметр - это готовый текст для отправки
            tg.switchInlineQuery(queryText, '');
        });
    }
    // ========================================================

    // --- ИНИЦИАЛИЗАЦИЯ ---
    showScreen('start');
});
