const questions = [
    {
        question: "What is the capital city of Taiwan?",
        options: ["Kaohsiung", "Taipei", "Taichung", "Tainan"],
        answer: 1
    },
    {
        question: "Which famous mountain is the highest in Taiwan?",
        options: ["Alishan", "Hehuanshan", "Yushan", "Jade Mountain"],
        answer: 2
    },
    {
        question: "What is the official language of Taiwan?",
        options: ["Hakka", "Mandarin", "Taiwanese Hokkien", "Cantonese"],
        answer: 1
    },
    {
        question: "Which traditional food is famous in Taiwan?",
        options: ["Pho", "Kimchi", "Bubble Tea", "Sushi"],
        answer: 2
    },
    {
        question: "Which Taiwanese city is famous for its night markets?",
        options: ["Hsinchu", "Kaohsiung", "Taipei", "Taitung"],
        answer: 2
    }
];

let score = 0;
let currentQuestion = 0;

function startGame() {
    score = 0;
    currentQuestion = 0;
    document.getElementById("result").innerText = "";
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById("question").innerText = q.question;
        const buttons = document.getElementById("options");
        buttons.innerHTML = "";
        
        q.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.onclick = () => checkAnswer(index);
            buttons.appendChild(button);
        });
    } else {
        showResult();
    }
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    showQuestion();
}

function showResult() {
    let resultText = "";
    
    if (score === 5) {
        resultText = "🌟 Taiwan Expert! You know Taiwan very well!";
    } else if (score >= 3) {
        resultText = "😊 Taiwan Enthusiast! You know quite a bit about Taiwan!";
    } else {
        resultText = "🤔 Keep Learning! There's still more to explore about Taiwan!";
    }

    document.getElementById("result").innerText = resultText;
}

// Start game on load
window.onload = startGame;
