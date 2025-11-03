async function getDogImage(){
    const output = document.getElementById("dog-output");
    output.innerHTML = "Fetching a cute dog...🐾"; 

    try{
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        
        output.innerHTML=`<img src="${data.message}" alt="Random Dog"/>`;

    }catch(error){
        output.innerHTML= "😢 Oops! Couldn't fetch a dog right now.";
        console.error("Error fetching dog image:", error);
    }
}
async function getCatImage(){
    const output = document.getElementById("cat-output");
    output.innerHTML = "Fetching a cute cat...🐾"; 

    try{
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()
        
        output.innerHTML=`<img src="${data[0].url}" alt="Random Cat"/>`;

    }catch(error){
        output.innerHTML= "😢 Oops! Couldn't fetch a cat right now.";
        console.error("Error fetching cat image:", error);
    }
}

async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  const output = document.getElementById("weather-output");
  
  if (!city) {
    output.innerHTML = "⚠️ Please enter a city name.";
    return;
  }

  output.innerHTML = `Fetching weather for <b>${city}</b>... 🌦️`;

  try {
    // Step 1: Get city coordinates using Open-Meteo's geocoding API
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    if (!geoResponse.ok) throw new Error("Failed to fetch city coordinates");
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      output.innerHTML = `❌ No location found for "${city}".`;
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get current weather using the coordinates
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weathercode`
    );
    if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    if (!current) throw new Error("No weather data found");

    // Step 3: Display results
    output.innerHTML = `
      <div style="text-align:left; background:#f5f5f5; padding:10px; border-radius:8px;">
        <h3>📍 ${name}, ${country}</h3>
        <p>🌡️ Temperature: ${current.temperature_2m} °C</p>
        <p>💧 Humidity: ${current.relative_humidity_2m} %</p>
        <p>🌤️ Weather Code: ${current.weathercode}</p>
        <small>Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}</small>
      </div>
    `;

  } catch (error) {
    output.innerHTML = "⚠️ Oops! Couldn't fetch weather data right now.";
    console.error("Error fetching weather:", error);
  }
}
// Populate currency dropdowns
async function populateCurrencies() {
  const baseSelect = document.getElementById("base-currency");
  const targetSelect = document.getElementById("target-currency");

  try {
    const response = await fetch("https://api.exchangerate.host/symbols");
    if (!response.ok) throw new Error("Failed to fetch currency symbols");

    const data = await response.json();
    const symbols = data.symbols;

    for (const code in symbols) {
      const optionText = `${code} - ${symbols[code].description}`;
      const option1 = new Option(optionText, code);
      const option2 = new Option(optionText, code);
      baseSelect.add(option1);
      targetSelect.add(option2);
    }

    // Defaults
    baseSelect.value = "USD";
    targetSelect.value = "EUR";

  } catch (error) {
    console.error("Error fetching currency symbols:", error);
  }
}

// Call on page load
populateCurrencies();

// Fetch and calculate currency conversion
async function getCurrencyRate() {
  const amount = parseFloat(document.getElementById("amount").value);
  const base = document.getElementById("base-currency").value;
  const target = document.getElementById("target-currency").value;
  const output = document.getElementById("currency-output");

  if (!amount || amount <= 0) {
    output.innerHTML = "⚠️ Please enter a valid amount.";
    return;
  }

  if (base === target) {
    output.innerHTML = "⚠️ Please select two different currencies.";
    return;
  }

  output.innerHTML = `Converting <b>${amount} ${base}</b> to ${target}... 💹`;

  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${base}&to=${target}&amount=${amount}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    if (!data.result) {
      output.innerHTML = `❌ Couldn't convert ${base} → ${target}.`;
      return;
    }

    output.innerHTML = `
      <div style="background:#f5f5f5; padding:10px; border-radius:8px;">
        <h3>💱 ${base} → ${target}</h3>
        <p>💰 ${amount} ${base} = <strong>${data.result.toFixed(4)} ${target}</strong></p>
        <p>📅 Date: ${data.date}</p>
      </div>
    `;

  } catch (error) {
    output.innerHTML = "⚠️ Oops! Couldn't fetch currency rates right now.";
    console.error("Error fetching currency rates:", error);
  }
}
