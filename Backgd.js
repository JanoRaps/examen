class Backgd{

	constructor(bg, x, y, w, h, speed){
		this.bg = bg
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.speed = speed
	}

	draw(){
		image(this.bg, this.x, this.y, this.w, this.h)
	}

	move(){
		this.x -= this.speed
		if (this.x <= -this.w + this.speed){
			this.x = this.w
		}
	}
}
