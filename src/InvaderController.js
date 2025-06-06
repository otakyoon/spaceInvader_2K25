import Invader from './invader.js';
import MovingDirection from './movingDirection.js';

export default class InvaderController {
    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;

    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;

    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;


    invadersMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    invadersRows = [];


    constructor(canvas, invaderBulletController, playerBulletController, scoreCallback) {
        this.canvas = canvas;
        this.createInvaders();
        this.invaderBulletController = invaderBulletController;
        this.playerBulletController = playerBulletController;
        this.scoreCallback = scoreCallback;
    }



    draw(ctx) {
        this.decrementMoveDownTimer();
        this.drawInvaders(ctx);
        this.updateVelocityAndDirection();
        this.resetMoveDownTimer();
        this.fireBullet();
        this.collisionDetection(); 
    }


    drawInvaders(ctx) {
        this.invadersRows.flat().forEach((invader) => {
            invader.draw(ctx);
            invader.move(this.xVelocity, this.yVelocity);
        });

    }
    createInvaders() {
        this.invadersMap.forEach((row, rowIndex) => {
            this.invadersRows[rowIndex] = [];
            row.forEach((invaderNumber, invaderIndex) => {
                if (invaderNumber > 0) {
                    const invader = new Invader(invaderIndex * 50, rowIndex * 35, invaderNumber);
                    this.invadersRows[rowIndex].push(invader);
                }
            });

        })
    }

    updateVelocityAndDirection (){
        for(const invaderRow of this.invadersRows){
            if(this.currentDirection === MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity=0;
                const rightMostInvader = invaderRow[invaderRow.length-1];
                if(rightMostInvader.x+rightMostInvader.width>=this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    console.log("this.currentDirection "+this.currentDirection);
                    break;
                }
            }else if(this.currentDirection === MovingDirection.downLeft){
                if(this.moveDown(MovingDirection.left)){
                    break;
                }
            }else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity=0;
                const leftMostInvader = invaderRow[0];
                if(leftMostInvader.x<=0){
                    this.currentDirection = MovingDirection.downRight;
                    console.log("this.currentDirection "+this.currentDirection);

                    break;
                }
            }else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }
        }

    }
    moveDown(newDirection){
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;

        if(this.moveDownTimer<=0){
            this.currentDirection = newDirection;
            console.log("this.currentDirection "+this.currentDirection);

            return true;
        }
        return false;
    }

    resetMoveDownTimer(){
        if(this.moveDownTimer<=0){
            this.moveDownTimer = this.moveDownTimerDefault; 
        }}

    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
            this.moveDownTimer--;
        }}

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer<=0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const invaders = this.invadersRows.flat();
            if(invaders.length > 0){
                const randomInvaderIndex = Math.floor(Math.random() * invaders.length);
                const invader = invaders[randomInvaderIndex];
                this.invaderBulletController.shoot(invader.x + invader.width / 2, invader.y + invader.height, -3);
            }
        }
    }

    collisionDetection(){
        this.invadersRows.forEach((invaderRow) => {
            invaderRow.forEach((invader, invaderIndex)=>{
                if(this.playerBulletController.collideWith(invader)){
                    invaderRow.splice(invaderIndex, 1);
                    this.scoreCallback();
                }
            })})

        this.invadersRows = this.invadersRows.filter(invaderRow => invaderRow.length > 0);
    }

    collideWith(sprite) {
        return this.invadersRows.flat().some(invader => invader.collideWith(sprite));
    }

        
}


