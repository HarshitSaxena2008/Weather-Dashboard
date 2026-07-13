const URL = "1560ea9512344ef4acf110725261706";
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

window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const data = await getWeather(`${lat},${lon}`);
        updateData(data);
    }, async () => {
        const data = await getWeather("Delhi,india");
        updateData(data);
    });
});

searchBtn.addEventListener("click", async ()=>{
    let data = await getWeather(cityInput.value);
    updateData(data);
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
    rain.innerText = `${data.current.chance_of_rain}%` ;
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

// {location: {…}, current: {…}, forecast: {…}}
// current
// : 
// chance_of_rain
// : 
// 1
// chance_of_snow
// : 
// 0
// cloud
// : 
// 11
// condition
// : 
// {text: 'Dust storm', icon: '//cdn.weatherapi.com/weather/64x64/day/134.png', code: 1021}
// dewpoint_c
// : 
// 13.3
// dewpoint_f
// : 
// 55.9
// diff_rad
// : 
// 149.73
// dni
// : 
// 0
// feelslike_c
// : 
// 34.6
// feelslike_f
// : 
// 94.3
// gti
// : 
// 0
// gust_kph
// : 
// 23.2
// gust_mph
// : 
// 14.4
// heatindex_c
// : 
// 43.9
// heatindex_f
// : 
// 110.9
// humidity
// : 
// 18
// is_day
// : 
// 1
// last_updated
// : 
// "2026-06-17 16:30"
// last_updated_epoch
// : 
// 1781694000
// precip_in
// : 
// 0
// precip_mm
// : 
// 0
// pressure_in
// : 
// 29.47
// pressure_mb
// : 
// 998
// short_rad
// : 
// 655.9
// temp_c
// : 
// 42.6
// temp_f
// : 
// 108.6
// uv
// : 
// 1.9
// vis_km
// : 
// 4.8
// vis_miles
// : 
// 2
// will_it_rain
// : 
// 0
// will_it_snow
// : 
// 0
// wind_degree
// : 
// 324
// wind_dir
// : 
// "NW"
// wind_kph
// : 
// 20.2
// wind_mph
// : 
// 12.5
// windchill_c
// : 
// 42.5
// windchill_f
// : 
// 108.6
// [[Prototype]]
// : 
// Object
// forecast
// : 
// forecastday
// : 
// Array(3)
// 0
// : 
// astro
// : 
// {sunrise: '05:20 AM', sunset: '07:09 PM', moonrise: '07:04 AM', moonset: '09:24 PM', moon_phase: 'Waxing Crescent', …}
// date
// : 
// "2026-06-17"
// date_epoch
// : 
// 1781654400
// day
// : 
// {maxtemp_c: 43.2, maxtemp_f: 109.7, mintemp_c: 33.4, mintemp_f: 92.1, avgtemp_c: 38.5, …}
// hour
// : 
// Array(24)
// 0
// : 
// {time_epoch: 1781634600, time: '2026-06-17 00:00', temp_c: 35.6, temp_f: 96.1, is_day: 0, …}
// 1
// : 
// {time_epoch: 1781638200, time: '2026-06-17 01:00', temp_c: 35.3, temp_f: 95.5, is_day: 0, …}
// 2
// : 
// {time_epoch: 1781641800, time: '2026-06-17 02:00', temp_c: 34.9, temp_f: 94.8, is_day: 0, …}
// 3
// : 
// {time_epoch: 1781645400, time: '2026-06-17 03:00', temp_c: 34.6, temp_f: 94.2, is_day: 0, …}
// 4
// : 
// {time_epoch: 1781649000, time: '2026-06-17 04:00', temp_c: 34.3, temp_f: 93.8, is_day: 0, …}
// 5
// : 
// {time_epoch: 1781652600, time: '2026-06-17 05:00', temp_c: 33.4, temp_f: 92.1, is_day: 1, …}
// 6
// : 
// {time_epoch: 1781656200, time: '2026-06-17 06:00', temp_c: 34.1, temp_f: 93.4, is_day: 1, …}
// 7
// : 
// {time_epoch: 1781659800, time: '2026-06-17 07:00', temp_c: 35.7, temp_f: 96.2, is_day: 1, …}
// 8
// : 
// {time_epoch: 1781663400, time: '2026-06-17 08:00', temp_c: 37.7, temp_f: 99.9, is_day: 1, …}
// 9
// : 
// {time_epoch: 1781667000, time: '2026-06-17 09:00', temp_c: 39.6, temp_f: 103.3, is_day: 1, …}
// 10
// : 
// {time_epoch: 1781670600, time: '2026-06-17 10:00', temp_c: 40.9, temp_f: 105.7, is_day: 1, …}
// 11
// : 
// {time_epoch: 1781674200, time: '2026-06-17 11:00', temp_c: 42, temp_f: 107.5, is_day: 1, …}
// 12
// : 
// {time_epoch: 1781677800, time: '2026-06-17 12:00', temp_c: 42.7, temp_f: 108.9, is_day: 1, …}
// 13
// : 
// {time_epoch: 1781681400, time: '2026-06-17 13:00', temp_c: 43.2, temp_f: 109.7, is_day: 1, …}
// 14
// : 
// {time_epoch: 1781685000, time: '2026-06-17 14:00', temp_c: 42.3, temp_f: 108.2, is_day: 1, …}
// 15
// : 
// {time_epoch: 1781688600, time: '2026-06-17 15:00', temp_c: 42.3, temp_f: 108.1, is_day: 1, …}
// 16
// : 
// {time_epoch: 1781692200, time: '2026-06-17 16:00', temp_c: 42.6, temp_f: 108.6, is_day: 1, …}
// 17
// : 
// {time_epoch: 1781695800, time: '2026-06-17 17:00', temp_c: 42.2, temp_f: 108, is_day: 1, …}
// 18
// : 
// {time_epoch: 1781699400, time: '2026-06-17 18:00', temp_c: 41.5, temp_f: 106.7, is_day: 1, …}
// 19
// : 
// {time_epoch: 1781703000, time: '2026-06-17 19:00', temp_c: 39.9, temp_f: 103.8, is_day: 0, …}
// 20
// : 
// {time_epoch: 1781706600, time: '2026-06-17 20:00', temp_c: 38.9, temp_f: 102.1, is_day: 0, …}
// 21
// : 
// {time_epoch: 1781710200, time: '2026-06-17 21:00', temp_c: 38.4, temp_f: 101.2, is_day: 0, …}
// 22
// : 
// {time_epoch: 1781713800, time: '2026-06-17 22:00', temp_c: 37.3, temp_f: 99.2, is_day: 0, …}
// 23
// : 
// {time_epoch: 1781717400, time: '2026-06-17 23:00', temp_c: 35.4, temp_f: 95.7, is_day: 0, …}
// length
// : 
// 24
// [[Prototype]]
// : 
// Array(0)
// [[Prototype]]
// : 
// Object
// 1
// : 
// astro
// : 
// {sunrise: '05:20 AM', sunset: '07:09 PM', moonrise: '08:16 AM', moonset: '10:10 PM', moon_phase: 'Waxing Crescent', …}
// date
// : 
// "2026-06-18"
// date_epoch
// : 
// 1781740800
// day
// : 
// avghumidity
// : 
// 33
// avgtemp_c
// : 
// 37.1
// avgtemp_f
// : 
// 98.8
// avgvis_km
// : 
// 2.5
// avgvis_miles
// : 
// 1
// condition
// : 
// {text: 'Severe sandstorm', icon: '//cdn.weatherapi.com/weather/64x64/day/140.png', code: 1027}
// daily_chance_of_rain
// : 
// 1
// daily_chance_of_snow
// : 
// 0
// daily_will_it_rain
// : 
// 0
// daily_will_it_snow
// : 
// 0
// maxtemp_c
// : 
// 42.8
// maxtemp_f
// : 
// 109.1
// maxwind_kph
// : 
// 34.9
// maxwind_mph
// : 
// 21.7
// mintemp_c
// : 
// 33
// mintemp_f
// : 
// 91.4
// totalprecip_in
// : 
// 0
// totalprecip_mm
// : 
// 0
// totalsnow_cm
// : 
// 0
// uv
// : 
// 10.7
// [[Prototype]]
// : 
// Object
// hour
// : 
// (24) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// [[Prototype]]
// : 
// Object
// 2
// : 
// {date: '2026-06-19', date_epoch: 1781827200, day: {…}, astro: {…}, hour: Array(24)}
// length
// : 
// 3
// [[Prototype]]
// : 
// Array(0)
// [[Prototype]]
// : 
// Object
// location
// : 
// country
// : 
// "India"
// lat
// : 
// 26.7667
// localtime
// : 
// "2026-06-17 16:41"
// localtime_epoch
// : 
// 1781694707
// lon
// : 
// 79.0333
// name
// : 
// "Etawah"
// region
// : 
// "Uttar Pradesh"
// tz_id
// : 
// "Asia/Kolkata"
// [[Prototype]]
// : 
// Object
// [[Prototype]]
// : 
// Object