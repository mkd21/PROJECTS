document.addEventListener("DOMContentLoaded" , () => {

    let parentBoard = document.getElementById("board");
    const cellSize = 20;
    let GameArea = 500;
    let score = 0;
    let gameStarted = false;

    let Food = {x : 220 , y : 200};
    let Snake = [{x : 160 , y : 200}, {x : 140 , y : 200} , {x : 120 , y : 200}];
    let dx = cellSize;
    let dy = 0;

    let gameSpeed = 800;
    let intervalId;

    function drawScoreBoard()
    {
        let Score = document.getElementById("scorebrd");
        Score.textContent = `Score: ${score}`;
    }

    function createFood(x , y , className)
    {
        let div = document.createElement("div");
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    function  moveFood()
    {
        let xCoordinate;
        let yCoordinate
        do{
            xCoordinate = Math.floor( Math.random() * ((GameArea - cellSize)/cellSize)) * cellSize;
            yCoordinate = Math.floor( Math.random() * ((GameArea - cellSize) / cellSize)) *cellSize;

            // console.log(xCoordinate);
            // console.log(yCoordinate);
        }
        while(Snake.some( (elem) => {
            elem.x == xCoordinate && elem.y == yCoordinate;       // to make sure that food don't appear inside snake body
        }));
        
        Food.x = xCoordinate;
        Food.y = yCoordinate;
    }

    function updateSnake()
    {
        let newHead = {x : Snake[0].x + dx , y : Snake[0].y + dy};
        Snake.unshift(newHead);
        if(newHead.x == Food.x && newHead.y == Food.y)  // collision will happen in this condition
        {
            score += 5;
            if(gameSpeed > 60)
            {
                gameSpeed = gameSpeed - 20;
                clearInterval(intervalId);
                startTheGame();
            }
            moveFood();   // after snake hits the food then it will re-appear somewhere else 
        }
        else 
        {
            Snake.pop();
        }
    }

    function drawSnakeAndFood() 
    {
        board.innerHTML = "";   // reRendering the whole thing 
        
        let food = createFood(Food.x , Food.y , "food");
        parentBoard.appendChild(food);

        // creating snake 
        Snake.forEach( (element)=>{
 
            const div = document.createElement("div");
            div.classList.add("naaguba");
            div.style.top = `${element.y}px`;
            div.style.left = `${element.x}px`;

            parentBoard.appendChild(div);
        });

    }
    
    function isGameOver()
    {
        // if snake collides with itself
        for(let i = 1; i < Snake.length; i++)
        {
            if(Snake[0].x == Snake[i].x && Snake[0].y == Snake[i].y)
            {
                return true;
            }
        }
        // if snake collides with the walls

        const leftWall = Snake[0].x < 0;
        const rightWall = Snake[0].x > GameArea;

        const topWall = Snake[0].y < 0;
        const bottomWall = Snake[0].y > GameArea;


        return leftWall || rightWall || topWall || bottomWall;
    }

    function startTheGame()
    {
        // console.log(gameSpeed);
        intervalId = setInterval( ()=>{
            // console.log(gameSpeed);

            if(!gameStarted){return;}
            
            if( isGameOver() )
            {
                gameStarted = false;
                console.log("again and again");
                alert(`Game over, your score is ${score}`);
                window.location.reload();
                return;
            }
            updateSnake();
            drawScoreBoard();
            drawSnakeAndFood();
             
        } , gameSpeed);
        
    }  

    function directions(e)
    {   
        let keyPressed = e.keyCode;

        let leftKey = 37;
        let upKey = 38;
        let rightKey = 39;
        let bottomKey = 40;

        let isGoingleft = dx == -cellSize;
        console.log(isGoingleft);

        let isGoingTop = dy == -cellSize;
        console.log(isGoingTop);

        let isGoingRight = dx == cellSize;
        console.log(isGoingRight);

        let isGoingDown = dy == cellSize;
        console.log(isGoingDown);

        if(leftKey == keyPressed && !isGoingRight){
            console.log("left key pressed");
            console.log(isGoingRight);
            dx = -cellSize;
            dy = 0;
        }
        if(upKey == keyPressed && !isGoingDown){
            console.log("up key pressed");
            console.log(isGoingDown);
            dx = 0;
            dy = -cellSize;
        }
        if(rightKey == keyPressed && !isGoingleft){
            console.log("right key pressed");
            console.log(!isGoingleft);
            dx = cellSize;
            dy = 0;
        }
        if(bottomKey == keyPressed && !isGoingTop){
            console.log("bottom key pressed");
            console.log(isGoingTop);
            dy = cellSize;
            dx = 0;
        }
    } 

    function gameLoop()
    {
        gameStarted = true;
        startTheGame();
        // document.addEventListener("keydown" , directions);
    }
    
    function loadGameContents()
    {
        const scoreBoard = document.createElement("div");
        // scoreBoard.textContent = "10";   
        scoreBoard.classList.add("score");
        scoreBoard.id = "scorebrd";
        document.body.insertBefore(scoreBoard , parentBoard);
        
        const startButton = document.createElement("button");
        startButton.id = "strtbtn";
        startButton.classList.add("startBtn");
        startButton.textContent = "Start Game";
        
        document.body.appendChild(startButton);
        
        // action on start button click 
        startButton.addEventListener("click" , gameLoop);
        
        document.addEventListener("keydown" , directions);
    }

    loadGameContents();

});