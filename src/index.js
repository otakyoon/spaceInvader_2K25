import '../css/styles.scss';
import Space from '../assets/images/space.png';
import InvaderController from './InvaderController';
import Player from './player';
import BulletController from './bulletController';
import musique from '../assets/sounds/musique.wav';

let canvas = document.getElementById('game');
let isGameOver = false;
let didWin = false;
canvas.height = 600;
canvas.width = 600;

let ctx = canvas.getContext("2d");
const playerBulletController = new BulletController(canvas, 5, 'red', true);
const invaderBulletController = new BulletController(canvas, 4, 'green', false);
let invaderController = new InvaderController(canvas, invaderBulletController, playerBulletController);
const background = new Image();
const player = new Player(canvas, 3, playerBulletController);
background.src = Space;

const backgroundMusic = new Audio(musique);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5; 
backgroundMusic.play().catch((e) => {
  console.log("Lecture automatique bloquée",e);
});



function game() {
    if (!isGameOver) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        invaderController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        invaderBulletController.draw(ctx);
        checkGameOver();

    }else{
        displayGameOverMessage();
    }
}

setInterval(game, 1000 / 60);


function checkGameOver(){
    if(isGameOver) {
        return;
    }
    if(invaderBulletController.collideWith(player)|| invaderController.collideWith(player)) {
        isGameOver = true;
        console.log("Game Over! You were hit by an invader bullet or an invader.");
    }else if(invaderController.invadersRows.length === 0) {
        isGameOver = true;
        didWin = true;
        console.log("You win! All invaders have been destroyed.");
    }


}

function displayGameOverMessage() {

    if (didWin) {
            ctx.fillStyle = "GREEN";
    ctx.font = "40px Arial";
        ctx.fillText("You Win!", canvas.width / 2 - 70, canvas.height / 2);
    } else {
            ctx.fillStyle = "red";
    ctx.font = "60px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 90, canvas.height / 2);
    }
}


function startMusicOnce() {
  backgroundMusic.play();
  document.removeEventListener("click", startMusicOnce);
}
document.addEventListener("click", startMusicOnce);