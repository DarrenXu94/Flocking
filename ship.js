const LIFEVALUE = 2000
const MEMORYTIME = 10000
const COMMUNICATIONSIZE = 250

class Ship {
    constructor(x, y, r) {
        this.pos = createVector(x, y)
        this.r = r;
        this.vel = p5.Vector.random2D();
        this.life = Math.floor(Math.random() * (LIFEVALUE - 500 + 1)) + 500;
        this.accelerate(2)

        this.toRemove = false
        this.theta = 0
        this.knownEnergyLocation
        this.knownEnergyTime

        this.tries = 0

    }

    accelerate(amount) {
        this.vel.x = this.vel.x * amount
        this.vel.y = this.vel.y * amount
    }

    communicate(message) {

        if (message.knownEnergyTime > this.knownEnergyTime) {
            this.knownEnergyLocation = message.knownEnergyLocation
            this.knownEnergyTime = message.knownEnergyTime
            console.log("Updated known energy")
        }
    }

    checkProximity(ships) {
        for (let ship of ships) {
            if (ship != this) {
                if (this.knownEnergyLocation) {
                    if (dist(ship.pos.x, ship.pos.y, this.pos.x, this.pos.y) < COMMUNICATIONSIZE) {
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
        if (dist(energy.pos.x, energy.pos.y, this.pos.x, this.pos.y) < COMMUNICATIONSIZE) {
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

    randomFlying() {
        this.pos.add(this.vel);
    }

    isHungry() {
        return (this.life < LIFEVALUE - 1000)
    }

    atEnergyButGone() {
        if (dist(this.knownEnergyLocation.x, this.knownEnergyLocation.y, this.pos.x, this.pos.y) < 20) {
            this.tries ++
            if (this.tries > 20){
                this.knownEnergyLocation = undefined
                this.knownEnergyTime = undefined
            }
        }
    }

    forgetEnergy() {
        if (Date.now() - this.knownEnergyTime > MEMORYTIME) {
            this.knownEnergyLocation = undefined
            this.knownEnergyTime = undefined
        }
    }

    flyTowardsEnergy() {
        let desired = p5.Vector.sub(this.knownEnergyLocation, this.pos)
        desired.normalize();
        this.vel = desired
        this.accelerate(2)
        this.pos.add(this.vel)
    }

    update() {
        this.checkLife()
        this.checkBounds()
        this.forgetEnergy()
        
        if (!this.knownEnergyLocation) {
            this.randomFlying()
        } else if (!this.isHungry()) {
            this.randomFlying()
        } else {
            this.flyTowardsEnergy()
        }
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


        let knownColor = (this.knownEnergyLocation) ? 255 : fullness
        fill(255, knownColor, fullness)

        let a = atan2(this.vel.y + y - this.pos.y, this.vel.x + x - this.pos.x);
        rotate(a);
        triangle(-12, -10, -12, 10, 15, 0)
        pop()

    }
}