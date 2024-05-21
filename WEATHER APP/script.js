document.addEventListener("DOMContentLoaded" , () =>{

    let desiredLocation = document.querySelector(".desiredLocation");
    let currentDate = document.querySelector(".currentDate");
    let currentWeather = document.querySelector(".currentWeather");
    let temperature = document.querySelector(".temperature");
    let minTemp = document.querySelector(".minTemp");
    let maxTemp = document.querySelector(".maxTemp");


    desiredLocation.innerText = "Pune, India";

    let date = new Date();
    console.log(date);
    currentDate.innerText = date;
    
    
    let getWeather = async () =>{
        
        try 
        {
            let res = await fetch("httpss://api.openweathermap.org/data/2.5/weather?q=Delhi&APPID=9af8bcbaea5a2e3ddeef1b03bd13e6f1");
            
            let result = await res.json();
            console.log(result);
            
            // destructuring to get the desired data from the object 
            let {main , name , weather , wind , sys , dt} = result;
            desiredLocation.innerText = `${name}, ${sys.country}`;
            
        }
        catch(err)
        {
            console.log(err);
        }

        
    }
    getWeather();
    
});
