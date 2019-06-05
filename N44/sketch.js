let size = 5, boundL, boundR, hexRad = 20;
let board = [], mine = [];
let startX, startY;
let number_of_mines = 10;
let di = [0, -1, -1, 0, 1, 1];
let dj = [-1, 0, 1, 1, 0, -1];
const posX = 100, posY = 100;

let m = new Array(800)
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = PI/6; a < TWO_PI+PI/6; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
/*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}*/
function setup()
{
	createCanvas(800,800)
	for(let i=0;i<800;i++)
	m[i] = new Array(800).fill(undefined)
	// frameRate(1)
	var arr = Array(61);

	for(let i=0;i<61;i++) arr[i] = i<15;
	shuffle(arr,true); //random mine

//	console.log(arr)
	let cnt = 0;
	boundL = size-1, boundR = 2*(size-1);
	for (let i = 0; i <= 2*(size-1); i++)
	{
		board[i] = [];
		mine[i] = [];
		for (let j = boundL; j <= boundR; j++)
		{
			board[i][j] = 0;
			mine[i][j] = arr[cnt++];
		}
		if (boundL > 0) boundL--;
		else boundR--;
	}

	boundL = size-1, boundR = 2*(size-1);
	for (let i = 0; i <= 2*(size-1); i++)
	{
		for (let j = boundL; j <= boundR; j++)
		{
			for (let k = 0; k < 6; k++) // 6 huong
			{
				if (i+di[k] < 0 || i+di[k] > 2*(size-1) || j+dj[k] < boundL || j+dj[k] > boundR) continue;
				if (mine[i][j])
				{
					board[i][j] = -1;
					continue;
				}
				board[i][j] += (mine[i+di[k]][j+dj[k]] == 1); //update board[i][j]
			}
		}
		if (boundL > 0) boundL--;
		else boundR--;
	}
	boundL = size-1, boundR = 2*(size-1);
	startX = posX, startY = posY;
	X = startX, Y = startY;
	for (let i = 0; i <= 2*(size-1); i++, Y += hexRad * 3/2)
	{
		for (let j = boundL; j <= boundR; j++, X += hexRad * sqrt(3))
		{
			if (board[i][j] != undefined)
			{
				fill(255);
				//polygon(round(X), round(Y),hexRad,6);
				// console.log(X,Y)
				// let s = new pos(round(X),round(Y))
				// let b = new pos(i,j)
				console.log(round(X),round(Y),i,j,board[i][j])
				m[round(X)][round(Y)] = new pos(i,j)
				fill(0);
	//			text(mine[i][j]?1:0,X,Y)
				text(board[i][j],X+300,Y);
				
			}
		}
		if (boundL > 0)
		{
			X = startX - hexRad * sqrt(3)/2;
			startX -= hexRad * sqrt(3)/2;
			boundL--;
		}
		else
		{
			X = startX + hexRad * sqrt(3)/2;
			startX += hexRad * sqrt(3)/2;
			boundR--;
		}
	}
}
let isEqual = (a1,a2) => JSON.stringify(a1)===JSON.stringify(a2)
let distance = (p1, p2) => sqrt(sqr(p1.x-p2.x)+sqr(p1.y-p2.y))
function mouseClicked(){
	let i = mouseX
	let j = mouseY
	console.log(i,j)
	
	let mn = Infinity, pos = undefined
	for(let x in m){
		for(let y in m[x])
		{
			if (m[x][y] == undefined) continue;
			if (mn > sqrt((i-x)*(i-x) + (j-y)*(j-y)))
			{
				mn = sqrt((i-x)*(i-x) + (j-y)*(j-y));
				pos = m[x][y]
			}
		}
	}
	let x,y;
	console.log(pos)
	if(pos==undefined) return;
	x = pos.x
	y = pos.y
	console.log(x,y)
	console.log(board[x][y])

}
class pos{
	constructor(x,y){
		this.x = x
		this.y = y
	}
}
function draw()
{
	
	background(200);
	stroke('black')
	text(str(mouseX)+' '+str(mouseY),10,10)
	fill(255);
//	translate(300,100)
//	rotate(PI/6)
	boundL = size-1, boundR = 2*(size-1);
	startX = posX, startY = posY;
	X = startX, Y = startY;
	for (let i = 0; i <= 2*(size-1); i++, Y += hexRad * 3/2)
	{
		for (let j = boundL; j <= boundR; j++, X += hexRad * sqrt(3))
		{
			if (board[i][j] != undefined)
			{
				fill(255);
				polygon(round(X), round(Y),hexRad,6);
				// console.log(X,Y)
				// let s = new pos(round(X),round(Y))
				// let b = new pos(i,j)
				// console.log(round(X),round(Y),i,j,board[i][j])
				// m[round(X)][round(Y)] = [i,j]
				fill(0);
	//			text(mine[i][j]?1:0,X,Y)
				text(board[i][j],X+300,Y);
				
			}
		}
		if (boundL > 0)
		{
			X = startX - hexRad * sqrt(3)/2;
			startX -= hexRad * sqrt(3)/2;
			boundL--;
		}
		else
		{
			X = startX + hexRad * sqrt(3)/2;
			startX += hexRad * sqrt(3)/2;
			boundR--;
		}
	}
	/*
	for (let i = 0; i <= 2*(size-1); i++)
	{
		for (let j = 0; j <= 2*(size-1); j++)
		{
			text(board[i][j],j*50,i*50);
		}
	}
	*/
}
