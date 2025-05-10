const API_KEY = "c3e05129d976e9d894fc23a37b949193"; // Your API key
const LAT = 11.01467;
const LON = 78.79309;

// API URL
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

fetch(url)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const tbody = document.getElementById("forecast-body");
    tbody.innerHTML = ""; // Clear previous content or loading state

    if (Array.isArray(data.list)) {
      const dailyForecasts = {};

      data.list.forEach(item => {
        const dateObj = new Date(item.dt * 1000);
        const fullDate = dateObj.toLocaleDateString('en-GB').replace(/\//g, '-'); // DD-MM-YYYY
        const shortDate = fullDate.split('-').map((d, i) => (i === 2 ? d.slice(2) : d)).join('-'); // DD-MM-YY

        if (!dailyForecasts[shortDate]) {
          dailyForecasts[shortDate] = [];
        }

        dailyForecasts[shortDate].push(item);
      });

      for (let date in dailyForecasts) {
        dailyForecasts[date].forEach((item, index) => {
          const row = document.createElement("tr");

          if (index === 0) {
            const dateCell = document.createElement("td");
            dateCell.rowSpan = dailyForecasts[date].length;
            dateCell.textContent = date;
            row.appendChild(dateCell);
          }

          const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          const pop = Math.round(item.pop * 100); // Rain probability
          const rain = item.rain ? item.rain["3h"] : 0; // Rain volume in mm

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
    document.getElementById("forecast-body").innerHTML =
      `<tr><td colspan="4">Error loading data: ${error.message}</td></tr>`;
    console.error("Error fetching weather data:", error);
  });
