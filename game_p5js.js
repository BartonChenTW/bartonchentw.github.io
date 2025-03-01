// from ChatGPT

let questions = [
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
let stars = [];

function setup() {
    createCanvas(800, 600);
    textAlign(CENTER, CENTER);
    textSize(20);

    // Generate stars
    for (let i = 0; i < 50; i++) {
        stars.push({ x: random(width), y: random(height), size: random(2, 6) });
    }
}

function draw() {
    background(30);

    // Draw animated stars
    for (let s of stars) {
        fill(255, 255, 100);
        ellipse(s.x, s.y, s.size);
        s.y += random(0.5, 1.5);
        if (s.y > height) s.y = 0;
    }

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showQuestion() {
    let q = questions[currentQuestion];

    fill(255);
    text(q.question, width / 2, 100);

    for (let i = 0; i < q.options.length; i++) {
        let x = width / 2;
        let y = 200 + i * 60;

        if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
            fill(255, 180, 100);
        } else {
            fill(200);
        }
        rect(x - 100, y - 20, 200, 40, 10);
        fill(0);
        text(q.options[i], x, y);
    }
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

    fill(255);
    textSize(24);
    text(resultText, width / 2, height / 2);
}

function mousePressed() {
    if (currentQuestion < questions.length) {
        for (let i = 0; i < questions[currentQuestion].options.length; i++) {
            let x = width / 2;
            let y = 200 + i * 60;

            if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
                if (i === questions[currentQuestion].answer) {
                    score++;
                }
                currentQuestion++;
                break;
            }
        }
    }
}
