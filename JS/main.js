const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext('2d');

let hello = "hellothere";

let characters = makeCharacters();

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let lanes = drawLanes(ctx, canvas);
    
    characters.forEach((character) => {
        drawCharacter(ctx, canvas, lanes, character);
    });

    hitboxHandler(characters);

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);