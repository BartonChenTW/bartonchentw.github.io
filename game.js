const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 5 + 7?", answer: "12" },
    { question: "What is the color of the sky on a clear day?", answer: "Blue" }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestionIndex].question;
        document.getElementById("answer").value = "";
    } else {
        endGame();
    }
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    let correctAnswer = questions[currentQuestionIndex].answer;
    
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
    }
    
    currentQuestionIndex++;
    loadQuestion();
}

function endGame() {
    document.getElementById("game").innerHTML = `<h2>Game Over!</h2><p>Your score: ${score}/${questions.length}</p>`;
}
