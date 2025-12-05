function makeCharacters(){
    let lane = 1;
    let canHaveOffset = true
    character1 = new Character(lane, "white", "wasd", "karakter1", generateRandomId(), canHaveOffset);
    lane = 3;
    canHaveOffset = false;
    character2 = new Character(lane, "yellow", "arrows", "karakter2", generateRandomId(), canHaveOffset);

    return [character1, character2];
}

function drawCharacter(ctx, canvas, lanes, character){
    character.draw(ctx, canvas, lanes)
}