const parallax = [], parallax2 = []

let bg, bg2, floor, a, speed, points, turn = 0, cont = 0, contMax = 50, game = false

let lose = [], len, indexLose = 0

var obstaculo = [], fall

let jump = [], indexJump = 0, indexJumpFall = 0, indexJumpFall2 = 70

let slide = [], indexSlide = 0

let stay = [], indexStay = 0

let run = [], indexRun = 0

let obsImg = []

let x1, y1, x2, y2

var button

function preload(){
	speed = 5
	points = 0
	floor = loadImage('images/bg.png')
	bg = loadImage('images/Battleground3.png');
	bg2 = loadImage('images/Battleground4.png');


	for(let i= 0; i < 10; i++){
		stay[i] = loadImage(`images/stay/idle${i+1}.png`)
		jump[i] = loadImage(`images/jump/jump${i+1}.png`)
		lose[i] = loadImage(`images/lose/dead${i+1}.png`)
	}

	for(let i = 0; i < 8; i++)
		run[i] = loadImage(`images/run/run${i+1}.png`)
	for(let i = 0; i < 4; i++)
		slide[i] = loadImage(`images/slide/slide${i+1}.png`)
	for(let i = 0; i < 8; i++)
		obsImg[i] = loadImage(`images/obstacle/obs${i+1}.png`)


}

function setup() {
	frameRate(30)
	createCanvas(windowWidth, windowHeight);

	for (var i = 0; i < 2; i++){
		parallax.push(new Backgd(bg, i * width, 0, width, height - 100, 1))
		parallax2.push(new Backgd(bg2, i * width, 0, width, height - 100, 1))
	}
	for (var i = 0; i < 2; i++){
		parallax.push(new Backgd(floor, i * width, height - 100, width, 100, speed))
		parallax2.push(new Backgd(floor, i * width, height - 100, width, 100, speed))
	}

	paintBackground(0)
	textSize(100);
	fill('#fff');
	textAlign(CENTER, CENTER)
	text('Examen-Juego', width * 0.5, height * 0.25);
	button = createButton('Empezar')
		.style('background-color', 'blue')
		.style('color', 'white')
		.style('width', '120px')
		.style('height', '80px')
		.style('border-radius', '10px')
		.style('font-size', '20px')
		.style('font-weight', 'bold')
		.style('cursor', 'grab')
	button.position(width * 0.5 - 60, height * 0.4);
	button.mousePressed(startGame);

}

function reloadGame(){
	location.reload();
}

var hit = false;

function draw() {
	if(game){
		paintBackground(0)
		for (const o of obstaculo) {
			o.draw()
			o.move()
		}
		presskey()
		randomObstaculio()
		score()
		colicion()
		cleanObstaculo();
		cont++
	}
}

function startGame(){
	game = true
	button.remove()
}

function paintBackground(type){
	if (points<500){
		for (const a of parallax) {
			a.draw()
			if(type == 0){
				a.move()
			}
		}
	}else{
		for (const b of parallax2) {
			b.draw()
			if(type == 0){
				b.move()
			}
		}
	}
}

function cleanObstaculo(){
	for (var i = 0; i < obstaculo.length; i++) {
		if (obstaculo[i].x <= 0) {
	    	obstaculo.splice(i, 1);
	   	}
	}
}

function score(){
	textSize(32);
	fill('#fff');
	textAlign(CENTER, CENTER)
	let label = 'Puntos: ' + points
	let textW = textWidth(label)
	text(label, 10 + textW / 2, 30);
	points++
}

function colicion(){
		for (var i = 0; i < obstaculo.length; i++) {
			hit = collideRectRect(x1, y1, x2, y2, obstaculo[i].x, obstaculo[i].y, obstaculo[i].w, obstaculo[i].h - 50);
			if(hit){
				break;
			}
		}
		if (hit){
			for (var i = 0; i < lose.length; i++){
				paintBackground(1)
				for (const o of obstaculo) {
					o.draw()
				}
				if (indexLose < lose.length) {
					image(lose[indexLose], x1, y1, x2+83, y2+15)
					indexLose++
				}else{
					indexLose = 0
					image(lose[indexLose], x1, y1,(x2 + 83), y2)
				}
			}
			noLoop()
			textSize(148);
			fill('#fff');
			textAlign(CENTER, CENTER)
			text('Game Over', width * 0.5, height * 0.25);
			textSize(64);
			text('Puntos: ' + points, width * 0.5, height * 0.5);
			button = createButton('Reiniciar')
				.style('background-color', 'blue')
				.style('color', 'white')
				.style('width', '120px')
				.style('height', '80px')
				.style('border-radius', '10px')
				.style('font-size', '20px')
				.style('font-weight', 'bold')
				.style('cursor', 'grab')
		  	button.position(width * 0.5 - 60, height * 0.6);
		  	button.mousePressed(reloadGame);
		}
	// }
}


function randomObstaculio(){
	if(cont == contMax){
		const rand = Math.floor(random(8))
		if(rand < 4){
			obstaculo.push(new obstacle(obsImg[rand], width, height - 310, 120, 131, speed * 5))
		}else{
			obstaculo.push(new obstacle(obsImg[rand], width, height - 230, 120, 131, speed * 5))
		}
		contMax = Math.floor(random(20, 50))
		cont = 0
	}
}


function presskey(){
	if (keyCode == 38 || keyCode == 32) {
		for (var i = 0; i < jump.length; i++) {
			if (indexJump < jump.length) {
				paintBackground(1)
				for (const o of obstaculo) {
					o.draw()
				}
				if (indexJumpFall < 70){
					image(jump[indexJump], 50, height - 260 - (indexJumpFall * 4), 183, 175)
					indexJumpFall++
					x1 = 50
					y1 = height - 260 - (indexJumpFall * 4)
					x2 = 100
					y2 = 160
				}else{
					image(jump[indexJump], 50, height - 260 - (indexJumpFall2 * 4), 183, 175)
					indexJumpFall2--
					x1 = 50
					y1 = height - 260 - (indexJumpFall2 * 4)
					x2 = 100
					y2 = 160
				}
				if (indexJumpFall2 == 0 && indexJumpFall == 70){
					keyCode = 74
					indexJumpFall = 0
					indexJumpFall2 = 70
				}
				indexJump++
			}else{
				indexJump = 0
			}
		}
	}else if(keyIsDown(DOWN_ARROW)){
		paintBackground(1)
		for (const o of obstaculo) {
			o.draw()
		}
		for (var i = 0; i < slide.length; i++) {
			if (indexSlide < slide.length) {
				image(slide[indexSlide], 50, height - 255, 183, 175)
				x1 = 50
				y1 = height - 220
				x2 = 100
				y2 = 160
				indexSlide++
			}else{
				indexSlide = 0
				image(slide[indexSlide], 50, height - 255, 183, 175)
				x1 = 50
				y1 = height - 220
				x2 = 100
				y2 = 160
			}
		}

	}else{
		if (indexRun < run.length) {
			image(run[indexRun], 50, height - 260, 183, 175)
			x1 = 50
			y1 = height - 260
			x2 = 100
			y2 = 160
			indexRun++
		}else{
			indexRun = 0
			image(run[indexRun], 50, height - 260, 183, 175)
			x1 = 50
			y1 = height - 260
			x2 = 100
			y2 = 160
		}
	}
}
