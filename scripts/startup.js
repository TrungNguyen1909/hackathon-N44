let screen = 0,
  font, input;
let numco = ['black', 'purple', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red'];
let sz = 5;

function setup() {
  createCanvas(800, 800);
}

function preload() {
  font = loadFont('assets/iCiel SamsungSharpSans-Bold-UTF8.ttf');
}

function startscreen0() {
  fill('black');
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(17);
  text('CHÀO MỪNG ĐẾN VỚI DÒ MÌN LỤC GIÁC', 400, 280);
  textSize(15);
  text('Nếu đã biết luật chơi rồi thì...', 400, 360);
  text('Còn nếu chưa biết thì...', 400, 510);
  textSize(12);
  text('Hãy chọn cách bạn muốn chơi', 400, 390)
  textSize(18);
  if (mouseX >= 257 && mouseX <= 342 && mouseY >= 427 && mouseY <= 457) {
    fill('yellow');
    rect(257, 427, 85, 30);
  } else {
    noFill();
    rect(257, 427, 85, 30);
  }
  if (mouseX >= 457 && mouseX <= 542 && mouseY >= 427 && mouseY <= 457) {
    fill('yellow');
    rect(457, 427, 85, 30);
  } else {
    noFill();
    rect(457, 427, 85, 30);
  }
  if (mouseX >= 347 && mouseX <= 452 && mouseY >= 547 && mouseY <= 577) {
    fill('yellow');
    rect(347, 547, 105, 30);
  } else {
    noFill();
    rect(347, 547, 105, 30);
  }
  fill('black');
  text('Random', 300, 440);
  text('Custom', 500, 440);
  text('Hướng dẫn', 400, 560);
}

function customscreen() {
  textSize(16);
  fill('black');
  text('Click vào số để thay đổi độ dài.', 270, 250);
  text('Độ dài bạn chọn là:', 270, 270);
  textSize(25);
  fill(numco[sz - 3]);
  text(sz, 390, 330);
  textSize(18);
  if (mouseX >= 470 && mouseX <= 530 && mouseY >= 388 && mouseY <= 413) {
    fill('yellow');
    rect(470, 388, 60, 25);
  } else {
    noFill();
    rect(470, 388, 60, 25);
  }
  if (mouseX >= 240 && mouseX <= 300 && mouseY >= 388 && mouseY <= 413) {
    fill('yellow');
    rect(240, 388, 60, 25);
  } else {
    noFill();
    rect(240, 388, 60, 25);
  }
  fill('black');
  text('PLAY', 500, 400);
  text('BACK', 270, 400);
}

function introscreen() {
  fill('black');
  textSize(20);
  text('LUẬT CHƠI:', 60, 240);
  text('THAO TÁC:', 60, 320);
  textSize(13);
  text('Mục tiêu của bạn là tìm ra toàn bộ số mìn (hoặc mở toàn bộ các', 240, 270);
  text('ô không chứa mìn) trong hình lục giác của game.', 190, 290)
  text('- Click chuột trái vào 1 ô để mở ô đó (nếu bạn ở ô chứa mìn, bạn sẽ thua!)', 255, 350);
  text('- Click chuột phải vào 1 ô để mở đánh dấu ô đó chứa mìn', 204, 370);
  text('- Click chuột trái vào 1 ô đã đánh dấu để bỏ đánh dấu ô đó', 211, 390);
  if (mouseX >= 415 && mouseX <= 485 && mouseY >= 588 && mouseY <= 613) {
    fill('yellow');
    rect(415, 588, 70, 25);
  } else {
    noFill();
    rect(415, 588, 70, 25);
  }
  fill('black');
  textSize(18);
  text('Đã rõ!', 450, 600);
}

function mouseClicked() {
  if (screen == 0) {
    if (mouseX >= 257 && mouseX <= 342 && mouseY >= 427 && mouseY <= 457) {
      sz = random(3, 10);
      sz = round(sz);
      screen = 3;
    } else if (mouseX >= 457 && mouseX <= 542 && mouseY >= 427 && mouseY <= 457) {
      screen = 1;
    } else if (mouseX >= 347 && mouseX <= 452 && mouseY >= 547 && mouseY <= 577) {
      screen = 2;
    }
  } else if (screen == 2) {
    if (mouseX >= 415 && mouseX <= 485 && mouseY >= 588 && mouseY <= 613) {
      screen = 0;
    }
  } else if (screen == 1) {
    if (mouseX >= 240 && mouseX <= 300 && mouseY >= 388 && mouseY <= 413) {
      screen = 0;
    } else if (mouseX >= 470 && mouseX <= 530 && mouseY >= 388 && mouseY <= 413) {
      screen = 3;
    } else if (mouseX >= 385 && mouseX <= 395 && mouseY >= 322 && mouseY <= 342) {
      sz++;
      if (sz > 10) sz = 3;
    }
  }
}

function draw() {
  background(220);
  if (screen == 0) startscreen0();
  else if (screen == 1) {
    customscreen();
  } else if (screen == 2) introscreen();
  else if (screen == 3){
    //Initailize play and transfer execution
    size = sz
    init()
    mouseClicked = PmouseClicked
    return draw = Pdraw;
  }
}