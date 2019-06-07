let size = 5, hexRad = 20;
let canvasSize = 800
let board = [], mine = [];
let startX, startY;
let number_of_mines = 15;
let di = [0, -1, -1, 0, 1, 1];
let dj = [-1, 0, 1, 1, 0, -1];
let color = [0,'#5EA1CC', 'red', 'green', 'purple', 'maroon', 'cyan'];
let boundL = [], boundR = [];
let posX, posY;
let gameOver = false;
let m = new Array(canvasSize)
let visited = []
let flagged = new Array(canvasSize)
let opened = new Array(canvasSize)
let winner = false;
let first = true;
let arr = Array()
let cnt_flag = 0;
let time = 0
let timeID = 0
function flag(x, y) {
	noStroke();
	fill('red');
	triangle(x, y - 6, x, y + 2, x + 8, y - 2);
	stroke(1);
	line(x, y - 6, x, y + 8);
}

function polygon(x, y, radius, npoints) {
	let angle = TWO_PI / npoints;
	beginShape();
	for (let a = PI / 6; a < TWO_PI + PI / 6; a += angle) {
		let sx = x + cos(a) * radius;
		let sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}
function generate(){
	arr.fill(0);
	for (let i = 0; i < 3 * size * (size - 1) + 1; i++) arr[i] = i < number_of_mines;
	shuffle(arr, true); //random mine

	//	console.log(arr)
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
			for (let k = 0; k < 6; k++) // 6 huong
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
				polygon(round(X), round(Y), hexRad, 6);
				console.log(X,Y)
				// let s = new pos(round(X),round(Y))
				// let b = new pos(i,j)
				//console.log(round(X), round(Y), i, j, board[i][j])
				m[round(X)][round(Y)] = new pos(i, j)
				fill(0);
				//			text(mine[i][j]?1:0,X,Y)
				//text(board[i][j], X + 300, Y);

			}
		}
		if (boundL[i] > 0) {
			X = startX - hexRad * sqrt(3) / 2;
			startX -= hexRad * sqrt(3) / 2;
		}
		else {
			X = startX + hexRad * sqrt(3) / 2;
			startX += hexRad * sqrt(3) / 2;
		}
	}
}
function init() {
	createCanvas(canvasSize, canvasSize)
	background(200)
	for (let i = 0; i < canvasSize; i++)
		m[i] = new Array(canvasSize).fill(undefined)
	// frameRate(1)
	arr = Array(3 * size * (size - 1) + 1) // board size;
	number_of_mines = Math.floor(0.20*arr.length);
	generate()
	for (let i = 0; i < board.length; i++)
		flagged[i] = new Array(board[0].length).fill(false)
	for (let i = 0; i < board.length; i++)
		opened[i] = new Array(board[0].length).fill(false)
	
}
let isEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2)
let distance = (p1, p2) => sqrt(sqr(p1.x - p2.x) + sqr(p1.y - p2.y))

function floodfill(i, j) {
	if (i < 0 || i > 2 * (size - 1) || j < boundL[i] || j > boundR[i] || visited[i][j] || flagged[i][j]) return; //bug sieu to khong lo
	visited[i][j] = 1;
	toggle2(i, j);
	let cnt = 0;
	for (let k = 0; k < 6; k++) {
		if (i+di[k] < 0 || i+di[k] > 2 * (size - 1) || j+dj[k] < boundL[i] || j+dj[k] > boundR[i]) continue;
		cnt += flagged[i + di[k]][j + dj[k]];
	}
	if (cnt < board[i][j]) return;
	for (let k = 0; k < 6; k++)
		floodfill(i + di[k], j + dj[k]);
}
function toggle2(i, j) {
	first = false;
	if (flagged[i][j] || opened[i][j]) return;
	opened[i][j] = true;

	if (board[i][j] === -1) {
		console.log("Game over!");
		fill('red');
		polygon(round(X), round(Y), hexRad, 6);
	}
	else if (board[i][j] === 0 && !visited[i][j]) {
		floodfill(i, j);
	}
	else if (board[i][j] >= 1) {
		fill('grey');
		polygon(round(X), round(Y), hexRad, 6);
		fill(color[board[i][j]]);
		text(board[i][j], X, Y);
		//if(!visited[i][j])
		//floodfill(i,j)
	}

}
function toggle(X, Y) {
	let i, j;
	let t = m[X][Y];
	console.log(t);
	i = t.x
	j = t.y
	while(first&&board[i][j]!=0) generate()
	timeID = setInterval(()=>{time+=1},1000)
	toggle2(i, j);
}
function findCenter(i, j) {
	let mn = Infinity, res = undefined
	for (let x in m) {
		for (let y in m[x]) {
			if (m[x][y] == undefined) continue;
			if (mn > sqrt((i - x) * (i - x) + (j - y) * (j - y))) {
				mn = sqrt((i - x) * (i - x) + (j - y) * (j - y));
				res = [x, y]
			}
		}
	}
	return res
}
function mouseClicked() {
	if(gameOver||winner) return
	let i = mouseX
	let j = mouseY
	console.log(i, j)
	if (isEqual(get(i, j).slice(0, 3), [200, 200, 200])) return;
	let cent = findCenter(i, j)
	let x, y;
	console.log(cent)
	if (cent == undefined) return;
	[x, y] = cent;
	console.log(x, y)
	toggle(x, y);
	//	console.log(board[x][y])
	if(!gameOver)
	winner = checkStatus();
}
let alldone = false;
function Lose(){
	console.log("Lose()")
	alldone = true;
	background('black')
	textAlign(CENTER,CENTER)
	fill('white')
	text('YOU LOSE!',400,400)
	text('"Mọi điều bạn không làm được đều có thể quy về nhân phẩm"',400,450)
	text('- Vũ Minh Điềm 2019 -',500,500)
	button = createButton('Chơi lại')
	button.position(400,600)
	button.mousePressed(reload)
}
function reload(){
	window.location.reload(false);
}
function rightClick() {
	if(gameOver||winner) return;
	console.log("RIGHT CLICK!")
	let i = mouseX
	let j = mouseY
	let cent = findCenter(i, j)
	if (isEqual(get(i, j).slice(0, 3), [200, 200, 200])) return;
	if (cent == undefined) return;
	let x, y;
	[x, y] = cent;
	let t = m[x][y];
	i = t.x
	j = t.y
	if (!flagged[i][j])
		cnt_flag++;
	else
		cnt_flag--;
	flagged[i][j] = !flagged[i][j];
	console.log(x, y)
	winner = checkStatus()
}

class pos {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}
function Pdraw() {
	if(winner||gameOver) clearInterval(timeID)
	if(winner){
		if(!alldone) wininit();
		alldone=true;
		return draw = windraw;
	}
	if(gameOver){
		if(!alldone){
			alldone = true;
			setTimeout(Lose,2000);			
		}
		else return;
	}
	background(200);
	stroke('black')
	startX = posX, startY = posY;
	X = startX, Y = startY;
	for (let i = 0; i <= 2 * (size - 1); i++ , Y += hexRad * 3 / 2) {
		for (let j = boundL[i]; j <= boundR[i]; j++ , X += hexRad * sqrt(3)) {
			if (board[i][j] != undefined) {
				fill(255);
				polygon(round(X), round(Y), hexRad, 6);
				// console.log(X,Y)
				// let s = new pos(round(X),round(Y))
				// let b = new pos(i,j)
				// console.log(round(X),round(Y),i,j,board[i][j])
				// m[round(X)][round(Y)] = new pos(i,j)
				if (opened[i][j]||gameOver) {
					if (board[i][j] === -1) {
						console.log("Game over!");
						gameOver = true;
						fill('red');
						polygon(round(X), round(Y), hexRad, 6);
					}
					else if (board[i][j] === 0) {
						fill('grey');
						polygon(round(X), round(Y), hexRad, 6);
						
					}
					else if (board[i][j] >= 1) {
						fill('grey');
						polygon(round(X), round(Y), hexRad, 6);
						fill(color[board[i][j]]);
						textSize(20)
						textAlign(CENTER,CENTER)
						text(board[i][j], X, Y);
					}
				}
				else if (flagged[i][j])
				{
					flag(X, Y);
				}
				fill(0);
			}
		}
		//fill

		// console.log(posY);
		let number_of_mines_left = number_of_mines - cnt_flag;
		flag(posX-20,posY-60);
		fill(0);
		textSize(hexRad);
		strokeWeight(0)
		textSize(18)
		text(number_of_mines_left,posX,posY - 50);
		text(nf(Math.floor(time/60),2)+' : '+nf(time%60,2),posX+200,posY - 50);
		strokeWeight(1)
		if (boundL[i] > 0) {
			X = startX - hexRad * sqrt(3) / 2;
			startX -= hexRad * sqrt(3) / 2;
		}
		else {
			X = startX + hexRad * sqrt(3) / 2;
			startX += hexRad * sqrt(3) / 2;
		}
	}
}
function checkStatus(){
	if(gameOver) return false;
	let fcnt = 0;
	let wrong = 0;
	let ocnt = 0;
	for (let i = 0; i <= 2 * (size - 1); i++ , Y += hexRad * 3 / 2) {
		for (let j = boundL[i]; j <= boundR[i]; j++ , X += hexRad * sqrt(3)) {
			if (board[i][j] != undefined) {
				if(flagged[i][j]){
					if(board[i][j]==-1) fcnt+=1;
					else wrong+=1;
				}
				else if(opened[i][j]) ocnt++;

			}
		}
		if (boundL[i] > 0) {
			X = startX - hexRad * sqrt(3) / 2;
			startX -= hexRad * sqrt(3) / 2;
		}
		else {
			X = startX + hexRad * sqrt(3) / 2;
			startX += hexRad * sqrt(3) / 2;
		}
	}
	if(wrong) return false;
	if(fcnt==number_of_mines) return true;
	if(ocnt==3*size*(size-1)+1-number_of_mines) return true;
	return false;
}
