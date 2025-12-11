// Basic quiz data (you can replace with your own)
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Charles Dickens", "Homer", "Tolstoy"],
        answer: "Shakespeare"
    }
];

let currentIndex = 0;
let score = 0;

const startBtn = document.querySelector(".btn-primary");
const heroSection = document.querySelector(".hero");
const quizContainer = document.createElement("div");

// Add basic style class
quizContainer.classList.add("quiz-box");

// Start Quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    heroSection.style.display = "none";
    document.body.appendChild(quizContainer);
    loadQuestion();
}

function loadQuestion() {
    const current = quizData[currentIndex];
    
    quizContainer.innerHTML = `
        <div class="question-title">${current.question}</div>
        <div class="options">
            ${current.options.map(option => `
                <button class="option-btn">${option}</button>
            `).join("")}
        </div>
    `;

    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => checkAnswer(btn.innerText));
    });
}

function checkAnswer(selected) {
    const correct = quizData[currentIndex].answer;

    if (selected === correct) score++;

    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.innerHTML = `
        <h2>Your Score: ${score} / ${quizData.length}</h2>
        <button class="restart-btn">Restart Quiz</button>
    `;

    document.querySelector(".restart-btn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    score = 0;
    currentIndex = 0;
    startQuiz();
}
