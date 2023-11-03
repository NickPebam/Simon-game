var buttonColours = ["blue","red","green","yellow"];

var gamePattern = [];
var clickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keypress", function (){

    if (!started){
        var levelTitle = document.getElementById("level-title"); 
        levelTitle.textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});


var buttons = document.querySelectorAll(".btn");

buttons.forEach(function(button) {
  
    button.addEventListener("click", function() {
    var userChosenColour = button.id;
    clickedPattern.push(userChosenColour);

    makeSound(userChosenColour);
    animatedPress(userChosenColour);

    checkAnswer(clickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel){
    if( gamePattern[currentLevel] === clickedPattern[currentLevel] ){
        if (gamePattern.length === clickedPattern.length){
            setTimeout(function (){
                nextSequence()
            },"1000");
        }
    }
    else {
        makeSound("wrong");
        var element=document.body;
        element.classList.add("game-over");
        var title = document.getElementById("level-title");
        title.textContent = "Game Over , Press any key to restart"; 
        
        setTimeout(function () {
            element.classList.remove("game-over");    
        },"100");
    
        startOver();
    }
}

function nextSequence(){

    clickedPattern = [];
    level++;
    var levelTitle = document.getElementById("level-title");
    levelTitle.textContent = "Level "+ level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColours[randomNumber];
    gamePattern.push(randomColor);

    var element = document.getElementById(randomColor);
    element.classList.add("pressed");
    setTimeout(function () {
        element.classList.remove("pressed");
    }, "100");
    makeSound(randomColor);


}

function animatedPress(currentColor) {
    
    var element = document.getElementById(currentColor);
    element.classList.add("pressed");
    setTimeout(function () {
        element.classList.remove("pressed");
    }, "100");
}

function makeSound(name){

        var audio = new Audio("sound/"+ name +".mp3");
        audio.play();
    
}   


function startOver(){

    level = 0 ;
    gamePattern = [];
    
    started = false;
}