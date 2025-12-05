function makeCharacters(){
    let lane = 1;
    character1 = new Character(lane, "white", "wasd", "karakter1");
    lane = 3;
    character2 = new Character(lane, "yellow", "arrows", "karakter2");

    return [character1, character2];
}

function drawCharacter(ctx, canvas, lanes, character){
    character.draw(ctx, canvas, lanes)
}