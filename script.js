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

async function getWeather(){
    const output = document.getElementById("weather-output");
    output.innerHTML = "Fetching weather data... 🌤️";
    try {
        // Example: New York City coordinates
        const lat = 40.7128;
        const lon = -74.0060;

        const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weathercode`
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const current = data.current;
        if (!current) throw new Error("No weather data found");

        // Display basic weather info
        output.innerHTML = `
        <div style="text-align:left; background:#f5f5f5; padding:10px; border-radius:8px;">
            <h3>📍 New York City</h3>
            <p>🌡️ Temperature: ${current.temperature_2m} °C</p>
            <p>💧 Humidity: ${current.relative_humidity_2m} %</p>
            <p>🌤️ Weather Code: ${current.weathercode}</p>
        </div>
        `;

    } catch (error) {
        output.innerHTML = "⚠️ Oops! Couldn't fetch weather right now.";
        console.error("Error fetching weather data:", error);
    }
}

