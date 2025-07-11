const btn = document.querySelector('#search-btn');
const input = document.querySelector('#search-input');
let location = 'Sfantu%20Gheorghe';
let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=PP6EQMD2N9P6SQABN4MUGQCB2&contentType=json`;

function getWeather() {
    fetch(url, {mode: 'cors'})
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const location = document.querySelector('#location');
        const conditions = document.querySelector('#conditions');
        const temp = document.querySelector('#temp');
        const feelsLike = document.querySelector('#feelslike');
        const humidity = document.querySelector('#humidity');
        const windSpeed = document.querySelector('#wind');

        let address = response.resolvedAddress.split(',');
        let city = address[0].trim();
    
        location.textContent = city;
        conditions.textContent = response.currentConditions.conditions;
        temp.textContent = response.currentConditions.temp;
        feelsLike.textContent = 'Feels like: ' + response.currentConditions.feelslike + '°C';
        humidity.textContent = 'Humidity: ' + response.currentConditions.humidity + '%';
        windSpeed.textContent = 'Wind speed: ' + response.currentConditions.windspeed + 'km/h';
    })
    .catch(error => console.error('Error fetching data:', error));
}

function handleSearch() {
    location = input.value.trim().replace(/\s+/g, '%20');
    if (location) {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=PP6EQMD2N9P6SQABN4MUGQCB2&contentType=json`;
        getWeather(location);
        input.value = '';
    }
}


btn.addEventListener('click', handleSearch);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

getWeather();