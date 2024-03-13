let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");
let parent = document.querySelector(".parent");
let gradientText = document.getElementById("gradientText");

let colorGeneratorString = "0123456789ABCDEF";

// global declare because we can get access to update it on every click 

// first click me agar left btn click kiye to right wala default value pr rhega but next if we click right button then left wala default pr nhi jyega kyuki value is already updated

let colorLeft = "#000000";
let colorRight = "#FFFFFF";

function gradientGenerator()
{
    let color = "#";
    for(let i = 0; i <6; i++)
    {
        let index = Math.floor(Math.random() * 16);
        color = color + colorGeneratorString[index];
    }

    return color;
}

function changeColorLeft(eventObj)
{
    colorLeft = gradientGenerator();

    let leftBtn = eventObj.target;
    leftBtn.innerText = colorLeft;
    parent.style.background = `linear-gradient(to left , ${colorLeft} , ${colorRight})`;
    gradientText.innerText = `linear-gradient(to left , ${colorLeft} , ${colorRight})`;
    
}
function changeColorRight(eventObj)
{
    colorRight = gradientGenerator();

    let rightBtn = eventObj.target;
    rightBtn.innerText = colorRight;
    parent.style.background = `linear-gradient(to right , ${colorLeft} , ${colorRight})`;
    gradientText.innerText = `linear-gradient(to right , ${colorLeft} , ${colorRight})`;
}

leftBtn.onclick = changeColorLeft;
rightBtn.onclick = changeColorRight;

gradientText.addEventListener('click' , (eventObj) => {
    navigator.clipboard.writeText(gradientText.innerText);
    alert("copied the code");
});