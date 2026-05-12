import { Router } from "express";
import axios from "axios";
import querystring from "querystring";
import ytSearch from "yt-search";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "../config.js";

const router = Router();

router.post("/token", async (req, res) => {
  const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({ grant_type: "client_credentials" }),
      { headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/youtube/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Missing query" });
  try {
    const result = await ytSearch(q + " official audio");
    const video = result.videos[0];
    if (!video) return res.status(404).json({ message: "No video found" });
    res.json({ videoId: video.videoId, title: video.title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
