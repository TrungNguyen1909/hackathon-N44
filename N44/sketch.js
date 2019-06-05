let size = 5, boundL, boundR, hexRad = 20;
let board = [], mine = [];
let startX, startY;
let number_of_mines = 10;
let di = [0, -1, -1, 0, 1, 1];
let dj = [-1, 0, 1, 1, 0, -1];
const posX = 100, posY = 100;

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
}

function draw()
{
	
	background(200);
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
				polygon(X, Y,hexRad,6);
				fill(0);
	//			text(mine[i][j]?1:0,X,Y)
				text(board[i][j],X,Y);
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
