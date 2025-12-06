class Character{
    constructor(pos, color, controlType, name, id, canHaveOffset){
        let size = convertToPercentCanvas(10, 20);

        this.id = id;
        this.name = name;
        this.pos = pos;
        this.posX = 0;
        this.posY = 0;
        this.color = color;
        this.width = size.width;
        this.height = size.height;
        this.controlType = controlType;
        this.xPosOffset = 0;
        this.canHaveOffset = canHaveOffset;
        this.pressed = {
            "w": false,
            "s": false,
            "up": false,
            "down": false,
        };
    }

    draw(ctx, canvas, lanes, fighting = false){
        if(!(fighting)){
            this.controlCharacter(lanes)
        }

        let lane = lanes[this.pos - 1];

        let position = this.calcPosition(lane);

        ctx.fillStyle = this.color;

        ctx.fillRect(position.posX + this.xPosOffset, position.posY, this.width, this.height, this.color);
    }

    calcPosition(lane){
        let posY = lane.posY + lane.height / 2 - this.height / 2;
        let posX = 10;

        this.posX = posX;
        this.posY = posY;

        return {"posX": posX, "posY": posY};
    }

    controlCharacter(lanes){
        this.switchLane(lanes)
    }

    switchLane(lanes){
        document.addEventListener("keydown", (event) => {
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

    checkCollision(characters){
        //check collision with other player
        characters.forEach((character) => {
            if(character.id != this.id){
                let result = hitDetector(this, character);
                if(result && this.canHaveOffset){
                    this.xPosOffset = 10;
                }
                else{
                    this.xPosOffset = 0;
                }
            }
        })
    }
}