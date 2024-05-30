let apples = [];
let branches = [];
let bottomRectApples = [];

function setup() {
  createCanvas(464, 649);
  initializeBranches();
  initializeBottomRectApples();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeBranches();
  initializeBottomRectApples();
}

function draw() {
  drawCanvas();
  updateApples();
}

function drawCanvas() {
  let canvasWidth = width;
  let canvasHeight = height;
  background(146, 157, 155);
  noStroke();
  drawOilPainting(canvasWidth, canvasHeight);
  drawRoots(canvasWidth, canvasHeight);
  drawBottomRectangle(canvasWidth, canvasHeight);
  drawBranchesAndApples(canvasWidth, canvasHeight);
}

function drawOilPainting(w, h) {
  fill(83, 96, 110);
  rect(18, 18, w - 36, h - 36);
  noFill();
  for (let i = 0; i < 2600; i++) {
    let strokeWeightValue = random(0.36, 0.08);
    stroke(i % 3 === 0 ? 255 : 220, 230, 219);
    strokeWeight(strokeWeightValue);
    let x1 = random(36, w - 18);
    let y1 = random(36, h - 18);
    let x2 = x1 + random(-50, 50);
    let y2 = y1 + random(-50, 50);
    let cp1x = random(x1 + 10, x1 - 10);
    let cp1y = random(y1 + 10, y1 - 10);
    let cp2x = random(x2 - 10, x2 + 10);
    let cp2y = random(y2 - 10, y2 + 5);
    bezier(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
  }

  fill(46, 58, 73);
  noStroke();
  let xDots = (w - 40) / 5.5;
  let yDots = (h - 40) / 5.5;
  for (let i = 0; i < xDots; i++) {
    for (let j = 0; j < yDots; j++) {
      ellipse(20 + i * 5.5, 20 + j * 5.5, 2, 2);
    }
  }
}

function drawRoots(canvasWidth, canvasHeight) {
  let rootX = 16 / 464 * canvasWidth;
  let rootY = 490 / 649 * canvasHeight;
  let rootWidth = 430 / 464 * canvasWidth;
  let rootHeight = 40 / 649 * canvasHeight;
  fill(95, 142, 105);
  rect(rootX, rootY, rootWidth, rootHeight);
}

function drawBottomRectangle(canvasWidth, canvasHeight) {
  let rectX = canvasWidth * 120 / 464;
  let rectY = canvasHeight * 485 / 649;
  let rectW = canvasWidth * 240 / 464;
  let rectH = canvasHeight * 55 / 649;

  fill(46, 58, 73);
  stroke(0);
  strokeWeight(1);
  fill(230, 197, 116);
  rect(rectX, rectY, rectW, rectH);
  fill(251, 88, 87);
  rect(rectX, rectY, canvasWidth * 44 / 464, rectH);
  rect(rectX + canvasWidth * 160 / 464, rectY, canvasWidth * 44 / 464, rectH);
  fill(135, 173, 128);
  rect(rectX + canvasWidth * 70 / 464, rectY, canvasWidth * 44 / 464, rectH);
  drawApplesOnRectangle(rectX, rectY, rectW, rectH);
}

function drawApplesOnRectangle(rectX, rectY, rectW, rectH) {
  bottomRectApples.forEach(apple => {
    apple.update();
    apple.draw();
  });
}

function drawBranchesAndApples(canvasWidth, canvasHeight) {
  branches.forEach(branch => {
    branch.draw();
  });
}

function initializeBranches() {
  let canvasWidth = width;
  let canvasHeight = height;
  branches = [
    new Branch(85 / 464 * canvasWidth, 40 / 649 * canvasHeight, 90 / 464 * canvasWidth, 135 / 649 * canvasHeight),
    new Branch(90 / 464 * canvasWidth, 135 / 649 * canvasHeight, 125 / 464 * canvasWidth, 132 / 649 * canvasHeight),
    new Branch(125 / 464 * canvasWidth, 132 / 649 * canvasHeight, 123 / 464 * canvasWidth, 265 / 649 * canvasHeight),
    new Branch(123 / 464 * canvasWidth, 265 / 649 * canvasHeight, 330 / 464 * canvasWidth, 265 / 649 * canvasHeight),
    new Branch(330 / 464 * canvasWidth, 265 / 649 * canvasHeight, 328 / 464 * canvasWidth, 110 / 649 * canvasHeight),
    new Branch(328 / 464 * canvasWidth, 110 / 649 * canvasHeight, 400 / 464 * canvasWidth, 125 / 649 * canvasHeight),
    new Branch(400 / 464 * canvasWidth, 125 / 649 * canvasHeight, 400 / 464 * canvasWidth, 100 / 649 * canvasHeight),
    new Branch(232 / 464 * canvasWidth, 255 / 649 * canvasHeight, 232 / 464 * canvasWidth, 195 / 649 * canvasHeight),
    new Branch(160 / 464 * canvasWidth, 195 / 649 * canvasHeight, 275 / 464 * canvasWidth, 195 / 649 * canvasHeight),
    new Branch(180 / 464 * canvasWidth, 195 / 649 * canvasHeight, 180 / 464 * canvasWidth, 170 / 649 * canvasHeight),
    new Branch(275 / 464 * canvasWidth, 195 / 649 * canvasHeight, 275 / 464 * canvasWidth, 170 / 649 * canvasHeight),
    new Branch(232 / 464 * canvasWidth, 255 / 649 * canvasHeight, 232 / 464 * canvasWidth, 485 / 649 * canvasHeight)
  ];
  branches.forEach(branch => branch.addApples(12));
}

function initializeBottomRectApples() {
  bottomRectApples = [];
  let rectX = width * 120 / 464;
  let rectY = height * 485 / 649;
  let rectW = width * 240 / 464;
  let rectH = height * 55 / 649;
  for (let i = 0; i < 6; i++) {
    let appleDiameter = random(20, 50);
    let apple = new Apple(appleDiameter, false); // Apples in the bottom rectangle cannot fall
    let attempts = 0, maxAttempts = 100;
    do {
      let randomX = random(rectX + appleDiameter / 2, rectX + rectW - appleDiameter / 2);
      apple.setPosition(randomX, rectY + rectH / 2);
      if (attempts++ > maxAttempts) {
        break;
      }
    } while (bottomRectApples.some(a => applesOverlap(a, apple)));
    if (attempts <= maxAttempts) {
      bottomRectApples.push(apple);
    }
  }
}

function updateApples() {
  apples.forEach(apple => {
    apple.update();
    apple.draw();
  });
  bottomRectApples.forEach(apple => {
    apple.update(); // Ensure apples in bottom rectangle can grow
    apple.draw();
  });
}

class Branch {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.apples = [];
  }

  draw() {
    stroke(0, 0, 0);
    strokeWeight(1.2);
    line(this.x1, this.y1, this.x2, this.y2);
    this.drawApples();
  }

  drawApples() {
    this.apples.forEach(apple => apple.draw());
  }

  addApples(numApples) {
    let spacing = this.calculateSpacing(numApples);
    let attempts, maxAttempts = 100;

    for (let i = 0; i < numApples; i++) {
      let appleDiameter = random(5, 45);
      let apple = new Apple(appleDiameter, true); // Apples on branches can fall
      attempts = 0;

      do {
        let t = (spacing * (i + 3)) / dist(this.x1, this.y1, this.x2, this.y2);
        apple.setPosition(lerp(this.x1, this.x2, t), lerp(this.y1, this.y2, t));
        if (attempts++ > maxAttempts) {
          break;
        }
      } while (this.apples.some(a => applesOverlap(a, apple)));

      if (attempts <= maxAttempts) {
        this.apples.push(apple);
        apples.push(apple);
      }
    }
  }

  calculateSpacing(numApples) {
    return dist(this.x1, this.y1, this.x2, this.y2) / (numApples + 1);
  }
}

function applesOverlap(apple1, apple2) {
  let distance = dist(apple1.x, apple1.y, apple2.x, apple2.y);
  return distance < (apple1.diameter / 2 + apple2.diameter / 2);
}

class Apple {
  constructor(diameter, canFall) {
    this.x = 0;
    this.y = 0;
    this.diameter = 0;
    this.targetDiameter = diameter;
    this.color1 = color(251, 88, 87);
    this.color2 = color(135, 173, 128);
    this.growthRate = random(0.1, 0.3);
    this.falling = false;
    this.canFall = canFall;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    if (!this.falling) {
      this.diameter += this.growthRate;
      if (this.diameter >= this.targetDiameter) {
        this.diameter = this.targetDiameter;
        if (this.canFall) {
          this.falling = true;
        }
      }
    } else {
      this.y += 2;
    }
  }

  draw() {
    if (random() < 0.5) {
      fill(this.color1);
      arc(this.x, this.y, this.diameter, this.diameter, PI, TWO_PI);
      fill(this.color2);
      arc(this.x, this.y, this.diameter, this.diameter, 0, PI);
    } else {
      fill(this.color1);
      arc(this.x, this.y, this.diameter, this.diameter, -HALF_PI, HALF_PI);
      fill(this.color2);
      arc(this.x, this.y, this.diameter, this.diameter, HALF_PI, -HALF_PI);
    }
  }
}
