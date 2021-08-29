const APIURL = `https://www.api.openweathermap.org/data/2.5/weather?q=`;
const APIKEY = '3265874a2c77ae4a04bb96236a642d2f';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getWeatherData(location){
    const resp = await fetch(`${APIURL}${location}&appid=${APIKEY}`, {
        origin: "cors"
    });
    const respData = await resp.json();

    displayWeather(respData);
}

function displayWeather(data){
    main.innerHTML = '';

    const weatherIconURL = `https://www.api.openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const temperature = KelvintoCelcuis(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <small>Today's weather</small>
        <img src="${weatherIconURL}" />
        <h2>${temperature}°C</h2>
        <img src="${weatherIconURL}" />
        <small>${data.weather[0].main}</small>
        <p>${search.value}</p>
    `;
    main.appendChild(weather);
}

function KelvintoCelcuis(K){

    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchLocation = search.value;

    if(searchLocation){
        getWeatherData(searchLocation);
    }
});