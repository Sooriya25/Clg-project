const API_KEY = "c3e05129d976e9d894fc23a37b949193"; // Replace with your API key
const LAT = 11.01467;
const LON = 78.79309;

// Fetch URL from OpenWeather API
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

fetch(url)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the data to inspect the structure

    if (Array.isArray(data.list)) {
      const tbody = document.getElementById("forecast-body");

      // Group forecasts by day (YYYY-MM-DD)
      const dailyForecasts = {};

      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0]; // YYYY-MM-DD format
        
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = [];
        }

        // Add each 3-hour interval forecast to the corresponding day
        dailyForecasts[date].push(item);
      });

      // Now, add each day's forecasts to the table
      for (let date in dailyForecasts) {
        dailyForecasts[date].forEach((item, index) => {
          const row = document.createElement("tr");

          // For the first forecast of the day, display the date in the first cell
          if (index === 0) {
            const dateCell = document.createElement("td");
            dateCell.rowSpan = dailyForecasts[date].length; // Rowspan for the whole day
            dateCell.textContent = date; // Set the date
            row.appendChild(dateCell);
          }

          // Add the time, rain probability, and rainfall to the row
          const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const pop = Math.round(item.pop * 100); // Rain probability (0-100)
          const rain = item.rain ? item.rain["3h"] : 0; // Rainfall (in mm)

          row.innerHTML += `
            <td>${time}</td>
            <td>${pop}%</td>
            <td>${rain} mm</td>
          `;
          
          tbody.appendChild(row);
        });
      }
    } else {
      throw new Error("No forecast data available or data format is incorrect.");
    }
  })
  .catch(error => {
    document.getElementById("forecast-body").innerHTML = `<tr><td colspan="4">Error loading data: ${error.message}</td></tr>`;
    console.error("Error fetching weather data:", error);
  });
