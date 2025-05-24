export default class Bullet {

    constructor(x, y, velocity, canvas, color) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.canvas = canvas;
        this.width = 5;
        this.height = 20;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.y -= this.velocity;
    }

    collideWith(sprite){
        return (
            this.x < sprite.x + sprite.width &&
            this.x + this.width > sprite.x &&
            this.y < sprite.y + sprite.height &&
            this.y + this.height > sprite.y
        );
    }

}