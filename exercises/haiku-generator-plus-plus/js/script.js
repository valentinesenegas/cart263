"use strict";

/**
Haiku Generator
Valentine Sénégas
*/

// Create a new Sentiment method
const sentiment = ml5.sentiment('movieReviews', modelReady);

let modelIsReady = false;

let image = document.getElementById(`sentiment-image`);

let statement = document.getElementById(`sentiment-statement`);

// Our pre-made haiku lines
let haikuLines = {
  fiveSyllables: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    `You have done your best`,
    `They are all gone now`
  ],
  sevenSyllables: [
    `Say the things left unsaid`,
    `Never believe the wind's lies`,
    `The autumn stretches its legs`,
    `Nothing can satisfy you`,
    `They will not come back again`
  ],
  title: [
    `Thunder`,
    `Lightning`,
    `Winter`,
    `Sakura`,
    `Fuji`,
    `Tsuki`,
    `Samushi`,
    `Water`,
    `Nature`,
    `Birds`,
    `Wind`,
    `Light`,
    `Silence`,
    `Joy`,
    `Moonlight`,
    `Dawn`,
    `Rain`,
    `Moon`,
    `Away`,
    `Sleep`,
    `Loneliness`
  ]
};


let title = document.getElementById(`title`);

// Our three elements on the page that contain each line of the poem
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);


// Set up the starting lines
setupLines();
// Listen for clicks on each element and respond by changing them
addListeners();

/**
Puts a randomly chosen haiku line in each line of the poem in HTML
*/
function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);

  title.innerText = random(haikuLines.title);
}

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  title.addEventListener(`click`, changeLine);

  line1.addEventListener(`click`, changeLine);
  line2.addEventListener(`click`, changeLine);
  line3.addEventListener(`click`, changeLine);
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  fadeOut(event.target, 1);
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  } else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  } else {
    // Do nothing - we're done!
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1 || element === line3) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
    makePrediction();
  } else if (element === line2) {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
    makePrediction();
  } else if (element === title) {
    element.innerText = random(haikuLines.title);
    makePrediction();
  }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Sentiment

// function createSentiment() {
//   // Create a new Sentiment method
//   const sentiment = ml5.sentiment('movieReviews', modelReady);
// }

// When the model is loaded
function modelReady() {
  // model is ready
  console.log("Model Loaded!");
  modelIsReady = true;
}

function makePrediction() {

  if (modelIsReady) {
    console.log(modelReady);
    let haiku = document.getElementById(`haiku`);

    // make the prediction.
    const prediction = sentiment.predict(haiku.innerText);
    console.log(prediction);

    // Value between 0 ("negative") and 1 ("positive").
    // If the prediction is somewhat positive, the background color turns light blue.
    if (prediction.score >= 0.5) {
      // body.style.backgroundColor = #ffffff;
      document.body.style[`background-color`] = `#cffffe`;
      image.setAttribute(`src`, `https://media.giphy.com/media/VJwpqKafe4nwOAqBjd/giphy.gif`);
      statement.innerText = `Happy!`
    } else {
      document.body.style[`background-color`] = `#6e6e6e`;
      image.setAttribute(`src`, `https://media.giphy.com/media/gRnSZSRzOJeG4/giphy.gif`);
      statement.innerText = `Sad :'(`
    }
  }
}

// Button
let button = document.getElementById(`sentiment-button`);

button.addEventListener(`click`, function(event) {
  // We can get the current value set on the slider through its .value property
  // let value = slider.value;
  // alert(value);
  makePrediction();
});
