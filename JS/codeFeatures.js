function generateRandomId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function convertToPercentCanvas(width, height){
    const canvas = document.getElementById("gameCanvas");
    let convertedWidth = width * (canvas.width / 100)
    let convertedHeight = height * (canvas.height / 100)

    return {"width": convertedWidth, "height": convertedHeight};
}