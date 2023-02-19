// Define the list of cities to display
const cities = [
  { name: "Sheridan", lat: 44.7972, lon: -106.9561 },
  { name: "Sydney", lat: -33.865, lon: 151.2094 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Munich", lat: 48.1372, lon: 11.5755 },
  { name: "Ankara", lat: 39.9334, lon: 32.8597 },
  { name: "Bursa", lat: 40.1826, lon: 29.0669 },
  { name: "Canakkale", lat: 40.1553, lon: 26.4142 },
];

// Function to fetch weather data for a city
async function getWeatherData(lat, lon) {
  try {
    // Send GET request to API endpoint
    const response = await fetch(
      `https://weather.mehmetfd.dev/api?lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    // Parse response as JSON
    const data = await response.json();

    // Extract temperature from response
    const temp = data.temp;

    // Return temperature
    return temp;
  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
    return null;
  }
}

// Function to update the carousel with temperature data
async function updateCarousel() {
  // Loop through cities and fetch weather data
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const temp = await getWeatherData(city.lat, city.lon);

    // Update carousel item with temperature data
    const item = document.getElementById(`carousel-item-${i}`);
    const tempEl = item.querySelector("p");
    tempEl.textContent = `${temp} °C`;
  }
}

// Call updateCarousel on page load
updateCarousel();

setInterval(() => {
  updateCarousel();
}, 60000);

$(".carousel").carousel({
  interval: 2000,
});
