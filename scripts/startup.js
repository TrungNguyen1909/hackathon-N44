let input, button, screen = 0;
let sz;
var font
function preload(){
  // font = loadFont("assets/iCielBCDowntown-Regular.otf")
  font = loadFont("assets/iCiel SamsungSharpSans-Bold-UTF8.ttf")
  
}
function enableFont(){
  textFont(font,16);
}
function setup() {
  createCanvas(400, 400);
  enableFont()
  background(220);
  startscreen();
  //textSize(15);
  textAlign(CENTER,CENTER)
  text("Chào mừng đến với trò chơi dò mìn lục giác",200,120)
  text("Click để mở 1 hình lục giác.",200,140)
  text("Click phải để cắm cờ vào hình lục giác đó",200,160)
  text("Nhập độ dài cạnh của lục giác: ", 200, 180);
}

function startscreen() {
  background(220);
  input = createInput();
  input.position(100, 200);
  button = createButton('PLAY');
  button.position(input.x + input.width, input.y);
  button.mousePressed(getSetting);
}

function getSetting() {
  sz = int(input.value());
  button.remove();
  input.remove();
  if (sz >= 3 && sz <= 10) {
    size = sz;
    posX = canvasSize/2 - (size-1)*hexRad*Math.sqrt(3)/2, posY = canvasSize/2 - (size-1)*hexRad*1.5;
    clear();
    init();
    draw = Pdraw;
  }
  else{
    startscreen();
    textSize(15)
    fill('red')
    text("Độ dài không hợp lệ. Vui lòng nhập lại", 200, 180);
  }
}

function draw() {
}
