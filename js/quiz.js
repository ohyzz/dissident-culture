document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startId');
    const centerContent = document.getElementById('centerId');
    const quizContent = document.getElementById('quizId');
    const questions = document.querySelectorAll('.question-block');
    const resultBlock = document.getElementById('resultBlock');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const progress = document.getElementById('progress');
    const scoreElement = document.getElementById('score');
    const resultText = document.getElementById('resultText');
    const backButton = document.getElementById('backId');

    let currentQuestion = 0;
    let score = 0;

    // Инициализация викторины
    function initQuiz() {
        currentQuestion = 0;
        score = 0;

        // Показать первый вопрос
        questions.forEach((question, index) => {
            if (index === 0) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });

        // Сбросить выбранные ответы
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });

        // Обновить кнопки и прогресс
        updateButtons();
        updateProgress();

        // Скрыть результаты
        resultBlock.classList.remove('active');

        // Показать навигацию
        document.querySelector('.navigation').style.display = 'flex';
    }

    // Обновление состояния кнопок
    function updateButtons() {
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее';
    }

    // Обновление прогресс-бара
    function updateProgress() {
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        progress.style.width = `${progressPercent}%`;
    }

    // Проверка ответа на текущем вопросе
    function checkAnswer() {
        const currentOptions = questions[currentQuestion].querySelectorAll('.option');
        let answeredCorrectly = false;

        currentOptions.forEach(option => {
            if (option.classList.contains('selected')) {
                if (option.dataset.correct === 'true') {
                    answeredCorrectly = true;
                }
            }
        });

        return answeredCorrectly;
    }

    // Показать результаты
    function showResults() {
        // Скрыть все вопросы
        questions.forEach(question => {
            question.classList.remove('active');
        });

        // Скрыть навигацию
        document.querySelector('.navigation').style.display = 'none';

        // Показать блок результатов
        resultBlock.classList.add('active');
        scoreElement.textContent = score;

        // Подобрать текст в зависимости от результата
        if (score === 5) {
            resultText.textContent = 'Превосходно! Вы настоящий эксперт в авангардной моде!';
        } else if (score >= 3) {
            resultText.textContent = 'Хороший результат! Вы разбираетесь в авангардной моде.';
        } else {
            resultText.textContent = 'Интересная попытка! Возможно, вам стоит больше узнать об авангардной моде.';
        }
    }

    // Обработчик для кнопки старта
    startBtn.addEventListener('click', function() {
        centerContent.style.opacity = '0';

        setTimeout(function() {
            centerContent.style.display = 'none';
            quizContent.classList.add('active');
            initQuiz();
        }, 1000);
    });

    // Обработчик для кнопки "Назад"
    prevBtn.addEventListener('click', function() {
        if (currentQuestion > 0) {
            // Скрыть текущий вопрос
            questions[currentQuestion].classList.remove('active');

            currentQuestion--;

            // Показать предыдущий вопрос
            questions[currentQuestion].classList.add('active');

            updateButtons();
            updateProgress();
        }
    });

    // Обработчик для кнопки "Далее"
    nextBtn.addEventListener('click', function() {
        // Проверить ответ на текущем вопросе
        if (checkAnswer()) {
            score++;
        }

        if (currentQuestion < questions.length - 1) {
            // Скрыть текущий вопрос
            questions[currentQuestion].classList.remove('active');

            currentQuestion++;

            // Показать следующий вопрос
            questions[currentQuestion].classList.add('active');

            updateButtons();
            updateProgress();
        } else {
            // Если это последний вопрос, показать результаты
            showResults();
        }
    });

    // Обработчик для кнопки "Пройти еще раз"
    restartBtn.addEventListener('click', function() {
        resultBlock.classList.remove('active');
        quizContent.classList.remove('active');
        centerContent.style.display = 'block';

        setTimeout(function() {
            centerContent.style.opacity = '1';
        }, 50);
    });

    // Обработчики для выбора ответов
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            // Снять выделение с других вариантов в этом вопросе
            const parent = this.closest('.question-block');
            parent.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Выделить выбранный вариант
            this.classList.add('selected');
        });
    });

    backButton.addEventListener('click', function() {
        centerContent.style.opacity = '0';

        setTimeout(function() {
            window.location.href = './index.html'

        }, 1000);
    });
});