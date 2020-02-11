var rain = [];
var rainingNow = false;
let blueSkyImg;
let sunImg;
let sunImgWidth;
let sunImgHeight;
let soilImg;
let seedImg;
let seedImg2;
let seedImg3;
let clouds;
let canvasHeight = 820;
let canvasWidth = 1440;
let seedImgX, seedImgY;
let showSeed1 = true;
let showSeed2 = false;
let showSeed3 = false;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  blueSkyImg = loadImage('blueSky.png');
  sunImg = loadImage('sun.png');
  sunImgWidth = 183.5; //half of the original size of 367
  sunImgHeight = 183.5; //half of the original size of 367
  print(sunImgHeight);
  print(sunImgWidth);
  soilImg = loadImage('200208-Prototyping-Woz-Soil.png');
  seedImg = loadImage('seed.png');
  seedImg2 = loadImage('200208-Prototyping-Woz-Seed2.png');
  seedImg3 = loadImage('200208-Prototyping-Woz-Seed3.png');
  seedImgX = canvasWidth/2;
  seedImgY = canvasHeight/2;
  clouds = loadImage('clouds.png')
  cloudOneX = 300;
  cloudOneY = 20;
  cloudTwoX = -200;
  cloudTwoY = -10;
   for (i = 0; i < 200; i++) {
    rain[i] = new Rain(random(50, 1440), random(500, -3000));
  }

}

function draw() {

  noCursor();
  image(blueSkyImg, 0, 0);
  //Check if it's raining or sunny

  if (rainingNow == true) {
    background(240);
    for (i = 0; i < rain.length; i++) {
      rain[i].dropRain();
      rain[i].splash();
    }
    strokeWeight(0);
    fill(240);
    rect(0,0,1400,300);
    rect(cloudTwoX - 1400,0,1400,800);
    rect(cloudOneX + 1300,0,1400,800);
  }

  image(sunImg, 0, 0, sunImgWidth, sunImgHeight);
  image(clouds, cloudOneX, cloudOneY);
  image(clouds, cloudTwoX, cloudTwoY);
  
  if (showSeed1) {
    image(seedImg, seedImgX, seedImgY);
    image(soilImg, -7, 860 - soilImg.height);
  } else if (showSeed2) {
    image(seedImg2, seedImgX, seedImgY);
    image(soilImg, -7, 860 - soilImg.height);
  } else if(showSeed3) {
    image(seedImg3, seedImgX, seedImgY);
    image(soilImg, -7, 860 - soilImg.height);

  }


  //107 and 187 are keycodes for "+"
  if (keyIsDown(107) || keyIsDown(187)) {
    sunImgWidth += 5;
    sunImgHeight += 5;
  }

  //109 and 189 are keycodes for "-"
  if ((keyIsDown(109) || keyIsDown(189)) && sunImgWidth >= 183.5 && sunImgHeight >= 183.5) { //in order to not have the sun disappear altogether
    sunImgWidth -= 5;
    sunImgHeight -= 5;
  }

}
//seed will move to location where mouse is pressed, configured it such that the center of the seed aligns with mouse
function mouseDragged() {
  seedImgX = (mouseX - (seedImg.width/2));
  seedImgY = (mouseY - (seedImg.height/2));
}

function keyPressed() {
  if (key == ' ') {
      rainingNow = true;
}

if (keyCode == DOWN_ARROW) {
  rainingNow = false;
} else if (keyCode == LEFT_ARROW) {
  cloudOneX -= 10;
  cloudTwoX -= 10;
} else if (keyCode == RIGHT_ARROW) {
  cloudOneX += 10;
  cloudTwoX += 10;
}
}

function keyTyped() {
  if (key === 'a') {
    seedImgX -= 10;
  } else if (key === 'd') {
    seedImgX += 10;
  } else if (key === 'z') {
    seedImgY += 10;
  } else if (key === 'w') {
    seedImgY -=10;
  } else if (key === '1') {
    showSeed1 = true;
    showSeed2 = false;
    showSeed3 = false;
  } else if (key === '2') {
    showSeed1 = false;
    showSeed2 = true;
    showSeed3 = false;
  } else if (key === '3') {
    showSeed1 = false;
    showSeed2 = false;
    showSeed3 = true;
  }
}

function Rain(x, y) {
  this.x = x;
  this.y = y;
  // this.gravity = 9.8;
  this.length = 15;
  this.r = 0;
  this.opacity = 200;
  // let currVel = random (1, 5);
  // this.velocity = createVector(0, currVel);
  //
  // this.update = function() {
  //   // add the velocity of the rain
  //  this.position.add(this.velocity);
  // }

  this.dropRain = function() {
    noStroke();
    fill('#96c3ce');
    //rect(this.x, this.y,3,15);
    ellipse(this.x, this.y, 3, this.length);
    this.y = this.y + 6 //+ frameCount/60;
    if (this.y > 740) {
      this.length = this.length - 5;
      //this.y= random(0,-100);
    }
    if (this.length < 0) {
      this.length = 0;
    }
  }

  this.splash = function() {
    strokeWeight(2);
    //stroke(245, 200/frameCount);
    stroke(245, this.opacity);
    noFill();
    if (this.y > 740) {
      ellipse(this.x, 750, this.r * 2, this.r / 2);
      this.r++;
      this.opacity = this.opacity - 10;

      //keep the rain dropping
      if (this.opacity < 0) {
        this.y = random(0, -100);
        this.length = 15;
        this.r = 0;
        this.opacity = 200;
      }
    }
  }
}
