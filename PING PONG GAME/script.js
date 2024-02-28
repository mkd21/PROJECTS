// document.addEventListener("DOMContentLoaded" , function listener(){

let ball = document.getElementById("ball");
let outerBorder = document.getElementById("outline");

let ballX = 20;   // distance from left wall
let ballY = 20;
let dx = 2;
let dy = 2;

// ball.style.left = `${ballX + dx}px`;

setInterval(function exec(){

    ballX += dx;
    ballY += dy;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    if(ballX >= outerBorder.offsetWidth - ball.offsetWidth || ballX <= 0)
    {
        dx = dx * (-1);
    }

    if(ballY >= outerBorder.offsetHeight - ball.offsetWidth || ballY <= 0)
    {
        dy *= -1;
    }
}, 1);

// })