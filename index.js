// Now I gonna to create a new simple game practicing JS with the DOM, using jquery

console.log("Welcome to the Simon Game! Press any key to start.");

const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

let started = false;

// Create a new variable called level and start at level 0.
let level = 0;

function nextSequence() {
  userClickedPattern.length = 0; // Clear the userClickedPattern for the next level
  level++;
  $("#level-title").text("Level " + level);
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

// Arranque después de interacción del usuario (autoplay-safe)
$(document).one("keydown click", function () {
  started = true;
  nextSequence();
});

// Use jquery to detect button clicks and trigger a handler function
$(".btn").click(function () {
  if (!started) return; // Ignore clicks if the game hasn't started

  // so if the green button is clicked, userChosenColor will be "green" its id which is "green"

  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  // called animatePress() to animate the button that gets clicked.
  animatePress(userChosenColor);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// Add a keydown event listener to the document
$(document).keydown(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
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