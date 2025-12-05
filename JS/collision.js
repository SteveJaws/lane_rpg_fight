function collisionHandler(characters){
    //characters collision checker
    characters.forEach((character) => {
        character.checkCollision(characters);
    });
}

function hitDetector(object1, object2){
    if(
        object1.posX <= object2.posX + object2.width&& 
        object1.posX + object1.width >= object2.posX &&
        object1.posY <= object2.posY + object2.height &&
        object1.posY + object1.height >= object2.posY
    ){
        return true;
    }else{
        return false;
    }
}