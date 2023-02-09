$('.btn').click(handlerFunction);
const buttonColours=["red", "blue", "green", "yellow" ]
let gamePattern=[]
let userClickedPattern=[]
let gameStart=false
let level=0
$(document).keypress(function (e) { 
    if(gameStart===false)    {
        let x=gameStart===false
        level=0
        gameStart=true;
        nextSequence();
    }
});


function nextSequence() {
    if(gameStart){
    let randomNumber =Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio=new Audio(`./sounds/${randomChosenColour}.mp3`)
    audio.play()
    ++level
    $('h1').html(`Level ${level}`);
  };
}
function handlerFunction(event) {
  if(gameStart){
    console.log(this)
    userChosenColour =this.id;
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour);
    checkAnswer()
  }
  

};
function animatePress(color)
{
 $('#'+color).addClass('pressed');    
 setTimeout(() => {
    $('#'+color).removeClass('pressed');
 }, 100)
}

function checkAnswer(){
    let i
    for( i=0; i<userClickedPattern.length;++i){
        if(!(userClickedPattern[i]===gamePattern[i])){
            $('h1').html("Game Over, Press Any Key to Restart");
            let audio=new Audio('./sounds/wrong.mp3')
            audio.play()
            $('body').addClass('game-over');
            setTimeout(() => {
                $('body').removeClass('game-over');
            }, 200);
            gamePattern.length=0
            userClickedPattern.length=0

            gameStart=false;
            break;
        }
    }
    console.log(i)
    if(i===level){
        userClickedPattern.length=0
        nextSequence();
    }

}