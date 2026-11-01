let questions = [
    {
        question: "（暖身題）我們可以以臺灣人身份申請下列哪一國際組織？",
        options: ["UNDP", "WHO", "WTO", "WHAT"],
        answer: 2,
        explanation: "有台灣人在 WTO 工作！"
    },
    {
        question: "（暖身題）以下何者為臺灣目前在 WTO 中的稱呼？",
        options: ["中華民國", "中華民國台灣", "中國台灣", "臺灣、澎湖、金門、馬祖個別關稅領域"],
        answer: 3,
        explanation: "WTO 是以經濟體為單位，不是以國家為單位。"
    },
    {
        question: "（暖身題）臺灣目前是哪些國際組織的成員？",
        options: ["FFTC, Global Coalition to Defeat ISIS, IATTC", "OECD, NATO, RATP", "OSCE, IOM, Eurovision", "BRICS, ILO, MLB"],
        answer: 0,
        explanation: "FFTC、IATTC、全球反 ISIS 聯盟都是臺灣有參與的組織！"
    },
    {
        question: "收到聯合國實習錄取好開心，但主管說臺灣人無法入職，我該？",
        options: ["抗議：Stateless！", "抗議：違反人權！", "拍拍屁股，自認倒霉"],
        answer: 2,
        explanation: "經驗分享：最後選擇轉向其他機會。"
    },
    {
        question: "聯合國錄取了，但填資料時國籍只能填 China，否則會被取消？",
        options: ["填 China 入職", "Offer 被收回"],
        answer: 1,
        explanation: "經驗分享：沒有中國護照，無法完成入職程序。"
    },
    {
        question: "我填了 Taiwan, Republic of China_____ 這樣比較保險？",
        options: ["還是不行", "那就沒問題", "應該沒問題"],
        answer: 2,
        explanation: "經驗分享：有時是可行的，但沒保證。"
    },
    {
        question: "馬來西亞駐台辦事處拿到的入職證明上寫我國籍是 China，我應該？",
        options: ["寫信吵架", "解釋給辦事處聽", "回家拜拜"],
        answer: 2,
        explanation: "經驗分享：過去案例選擇“只能祈求平安順利”。"
    },
    {
        question: "擔任聯合國顧問合約快到期，主管要幫升職成 Staff，我該？",
        options: ["當然升職啊！", "繼續顧問，不麻煩主管"],
        answer: 1,
        explanation: "經驗分享：升職可能需要通報總部，被發現是台灣人會出問題。"
    },
    {
        question: "收到回覆：你表現很好，但台灣不被承認。你會？",
        options: ["理性解釋爭取", "寫信罵人", "假裝中國公民"],
        answer: 0,
        explanation: "經驗分享：他選擇耐心解釋。"
    }
];

let score = 0;
let currentQuestion = -1;
let showExplanation = false;
let stars = [];

function setup() {
    createCanvas(800, 600);
    textAlign(CENTER, CENTER);
    textSize(20);

    for (let i = 0; i < 50; i++) {
        stars.push({ x: random(width), y: random(height), size: random(2, 6) });
    }
}

function draw() {
    background(30);

    // Render stars in the background
    for (let s of stars) {
        fill(255, 255, 100);
        ellipse(s.x, s.y, s.size);
        s.y += random(0.5, 1.5);
        if (s.y > height) s.y = 0;
    }

    // Handle different states of the game
    if (currentQuestion === -1) {
        showIntro(); // Show the intro screen
    } else if (currentQuestion >= 0 && currentQuestion < questions.length) {
        showQuestion(); // Show the question and options
    } else if (currentQuestion >= questions.length) {
        showResult(); // Show the result screen
    }
}

function showIntro() {
    fill(255);
    textSize(24);
    text("🌟 歡迎來到《臺灣人與國際組織》互動問答遊戲！", width / 2, height / 2 - 80);
    textSize(18);
    text("前面是暖身題，後面是講者真實經歷改編的問答：\n\n就是除了暖身題以外的題目都沒有遇到這些情況的「正確答案」，\n只是邀請大家猜猜看我們講者親身的經歷！", width / 2, height / 2 + 20);
    textSize(16);
    text("👉 點一下開始遊戲", width / 2, height - 60);
}

function showQuestion() {
    let q = questions[currentQuestion];

    fill(255);
    textSize(20);
    text(q.question, width / 2, 100);

    for (let i = 0; i < q.options.length; i++) {
        let x = width / 2;
        let y = 180 + i * 60;

        if (!showExplanation) {
            if (mouseX > x - 220 && mouseX < x + 220 && mouseY > y - 20 && mouseY < y + 20) { // Slightly increased width
                fill(255, 180, 100);
            } else {
                fill(200);
            }
        } else {
            fill(i === q.answer ? 'lightgreen' : 100);
        }

        rect(x - 220, y - 20, 440, 40, 10); // Slightly increased width
        fill(0);
        text(q.options[i], x, y);
    }
    if (showExplanation) {
        fill(255);
        text(q.explanation, width / 2, height *0.8);
    }
}

function showResult() {
    let resultText = "";

    if (score >= 8) {
        resultText = "🌟 你很了解台灣與國際事務熟悉！";
    } else if (score >= 5) {
        resultText = "😊 你對台灣的國際挑戰有一定了解！";
    } else {
        resultText = "🤔 我們一起繼續學習更多台灣的故事！";
    }

    fill(255);
    textSize(24);
    text(resultText, width / 2, height / 2);
}

function mousePressed() {
    if (currentQuestion === -1) {
        currentQuestion = 0; // Start the game
        return;
    }

    if (showExplanation) {
        return; // Do nothing if explanation is being shown        
    }

    if (currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        for (let i = 0; i < q.options.length; i++) {
            let x = width / 2;
            let y = 180 + i * 60;

            // Check if the user clicked on an option
            if (mouseX > x - 220 && mouseX < x + 220 && mouseY > y - 20 && mouseY < y + 20) {
                if (i === q.answer) score++; // Increment score if the answer is correct
                showExplanation = true; // Show explanation
                setTimeout(() => {
                    currentQuestion++; // Move to the next question
                    showExplanation = false; // Reset explanation state
                }, 3500); // Wait 2.5 seconds before moving to the next question
                break;
            }
        }
    }
}
