const apiConfig = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    baseURL: "https://api.openweathermap.org/data/2.5/"
};

const searchInput = document.querySelector('.search-box');

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeatherData(searchInput.value);
    }
});

const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${apiConfig.baseURL}weather?q=${city}&units=metric&APPID=${apiConfig.key}`);
        if (!response.ok) throw new Error('City not found');
        const weatherData = await response.json();
        updateUI(weatherData);
    } catch (error) {
        console.error(error);
    }
};

const updateUI = (data) => {
    const cityElement = document.querySelector('.location .city');
    cityElement.textContent = `${data.name}, ${data.sys.country}`;

    const currentDate = new Date();
    const dateElement = document.querySelector('.location .date');
    dateElement.textContent = formatDate(currentDate);

    const temperatureElement = document.querySelector('.current .temp');
    temperatureElement.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;

    const weatherDescriptionElement = document.querySelector('.current .weather');
    weatherDescriptionElement.textContent = data.weather[0].main;

    const highLowElement = document.querySelector('.hi-low');
    highLowElement.textContent = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;
};

const formatDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = dayNames[date.getDay()];
    const dayNumber = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${dayNumber} ${month} ${year}`;
};
