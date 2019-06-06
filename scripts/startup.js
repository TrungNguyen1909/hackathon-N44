let input, button, screen = 0;
let sz;

function setup() {
  createCanvas(400, 400);
  background(220);
  startscreen();
  textSize(15);
  text("Welcome to the hexagon minesweeper",80,120)
  text("Click to open a hexagon",80,140)
  text("Right-click to flag a hexagon",80,160)
  text("ENTER HEXAGON'S EDGE LENGTH: ", 80, 180);
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
    clear();
    init();
    draw = Pdraw;
  }
  else{
    startscreen();
    textSize(15);
    fill('red');
    text("INVALID SIZE, PLEASE RE-ENTER", 90, 180);
  }
}

function draw() {
}
