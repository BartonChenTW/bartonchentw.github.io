let questions = [
    {
        question: "（暖身題）我們可以以臺灣人身份申請下列哪一國際組織？",
        options: ["UNDP", "WHO", "WTO", "WHAT"],
        answer: 2,
        explanation: "有台灣人在WTO工作，例如Jessica。"
    },
    {
        question: "（暖身題）以下何者為臺灣目前在世界貿易組織(WTO)中的稱呼？",
        options: ["中華民國", "中華民國台灣", "中國台灣", "臺灣、澎湖、金門、馬祖個別關稅領域"],
        answer: 3,
        explanation: "WTO的會員是以經濟體為單位，而非主權國家，因此臺灣能以此名稱加入。"
    },
    {
        question: "（暖身題）臺灣目前是哪些國際組織的成員？",
        options: ["FFTC, Global Coalition to Defeat ISIS, IATTC", "OECD, NATO, RATP", "OSCE, IOM, Eurovision", "BRICS, ILO, MLB"],
        answer: 0,
        explanation: "臺灣是FFTC、Global Coalition to Defeat ISIS與IATTC的成員。"
    },
    {
        question: "收到聯合國實習錄取好開心，結果主管說臺灣人無法入職，我該：",
        options: ["抗議不公，人家是Stateless", "抗議不公，這樣根本違反人權", "拍拍屁股，自認倒霉去申請其他機會"],
        answer: 2,
        explanation: "這是真實經歷，講者會進一步說明。"
    },
    {
        question: "入職資料要求填國籍，該填China以避免offer被收回嗎？",
        options: ["委屈得以求全，順利入職", "Offer慘遭收回"],
        answer: 1,
        explanation: "因為無法提供中華人民共和國護照。Cue 欣妍。"
    },
    {
        question: "為了保險起見，填Taiwan, Republic of China_____"," +
          "
        options: ["還是不行sorry", "那就沒問題", "應該沒問題"],
        answer: 2,
        explanation: "以峰懋在UNOG實習經驗為例，他使用台灣護照入職。Cue 昱翔。"
    },
    {
        question: "馬來西亞駐台辦事處申請簽證時發現國籍寫China，我該：",
        options: ["寫信跟聯合國吵架", "跟馬來西亞駐台辦事處解釋", "回家去跟城隍爺拜拜"],
        answer: 2,
        explanation: "講者實際經驗分享。Cue 陳霓。"
    },
    {
        question: "顧問合約快到期，主管想幫升為正式Staff，我會：",
        options: ["啊我當然要拿合約要不然？", "沒關係我繼續拿顧問的合約也很好不用麻煩"],
        answer: 1,
        explanation: "正式合約需通報總部，可能被發現台灣人身份。Cue 昱翔與Jack。"
    },
    {
        question: "聯合國面試後來信說台灣不是會員國，要我確認是否為會員國公民，我：",
        options: ["委屈巴巴拭淚理性解釋爭取", "義憤填膺寫信控訴罵人", "走投無路回覆我是中國公民並提供台胞證"],
        answer: 0,
        explanation: "這是講者家瑋的經驗。"
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
        if (showExplanation) {
            showAnswerExplanation();
        } else {
            showQuestion();
        }
    } else {
        showResult();
    }
}

function showIntro() {
    fill(255);
    textSize(24);
    text("歡迎參加台灣國際參與小測驗！", width / 2, 200);
    textSize(18);
    text("本遊戲將帶你了解臺灣人參與國際組織的挑戰與趣事。", width / 2, 250);
    text("特別提醒：除了暖身題以外的題目都沒有遇到這些情況的『正確答案』，", width / 2, 300);
    text("只是邀請大家猜猜看我們講者親身的經歷！", width / 2, 330);
    text("點擊任意處開始遊戲。", width / 2, 400);
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

function showAnswerExplanation() {
    let q = questions[currentQuestion];
    fill(255);
    textSize(20);
    text("正確答案：" + q.options[q.answer], width / 2, 200);
    text("說明：" + q.explanation, width / 2, 250, 600);
    text("點擊任意處繼續下一題。", width / 2, 350);
}

function showResult() {
    let resultText = "";

    if (score === questions.length) {
        resultText = "🌟 Taiwan Expert! You know Taiwan very well!";
    } else if (score >= questions.length * 0.6) {
        resultText = "😊 Taiwan Enthusiast! You know quite a bit about Taiwan!";
    } else {
        resultText = "🤔 Keep Learning! There's still more to explore about Taiwan!";
    }

    fill(255);
    textSize(24);
    text(resultText, width / 2, height / 2);
}

function mousePressed() {
    if (currentQuestion === -1) {
        currentQuestion = 0;
    } else if (currentQuestion < questions.length) {
        if (showExplanation) {
            currentQuestion++;
            showExplanation = false;
        } else {
            for (let i = 0; i < questions[currentQuestion].options.length; i++) {
                let x = width / 2;
                let y = 200 + i * 60;

                if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
                    if (i === questions[currentQuestion].answer) {
                        score++;
                    }
                    showExplanation = true;
                    break;
                }
            }
        }
    }
}
