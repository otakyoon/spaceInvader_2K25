import '../css/styles.scss';
import Space from '../assets/images/space.png';
import InvaderController from './InvaderController';
import Player from './player';
import BulletController from './bulletController';

let canvas = document.getElementById('game');
let isGameOver = false;
let didWin = false;
canvas.height = 600;
canvas.width = 600;
let ctx = canvas.getContext("2d");
let score = 0;

let playerBulletController;
let invaderBulletController;
let invaderController;
let player;
const background = new Image();
background.src = Space;

function initializeGame() {
    isGameOver = false;
    didWin = false;

    playerBulletController = new BulletController(canvas, 5, 'red', true);
    invaderBulletController = new BulletController(canvas, 4, 'green', false);
    invaderController = new InvaderController(canvas, invaderBulletController, playerBulletController, () => score += 10);
    player = new Player(canvas, 3, playerBulletController);

    hideReplayButton();
}

function createReplayButton() {

    if (document.getElementById('replayButton')) {
        return;
    }
    
    const button = document.createElement('button');
    button.id = 'replayButton';

    button.addEventListener('click', () => {
        initializeGame();
    });
    
    document.body.appendChild(button);
}

function showReplayButton() {
    const button = document.getElementById('replayButton');
    if (button) {
        button.style.display = 'block';
    }
}

function hideReplayButton() {
    const button = document.getElementById('replayButton');
    if (button) {
        button.style.display = 'none';
    }
}

function game() {
    if (!isGameOver) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        invaderController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        invaderBulletController.draw(ctx);
        checkGameOver();
        displayScore();
    } else {
        displayGameOverMessage();
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }
    if (invaderBulletController.collideWith(player) || invaderController.collideWith(player)) {
        isGameOver = true;
        showReplayButton();
        console.log("Game Over! You were hit by an invader bullet or an invader.");
    } else if (invaderController.invadersRows.length === 0) {
        isGameOver = true;
        didWin = true;
        showReplayButton();
        console.log("You win! All invaders have been destroyed.");
    }
}

function displayGameOverMessage() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    
    if (didWin) {
        ctx.fillStyle = "GREEN";
        ctx.font = "48px Arial";
        ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2 - 50);
    } else {
        ctx.fillStyle = "red";
        ctx.font = "48px Arial";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);

    }
}

initializeGame();

createReplayButton();

setInterval(game, 1000 / 60);

function displayScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: "+ score, 10, 20); 
}