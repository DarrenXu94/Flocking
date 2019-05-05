class EnergyBall {
    constructor(x,y,r) {
        this.pos = createVector(x,y)
        this.r = r;
        this.vel = p5.Vector.random2D();
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
        this.checkBounds()
        this.pos.add(this.vel);
    }

    draw() {
        fill(255)
        ellipse(this.pos.x, this.pos.y, this.r);

    }
}