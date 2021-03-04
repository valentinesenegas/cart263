// Home screen before the beginning of the game.

"use strict";

// Images

let imgLogo;

let imgIntroduction;

// Image for the start button.
let imgStartButtonReleased;
let imgStartButtonHover;
let imgStartButtonPressed;

// Properties of the start button.
let startButtonX = 1000;
let startButtonY = 800;
let startButtonW = 230;
let startButtonH = 60;
let imgLastStartButton = null;

function preloadHome() {
  // Start button.
  imgStartButtonReleased  = loadImage("assets/images/buttons/buttonStartReleased.png");
  imgStartButtonHover     = loadImage("assets/images/buttons/buttonStartHover.png");
  imgStartButtonPressed   = loadImage("assets/images/buttons/buttonStartPressed.png");

  // Logo.
  imgLogo                 = loadImage("assets/images/logo.png");

  // Introduction to the game.
  imgIntroduction         = loadImage("assets/images/introduction.png");
}


function drawHome() {
background(250);

// Logo.
push();
imageMode(CORNER);
image(imgLogo, width/2 - imgLogo.width/2, 100);
pop();

// Introduction image. Description and plan
push();
imageMode(CENTER);
image(imgIntroduction, width/2, height/2);
pop();

// Intro Text.
// push();
// textSize(22);
// textAlign(CORNER, CENTER);
// fill('#000000');
// text(`You are in a vertical prison with 10 levels.
// On each level live two prisoners.
// Every day, a platform comes from above and brings plenty of meals down to all of you.
// The problem: the inmates on the first levels eat too much food, and by the time the platform reaches the lower prisoners, there is nothing left.`, 0, 170, 1100, 500);
// pop();

// Text.
push();
textSize(22);
textAlign(CORNER, CENTER);
fill('#000000');
text(`You are a lucky one the first level, you can end this.
You must protect the platform and the food from the hostile prisoners.`, 50, 470, 1100, 500);
pop();

// Button.
drawStartButton();
}

function drawStartButton() {
  // Management of the different states of the button (released, hover and pressed).
  let imgStartButton = imgStartButtonReleased;

  if (mouseX >= startButtonX && mouseX <= startButtonX + startButtonW &&
      mouseY >= startButtonY && mouseY <= startButtonY + startButtonH) {
    if (mouseIsPressed)
      imgStartButton = imgStartButtonPressed;
    else if (imgLastStartButton == imgStartButtonPressed) {
      gameState = stateFloorEnter;
      setupGame();
      setupLevel();
    }
    else
      imgStartButton = imgStartButtonHover;
  }
  imgLastStartButton = imgStartButton;

  push();
  imageMode(CORNER);
  image(imgStartButton,     startButtonX,     startButtonY);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill('#ffffff');
  text("Play", startButtonX, startButtonY, startButtonW, startButtonH);
  pop();
}
