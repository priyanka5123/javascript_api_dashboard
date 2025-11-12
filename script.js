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
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("city-input").value = "California";
});

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
// Just set default input values
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("base-currency").value = "USD";
  document.getElementById("target-currency").value = "EUR";
});

// Fetch and calculate currency conversion
async function getCurrencyRate() {
  const amount = parseFloat(document.getElementById("amount").value);
  const base = document.getElementById("base-currency").value.trim().toUpperCase();
  const target = document.getElementById("target-currency").value.trim().toUpperCase();
  const output = document.getElementById("currency-output");

  if (!amount || amount <= 0) {
    output.innerHTML = "⚠️ Please enter a valid amount.";
    return;
  }
  if (!base || !target) {
    output.innerHTML = "⚠️ Please enter valid currency codes.";
    return;
  }
  if (base === target) {
    output.innerHTML = "⚠️ Please enter two different currencies.";
    return;
  }

  output.innerHTML = `Converting <b>${amount} ${base}</b> to ${target}... 💹`;

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${base}&to=${target}`
    );
    if (!response.ok) throw new Error("Network error");
    
    const data = await response.json();
    const converted = data.rates[target];
    if (!converted) {
      output.innerHTML = `❌ Couldn't convert ${base} → ${target}. Please check codes.`;
      return;
    }

    output.innerHTML = `
      <div style="background:#f5f5f5; padding:10px; border-radius:8px;">
        <h3>💱 ${base} → ${target}</h3>
        <p>💰 ${amount} ${base} = <strong>${converted.toFixed(4)} ${target}</strong></p>
        <p>📅 Date: ${data.date}</p>
      </div>
    `;
  } catch (error) {
    output.innerHTML = "⚠️ Oops! Couldn't fetch currency rates right now.";
    console.error("Error fetching currency rates:", error);
  }
}
async function getMovies() {
  const output = document.getElementById("movies-output");
  output.innerHTML = "🎥 Fetching trending movies...";

  try {
    const res = await fetch("http://localhost:3000/trending");
    const data = await res.json();

    if (!data.results) throw new Error("No results");

    const movies = data.results.slice(0, 3);
    output.innerHTML = movies
      .map(movie => `
        <div style="display:inline-block; text-align:center; margin:10px;">
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" 
               alt="${movie.title}" 
               style="border-radius:8px; width:150px;">
          <p><strong>${movie.title}</strong><br>⭐ ${movie.vote_average.toFixed(1)}</p>
        </div>
      `)
      .join("");
  } catch (error) {
    console.error("Error fetching movies:", error);
    output.innerHTML = "⚠️ Oops! Couldn’t fetch movie data.";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("github-username").value = "torvalds";
});
async function getGithubUser() {
  const username = document.getElementById("github-username").value.trim();
  const output = document.getElementById("github-output");

  if (!username) {
    output.innerHTML = "⚠️ Please enter a username.";
    return;
  }

  output.innerHTML = "🔍 Searching GitHub user...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    output.innerHTML = `
      <div style="background:#f5f5f5; padding:10px; border-radius:8px; text-align:center;">
        <img src="${data.avatar_url}" alt="${data.login}" width="100" style="border-radius:50%;">
        <h3>${data.name || data.login}</h3>
        <p>👥 Followers: ${data.followers} | Following: ${data.following}</p>
        <p>📦 Public Repos: ${data.public_repos}</p>
        <p>📍 ${data.location || "Unknown location"}</p>
        <a href="${data.html_url}" target="_blank">🔗 Visit Profile</a>
      </div>
    `;
  } catch (error) {
    output.innerHTML = "❌ User not found or error fetching data.";
    console.error(error);
  }
}
async function getJoke() {
  const output = document.getElementById("joke-output");
  output.innerHTML = "😂 Fetching a joke...";

  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!response.ok) throw new Error("Failed to fetch joke");

    const joke = await response.json();

    output.innerHTML = `
      <div style="background:#f5f5f5; padding:10px; border-radius:8px; text-align:center;">
        <p>🤣 <strong>${joke.setup}</strong></p>
        <p>💬 ${joke.punchline}</p>
      </div>
    `;
  } catch (error) {
    console.error(error);
    output.innerHTML = "⚠️ Could not fetch a joke right now.";
  }
}

async function getPoem() {
  const output = document.getElementById("poem-output");
  output.innerHTML = "📜 Loading poem...";

  try {
    const response = await fetch("https://poetrydb.org/random/1"); // 1 random poem
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    const poem = data[0];

    output.innerHTML = `
      <h3>${poem.title} — <em>${poem.author}</em></h3>
      <p>${poem.lines.join('<br>')}</p>
    `;
  } catch (err) {
    console.error("Error fetching poem:", err);
    output.innerHTML = "⚠️ Couldn't fetch a poem right now.";
  }
}