// Home screen before the beginning of the game.

"use strict";

// Images
let imgLogo;
let imgIntroduction;
let imgHowToPlay;

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

  // Intstructions on how to play the game.
  imgHowToPlay         = loadImage("assets/images/howtoplay.png");
}


function drawHome() {
background(250);

// Logo, The Platform.
push();
imageMode(CORNER);
image(imgLogo, width/2 - imgLogo.width/2, 28);
pop();

// Inspired by the movie
push();
textSize(28);
textAlign(CENTER);
textLeading(15);
fill('#4F4F4F');
textFont(bigShouldersDisplay);
text(`Inspired by the movie.`, width/2, 32);
pop();

// Introduction image. Description and plan.
push();
imageMode(CENTER);
image(imgIntroduction, width/2, height/2);
pop();

// Intro Text on the left.
push();
textSize(18);
textAlign(CORNER, CENTER);
fill('#000000');
textLeading(28);
text(`You are in a vertical prison with 10 levels.
On each level live two prisoners.
Every day, a platform comes from above and \nbrings plenty of meals down to all of you.\n
The problem: the inmates on the first levels eat too much food, and by the time the platform reaches the lower \nprisoners, there is nothing left.`, 62, 110, 500, 500);
pop();

// How to play.
push();
imageMode(CORNER);
image(imgHowToPlay, 10, 550);
pop();

// Big text at the bottom.
push();
textSize(24);
textAlign(CORNER, CENTER);
textLeading(35);
fill('#000000');
text(`You are a lucky one the first level, you can end this.\n
You must protect the platform and the food from the hostile prisoners.`, 600, 450, 620, 500);
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
    else if (imgLastStartButton != imgStartButtonPressed) {
      imgStartButton = imgStartButtonHover;
    }
  }

  imgLastStartButton = imgStartButton;

  push();
  imageMode(CORNER);
  image(imgStartButton,     startButtonX,     startButtonY);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill('#ffffff');
  text("Play", startButtonX, startButtonY, startButtonW, startButtonH -12);
  pop();
}

function checkGameStarted() {
  return imgLastStartButton == imgStartButtonPressed;
}
