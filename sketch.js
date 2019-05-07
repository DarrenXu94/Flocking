let gameRunning = true
let score = new Score()
let NUMBEROFSHIPS = 2

// Setting up objects
let energyBall
function createEnergy(){
    energyBall = new EnergyBall(100,100,20)
}

let ships = []
function createShips(number){
    for (let i = 0; i < number; i++) {
        ships.push(new CommunicatingShip(random(windowWidth), random(windowHeight)))
    }
}

// Updating objects
function updateObjects() {
    // Energy
    energyBall.update()

    // Ships
    for (let i = ships.length - 1; i >= 0; i--) {
        let ship = ships[i]
        if (ship.toRemove) {
            ships.splice(i, 1)
        }
        ship.checkProximity(ships)
        ship.checkEnergy(energyBall)
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

// Check game
function checkGame(){
    if (ships.length == 0){
        score.gameOver()
        gameRunning = false
    }
}

// Canvas

function setup () {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');

    createEnergy()
    createShips(NUMBEROFSHIPS)

    background(15);

}

function draw () {
    if (gameRunning) {
        noStroke()
        background(15);
        updateObjects()
        drawObjects()
        checkGame()
    }
}
