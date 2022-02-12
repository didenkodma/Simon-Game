// Initizlize variables
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Game start from keypress
$(document).on("keypress", function () {
   if (!started) {
      $('h1').text('Level ' + level);
      nextSequence();
      started = true;
   }
})

// If started === true use this block of code
$('.btn').click(function () {
   if (started === true) {
      let userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);

      playSound(userChosenColor);
      animatePress(userChosenColor);

      checkAnswer(userClickedPattern.length - 1);

   }
});



// Generates randomNumber
function nextSequence() {

   userClickedPattern = [];
   level++;
   $('h1').text('Level ' + level);

   let randomNumber = Math.round(Math.random() * 3);
   let randomChosenColor = buttonColours[randomNumber];

   gamePattern.push(randomChosenColor);
   $('#' + randomChosenColor).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);
}

// Play sounds
function playSound(name) {
   let activeAudio = new Audio('sounds/' + name + '.mp3');
   activeAudio.play();
}

// Animates button click
function animatePress(currentColour) {
   $("." + currentColour).addClass('pressed');
   setTimeout(function () {
      $("." + currentColour).removeClass('pressed')
   }, 100);
}

// Finds colours in array
function checkAnswer(currentLevel) {
   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function () {
            nextSequence();
         }, 1000);
      }
   } else {
      started = false;
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      $('h1').text('Game Over, Press Any Key to Restart');
      $('body').addClass('game-over');
      setTimeout(function () {
         $('body').removeClass('game-over');
      }, 200);
      playSound('wrong');
   }
}
