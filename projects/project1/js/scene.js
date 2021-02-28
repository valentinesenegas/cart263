"use strict";

// Creation of canvas, background, prealoading fonts.
// Creation of the Platform.
// ---------- //
let bg;

// Fonts
let bigShouldersDisplay;
let lexendMega;

function preloadScene() {
  // Google Fonts: Big Shoulders Display and Lexend Mega
  // Title:
  bigShouldersDisplay = loadFont("assets/fonts/BigShouldersDisplay-Regular.ttf");
  // Body text:
  lexendMega = loadFont("assets/fonts/LexendMega-Regular.ttf");
}


function setupScene() {
  createCanvas(1267, 900);
  textFont(lexendMega);
}


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

  // Display the Level.
  push();
  textSize(62);
  textFont(bigShouldersDisplay);
  fill(79,79,79);
  text('Level 01', 10, 60);
  pop();
}

// Display the health of the main character.
function drawHealth() {
  let maxHealthWidth = 300;

  // Draw the remaining health.
  push();
  noStroke();
  rectMode(CORNER);
  rect(width/2 - maxHealthWidth/2, 140, (maxHealthWidth / character.getMaxHealth()) * character.getHealth(), 40, 4);
  fill('rgba(0,255,0, 0.25)');
  pop();

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
  textFont(lexendMega);
  textAlign(CENTER);
  fill(79,79,79);
  text('Your health', width/2, 110);
  pop();
}
