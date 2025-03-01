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
let selectedOption = -1;
let showFeedback = false;
let feedbackTimer = 0;

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
        if (showFeedback) {
            displayFeedback();
            feedbackTimer++;
            if (feedbackTimer > 60) {  // About 1 second at 60fps
                showFeedback = false;
                feedbackTimer = 0;
                currentQuestion++;
                selectedOption = -1;
            }
        }
    } else {
        showResult();
    }
}

function showQuestion() {
    fill(255);
    textSize(28);
    text(questions[currentQuestion].question, width/2, height/4);
    
    textSize(20);
    let optionHeight = height/2;
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
        let y = optionHeight + i * 60;
        
        // Draw option button
        if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && 
            mouseY > y - 25 && mouseY < y + 25) {
            fill(100, 100, 255, 100);  // Highlight when hovering
        } else if (selectedOption === i) {
            fill(100, 100, 255, 200);  // Selected option
        } else {
            fill(70, 70, 150, 100);
        }
        
        rect(width/2 - 200, y - 25, 400, 50, 10);
        
        // Draw option text
        fill(255);
        text(questions[currentQuestion].options[i], width/2, y);
    }
}

function displayFeedback() {
    textSize(24);
    if (selectedOption === questions[currentQuestion].answer) {
        fill(0, 255, 0);
        text("Correct!", width/2, height - 100);
    } else {
        fill(255, 0, 0);
        text("Incorrect. The correct answer is: " + 
             questions[currentQuestion].options[questions[currentQuestion].answer], 
             width/2, height - 100);
    }
}

function showResult() {
    fill(255);
    textSize(32);
    text("Quiz Complete!", width/2, height/3);
    
    textSize(28);
    text("Your score: " + score + " / " + questions.length, width/2, height/2);
    
    textSize(22);
    text("Click anywhere to try again", width/2, height * 2/3);
}

function mousePressed() {
    if (currentQuestion < questions.length && !showFeedback) {
        let optionHeight = height/2;
        for (let i = 0; i < questions[currentQuestion].options.length; i++) {
            let y = optionHeight + i * 60;
            
            if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && 
                mouseY > y - 25 && mouseY < y + 25) {
                selectedOption = i;
                showFeedback = true;
                
                if (selectedOption === questions[currentQuestion].answer) {
                    score++;
                }
                return;
            }
        }
    } else if (currentQuestion >= questions.length) {
        // Reset the game
        currentQuestion = 0;
        score = 0;
        selectedOption = -1;
    }
}
