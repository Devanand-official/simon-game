const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(() => {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    console.log("wrong");
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const color = gamePattern[i];
    $("#" + color)
      // .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(color);
    i++;
    if (i >= gamePattern.length) clearInterval(interval);
  }, 600);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSequence();

  // $("#" + randomChosenColor)
  //   .fadeOut(100)
  //   .fadeIn(100);
  // playSound(randomChosenColor);
  //   new Audio(`sounds/${randomChosenColor}.mp3`).play();
  // --->  click(checkAnswer())
}

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// $(".btn").click($(".btn"), function () {
//   $(this).fadeOut(100).fadeIn(100);
//   new Audio("sounds/red.mp3").play();
// });

//   <----------------------IF-ELSE---------------------->
//   if ($("#") == randomChosenColor) {
//     var colors = new Audio(`sounds/${randomChosenColor}.mp3`);
//     colors.play();
//   } else {
//     var wrong = new Audio(`sounds/wrong.mp3`);
//     wrong.play();
//   }

// <------------------SWITCH CASE---------------->
//   switch (randomChosenColor) {
//     case "red":
//       new Audio("sounds/red.mp3").play();
//       break;

//     case "blue":
//       new Audio("sounds/blue.mp3").play();
//       break;

//     case "green":
//       new Audio("sounds/green.mp3").play();

//       break;

//     case "yellow":
//       new Audio("sounds/yellow.mp3").play();
//       break;

//     default:
//       new Audio("sounds/wrong.mp3").play();
//       break;
//   }

// if(btn==randomChosenColor){
//     var colors = new Audio(`sounds/${randomChosenColor}.mp3`);
//   }
//   else{
//     var wrong = new Audio(`sounds/wrong.mp3`);
//   }
