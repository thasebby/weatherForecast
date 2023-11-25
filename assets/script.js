 //get the city and run through the getWeather function
 document.getElementById('searchBTN').addEventListener('click',function(){
    const city = document.getElementById('city').value;
    getWeather(city);

  });

  function getWeather(city){
    const key = '135202583596db3d5b3179ea8da4ae2a';
    //get the weather
    const webURL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
   //get the forecast
    const foreURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;


    fetch(webURL)
        .then(response => response.json())
        .then(data =>{
            displayWeather(data);
        })
    
    fetch(foreURL)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })

  }

  function displayWeather(data) {
    const tempInKelvin = data.main.temp;
    //change from kelvin into fahrenheit
    const tempInFahr = (tempInKelvin - 273.15) * 9/5 + 32;
    //remove decimals from temperature
    var displayFahr = Math.trunc(tempInFahr);
    //get wind speed in MPS
    var windSpeed = data.wind.speed;
    //transform to MPH
    var windSpeedMPH = (windSpeed * 2.23694);
    //remove extra decimals
    var displaySpeed = Math.trunc(windSpeedMPH);

    const displayWeather = `
    <h2>${data.name}</h2>
    <p>Temperature: ${displayFahr} &#8457;</p>
    <p>Wind: ${displaySpeed} MPH</p>
    <p>Humidity: ${data.main.humidity}%</p>
    `;
    
    document.getElementById('displayWeather').innerHTML = displayWeather;
    }

    function displayForecast(data){
    //gets the forecast for the next 40 days
        const foreList = data.list;
        let forecast = '<h1>5-Day Forecast</h1>';

        for(let i = 0; i < foreList.length; i+=8){
            const foreData = foreList[i];
            const date = new Date(foreData.dt *1000);

            const tempInKelvin = foreData.main.temp;
            //change from kelvin into fahrenheit
            const tempInFahr = (tempInKelvin - 273.15) * 9/5 + 32;
            //remove decimals from temperature
            var displayFahr = Math.trunc(tempInFahr);
            //get wind speed in MPS
            var windSpeed = foreData.wind.speed;
            //transform to MPH
            var windSpeedMPH = (windSpeed * 2.23694);
            //remove extra decimals
            var displaySpeed = Math.trunc(windSpeedMPH);

            forecast +=  `
            <p>${date.toDateString()}</p>
            <p>Temperature: ${displayFahr} &#8457;</p>
            <p>Wind: ${displaySpeed} MPH</p>
            <p>Humidity: ${foreData.main.humidity}%</p>
            `;

        }
        document.getElementById('fiveDay').innerHTML = forecast;     
    }
   
