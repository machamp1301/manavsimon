
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    console.log("value of started" + started);
    $("#level-title").text("Level " + level);
    console.log("Value of level "  + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
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

let question1 = "What's my name?";
let answer1 = "virendra";
let userAnswer = " ";

// function appendText() {
//   var txt1 = "<p>Text.</p>";        // Create text with HTML
//   var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
//   var txt3 = document.createElement("p");
//   txt3.innerHTML = "Text.";         // Create text with DOM
//   $("body").append(txt1, txt2, txt3);   // Append new elements
// }

function nextSequence() {
  console.log("entering the nextSequence");
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // add a if ststment ...start..
      if (level === 2){
        console.log("checking level 2");

      $("#level-title").after("Question: " + question1);

      // var txt3 =  document.createElement("p");

      }

  // add if statment ..end...

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  //let level = level.toString(1);
  var audio = new Audio("sounds/" + level + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
