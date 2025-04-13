// Taiwan Quiz Game with Introduction Page

let questions = [
    {
        question: "（暖身題）我們可以以臺灣人身份申請下列哪一國際組織？",
        options: ["UNDP", "WHO", "WTO", "WHAT"],
        answer: 2
    },
    {
        question: "（暖身題）以下何者為臺灣目前在世界貿易組織(WTO)中的稱呼？",
        options: ["中華民國", "中華民國台灣", "中國台灣", "臺灣、澎湖、金門、馬祖個別關稅領域"],
        answer: 3
    },
    {
        question: "（暖身題）臺灣目前是哪些國際組織的成員？",
        options: [
            "FFTC, Global Coalition to Defeat ISIS, IATTC",
            "OECD, NATO, RATP",
            "OSCE, IOM, Eurovision",
            "BRICS, ILO, MLB"
        ],
        answer: 0
    },
    {
        question: "收到聯合國實習錄取，但主管說臺灣人無法入職，這時我應該：",
        options: [
            "抗議不公，人家是Stateless",
            "抗議不公，這樣根本違反人權",
            "拍拍屁股，自認倒霉去申請其他機會"
        ],
        answer: 2
    },
    {
        question: "入職資料要求填國籍，但臺灣被劃在中國，我應該填China嗎？",
        options: [
            "委屈得以求全，順利入職",
            "Offer慘遭收回"
        ],
        answer: 1
    },
    {
        question: "填了Taiwan, Republic of China_____ 就會沒事嗎？",
        options: [
            "還是不行sorry",
            "那就沒問題",
            "應該沒問題"
        ],
        answer: 2
    },
    {
        question: "申請馬來西亞簽證，發現國籍寫China，我應該：",
        options: [
            "寫信跟聯合國吵架",
            "跟馬來西亞駐台辦事處解釋",
            "回家去跟城隍爺拜拜"
        ],
        answer: 2
    },
    {
        question: "在聯合國當顧問1年，主管說要升職變正式員工，這時我會：",
        options: [
            "啊我當然要拿合約要不然？",
            "沒關係我繼續拿顧問的合約也很好不用麻煩"
        ],
        answer: 1
    },
    {
        question: "收到面試結果肯定，但詢問我是否是聯合國會員國公民，這時我會：",
        options: [
            "委屈巴巴拭淚理性解釋爭取",
            "義憤填膺寫信控訴罵人",
            "走投無路回覆我是中國公民並提供台胞證"
        ],
        answer: 0
    }
];

let score = 0;
let currentQuestion = 0;
let stars = [];
let gameState = "intro"; // intro, quiz, result

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

    if (gameState === "intro") {
        showIntro();
    } else if (gameState === "quiz") {
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            gameState = "result";
        }
    } else if (gameState === "result") {
        showResult();
    }
}

function showIntro() {
    fill(255);
    textSize(28);
    text("🌏 歡迎來到台灣與國際參與知識小測驗 🌏", width / 2, height / 2 - 60);
    textSize(18);
    text("讓我們從幾題暖身題開始，並一窺台灣人在國際組織中的真實處境。", width / 2, height / 2);
    text("點擊畫面任意處開始遊戲！", width / 2, height / 2 + 60);
}

function showQuestion() {
    let q = questions[currentQuestion];
    fill(255);
    textSize(20);
    text(q.question, width / 2, 100);

    for (let i = 0; i < q.options.length; i++) {
        let x = width / 2;
        let y = 200 + i * 60;

        if (mouseX > x - 200 && mouseX < x + 200 && mouseY > y - 20 && mouseY < y + 20) {
            fill(255, 180, 100);
        } else {
            fill(200);
        }
        rect(x - 200, y - 20, 400, 40, 10);
        fill(0);
        text(q.options[i], x, y);
    }
}

function showResult() {
    let resultText = "";

    if (score === questions.length) {
        resultText = "🌟 太強了！你是台灣國際參與知識王！";
    } else if (score >= questions.length * 0.6) {
        resultText = "😊 很不錯喔！你對台灣的國際處境了解不少！";
    } else {
        resultText = "🤔 還有進步空間！一起來認識更多吧～";
    }

    fill(255);
    textSize(24);
    text(resultText, width / 2, height / 2);
    textSize(18);
    text("你的分數是：" + score + " / " + questions.length, width / 2, height / 2 + 40);
    text("點擊畫面重新開始。", width / 2, height / 2 + 80);
}

function mousePressed() {
    if (gameState === "intro") {
        gameState = "quiz";
        score = 0;
        currentQuestion = 0;
    } else if (gameState === "quiz") {
        for (let i = 0; i < questions[currentQuestion].options.length; i++) {
            let x = width / 2;
            let y = 200 + i * 60;

            if (mouseX > x - 200 && mouseX < x + 200 && mouseY > y - 20 && mouseY < y + 20) {
                if (i === questions[currentQuestion].answer) {
                    score++;
                }
                currentQuestion++;
                break;
            }
        }
    } else if (gameState === "result") {
        gameState = "intro";
    }
}
