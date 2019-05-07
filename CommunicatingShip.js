class CommunicatingShip extends Ship {
    constructor(x, y) {
        super(x, y)
        this.tries = 0
    }

    communicate(message){
        super.communicate(message)
        
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
                super.forgetKnownLocation()
                this.tries = 0
            }
        }
    }

    timeOutMemory(){
        if (Date.now() - this.knownEnergyTime > 10000) {
            super.forgetKnownLocation()
        }
    }

    update() {
        super.update()
        this.timeOutMemory()
        if (this.isHungry()) {
            this.flyTowardsEnergy()
        } else {
            this.randomFlying()
        }

    }
}

