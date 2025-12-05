class Character{
    constructor(pos, color, controlType){
        this.pos = pos;
        this.color = color;
        this.height = 10;
        this.width = 10;
        this.locked = false
        this.controlType = controlType
        this.pressed = {
            "w": false,
            "s": false,
            "up": false,
            "down": false,
        }
    }

    draw(ctx, canvas, lanes, fighting = false){
        if(!(fighting)){
            this.controlCharacter(lanes)
        }

        let lane = lanes[this.pos - 1];

        let position = this.calcPosition(lane);

        ctx.fillStyle = this.color;

        ctx.fillRect(position.posX, position.posY, this.width, this.height, this.color);
    }

    calcPosition(lane){
        let posY = lane.posY + lane.height / 2 - this.height / 2;
        let posX = 10;

        return {"posX": posX, "posY": posY};
    }

    controlCharacter(lanes){
        this.switchLane(lanes)
    }

    switchLane(lanes){
        document.addEventListener("keydown", (event) => {
            console.log(event);
            switch (event.key){
                case "w":
                    if(!(this.pressed.w) && this.pos - 1 > 0 && this.controlType == "wasd"){
                        this.pos = this.pos - 1;
                        this.pressed.w = true;
                    }
                    break;
                case "s": 
                    if(!(this.pressed.s) && this.pos - 1 < 2 && this.controlType == "wasd"){
                        this.pos = this.pos + 1;
                        this.pressed.s = true;
                    }
                    break;
                case "ArrowUp":
                    if(!(this.pressed.up) && this.pos - 1 > 0 && this.controlType == "arrows"){
                        this.pos = this.pos - 1;
                        this.pressed.up = true;
                    }
                    break;
                case "ArrowDown": 
                    if(!(this.pressed.down) && this.pos - 1 < 2 && this.controlType == "arrows"){
                        this.pos = this.pos + 1;
                        this.pressed.down = true;
                    }
                    break;
            }
        })

        document.addEventListener("keyup", (event) => {
            switch (event.key){
                case "w":
                    this.pressed.w = false;
                case "s":
                    this.pressed.s = false;
                case "ArrowUp":
                    this.pressed.up = false;
                case "ArrowDown":
                    this.pressed.down = false;
            }
        })
    }
}