import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";


const app = express();
app.use(express.static("public"));
app.use(cors()); // allow all origins


app.get("/trending", async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data); // ✅ send full TMDb data back to the frontend
  } catch (err) {
    console.error("Error fetching TMDb data:", err.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.listen(3000, () => console.log("Server running on http://127.0.0.1:3000"));
