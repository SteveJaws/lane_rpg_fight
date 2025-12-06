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
            "d": false,
            "right": false
        };

        this.canUseEquipement = true;
        this.equipementCooldown = 800;
        this.swordAttackDuration = 500;
        this.equipementWidth = 20;
        this.equipementHeight = 20;
        this.lastEquipementUseTime = null;
    }

    draw(ctx, canvas, lanes, fighting = false){
        let currentTime = new Date();

        let lane = lanes[this.pos - 1];
        
        //calc this.posY for player so it stands on correct lane on the battleground
        this.posY = this.calcY(lane, this.height);

        if(!(fighting)){
            this.controlCharacter(lanes)
        }

        if(currentTime - this.lastEquipementUseTime > this.swordAttackDuration){
            this.swordAttack = false;
        }

        if(currentTime - this.lastEquipementUseTime > this.equipementCooldown){
            this.canUseEquipement = true;
        }

        if(this.swordAttack){
            this.sword(ctx, canvas, lane)
        }

        ctx.fillStyle = this.color;

        ctx.fillRect(this.posX + this.xPosOffset, this.posY, this.width, this.height, this.color);
    }

    calcY(lane, height){
        let posY = lane.posY + lane.height / 2 - height / 2;

        return posY;
    }

    controlCharacter(lanes){
        this.switchLane(lanes)
        this.equipement(lanes);
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

    equipement(lane){
        document.addEventListener("keydown", (event) => {
            switch(event.key){
                case "d":
                    if(!(this.pressed.d) && this.controlType == "wasd" && this.canUseEquipement){
                        this.swordAttack = true;
                        this.pressed.d = true;
                        this.lastEquipementUseTime = new Date();
                        this.canUseEquipement = false;
                    }
                    break;
                case "ArrowRight":
                    if(!(this.pressed.right) && this.controlType == "arrows" && this.canUseEquipement){
                        this.swordAttack = true;
                        this.pressed.right = true;
                        this.lastEquipementUseTime = new Date();
                        this.canUseEquipement = false;
                    }
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch(event.key){
                case "d":
                    this.pressed.d = false;
                case "ArrowRight":
                    this.pressed.right = false;
            }
        });
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

    sword(ctx, canvas, lane){
        this.equipementPosY = this.calcY(lane, this.equipementHeight);

        ctx.fillRect(this.posX + this.width, this.equipementPosY, this.equipementHeight, this.equipementHeight);
    }
}