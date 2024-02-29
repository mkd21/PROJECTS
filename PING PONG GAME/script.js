document.addEventListener("DOMContentLoaded" , function listener(){

let ball = document.getElementById("ball");
let outerBorder = document.getElementById("outline");
let paddle = document.getElementById("paddle");

let ballX = 20;     // distance from left wall
let ballY = 20;    // distance from top wall
let dx = 2;       // displacement in x axis 
let dy = 2;      // displacement in y axis


setInterval(function exec(){

    ballX += dx;    // distance in x axis
    ballY += dy;    // distance in y axis

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    // for x axis movent of the ball 
    if(ballX >= outerBorder.offsetWidth - ball.offsetWidth || ballX <= 0)
    {
        dx = dx * (-1);
    }

    // for y axis movement of the ball 
    if(ballY >= outerBorder.offsetHeight - ball.offsetWidth || ballY <= 0)
    {
        dy *= -1;
    }

}, 1);

// LOGIC FOR PADDLE 

let paddleY = 30;
let pdy = 20;

// function paddleMovement(event)
// {
//     console.log("inside event");
//     // event.preventDefault();

//     // if(event.keyCode == 40)
//     // {
//     //     paddle.style.top = `${paddleY + pdy}px`;

//     // }
// }

document.addEventListener("keydown" , function paddleMovement(event){

    event.preventDefault();          // will prevent scroll bar from moving 
    // console.log("inside event");
    
                                                                // height of the paddle
    if(event.keyCode == 40 && paddleY < outerBorder.offsetHeight - paddle.offsetHeight)   // down key
    {
        paddleY += pdy;
    }
    else if(event.keyCode == 38 && paddleY > 0)    // up key
    {
        paddleY += pdy * (-1);
    }

    // putting the updated value in the paddle ---> which will make it move up and down
    paddle.style.top = `${paddleY}px`;

});


})