const cityInput = document.querySelector("input");
const searchBtn = document.querySelector(".bi-search");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind-speed");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let pressure = document.querySelector(".pressure");
let cityName = document.querySelector(".city");
let currentDay = document.querySelector(".current-day");
let temp = document.querySelector(".temp");
let feel = document.querySelector(".feels");
let rain = document.querySelector(".rain");
let winddir = document.querySelector(".winddir");
let heat = document.querySelector(".heat");
let day1 = document.querySelector(".day1");
let day1Temp = document.querySelector(".day1-temp");
let day2 = document.querySelector(".day2");
let day2Temp = document.querySelector(".day2-temp");
let day3 = document.querySelector(".day3");
let day3Temp = document.querySelector(".day3-temp");
let icon1 = document.querySelector(".icon1");
let icon2 = document.querySelector(".icon2");
let icon3 = document.querySelector(".icon3");
let iconMain = document.querySelector(".icon-main");
let condition = document.querySelector(".condition");
let forcastingDays = document.querySelectorAll(".forecasting-days");
const URL = "1560ea9512344ef4acf110725261706";
let FetchData;

// location request

window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        FetchData = await getWeather(`${lat},${lon}`);
        updateData(FetchData);
    }, async () => {
        FetchData = await getWeather("Delhi,india");
        updateData(FetchData);
    });
});

// When user search city name :- update data

searchBtn.addEventListener("click", async ()=>{
    FetchData = await getWeather(cityInput.value);
    updateData(FetchData);
});

async function getWeather(city) {

    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${URL}&q=${city}&days=4&aqi=no&alerts=no`
    );

    const details = await response.json();
    console.log(details);
    return details;
}

function updateData(data){
    humidity.innerText = `${data.current.humidity}%`;
    wind.innerText = `${data.current.wind_kph}kph`;
    sunrise.innerText = data.forecast.forecastday[0].astro.sunrise;
    sunset.innerText = data.forecast.forecastday[0].astro.sunset;
    pressure.innerText = `${data.current.pressure_mb}mb`;
    cityName.innerText = `${data.location.name} , ${data.location.country}`;
    currentDay.innerText = data.location.localtime;
    temp.innerText = `${data.current.temp_c}°C`;
    iconMain.src = "https:" + data.current.condition.icon;
    feel.innerText = `feels like ${data.current.feelslike_c}°C`;
    rain.innerText = data.current.chance_of_rain ;
    winddir.innerText = data.current.wind_dir ;
    heat.innerText = data.current.heatindex_c +"°C" ;
    day1.innerText = data.forecast.forecastday[1].date;
    day1Temp.innerText = data.forecast.forecastday[1].day.avgtemp_c + "°C";
    icon1.src = "https:" + data.forecast.forecastday[1].day.condition.icon;
    day2.innerText = data.forecast.forecastday[2].date;
    icon2.src = "https:" + data.forecast.forecastday[2].day.condition.icon;
    day2Temp.innerText = data.forecast.forecastday[2].day.avgtemp_c + "°C";
    day3.innerText = data.forecast.forecastday[3].date;
    day3Temp.innerText = data.forecast.forecastday[3].day.avgtemp_c + "°C";
    icon3.src = "https:" + data.forecast.forecastday[3].day.condition.icon;
    condition.innerText = data.current.condition.text;
}

// update date when user clicks on forecasting days

function UpdateForecastingData( data , id ){
    pressure.innerText = "N/A";
    currentDay.innerText = data.forecast.forecastday[id].date;
    temp.innerText = `${data.forecast.forecastday[id].day.avgtemp_c}°C`;
    feel.innerText = "feels like N/A";
    condition.innerText = data.forecast.forecastday[id].day.condition.text;
    humidity.innerText = data.forecast.forecastday[id].day.avghumidity + "%";
    rain.innerText = data.forecast.forecastday[id].day.daily_chance_of_rain + "%";
    sunrise.innerText = data.forecast.forecastday[id].astro.sunrise;
    sunset.innerText = data.forecast.forecastday[id].astro.sunset;
    wind.innerText = data.forecast.forecastday[id].day.maxwind_kph + "kph";
    iconMain.src = "https:" + data.forecast.forecastday[id].day.condition.icon;
    winddir.innerText = "N/A";
    heat.innerText = "N/A";
}

forcastingDays.forEach(day => {
    day.addEventListener("click" , () =>{
        const id = day.getAttribute("id");
        UpdateForecastingData( FetchData , id );
    })
});

// Enter key Functionality

cityInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        FetchData = await getWeather(cityInput.value);
        updateData(FetchData);
    }
});
