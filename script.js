document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed!");

    // Initialize values
    let moistureLevel = Math.floor(Math.random() * 101);
    let storedCoins = localStorage.getItem("aquaCoins");
    let aquaCoins = storedCoins ? parseInt(storedCoins) : 500;
    localStorage.setItem("aquaCoins", aquaCoins);

    const moistureLevelElement = document.getElementById("moisture-level");
    const rewardPointsElement = document.getElementById("reward-points");
    const pumpStatusElement = document.getElementById("pump-status");
    rewardPointsElement.textContent = aquaCoins;
    moistureLevelElement.textContent = moistureLevel;

    // Reward flags and cooldown state
    let cooldown = false;
    let hasRewardedLow = false;
    let hasRewardedHigh = false;

    // Function to handle rewards
    function rewardUserIfValid(condition, message, rewardType) {

        if (condition) {
            if ((rewardType === "low" && hasRewardedLow) || (rewardType === "high" && hasRewardedHigh)) {
                return;
            }

            aquaCoins += 10;
            rewardPointsElement.textContent = aquaCoins;
            localStorage.setItem("aquaCoins", aquaCoins);
            alert("🎉 +10 Aquacoins! " + message);

            if (rewardType === "low") hasRewardedLow = true;
            if (rewardType === "high") hasRewardedHigh = true;

            cooldown = true;
            setTimeout(() => {
                cooldown = false;
            }, 20000); // 20 seconds
        }
    }

    // Pump control event listeners
    document.getElementById("pump-on").addEventListener("click", function () {
        pumpStatusElement.textContent = "Pump Status: ON";
        rewardUserIfValid(
            moistureLevel >= 1 && moistureLevel <= 20,
            "Efficient watering at low moisture!",
            "low"
        );
    });

    document.getElementById("pump-off").addEventListener("click", function () {
        pumpStatusElement.textContent = "Pump Status: OFF";
        rewardUserIfValid(
            moistureLevel >= 80 && moistureLevel <= 99,
            "Smart water saving at high moisture!",
            "high"
        );
    });

    // Simulate changing moisture level every 10 seconds
    setInterval(() => {
        moistureLevel = Math.floor(Math.random() * 101);
        moistureLevelElement.textContent = moistureLevel;

        // Reset reward flags when out of range
        if (moistureLevel < 10 || moistureLevel > 30) hasRewardedLow = false;
        if (moistureLevel < 80 || moistureLevel > 100) hasRewardedHigh = false;

        console.log("New moisture level:", moistureLevel);
    }, 10000);

    // Fetch real-time weather data
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
            document.getElementById("rain").textContent = rainfall / 10;
            document.getElementById("wind").textContent = wind;
            document.getElementById("weather-description").textContent = weatherDescription;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });


        




});
