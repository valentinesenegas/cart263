"use strict";

// Creation of canvas, background, prealoading fonts.
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
  rect(width/2, 650, 400, 20);
  pop();

  // Display the Level.
  push();
  textSize(62);
  textFont(bigShouldersDisplay);
  fill(79,79,79);
  text('Level 01', 10, 60);
  pop();
}
