class Ship {
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

    // rotate() {
    //     let a = atan2(mouseY-this.pos.y, mouseX-this.pos.x);
    //     rotate(a);
    // }

    update() {
        this.checkBounds()
        this.pos.add(this.vel);

    }

    draw() {

        let {x,y} = this.pos
        push();
        rectMode(CENTER);

        translate(x, y);
        let a = atan2(mouseY-this.pos.y, mouseX-this.pos.x);
        rotate(a);

        triangle(-15, -10,-15, 10, 15, 0)
        
        pop()

    }
}