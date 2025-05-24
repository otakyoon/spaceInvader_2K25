import PlayerSprite from '../assets/images/player.png';
import BulletController from './bulletController.js';
 
let rightPressed = false;
let leftPressed = false;   
let shootPressed = false; 



export default class Player {
    constructor(canvas, velocity, playerBulletController){
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height - 50;
        this.width = 40;
        this.height = 40;
        this.image = new Image();
        this.image.src = PlayerSprite;
        this.velocity = velocity;
        this.bulletController = playerBulletController;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.move();
        if(this.shootPressed) {
            console.log("Shooting bullet");
            this.bulletController.shoot(this.x + this.width / 2, this.y,  5);
        }
    }

    keydown = (event) => {

        console.log(event.code);
        if (event.code === "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code === "ArrowLeft") {
            this.leftPressed = true;
        }
        if (event.code === "Space") {
            if (!this.shootPressed) {
                this.shootPressed = true;
                // Trigger shooting logic here
                console.log("Shoot!");
            }
        }

    };

    keyup = (event) => {
                console.log(event.code);

        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
        if (event.code === "Space") {
            this. shootPressed = false; // Reset shootPressed when space is released
        } 

    };


    move(){
        if(this.rightPressed){
            this.x+= this.velocity;
        }else if(this.leftPressed){
            this.x-= this.velocity;
        }
        this.collideWithWalls();
    }

    collideWithWalls(){
        //left
        if(this.x<0){
            this.x=0;
        }
        //right
        if(this.x>this.canvas.width-this.width){
            this.x=this.canvas.width-this.width;
        }
    }

}

