const quizData = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "J.K. Rowling", correct: false },
            { text: "George Orwell", correct: false },
            { text: "Ernest Hemingway", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const resultElement = document.getElementById('result');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(quizData[currentQuestionIndex]);
    nextButton.classList.add('hide');
    resultElement.classList.add('hide');
    resetTimer();
    startTimer();
}

function showQuestion(questionData) {
    resetState();
    questionElement.innerText = questionData.question;
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    clearInterval(timerInterval);
    if (quizData.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(quizData[currentQuestionIndex]);
    resetTimer();
    startTimer();
});

function resetTimer() {
    timeLeft = 10;
    timerElement.innerText = timeLeft;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer({ target: {} });  // Move to next question if time runs out
        }
    }, 1000);
}

function showResult() {
    questionContainer.classList.add('hide');
    resultElement.classList.remove('hide');
    resultElement.innerText = `Quiz finished! You scored ${score} out of ${quizData.length}.`;
}

startQuiz();
