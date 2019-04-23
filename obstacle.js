class obstacle {

    constructor(bg, x, y, w, h,speed){
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
    }

    // collision(player){
    //     let dx = Math.abs(this.x - player.x - player.w /2)
    //     let dy = Math.abs(this.y - player.y - player.h /2)
    //
    //     if(dx > (player.w/2) + this.r - this.speed || dy > (player.h/2) + this.r + this.speed){
    //         return false
    //     }
    //     if(dx <= (player.w/2) || dy <= (player.h/2) + this.r){
    //         this.dirX = -this.dirX
    //         return true
    //     }
    //
    // }
}
