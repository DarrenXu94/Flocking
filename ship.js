const LIFEVALUE = 5000
const MEMORYTIME = 10000
const COMMUNICATIONSIZE = 250

class Ship {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = p5.Vector.random2D();
        this.life = Math.floor(Math.random() * (LIFEVALUE - 500 + 1)) + 500;
        this.accelerate(2)

        this.toRemove = false
        this.theta = 0
        this.knownEnergyLocation
        this.knownEnergyTime

        // this.tries = 0

    }

    accelerate(amount) {
        this.vel.x = this.vel.x * amount
        this.vel.y = this.vel.y * amount
    }

    // Message received from other ship
    communicate(message) {
        if (message.knownEnergyTime > this.knownEnergyTime) {
            this.knownEnergyLocation = message.knownEnergyLocation
            this.knownEnergyTime = message.knownEnergyTime
        } else if (!this.knownEnergyTime) {
            this.knownEnergyLocation = message.knownEnergyLocation
            this.knownEnergyTime = message.knownEnergyTime
        }
    }

    checkProximity(ships) {
        for (let ship of ships) {
            if (ship != this) {
                if (this.knownEnergyLocation) {
                    if (dist(ship.pos.x, ship.pos.y, this.pos.x, this.pos.y) < COMMUNICATIONSIZE + 30) {
                        ship.communicate({
                            knownEnergyLocation: this.knownEnergyLocation,
                            knownEnergyTime: this.knownEnergyTime
                        })
                    }
                }
            }
        }
    }

    checkEnergy(energy) {
        // See energy
        if (dist(energy.pos.x, energy.pos.y, this.pos.x, this.pos.y) < COMMUNICATIONSIZE + 30) {
            // Update known energy location
            let knownVector = createVector(energy.pos.x, energy.pos.y)
            this.knownEnergyLocation = knownVector
            this.knownEnergyTime = Date.now()
        }
        if (dist(energy.pos.x, energy.pos.y, this.pos.x, this.pos.y) < 30) {
            this.life = LIFEVALUE
        }
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
        } else if (this.pos.y <= 0) {
            this.vel.y = this.vel.y * -1
        }
    }

    update() {
        this.checkLife()
        this.checkBounds()
        this.life -= 1;

    }

    draw() {
        let fullness = map(this.life, 0, LIFEVALUE, 0, 255)
        let { x, y } = this.pos
        push();
        rectMode(CENTER);
        translate(x, y);
        this.theta += 0.02;
        let clarity = 50 + sin(this.theta) * 50;
        fill(255, clarity)
        ellipse(0, 0, COMMUNICATIONSIZE)

        let knownColor = (this.knownEnergyLocation) ? 255 : 0
        // let knownColor = (this.knownEnergyLocation) ? 255 : fullness
        fill(knownColor, knownColor, knownColor)

        let a = atan2(this.vel.y + y - this.pos.y, this.vel.x + x - this.pos.x);
        rotate(a);
        triangle(-12, -10, -12, 10, 15, 0)
        pop()

    }
}