document.addEventListener("DOMContentLoaded" , () =>{

    let searchBarData = document.querySelector(".textArea");

    let desiredLocation = document.querySelector(".desiredLocation");
    let currentDate = document.querySelector(".currentDate");
    let currentWeather = document.querySelector(".currentWeather");
    let temperature = document.querySelector(".temperature");

    let imageOfWeather = document.querySelector("img");

    let minTemp = document.querySelector(".minTemp");
    let maxTemp = document.querySelector(".maxTemp");

    let APIfetchedTemperature = document.querySelectorAll(".apiFetchedTemperature");
    // console.log(APIfetchedTemperature);
    
    let getCountryNameinFull = (code) =>{

        let countryName = new Intl.DisplayNames([code], { type: 'region' });
        return countryName.of(code);
    }
    
    // for date and time (using internalationalisation object in js)

    let options = {
        year : "numeric",
        month : "long",
        day : "numeric",
        hour : "numeric",
        minute : "numeric"
    }
    let dateAndtime = (dt) =>{

        // we have got date in the form of seconds, which needs to be converted into milliseconds first and then get the date in real format. for that we use Date() object 
        let dateInMilliseconds = new Date(dt * 1000);
        console.log(dateInMilliseconds);

        const englishDate = new Intl.DateTimeFormat('en-US', options).format(dateInMilliseconds);
        console.log(englishDate);
        return englishDate;
    };

    let city = "Pune";
    
    searchBarData.addEventListener("keyup" , (e)=>{
        // console.log(e.target);
        if(e.key == "Enter")
            {
                console.log(e.target);
                console.log(e.target.value);
                city = e.target.value;
                getWeather();
                e.target.value = "";
            }
    })


    let getWeather = async () =>{
        
        try 
        {
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9af8bcbaea5a2e3ddeef1b03bd13e6f1`);
            
            let result = await res.json();
            console.log(result); 
            
            // destructuring to get the desired data from the object 
            let {main , name , weather , wind , sys , dt} = result;

            // will set the city name and country(full name of country)
            desiredLocation.innerText = `${name}, ${getCountryNameinFull(sys.country)}`;

                                    // working with dates 

            currentDate.innerText = dateAndtime(dt);

                                    // displaying the weather
            
            currentWeather.innerText = weather[0].main;  // because weather is an Array of objects

                                    // displaying image of the current weather
            
            imageOfWeather.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;  // got from open weather API

            
                                            // displaying the temperature 
            let tapmaan = main.temp - 273.15;    // API is giving temperature in kelvin, to convert it into degree celcius formula is used

            // note : toFixed() dont change the original number. it needs a new variable to store the result
            let tampmaanInCelcius = tapmaan.toFixed(2); // to control the decimal points. 

            temperature.innerHTML = `${tampmaanInCelcius}&#176 C`;
            // console.log("tapmaan",tampmaanInCelcius);


                                            // displaying min and max temperature 

            minTemp.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed(1)}&#176 C`;
            maxTemp.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed(1)}&#176 C`;


                                    // bottom details 
                
            let celciusTEmperatures = [];

            celciusTEmperatures.push((main.feels_like - 273.15).toFixed(1));
            celciusTEmperatures.push(main.humidity);
            celciusTEmperatures.push(wind.speed);
            celciusTEmperatures.push(main.pressure);

            console.log(celciusTEmperatures);
            celciusTEmperatures.forEach( (value , index) =>{
                if(index == 0){
                    APIfetchedTemperature[index].innerHTML = `${value} &#176`;
                }
                else if(index == 1){
                    APIfetchedTemperature[index].innerHTML = `${value} %`;
                }
                else if(index == 2){
                    APIfetchedTemperature[index].innerHTML = `${value} m/s`;
                }
                else{
                    APIfetchedTemperature[index].innerHTML = `${value} hPa`;
                }
            })
        }
        catch(err)
        {
            console.log("API galat diya hai",err);
        }
        
    }

    getWeather();
    
});
