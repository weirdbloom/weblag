let a, b, c = 0, d = 0, e = 0, f = 0, g = false, h = "`_brainlag          ", i, j;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  j = createGraphics(240, 48, WEBGL);
  i = createDiv()
    .position(0, 0)
    .style("color", "white")
    .style("font-size", "10px")
    .style("font-family", "monospace");

  // Generate noise image
  a = createGraphics(240, 48);
  a.loadPixels();
  for (let y = 0; y < a.height; y++) {
    for (let x = 0; x < a.width; x++) {
      const noiseValue = noise(x * 0.1, y * 0.1) * 255;
      a.set(x, y, color(noiseValue));
    }
  }
  a.updatePixels();
  b = a.width / a.height;
}

function draw() {
  background(0);
  if (!g) {
    e = map(mouseY / height, 0, 1, radians(70), radians(-70));
    f = map(mouseX / width, 0, 1, radians(-70), radians(70));
  }
  c = lerp(c, e, 0.1);
  d = lerp(d, f, 0.1);
  j.background(0);
  j.push();
  j.translate(0, 0, 500);
  j.rotateX(c);
  j.rotateY(d);
  j.texture(a);
  j.plane(j.width, j.height);
  j.pop();
  j.loadPixels();
  let k = "";
  for (let l = 1; l < j.height; l++) {
    for (let m = 1; m < j.width; m++) {
      const n = (m + l * j.width) * 4;
      const o = (j.pixels[n] + j.pixels[n + 1] + j.pixels[n + 2]) / 3;
      const p = h.charAt(floor(map(o, 0, 255, 0, h.length)));
      k += p === " " ? "&nbsp;" : p;
    }
    k += "<br/>";
  }
  i.html(k);
  
  // Adjust the size of the i element to fit within the window dimensions
  i.style('width', 'auto');
  i.style('height', 'auto');
  const q = i.size();
  const maxWidth = min(q.width, windowWidth - 20); // Adding some padding
  const maxHeight = min(q.height, windowHeight - 20); // Adding some padding

  i.style('max-width', `${maxWidth}px`);
  i.style('max-height', `${maxHeight}px`);
  i.style('overflow', 'hidden');
  i.position((windowWidth - maxWidth) / 2, (windowHeight - maxHeight) / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
