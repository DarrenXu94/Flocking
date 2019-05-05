class Score {
    constructor(){
        this.startTime = Date.now()
        this.score = 0
    }

    gameOver(){
        this.score = Date.now() - this.startTime
        this.displayMessage()
    }

    displayMessage(){
        rectMode(CENTER)
        textAlign(CENTER, CENTER);

        fill(255)
        textSize(32);
        text(`Your score is ${this.score}`, windowWidth / 2, windowHeight / 2)
    }
}