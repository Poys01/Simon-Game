
// button colors
let buttonColours = ["red", "blue", "green", "yellow"]
// Game Pattern
let gamePattern = [];
// variable to store user click
let userClickedPattern = [];
// variable to track if game started
let gameStarted = false;
// variable to keep track of the game level
let level = 0;


// function to detect keyboard press
$(document).keypress(function(){
   if (!gameStarted) {
         nextSequence();
      gameStarted = true;
   };
})
// function to track user click
$(".btn").click(function() {
   let userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
})


//function to get next sequence
function nextSequence() {
   level++;
   $("#level-title").text("Level "+ level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour); 
}

function playSound(name){
   let audio = new Audio ('sounds/'+name+'.mp3');
   audio.play(); 
}

function animatePress(currentColour) {
   $("."+currentColour).addClass("pressed");
   
   setTimeout(function() {
      $("."+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
   if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
      console.log("Success");

      if (userClickedPattern.length === gamePattern.length) {

      setTimeout (function(){
         nextSequence();
         userClickedPattern = [];
         }, 1000);
      }
   }   

   else {
   console.log("Wrong");
   $("#level-title").text("Game Over! Press Any Key to Restart")
   $("body").addClass("game-over");
   let audio = new Audio ("sounds/wrong.mp3");
         audio.play();
      setTimeout(function(){
         $("body").removeClass("game-over");
      }, 200)
   gameStarted = false;
   gamePattern = [];
   userClickedPattern = [];
   level = 0;
   }
}



