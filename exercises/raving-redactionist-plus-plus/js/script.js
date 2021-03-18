/**
Top Secret SCP File
Valentine Sénégas
You are redacting a document, but it keeps becoming unredacted!
Click the secret information to hide it, don`t let all the
secrets become revealed!
*/

"use strict";

// The chance a span will be revealed per update
const REVEAL_PROBABILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// A place to store the jQuery selection of all secrets
let $secrets;

setup();

/** Sets the click handler and starts the time loop */
function setup() {
  // Save the selection of all secrets (since we do stuff to them multiple times)
  $secrets = $(`.secret`);
  // Set a click handler on the secrets (so we know when they`re clicked)
  $secrets.on(`click`, redact);
  // Set an interval of 500 milliseconds to attempt the revelation of secrets
  setInterval(revelation, UPDATE_FREQUENCY);
};

/**
When a secret is clicked we remove its revealed class and add the redacted class
thus blacking it out
*/
function redact() {
  if ($(`.secret`).hasClass("redacted")) {
    $(this).removeClass(`revealed`);
    $(this).addClass(`redacted`);
  }
}

/**
Update is called every 500 milliseconds and it updates all the secrets on the page
using jQuery`s each() function which calls the specified function on _each_ of the
elements in the selection
*/
function revelation() {
  $secrets.each(attemptReveal);

  // If none of the secret texts have the class redacted, it means they are all revealed.
  if (!$(`.secret`).hasClass("redacted")) {
    console.log("All the secrets are revealed!");

    let $lost = $(`#lost`);
    $lost.css(`display`, `flex`);

    let $revealed = $(`.redacted`);
    $revealed.css(`user-select`, `none`);
  }
}

/**
With random chance it unblanks the current secret by removing the
redacted class and adding the revealed class. Because this function is called
by each(), "this" refers to the current element that each has selected.
*/
function attemptReveal() {
  let r = Math.random();
  if (r < REVEAL_PROBABILITY) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
