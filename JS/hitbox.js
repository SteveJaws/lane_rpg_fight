function hitboxHandler(characters){
    hitDetector(characters[0], characters[1]);
}

function hitDetector(object1, object2){
    if(
        object1.posX <= object2.posX + object2.width&& 
        object1.posX + object1.width >= object2.posX &&
        object1.posY <= object2.posY + object2.height &&
        object1.posY + object1.height >= object2.posY
    ){
        console.log(object1.name + " And " + object2.name + " have made collision.");
        object1.xPosOffset = 10
    }
    else{
        console.log("no collision");
        object1.xPosOffset = 0
    }
}