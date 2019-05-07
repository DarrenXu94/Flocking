class CommunicatingShip extends Ship {
    constructor(x, y) {
        super(x, y)
        this.tries = 0
    }

    randomFlying() {
        this.pos.add(this.vel);
    }

    isHungry() {
        return (this.life < LIFEVALUE - 1000)
    }

    flyTowardsEnergy() {
        if (this.knownEnergyLocation) {
            
            let desired = p5.Vector.sub(this.knownEnergyLocation, this.pos)
            desired.normalize();
            this.vel = desired
            this.accelerate(2)
            this.pos.add(this.vel)
            this.atEnergyButGone()
        } else {
            this.randomFlying()
        }
    }

    atEnergyButGone() {
        if (dist(this.knownEnergyLocation.x, this.knownEnergyLocation.y, this.pos.x, this.pos.y) < 20) {
            this.tries ++
            if (this.tries > 20){
                this.knownEnergyLocation = undefined
                this.knownEnergyTime = undefined
                this.tries = 0
            }
        }
    }

    update() {
        super.update()
        if (this.isHungry()) {
            this.flyTowardsEnergy()
        } else {
            this.randomFlying()
        }

    }
}

