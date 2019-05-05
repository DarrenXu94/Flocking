const LIFEVALUE = 2000

class Ship {
    constructor(x,y,r) {
        this.pos = createVector(x,y)
        this.r = r;
        this.vel = p5.Vector.random2D();
        this.life = Math.floor(Math.random() * (LIFEVALUE - 500 + 1)) + 500;

        this.toRemove = false
    }

    checkLife() {
        if (this.life <= 0) {
            this.toRemove = true
        } 
    }

    checkBounds() {
        if (this.pos.x >= windowWidth) {
            this.vel.x = this.vel.x * -1
        } else if (this.pos.x <= 0) {
            this.vel.x = this.vel.x * -1
        } else if (this.pos.y >= windowHeight) {
            this.vel.y = this.vel.y * -1
        } else if (this.pos.y <= 0 ) {
            this.vel.y = this.vel.y *-1
        }
    }

    update() {
        this.checkLife()
        this.checkBounds()
        this.pos.add(this.vel);
        this.life -= 1;

    }

    draw() {
        let fullness = map(this.life, 0, LIFEVALUE, 0, 255)
        fill(255, fullness , fullness)
        let {x,y} = this.pos
        push();
        rectMode(CENTER);
        translate(x, y);
        let a = atan2(this.vel.y + y -this.pos.y, this.vel.x + x -this.pos.x);
        rotate(a);
        triangle(-15, -10,-15, 10, 15, 0)
        pop()

    }
}