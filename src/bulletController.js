import ShootSound from '../assets/sounds/shoot.wav';
import Bullet from './bullet.js';


export default class BulletController {
    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled; 
        this.shootSound = new Audio(ShootSound);
        this.shootAudioSound = 0.1;
        this.bullets = [];
    }

    draw(ctx) {
        this.bullets = this.bullets.filter(bullet => bullet.y + bullet.height > 0);

        if(this.timeTillNextBulelt > 0) {
            this.timeTillNextBulelt--;
        }
        this.bullets.forEach((bullet, index) => {
            bullet.draw(ctx);
        }
    )}

    shoot(x, y, velocity, timeTillNextBulelt=0){
        console.log("Shooting bullet at", x, y, "with velocity", velocity);
        if (this.bullets.length < this.maxBulletsAtATime) {
            console.log("Creating new bullet");
            const bullet = new Bullet(x, y, velocity, this.canvas, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0; // Reset sound to start
                this.shootSound.volume = this.shootAudioSound;
                this.shootSound.play();
            }
            this.timeTillNextBulelt = timeTillNextBulelt;
        }
    }

    collideWith(sprite) {
        const bulletThatHitSproteIndex = this.bullets.findIndex(bullet => bullet.collideWith(sprite));
        if (bulletThatHitSproteIndex !== -1) {
            this.bullets.splice(bulletThatHitSproteIndex, 1);
            return true; // Collision detected
        }
        return false; // No collision
    }
            

}
