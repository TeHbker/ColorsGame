// Список кольорів для гри
var colors = ["red", "blue", "yellow", "green"];

// Шабллони кольорів
var gamePattern = [];
var userClickedPattern = [];

var level = 0; //рівень складності
var gameStart = false; //Початок гри


//зГра запускається при натисканні клавіши рівень
$(document).keypress(function() {

  if (gameStart === false) {
    $("#title").text("Level " + level);
    randomColor();
    gameStart = true;
  }
});


// Ми додамо звук до кліку за допомогою функції playSound і дозволимо гравцеві натиснути попередню кнопку відповідно до правил
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor)

  checkingAnswer(userClickedPattern.length - 1);

});

// Перевірка чи = масив потрібному
// Робимо затримку, для наступного вибору, якщо рівні
// Інакше викор. класс нерівності і проходить обнулення гри
function checkingAnswer(usersLevel) {
  if (gamePattern[usersLevel] === userClickedPattern[usersLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        randomColor();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("gameOver");
    $("#title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("gameOver");
    }, 250);

    startOver();
  }
}
// Анімація натискання
$(".btn").click(function() {

  var anim = $(this);

  anim.addClass("pressed");

  setTimeout(function() {
    anim.removeClass("pressed");
  }, 200);

})

// Функція для отримання випадкового числа а також
// включення анімації за допомогою функції FadeIn, FadeOut і відтворення звуку
// шляхом вибору звуку відповідно до випадкового кольору, отриманого випадковим чином.
function randomColor() {

  userClickedPattern = [];

  level++;

  $("#title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = colors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}
// Відтворення звуку
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}



// Повне анулювання гри та всіх досягнень
function startOver() {
  level = 0;
  gameStart = false;
  gamePattern = [];
}
