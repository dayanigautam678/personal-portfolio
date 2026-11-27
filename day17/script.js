
const API_KEY = "https://api.weatherapi.com/v1/current.json?key=efed3922047746069d5144702262711&q=Surat";

const cityInput = document.getElementById("cityInput");
const error = document.getElementById("error");

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        error.textContent = "Please enter a city name!";
        return;
    }

    loadWeather(city);
}

async function loadWeather(city) {
    error.textContent = "";
    document.getElementById("city").textContent = "Loading...";

    try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=no`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Weather not available");
        }

        document.getElementById("city").textContent =
            data.location.name + ", " + data.location.country;

        document.getElementById("date").textContent =
            "Local Time: " + data.location.localtime;

        document.getElementById("temperature").textContent =
            Math.round(data.current.temp_c) + "°C";

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("humidity").textContent =
            data.current.humidity + "%";

        document.getElementById("wind").textContent =
            data.current.wind_kph + " km/h";

        const forecast = document.getElementById("forecast");
        forecast.replaceChildren();

        data.forecast.forecastday.forEach(day => {
            const card = document.createElement("div");
            card.className = "forecast-card";

            const date = document.createElement("p");
            date.textContent = new Date(day.date + "T12:00:00")
                .toLocaleDateString("en-US", { weekday: "short" });

            const icon = document.createElement("img");
            icon.src = "https:" + day.day.condition.icon;

            const temp = document.createElement("h3");
            temp.textContent = Math.round(day.day.maxtemp_c) + "°";

            const condition = document.createElement("p");
            condition.textContent = day.day.condition.text;

            card.append(date, icon, temp, condition);
            forecast.appendChild(card);
        });

    } catch (err) {
        document.getElementById("city").textContent = "Weather Dashboard";
        error.textContent = err.message;
        console.error("Weather Error:", err);
    }
}

cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

loadWeather("Surat");
