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
