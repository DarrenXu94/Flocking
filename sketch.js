// Setting up objects
let energyBall
function createEnergy(){
    energyBall = new EnergyBall(100,100,20)
}

let ships = []
function createShips(number){
    for (let i = 0; i < number; i++) {
        ships.push(new Ship(random(windowWidth), random(windowHeight)))
    }
}

// Updating objects
function updateObjects() {
    // Energy
    energyBall.update()

    // Ships
    for (let ship of ships) {
        ship.update()
    }
}

// Drawing objects
function drawObjects(){
    // Energy
    energyBall.draw()

    // Ships
    for (let ship of ships) {
        ship.draw()
    }
}

// Canvas

function setup () {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    createEnergy()
    createShips(2)

    background(15);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function draw () {
    background(15);
    updateObjects()
    drawObjects()
}
