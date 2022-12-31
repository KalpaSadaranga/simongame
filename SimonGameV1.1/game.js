let buttonColours=["red","blue","green","yellow"];
 //window.alert("Hello");
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;

$(document).keypress( function(event){
    if (!started){$("#level-title").text("Level 0");
        nextSequence();
    }
    //nextSequence();
    started=true;
});

$(".btn").click(

    function(){
        
        let userChosenColour=$(this).attr('id');
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
);

function nextSequence() {
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    userClickedPattern=[];
    level=level+1;
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);   

    $("#level-title").text("Level "+level);
}

function playSound(name){
    let audio=new Audio("./sounds/"+name+".mp3");
    audio.play()    
}

function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){  //current level is related to game colour index

    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gamePattern=[];
        userClickedPattern=[];
        level=0;
        started=false;
    }
}



