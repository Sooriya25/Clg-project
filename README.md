# Efficient Crop Watering with Reward System

A smart irrigation system integrated with a web interface that monitors real-time soil moisture and weather data, automates water pump control, and includes a gamified reward system to encourage efficient water usage.

---

## Features

- **Web Interface**: Light-themed responsive dashboard with real-time data display.
- **Soil Moisture Monitoring**: Displays live moisture levels and pump status.
- **Manual Pump Control**: Users can manually control the pump and earn AquaPoints.
- **Reward System**: Earn AquaPoints by saving water and redeem them for agricultural products.
- **Weather Forecast Integration**: Displays temperature, humidity, rainfall probability, and wind speed using weather API.
- **Attractive UI/UX**: Simple animations and visual elements for better interaction.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (to be integrated)
- **Microcontroller**: Arduino with soil moisture sensor
- **Others**: Weather API (for real-time weather data)

---

## Project Structure

/project-folder │ ├── index.html                # Main dashboard ├── redeem.html               # Redeem page for AquaPoints ├── style.css                 # Styling for the interface ├── script.js                 # Logic and interactivity ├── /images                   # Icons and images used └── README.md                 # Project documentation

---

## How It Works

1. **Real-time Monitoring**: Soil moisture sensor sends data to the web interface.
2. **Automation + Manual Override**: Pump turns on/off automatically, but users can override it in specified ranges to earn points.
3. **Reward System**: Points (AquaPoints) can be redeemed for products via the redeem page.
4. **Weather Awareness**: Weather data helps in smarter irrigation decisions.

---

## Future Improvements

- Integration with live database and login system.
- Actual API connectivity for sensor and weather data.
- SMS/Email alerts and notifications.
- Advanced analytics and crop suggestions.

---

## License

This project is created for academic and learning purposes.

