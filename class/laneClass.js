class Lane{
    constructor(posX, posY, height, color){
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.color = color;
    }

    draw(ctx, canvas){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, canvas.width, this.height);
    }

}