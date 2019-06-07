let size = 5, hexRad = 20; //board size and hex size, customable
let canvasSize = 800; //canvas size, customable
let number_of_mines = 15; //number of mines in board, customable
let board = [], mine = [];
let startX, startY;
let di = [0, -1, -1, 0, 1, 1]; //direction for
let dj = [-1, 0, 1, 1, 0, -1]; //floodfill
let color = [0, '#5EA1CC', 'red', 'green', 'purple', 'maroon', 'cyan']; //colors for numbers
let boundL = [], boundR = []; //bound position of hex for each line
let posX, posY; //starting position for board
let gameOver = false;
let m = new Array(canvasSize);
let visited = [];
let isPeaking = [];
let peaked = [];
let flagged = new Array(canvasSize);
let opened = new Array(canvasSize);
let winner = false;
let first = true;
let arr = Array();
let cnt_flag = 0;
let time = 0;
let timeID = 0;
let isPS = false;
let pcx = 0, pcy = 0;
function flag(x, y) { //function to draw a flag at (x,y)
	noStroke();
	fill('red');
	triangle(x, y - 6, x, y + 2, x + 8, y - 2);
	stroke(1);
	line(x, y - 6, x, y + 8);
}

function polygon(x, y, radius, npoints) { //function to draw a regular polygon with n points at (x,y) with radius
	let angle = TWO_PI / npoints;
	beginShape();
	for (let a = PI / 6; a < TWO_PI + PI / 6; a += angle) {
		let sx = x + cos(a) * radius;
		let sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}
function generate() { //function to generate board with mines
	arr.fill(0);
	for (let i = 0; i < 3 * size * (size - 1) + 1; i++) arr[i] = i < number_of_mines;
	shuffle(arr, true); //randomize mine

	let cnt = 0;
	boundL[0] = size - 1, boundR[0] = 2 * (size - 1);
	for (let i = 0; i <= 2 * (size - 1); i++) {
		board[i] = [];
		mine[i] = [];
		visited[i] = [];
		for (let j = boundL[i]; j <= boundR[i]; j++) {
			board[i][j] = 0;
			mine[i][j] = arr[cnt++];
		}
		if (boundL[i] > 0) {
			boundL[i + 1] = boundL[i] - 1;
			boundR[i + 1] = boundR[i];
		}
		else if (boundL[i] === 0) {
			boundL[i + 1] = boundL[i];
			boundR[i + 1] = boundR[i] - 1;
		}
	}

	for (let i = 0; i <= 2 * (size - 1); i++) {
		for (let j = boundL[i]; j <= boundR[i]; j++) {
			for (let k = 0; k < 6; k++) // 6 directions
			{
				if (i + di[k] < 0 || i + di[k] > 2 * (size - 1) || j + dj[k] < boundL[i + di[k]] || j + dj[k] > boundR[i + di[k]]) continue;//bug sieu to khong lo
				if (mine[i][j]) {
					board[i][j] = -1;
					continue;
				}
				board[i][j] += (mine[i + di[k]][j + dj[k]] == 1); //update board[i][j]
			}
		}
	}

	startX = posX, startY = posY;
	X = startX, Y = startY;
	for (let i = 0; i <= 2 * (size - 1); i++ , Y += hexRad * 3 / 2) {
		for (let j = boundL[i]; j <= boundR[i]; j++ , X += hexRad * sqrt(3)) {
			if (board[i][j] != undefined) {
				fill(255);
				polygon(round(X), round(Y), hexRad, 6); //X and Y is position for each hex on canvas
				m[round(X)][round(Y)] = new pos(i, j);
				fill(0);
			}
		}
		if (boundL[i] > 0) {					// shift posX
			X = startX - hexRad * sqrt(3) / 2;  // for each
			startX -= hexRad * sqrt(3) / 2;		// line changes
		}										//
		else {									//
			X = startX + hexRad * sqrt(3) / 2;	//
			startX += hexRad * sqrt(3) / 2;		//
		}
	}
}
function init() { //setup function. this one should be called before the draw() function is overriden
	stage = 1;
	createCanvas(canvasSize, canvasSize);
	background(200);
	for (let i = 0; i < canvasSize; i++)
		m[i] = new Array(canvasSize).fill(undefined);
	// frameRate(1)
	arr = Array(3 * size * (size - 1) + 1); // board size;
	number_of_mines = Math.floor(0.20 * arr.length); // default ratio of mine
	posX = canvasSize / 2 - (size - 1) * hexRad * Math.sqrt(3) / 2, posY = canvasSize / 2 - (size - 1) * hexRad * 1.5;
	generate();
	for (let i = 0; i < board.length; i++)
		flagged[i] = new Array(board[0].length).fill(false);
	for (let i = 0; i < board.length; i++)
		opened[i] = new Array(board[0].length).fill(false);
	for (let i = 0; i < board.length; i++)
		isPeaking[i] = new Array(board[0].length).fill(false);

}
let isEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

function floodfill(i, j) { //function for when clicked at (board[i][j] === 0)
	if (i < 0 || i > 2 * (size - 1) || j < boundL[i] || j > boundR[i] || visited[i][j] || flagged[i][j]) return; //return if OOB or already visited
	visited[i][j] = 1;
	toggle2(i, j);
	if (board[i][j] != 0) return;
	for (let k = 0; k < 6; k++) {
		if (i + di[k] < 0 || i + di[k] > 2 * (size - 1) || j + dj[k] < boundL[i + di[k]] || j + dj[k] > boundR[i + di[k]]) continue;//bug sieu to khong lo
		floodfill(i + di[k], j + dj[k]);
	}
}
function wetFloodfill(i, j) { //function for when release a primary+second click
	if (i < 0 || i > 2 * (size - 1) || j < boundL[i] || j > boundR[i] || flagged[i][j] || !opened[i][j]) return; //return if OOB or already visited
	visited[i][j] = 1;
	let cnt = 0;
	for (let k = 0; k < 6; k++) {
		if (i + di[k] < 0 || i + di[k] > 2 * (size - 1) || j + dj[k] < boundL[i + di[k]] || j + dj[k] > boundR[i + di[k]]) continue;//bug sieu to khong lo
		cnt += flagged[i + di[k]][j + dj[k]]
	}
	if (cnt < board[i][j]) return;
	for (let k = 0; k < 6; k++) {
		if (i + di[k] < 0 || i + di[k] > 2 * (size - 1) || j + dj[k] < boundL[i + di[k]] || j + dj[k] > boundR[i + di[k]] || flagged[i + di[k]][j + dj[k]]) continue;//bug sieu to khong lo
		toggle2(i + di[k], j + dj[k]);
	}
}
function toggle2(i, j) { //function to run when a hex when a hex is opened
	first = false;
	if (flagged[i][j] || opened[i][j]) return;
	opened[i][j] = true;

	if (board[i][j] === -1) { //clicked at a mine
		gameOver = true;
		fill('red');
		polygon(round(X), round(Y), hexRad, 6);
	}
	else if (board[i][j] === 0 && !visited[i][j]) { //clicked at an empty hex
		floodfill(i, j);
	}
	else if (board[i][j] >= 1) { //clicked at a hex with number
		fill('grey');
		polygon(round(X), round(Y), hexRad, 6);
		fill(color[board[i][j]]);
		text(board[i][j], X, Y);
	}

}
function toggle(X, Y) {//wrapper to toggle2
	let i, j;
	let t = m[X][Y];//translate from screen coordinates to in-memory board coordinates
	i = t.x;
	j = t.y;
	while (first && board[i][j] != 0) generate();//we don't want to open a single hex or a mine at the first time.
	if (!timeID)
		timeID = setInterval(() => { time += 1 }, 1000);//Generation completed, start timer
	toggle2(i, j);//open the hex
}
function findCenter(i, j) { //function to find the nearest hex center to mouse
	let mn = Infinity, res = undefined;
	for (let x in m) {			// brute force
		for (let y in m[x]) {	// all hex centers
			if (m[x][y] == undefined) continue;
			if (mn > sqrt((i - x) * (i - x) + (j - y) * (j - y))) {
				mn = sqrt((i - x) * (i - x) + (j - y) * (j - y));
				res = [x, y];
			}
		}
	}
	return res;
}
function unPeak() {
	while (peaked.length) {
		let p = peaked.pop();
		let i, j;
		[i, j] = p;
		isPeaking[i][j] = false;
	}
	pcx = 0
	pcy = 0
}
function peakXY(mouseX, mouseY) {
	let x, y;
	[x, y] = findCenter(mouseX, mouseY)
	if (x === pcx || y === pcy) return;
	unPeak();
	let i, j;
	let t = m[x][y]
	i = t.x
	j = t.y
	for (let k = 0; k < 6; k++) {
		if (i + di[k] < 0 || i + di[k] > 2 * (size - 1) || j + dj[k] < boundL[i + di[k]] || j + dj[k] > boundR[i + di[k]]) continue;//bug sieu to khong lo
		peaked.push([i + di[k], j + dj[k]]);
		isPeaking[i + di[k]][j + dj[k]] = true;
	}
	pcx = x;
	pcy = y;
}
function mousePressed(event) {
	if (stage != 1) return;
	if (event.buttons == 3) {
		let i = mouseX;
		let j = mouseY;
		isPS = true;
		if (isEqual(get(i, j).slice(0, 3), [200, 200, 200])) return unPeak();
		peakXY(mouseX, mouseY)
	}
}
function mouseDragged(event) {
	if (stage != 1) return;
	if (event.buttons == 3) {
		let i = mouseX
		let j = mouseY
		if (isEqual(get(i, j).slice(0, 3), [200, 200, 200])) return unPeak();
		peakXY(i, j)
	}
}
function mouseReleased(event) {
	if (stage != 1) return;
	if (isPS) {
		let x = mouseX;
		let y = mouseY;
		unPeak();
		[x, y] = findCenter(x, y);
		let t = m[x][y];
		let i, j;
		i = t.x
		j = t.y
		wetFloodfill(i, j)
	}
	isPS = false;
}
function PmouseClicked(event) { //function for left click
	if (event.button != 0) return;
	if (gameOver || winner) return;// Don't respond after the game is over.
	let i = mouseX;
	let j = mouseY;
	if (isEqual(get(i, j).slice(0, 3), [200, 200, 200])) return; //if clicked out of board
	let cent = findCenter(i, j);
	let x, y;
	if (cent == undefined) return;
	[x, y] = cent;
	toggle(x, y);//open the hex
	if (!gameOver)
		winner = checkStatus();// do we have a winner yet?
}
let alldone = false;
function Lose() { //function that draw stuff when a mine is opened.
	alldone = true;
	background('black');
	textAlign(CENTER, CENTER);
	fill('white');
	text('YOU LOSE!', 400, 400);
	text('"Mọi điều bạn không làm được đều có thể quy về nhân phẩm"', 400, 450);
	text('- Vũ Minh Điềm 2019 -', 500, 500);
	text('Click để chơi lại', 400, 700);
	mouseClicked = reload;
}
function reload() { //function for play again button
	window.location.reload(false);// reload the game.
}
function rightClick(event) { //function for right click
	if (event.button != 2) return;
	if (gameOver || winner) return;
	let i = mouseX;
	let j = mouseY;
	let cent = findCenter(i, j);
	if (isEqual(get(i, j).slice(0, 3), [200, 200, 200])) return; //if clicked out of board
	if (cent == undefined) return;
	let x, y;
	[x, y] = cent;
	let t = m[x][y];//coordinates translation
	i = t.x;
	j = t.y;
	if (opened[i][j]) return;
	if (!flagged[i][j])
		cnt_flag++;
	else
		cnt_flag--;
	flagged[i][j] = !flagged[i][j]; //change state of flag when right clicked
	winner = checkStatus();// Do we have a winner?
}

class pos {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
function Pdraw() { //function that is responsible for drawing while in-game.
	//The draw() function should be override to this function when the game begun.
	if (winner || gameOver) {
		clearInterval(timeID);
		stage = 2;
	}
	if (winner) {
		if (!alldone) wininit();// initialize the winner screen
		alldone = true;
		return draw = windraw;//Transfer execution flow to the winning screen's drawing function.
	}
	if (gameOver) {
		if (!alldone) {
			alldone = true;
			setTimeout(Lose, 3000);//Draw the losing screen after the answer is shown.
		}
		else return;
	}
	//draw the hexagons
	background(200);
	stroke('black');
	startX = posX, startY = posY;
	X = startX, Y = startY;
	for (let i = 0; i <= 2 * (size - 1); i++ , Y += hexRad * 3 / 2) {
		for (let j = boundL[i]; j <= boundR[i]; j++ , X += hexRad * sqrt(3)) {
			if (board[i][j] != undefined) {
				fill(255);
				polygon(round(X), round(Y), hexRad, 6);

				if (opened[i][j] || gameOver) {//We want to show the content of a hexagons when it's opened or when the game is over.
					if (board[i][j] === -1) {//a mine
						gameOver = true;
						fill('red');
						polygon(round(X), round(Y), hexRad, 6);
					}
					else if (board[i][j] === 0) {//an empty hexagon
						fill('grey');
						polygon(round(X), round(Y), hexRad, 6);

					}
					else if (board[i][j] >= 1) {//an hexagons that's surrounded by mines.
						fill('grey');
						polygon(round(X), round(Y), hexRad, 6);
						fill(color[board[i][j]]);
						textSize(20);
						textAlign(CENTER, CENTER);
						text(board[i][j], X, Y);
					}
				}
				else if (flagged[i][j])//a flagged hexagons
				{
					flag(X, Y);
				}
				else if (isPeaking[i][j]) {
					fill('grey');
					polygon(round(X), round(Y), hexRad, 6);
				}
				fill(0);
			}
		}
		//show the timer and the remaining flag counter.

		if (boundL[i] > 0) {
			X = startX - hexRad * sqrt(3) / 2;
			startX -= hexRad * sqrt(3) / 2;
		}
		else {
			X = startX + hexRad * sqrt(3) / 2;
			startX += hexRad * sqrt(3) / 2;
		}
	}
	let number_of_mines_left = number_of_mines - cnt_flag;
	flag(posX - 20, posY - 60);
	fill(0);
	textSize(hexRad);
	strokeWeight(0);
	textSize(18);
	text(number_of_mines_left, posX, posY - 50); //number of mines left
	text(nf(Math.floor(time / 60), 2) + ' : ' + nf(time % 60, 2), posX + 200, posY - 50); //timer
	strokeWeight(1);
}
function checkStatus() { //function to check if win or lose
	if (gameOver) return false;
	let fcnt = 0;
	let wrong = 0;
	let ocnt = 0;
	for (let i = 0; i <= 2 * (size - 1); i++) {
		for (let j = boundL[i]; j <= boundR[i]; j++) {
			if (board[i][j] != undefined) {
				if (flagged[i][j]) {
					if (board[i][j] == -1) fcnt += 1;//a flag at a correct position
					else wrong += 1;//a flag at a wrong position
				}
				else if (opened[i][j]) {
					ocnt++;
					if (board[i][j] == -1) {
						gameOver = 1;
						return false;
					}
				}

			}
		}
	}
	if (wrong) return false;//The player may have think a normal hexagons as a mine.
	if (fcnt == number_of_mines) return true;//all the mine has been flagged
	if (ocnt == 3 * size * (size - 1) + 1 - number_of_mines) return true;//all the normal hexagons are opened
	return false;
}
