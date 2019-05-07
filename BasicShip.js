class BasicShip extends Ship {
    constructor(x, y) {
        super(x, y)
    }

    randomFlying() {
        this.pos.add(this.vel);
    }

    update() {
        super.update()
        this.randomFlying()

    }
}

