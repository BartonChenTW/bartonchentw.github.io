let questions = [
    {
        question: "（暖身題）我們可以以臺灣人身份申請下列哪一國際組織？",
        options: ["UNDP", "WHO", "WTO", "WHAT"],
        answer: 2,
        explanation: "✅ 正解是 WTO：有台灣人在WTO工作，例如 Jessica。"
    },
    {
        question: "（暖身題）以下何者為臺灣目前在世界貿易組織(WTO)中的稱呼？",
        options: ["中華民國", "中華民國台灣", "中國台灣", "臺灣、澎湖、金門、馬祖個別關稅領域"],
        answer: 3,
        explanation: "✅ 正解是 D：因為WTO的會員是經濟體而不是主權國家。"
    },
    {
        question: "（暖身題）臺灣目前是哪些國際組織的成員？",
        options: [
            "FFTC, Global Coalition to Defeat ISIS, IATTC",
            "OECD, NATO, RATP",
            "OSCE, IOM, Eurovision",
            "BRICS, ILO, MLB"
        ],
        answer: 0,
        explanation: "✅ 正解是 A：我們是 FFTC、反制ISIS聯盟、IATTC 的成員。"
    },
    {
        question: "收到聯合國實習錄取卻被告知臺灣人無法入職，這時我該：",
        options: [
            "抗議不公，人家是Stateless",
            "抗議不公，這樣根本違反人權",
            "拍拍屁股，自認倒楣去申請其他機會"
        ],
        answer: 2,
        explanation: "✅ 正解是 C：這是現實狀況，講者會分享經驗。"
    },
    {
        question: "聯合國要求填國籍，應該填China以免Offer被收回？",
        options: ["委屈求全填China", "Offer會被收回"],
        answer: 1,
        explanation: "✅ 正解是 B：我們拿不出中國護照，會被取消錄取。"
    },
    {
        question: "為保險起見，填Taiwan, Republic of China_____:",
        options: [
            "還是不行sorry",
            "那就沒問題",
            "應該沒問題"
        ],
        answer: 2,
        explanation: "✅ 正解是 C：根據UNOG實習者經驗，有時可以。"
    },
    {
        question: "馬來西亞駐台辦事處給的入職證明上把我國籍寫China，這時我會：",
        options: [
            "寫信跟聯合國吵架",
            "跟馬來西亞駐台辦事處解釋",
            "回家去跟城隍爺拜拜"
        ],
        answer: 2,
        explanation: "✅ 正解是 C：講者會解釋，心平氣和處理。"
    },
    {
        question: "主管想幫你升職為Staff合約，你會：",
        options: [
            "啊我當然要拿合約要不然？",
            "沒關係我繼續拿顧問的合約也很好"
        ],
        answer: 1,
        explanation: "✅ 正解是 B：正式合約須送總部，風險高。"
    },
    {
        question: "收到回覆：你表現很棒，但請確認是否有聯合國會員國國籍。",
        options: [
            "委屈巴巴拭淚理性解釋爭取",
            "義憤填膺寫信控訴罵人",
            "走投無路回覆是中國公民並提供台胞證"
        ],
        answer: 0,
        explanation: "✅ 正解是 A：保持冷靜，理性回覆是關鍵。"
    }
];

let score = 0;
let currentQuestion = -1;
let stars = [];
let showExplanation = false;

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

    for (let s of stars) {
        fill(255, 255, 100);
        ellipse(s.x, s.y, s.size);
        s.y += random(0.5, 1.5);
        if (s.y > height) s.y = 0;
    }

    if (currentQuestion === -1) {
        showIntro();
    } else if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showIntro() {
    fill(255);
    textSize(24);
    text("台灣與國際參與小測驗", width / 2, height / 2 - 40);
    textSize(18);
    text("點擊畫面開始！", width / 2, height / 2 + 10);
    textSize(16);
    text("就是除了暖身題以外的題目都沒有遇到這些情況的「正確答案」，\n只是邀請大家猜猜看我們講者親身的經歷。", width / 2, height / 2 + 80, 600);
}

function showQuestion() {
    let q = questions[currentQuestion];

    fill(255);
    textSize(20);
    text(q.question, width / 2, 80);

    for (let i = 0; i < q.options.length; i++) {
        let x = width / 2;
        let y = 180 + i * 60;

        if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
            fill(255, 180, 100);
        } else {
            fill(200);
        }
        rect(x - 100, y - 20, 200, 40, 10);
        fill(0);
        text(q.options[i], x, y);
    }

    if (showExplanation) {
        fill(255);
        textSize(16);
        text(q.explanation, width / 2, height - 60, 700);
    }
}

function showResult() {
    let resultText = "";

    if (score === questions.length) {
        resultText = "🌟 台灣參與國際專家！你太厲害了！";
    } else if (score >= questions.length / 2) {
        resultText = "😊 台灣參與國際知識不錯！";
    } else {
        resultText = "🤔 繼續努力～ 還有很多可以學的喔！";
    }

    fill(255);
    textSize(24);
    text(resultText, width / 2, height / 2);
}

function mousePressed() {
    if (currentQuestion === -1) {
        currentQuestion = 0;
        return;
    }

    if (showExplanation) {
        currentQuestion++;
        showExplanation = false;
        return;
    }

    if (currentQuestion < questions.length) {
        let q = questions[currentQuestion];
        for (let i = 0; i < q.options.length; i++) {
            let x = width / 2;
            let y = 180 + i * 60;

            if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
                if (i === q.answer) score++;
                showExplanation = true;
                break;
            }
        }
    }
}
