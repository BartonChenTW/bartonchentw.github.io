let bgColor, wordColor;
let fgImage, titleI, titleSubI;
let eventName;
let canvaSize, canvaGrids, gridNum;
let circleMax;
let taiwanP,taiwanColor1,taiwanColor2;
let tTotalNum=[];
let taiwanRect = [6,12];
let taiwanPara=[];
let starPosition1 = [];
let starPosition2 = [];

function preload(){
  fgImage = loadImage('foreground-2.png');
  titleI=loadImage('title-2.png');
  titleSubI=loadImage('titleSub-2.png');
  eventName = loadStrings('event.txt');
  taiwanP = loadJSON('taiwan.json');
}

function setup() {
  canvaSize = 1080;
  canvaGrids = 24;
  gridNum = canvaSize/canvaGrids;
  circleMax = canvaGrids*10;
  createCanvas(canvaSize, canvaSize);
  bgcolor = color(129,210,186);
  wordColor = color(255,255,255,60);
  frameRate(12);
  
  for(let i=0;i<Object.keys(taiwanP).length;i++){
    tTotalNum.push(i);
  }
  shuffleA(tTotalNum);
  taiwanColor1 = color(24,234,186);
  taiwanColor2 = color(255,255,0);
  textFont('BoutiqueBitmap9x9 1.9');
  textAlign(CENTER,CENTER);
  for(let i =0;i<5;i++){
    starPosition1.push([random(1080),random(1080-133)]);
    starPosition2.push([random(1080),random(1080-133)]);
  }
  for(let i=0;i<taiwanRect[0];i++){
    taiwanPara.push([random(1,60),random(.5,1)]);
  }
  for(let i=0;i<taiwanRect[1];i++){
    taiwanPara.push([random(1,60),random(1,2)]);
  }
}

function draw() {
  
  
  background(bgcolor);
  
  backgroundText();
  bgcolor.setAlpha(155);
  background(bgcolor);
  bgcolor.setAlpha(255);
  taiwanPixel();
  
  image(fgImage,0,0);  
  image(titleI,0,cos(frameCount/8)*12);
  image(titleSubI,0,cos(frameCount/8+30)*6);
  
  starBlink();
  
  push();
    blendMode(OVERLAY);
    
  pop();
  // save( "image" + frameCount + ".png");
}

function backgroundText(){
  push();
    for(let j=0;j<gridNum;j++){
      for(let i=0;i<gridNum;i++){
        
          textSize(canvaGrids*random(0.3,1));
          let nowN = floor(random(eventName[0].length));
          let nowW = eventName[0].charAt(nowN);
          let nowID = i*j;
          let nowP = [i*canvaGrids,j*canvaGrids];
          // let nowMP = [mouseX,mouseY];
          // let nowPD = [nowP[0]-nowMP[0],nowP[1]-nowMP[1]];
          // let distM = Math.hypot(nowPD[0], nowPD[1]);
          let nowDist = countDist(nowP);

          let textX = i*canvaGrids + random(canvaGrids/5);
          let textY = j*canvaGrids + random(canvaGrids/5);
          // if(distM<circleMax){
          let distMM = 4 ** map(nowDist[2],0,500,0,2);
          let distAngle = [nowDist[0]/nowDist[2],nowDist[1]/nowDist[2]];
          // console.log(distM+','+distMM+','+nowPD+','+distAngle);
          // text(nowW, i*canvaGrids+noise(nowID)*distMM*2, j*canvaGrids+noise(nowID)*distMM*2);
          textX += distMM*distAngle[0]*canvaGrids/2;
          textY += distMM*distAngle[1]*canvaGrids/2;
          // }
          fill(255-map(nowDist[2],0,500,120,0),255-map(nowDist[2],0,500,30,0),255-map(nowDist[2],0,500,30,0));
          text(nowW, textX, textY);
          textX =0;
          textY =0;
      }
    }
  pop();
}

function taiwanPixel(){
  push();
  rectMode(CENTER);
  fill(73,186,186);
  noStroke();
  for(let i=12;i<tTotalNum.length;i++){
    let taiwanNowP = taiwanP[tTotalNum[i]];
    rect(taiwanNowP[0]-8+30,taiwanNowP[1]-8-36,16);
  }
  blendMode(DODGE);
  taiwanColor1.setAlpha(160);
  taiwanColor2.setAlpha(160);
  fill(taiwanColor1);
  noStroke();
  taiwanRectSP(0,taiwanRect[0])  
  fill(taiwanColor2);
  taiwanRectSP(taiwanRect[0],taiwanRect[0]+taiwanRect[1])
  noStroke();
  
  pop();
}

function shuffleA(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  for(i=array.length-1;i>=0;i--){

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * i);
    currentIndex--;

    // And swap it with the current element.
    [array[i], array[randomIndex]] = [
      array[randomIndex], array[i]];
  }
}

function countDist(nowP){
  let nowMP = [mouseX,mouseY];
  let nowPD = [nowP[0]-nowMP[0],nowP[1]-nowMP[1]];
  let distM = Math.hypot(nowPD[0], nowPD[1]);
  return [nowPD[0],nowPD[1],distM];
}

function taiwanRectSP(startN,endN){
  for(let i=startN;i<endN;i++){
    let taiwanNowP = taiwanP[tTotalNum[i]];
    let maxSize = taiwanPara[i][0];
    let nowDist = map(countDist(taiwanNowP)[2],0,500,1.6,.8);
    let nowSize = (16 + (maxSize-16)*cos((frameCount+tTotalNum[i])*taiwanPara[i][1]))*nowDist;
    rect(taiwanNowP[0]-8,taiwanNowP[1]-8,nowSize);
  }
}

function keyPressed(){
  saveGif('output.gif',5);
}

function starBlink(){
  push();
  blendMode(SCREEN);
  taiwanColor1.setAlpha(255);
  taiwanColor2.setAlpha(255);
  fill(taiwanColor1);
  for(let i=0;i<starPosition1.length;i++){
    
    let nowD = countDist(starPosition1[i]);
    let nowSize = map(nowD[2],0,500,1.6,1);
    textSize(canvaGrids*nowSize+frameCount%2*3);
    text("☀",starPosition1[i][0],starPosition1[i][1]);
  }
  fill(taiwanColor2);
  for(let i=0;i<starPosition2.length;i++){
    
    let nowD = countDist(starPosition1[i]);
    let nowSize = map(nowD[2],0,500,1.6,1);
    textSize(canvaGrids*nowSize+frameCount%3*3);
    text("☼",starPosition2[i][0],starPosition2[i][1]);
  }
  pop();
}
