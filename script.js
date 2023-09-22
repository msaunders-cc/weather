const main = document.getElementById('present-forecast');

main.innerHTML = '';

const getCurrentWeatherData = async () => {
    const response = await fetch('https://api.weather.gov/gridpoints/AKQ/44,77/forecast')
    const data = await response.json();
    const { periods } = data.properties;
    periods.forEach(period => {
        let { name, startTime, endTime, isDaytime, temperature, temperatureUnit, icon, shortForecast} = period;
        startTime = new Date(startTime).toLocaleString();
        endTime = new Date(endTime).toLocaleString();
        icon = icon.replace('medium', 'large');
        isDaytime = isDaytime ? 'day' : 'night';
        main.innerHTML += `<div class="card ${isDaytime}">
                                <h2>${name}</h2>
                                <p>${startTime} &ndash; ${endTime}</p>
                                <p>${temperature}&deg;${temperatureUnit}</p>
                                <img src="${icon}">
                                <p>${shortForecast}</p>
                            </div>`
    })
}

getCurrentWeatherData();