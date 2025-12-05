function drawLanes(ctx, canvas){
    const lane1 = new Lane(0, 0, canvas.height / 3, "blue");
    const lane2 = new Lane(0, lane1.posY + lane1.height, canvas.height / 3, "red");
    const lane3 = new Lane(0, lane2.posY + lane2.height, canvas.height / 3, "green");

    lane1.draw(ctx, canvas);
    lane2.draw(ctx, canvas);
    lane3.draw(ctx, canvas);

    return [lane1, lane2, lane3];
}