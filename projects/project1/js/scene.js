"use strict";

// Creation of canvas, background, prealoading fonts.
// Creation of the Platform.
// ---------- //

// Fonts
let bigShouldersDisplay;
let lexendDeca;

function preloadScene() {
  // Google Fonts: Big Shoulders Display and Lexend Mega
  // Title:
  bigShouldersDisplay = loadFont("assets/fonts/BigShouldersDisplay-Regular.ttf");
  // Body text:
  lexendDeca = loadFont("assets/fonts/LexendDeca-Regular.ttf");
  // lexendMega = loadFont("assets/fonts/LexendMega-Regular.ttf");
}

// Create the canvas and set default font.
function setupScene() {
  createCanvas(1267, 900);
  textFont(lexendDeca);
}

// Draw elements of the interface.
function drawScene() {
  // Place the background.
  background(252);

  // Draw the central platform.
  push();
  fill(224,224,224);
  noStroke();
  rectMode(CENTER);
  rect(width/2, 650, 480, 20);
  pop();

  // Display the current level.
  push();
  textSize(62);
  textFont(bigShouldersDisplay);
  fill(79,79,79);
  text(`Level ${level}`, 10, 60);
  pop();
}

// Display the health of the main character.
function drawHealth() {
  if (gameState == stateWin)
    return;

  let maxHealthWidth = 300;

  if (character.getHealth() >= 0) {
    // Draw the remaining health.
    push();
    noStroke();
    rectMode(CORNER);
    rect(width/2 - maxHealthWidth/2, 140, (maxHealthWidth / character.getMaxHealth()) * character.getHealth(), 40, 4);
    fill('rgba(0,255,0, 0.25)');
    pop();
    // rgba(202, 18, 18, 1)
  }

  // Stroke. Does not change.
  push();
  stroke(100);
  strokeWeight(3);
  noFill();
  rectMode(CORNER);
  rect(width/2 - maxHealthWidth/2, 140, maxHealthWidth, 40, 4);
  pop();

  // Descriptive Text.
  push();
  textSize(16);
  textFont(lexendDeca);
  textAlign(CENTER);
  fill(79,79,79);
  text('Your health', width/2, 110);
  pop();
}
