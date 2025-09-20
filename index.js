// Now I gonna to create a new simple game practicing JS with the DOM, using jquery

console.log("Welcome to the Simon Game! Press any key to start.");

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;

// Create a new variable called level and start at level 0.
let level = 0;

// Inicia juego con teclado o toque (móvil)
$(document).on("keydown", startGameOnce);
$(document).on("touchstart", startGameOnce);

function startGameOnce() {
  if (!started) {
    started = true;
    level = 0;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
}

function nextSequence() {
  userClickedPattern.length = 0; // Clear the userClickedPattern for the next level
  level++;
  $("#level-title").text("Level " + level);
  // Generate a random number between 0 and 3
  // Use the random number to select a random color from the buttonColors array
  // Add the new random color to the end of the gamePattern.
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Efecto visual con jQuery
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // Sonido
  playSound(randomChosenColor);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Use jquery to detect button clicks and trigger a handler function
$(".btn").click(function () {
  if (!started) return; // Ignore clicks if the game hasn't started

  // so if the green button is clicked, userChosenColor will be "green" its id which is "green"

  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  // called animatePress() to animate the button that gets clicked.
  animatePress(userChosenColor);

  // verify the last step of the user
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
  // compare step to step
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // if the user completed the sequence, go to next level
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
      }
    } else {
      // error sound
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
  // reset variables
  level = 0;
  gamePattern = [];
  started = false;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100); // 0.1 second
}