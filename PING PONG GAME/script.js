document.addEventListener("DOMContentLoaded" , function listener(){

let ball = document.getElementById("ball");
let outerBorder = document.getElementById("outline");
let paddleLeft = document.getElementById("paddleLeft");
let paddleRight = document.getElementById("paddleRight");

// let x = paddleRight.style.left = `${outerBorder.offsetWidth - paddleLeft.offsetLeft}px`;
// console.log(x);
// let for_decoration_border = document.getElementById("for_decoration_border");
// for_decoration_border.style.cssText = " display : flex; justify-content: center; align-items : center; background-color : black; height : 500px; width : 800px; border : 1px solid brown;";


/////////////////////////////////////////////////////////////////////////////////////////////////
// movement of the ball 

let ballX = 20;     // distance from left wall
let ballY = 20;    // distance from top wall
let dx = 2;       // displacement in x axis 
let dy = 2;      // displacement in y axis

ball.style.left = `${ballX}px`;
ball.style.top = `${ballY}px`;

///////////////////////////////////////////////////////////////////

setInterval(function exec(){
        
        ballX += dx;    // distance in x axis
        ballY += dy;    // distance in y axis
        
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    
        
        //  |<-------------rebound for x axis--------------------->|   |<-----------------checking if the ball is inside the area of paddle or not-------------------->|
        if( ballX <= paddleLeft.offsetLeft + paddleLeft.offsetWidth &&  ballY >= paddleLeft.offsetTop &&  ballY + ball.offsetHeight < paddleLeft.offsetTop + paddleLeft.offsetHeight)
        {
            dx *= -1;
        } 
        

        // for x axis movent of the ball 
        if(ballX >= outerBorder.offsetWidth - ball.offsetWidth || ballX <= 0)
        {
            // console.log(ballX);
            dx = dx * (-1);
        }

        // for y axis movement of the ball 
        else if(ballY >= outerBorder.offsetHeight - ball.offsetWidth || ballY <= 0)
        {
            dy *= -1;
        }

}, 1);


// LOGIC FOR PADDLE 

let paddleY = 30;
let pdy = 20;


// document.addEventListener("keydown" , function paddleMovement(event){

//     event.preventDefault();          // will prevent scroll bar from moving 
//     // console.log("inside event");

//                                                                 // height of the paddle
//     if(event.keyCode == 40 && topHeight < outerBorder.offsetHeight - paddle.offsetHeight)   // down key
//     {
//         topHeight += pdy;
//     }
//     else if(event.keyCode == 38 && topHeight > 0)    // up key
//     {
//         topHeight += pdy * (-1);    // decreasing the top height
//     }

//     // putting the updated value in the paddle ---> which will make it move up and down
//     paddle.style.top = `${topHeight}px`;

// });

document.addEventListener("mousemove" , function exec(event){
    event.preventDefault();

    let mousepointerDistanceFromTop = event.clientY;         // pointer distance on y axis
    let mousePinterDistanceHorizontally = event.clientX;     // pointer distance on x axis
    let distanceOfOuterBorderFromTop = outerBorder.offsetTop;    // main box distance from top
    let controlPoint = mousepointerDistanceFromTop - distanceOfOuterBorderFromTop - paddleLeft.offsetHeight / 2;    // point from where we will control the paddle
    

    // this will give controll to the right paddle
    if(mousePinterDistanceHorizontally > outerBorder.offsetLeft + outerBorder.offsetWidth / 2){
        return;
    }
    

    paddleY = controlPoint;   // paddle move krte jyega jaise jaise controlPoint ka value badhega
    if(paddleY <= 0 || paddleY > outerBorder.offsetHeight - paddleLeft.offsetHeight)
    {
        return;
    }

    paddleLeft.style.top = `${paddleY}px`;

})


})