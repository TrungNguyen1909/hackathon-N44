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
  createCanvas(800, 800);
  enableFont()
  background(220);
  startscreen();
  //textSize(15);
  textAlign(CENTER,CENTER)
  text("Chào mừng đến với trò chơi dò mìn lục giác",400,120*2)
  text("Click để mở 1 hình lục giác.",400,140*2)
  text("Click phải để cắm cờ vào hình lục giác đó",400,160*2)
  text("Nhập độ dài cạnh của lục giác(3≤size≤10): ", 400, 180*2);
}

function startscreen() {
  background(220);
  input = createInput();
  input.position(400-input.width/2-25, 200*2);
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
    clear();
    init();
    draw = Pdraw;
  }
  else{
    startscreen();
    textSize(15)
    fill('red')
    text("Độ dài không hợp lệ. Vui lòng nhập lại", 400, 180*2);
  }
}

function draw() {
}
