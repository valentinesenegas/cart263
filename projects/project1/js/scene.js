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
