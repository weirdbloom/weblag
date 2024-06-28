let noiseCanvas, noiseTexture, rotationX = 0, rotationY = 0;
let targetRotationX = 0, targetRotationY = 0;
let isMouseControlled = false;
const characters = "`_brainlag          ";
const characterColors = [];
let graphics, displayDiv;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  graphics = createGraphics(100, 40, WEBGL);
  displayDiv = createDiv()
    .position('absolute')
    .style("color", "black")
    .style("font-size", "10px")
    .style("font-family", "monospace")
    .style("overflow", "hidden");

  // Generate noise image
  noiseCanvas = createGraphics(100, 40);
  noiseCanvas.loadPixels();
  for (let y = 0; y < noiseCanvas.height; y++) {
    for (let x = 0; x < noiseCanvas.width; x++) {
      const noiseValue = noise(x * 0.1, y * 1) * 255;
      noiseCanvas.set(x, y, color(noiseValue));
    }
  }
  noiseCanvas.updatePixels();

  // Define colors for each character
  for (let i = 1; i < characters.length; i++) {
    characterColors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  background(0);

  if (!isMouseControlled) {
    targetRotationX = map(mouseY / height, 0, 1, radians(70), radians(-70));
    targetRotationY = map(mouseX / width, 0, 1, radians(-70), radians(70));
  }

  rotationX = lerp(rotationX, targetRotationX, 0.1);
  rotationY = lerp(rotationY, targetRotationY, 0.1);

  graphics.background(0);
  graphics.push();
  graphics.translate(0, 0, 500);
  graphics.rotateX(rotationX);
  graphics.rotateY(rotationY);
  graphics.texture(noiseCanvas);
  graphics.plane(graphics.width, graphics.height);
  graphics.pop();
  graphics.loadPixels();

  let htmlContent = "";
  for (let y = 1; y < graphics.height; y++) {
    for (let x = 1; x < graphics.width; x++) {
      const index = (x + y * graphics.width) * 4;
      const brightness = (graphics.pixels[index] + graphics.pixels[index + 1] + graphics.pixels[index + 2]) / 3;
      const char = characters.charAt(floor(map(brightness, 0, 255, 0, characters.length)));
      const colorIndex = characters.indexOf(char);
      const bgColor = characterColors[colorIndex];
      htmlContent += char === " " ? "&nbsp;" : `<span style="background-color: rgb(${red(bgColor)},${green(bgColor)},${blue(bgColor)})">${char}</span>`;
    }
    htmlContent += "<br/>";
  }
  displayDiv.html(htmlContent);
  const divSize = displayDiv.size();
  displayDiv.position((windowWidth - divSize.width) / 2, (windowHeight - divSize.height) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
