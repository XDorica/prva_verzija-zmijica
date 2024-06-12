//okvir igre
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//zmijska glava
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

// Hrana
var foodX;
var foodY;

// Score i Highscore
var score = 0;
var highScore = localStorage.getItem("highScore") || 0; // uzima vrijednost highscorea iz localStorage

// Game over
var gameOver = false;

// Postavljanje okvira igrice
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //za crtanje kvadratića

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

// Postavljanje cijelog tijela igrice
function update() {
    if (gameOver) {
        if (gameOver) {
            context.fillStyle = "red";
            context.font = "bold 40px Arial";
            context.fillText("Game Over", board.width / 2 - 100, board.height / 2);
           // return;
        } //nadodano nakon zagrade
        //return;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore); // Store the high score in localStorage
        }
        return;
    }

    // Stilizacija okvira
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    // Stilizacija hrane 
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Sudar zmijice i hrane
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++; //nadodano
    }

    // Stvaranje tijela zmijice
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Stiliziranje tijela zmijice
    context.fillStyle="yellow";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over uvjeti
    if (snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize) {
        gameOver = true;
      //alert("Game Over");  
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
     //alert("Game Over");   
        }
    }

    // prikaz score 
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
    context.fillText("High Score: " + highScore, 10, 60);
}

// Pomicanje zmijice
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    
    else {
        
        gameOver = true;
        context.fillStyle = "red";
        context.font = "bold 40px Arial";
        context.fillText("Game Over", board.width / 2 - 100, board.height / 2);
        return;
    }
}

// Nasumično postavljanje hrane
function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


// Ponovno pokretanje igrice
function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;
    placeFood();
}


// function checkSelfCollision() {
//     Check if the snake collided with itself
//     for (let i = 0; i < snakeBody.length; i++) {
//       if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
//         return true;
//       }
//     }
//     return false;
//   }


// function resetHighScore() {
//     highScore = 0;
//     localStorage.removeItem("highScore");
// }


// Check game over conditions
// if (
//     snakeX < 0 ||
//     snakeX > cols * blockSize ||
//     snakeY < 0 ||
//     snakeY > rows * blockSize ||
//     checkSelfCollision()
//   ) {
//     gameOver = true;
//     context.fillStyle = "red";
//     context.font = "bold 40px Arial";
//     context.fillText("Game Over", board.width / 2 - 100, board.height / 2);
//     return;
//   }
