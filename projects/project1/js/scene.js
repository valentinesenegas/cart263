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
  // Health remaining
  push();
  noStroke();
  rectMode(CENTER);
  fill('rgba(0,255,0, 0.25)');
  rect(width/2, 140, 300, 40, 4);
  pop();

  // Stroke
  push();
  stroke(100);
  strokeWeight(3);
  noFill();
  rectMode(CENTER);
  rect(width/2, 140, 300, 40, 4);
  pop();

  // Text
  push();
  textSize(16);
  textFont(lexendMega);
  textAlign(CENTER);
  fill(79,79,79);
  text('Your health', width/2, 110);
  pop();
}
