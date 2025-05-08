document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

    // Initialize values
    let moistureLevel = Math.floor(Math.random() * 101);
    let storedCoins = localStorage.getItem("aquaCoins");
    let aquaCoins = storedCoins ? parseInt(storedCoins) : 100;
    localStorage.setItem("aquaCoins", aquaCoins);

    // Get elements by their IDs
    const moistureLevelElement = document.getElementById("moisture-level");
    const rewardPointsElement = document.getElementById("reward-points");
    const pumpStatusElement = document.getElementById("pump-status");
    rewardPointsElement.textContent = aquaCoins;

    if (moistureLevelElement && rewardPointsElement) {
        moistureLevelElement.textContent = moistureLevel;
        rewardPointsElement.textContent = aquaCoins;
    } else {
        console.error("Some elements are missing in the HTML!");
    }

    // Fetch data from API
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=11.01467&lon=78.79309&appid=c3e05129d976e9d894fc23a37b949193&units=metric';

     fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.main.temp);
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const rainfall = data.rain ? data.rain["1h"] : 0;
        
            document.getElementById("temp").textContent = temp;
            document.getElementById("humidity").textContent = humidity;
            document.getElementById("rain").textContent = rainfall/10;
            document.getElementById("wind").textContent = wind;
            document.getElementById("weather-description").textContent = weatherDescription;
            console.log(weatherDescription);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });

            document.getElementById("pump-on").addEventListener("click", function () {
                pumpStatusElement.textContent = "Pump Status: ON";
                console.log("pump-on button clicked");
                if (moistureLevel >= 10 && moistureLevel <= 30) {
                    aquaCoins += 10;
                    console.log(aquaCoins);
                    rewardPointsElement.textContent = aquaCoins;
                    localStorage.setItem("aquaCoins", aquaCoins);
                    alert("🎉 Congratulations!! You won 10 Aquacoins 🎉");
                }
            });

            document.getElementById("pump-off").addEventListener("click", function () {
                pumpStatusElement.textContent = "Pump Status: OFF";
                if (moistureLevel >= 80 && moistureLevel <= 100) {
                    aquaCoins += 10;
                    console.log(aquaCoins);
                    rewardPointsElement.textContent = aquaCoins;
                    localStorage.setItem("aquaCoins", aquaCoins);
                    alert("🎉 Congratulations!! You won 10 Aquacoins 🎉");
                }
            });
        
}); 
