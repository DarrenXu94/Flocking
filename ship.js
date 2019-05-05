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

        translate(x , y);

        let a = atan2(this.vel.y-y, this.vel.x-x);
        rotate(a);        
        // triangle(x, y, x - 15, y + 30, x + 15, y + 30)
        triangle(0, 0, 0 - 15, 0 + 30, 0 + 15, 0 + 30)
        
        pop()

    }
}