let table = [
		[0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0]
	],
	l;

function poligon(x, y) {
	let angle = TWO_PI / 6;
	beginShape();
	for (let i = 0; i < TWO_PI; i += angle) {
		let sx = x + cos(i) * 30;
		let sy = y + sin(i) * 30;
		vertex(sx, sy);
	}
	endShape();
}

function setup() {
	createCanvas(500, 500);
	background(220);
	layer1();
}

function layer1() {
	let stx = 150,
		cnt = 4,
		tmp = 30 * sin(PI / 3),
		cntr = 1;
	for (let i = 100; i < 400; i += 45) {
		for (let j = stx; j < stx + 2 * tmp * cnt; j += 2 * tmp) {
			fill('white');
			poligon(i, j);
		}
		if (cntr < 4) {
			stx -= tmp;
			cnt++;
		} else {
			stx += tmp;
			cnt--;
		}
		cntr++;
	}
}

/*function rand() {
	for (let i = 0; i < 10; i++) {
		let bx = random(0, 6),
			by;
		bx = round(bx);
		if (bx == 0 || bx == 6) by = random(0, 3);
		else if (bx == 1 || bx == 5) by = random(0, 4);
		else if (bx == 2 || bx == 4) by = random(0, 5);
		else if (bx == 3) by = random(0, 6);
		by = round(by);
		while (table[bx][by] == -1) {
			bx = random(0, 6);
			bx = round(bx);
			if (bx == 0 || bx == 6) by = random(0, 3);
			else if (bx == 1 || bx == 5) by = random(0, 4);
			else if (bx == 2 || bx == 4) by = random(0, 5);
			else if (bx == 3) by = random(0, 6);
			by = round(by);
		}
		table[bx][by] = -1;
	}
}*/
function draw() {

}