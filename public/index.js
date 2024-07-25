// board
let board;
let boardWidth = 360;
let boardHeight = 550;
let context

// bird
let birdWidth = 36; //width/height ratio = 408/228 = 17/12
let birdHeight = 25;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight

}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 472;
let pipeX = boardWidth;
let pipeY = 0;

let toppipeimage;
let bottompipeimage;

//physics
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4; //pushes the bird down
let gameover = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.Width = boardWidth;
    context = board.getContext("2d"); // used for drawing on board

    //draw flappy Bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, birdHeight, birdWidth);

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, birdX, birdY, birdHeight, birdWidth);
    }

    toppipeimage = new Image();
    toppipeimage.src = "top\ pipe.png";

    bottompipeimage = new Image();
    bottompipeimage.src = "./bottompipe.png";


    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
    document.addEventListener("keydown", moveBird);
}



function update() {

    if (gameover) {
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);

    //bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0,); //bird height limit and speed going up
    velocityY += gravity;

    if (bird.y > boardHeight) {
        gameover = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        if (detectcolison(bird, pipe)) {
            gameover = true;
        }
        if (!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            console.log(score)
            pipe.passed = true;
        }

        while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
            pipeArray.shift(); //removes the pipes after passing
        }
    }
    //score
   context.fillStyle = "white"
   context.font = "45px sans-serif";
   context.fillText(score, 5, 45);
   if(gameover){
    context.fillText("YOU LOSE", 30, 100);
    context.fillStyle = "white"
   context.font = "45px sans-serif";
   }
}



function placePipes() {
    if ( gameover) {
        return;
    }

    let randompipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingspace = board.height / 4;

    let toppipe = {
        img: toppipeimage,
        x: pipeX,
        y: randompipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(toppipe);

    let bottompipe = {
        img: bottompipeimage,
        x: pipeX,
        y: randompipeY + pipeHeight + openingspace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottompipe)
}

function moveBird(e) {
    velocityY = -6;
    console.log("working")
    // console.log(e.code)

    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        // jump

        //reset game
        if(gameover){
            bird.y = birdY;
            pipeArray[0];
            score = 0;
            gameover = false;
        }

    }
}

function detectcolison(a, b) {
 return a.x < b.x + b.width &&
        a.x + a.width > b.x && 
        a.y < b.y + b.height &&
        a.y + a.height > b.y;

}



