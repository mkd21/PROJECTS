document.addEventListener("DOMContentLoaded" , () =>{
let parent = document.querySelector("#parent");
let input = document.querySelector("input");
let searchButton = document.querySelector("button");
let weatherImage = document.querySelector("#weatherImg");
let description_Image = document.querySelector("#description_Image");

let temperature = document.querySelector("#temperature");
let countryName = document.querySelector("#Country");
let City = document.querySelector("#city");

searchButton.disabled = true;

// internationalization object in javascript 
let countryNameDecoder = (sys) =>{
    let fullName = new Intl.DisplayNames(['en'] , {type : "region"});
    return fullName.of(sys.country);
}

let executor = async (inputField_data) =>{

    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputField_data}&appid=9af8bcbaea5a2e3ddeef1b03bd13e6f1`);
    
    if(res.status == 404)  // error handling 
    {       
        description_Image.textContent = "Enter a valid city name";
        temperature.textContent = "";
        countryName.textContent = "";
        City.textContent = "";
    }
    else
    {
        let data = await res.json();

        let {weather , main , sys , name} = data;

        weatherImage.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        description_Image.textContent = weather[0].description;
        temperature.textContent = `${(main.temp - 273.15).toFixed(0)} \u00B0 C`;

        City.textContent = name;

        countryName.textContent = countryNameDecoder(sys);

        input.value = "";   // makes input field empty after work is done
    }
}

input.addEventListener("keyup" , (e)=>{
    console.log("executed");
    if(e.target.value.length >= 4)
        searchButton.disabled = false;
})


executor("New Delhi");

searchButton.addEventListener("click" , () => executor(input.value));

});