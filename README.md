# 🎵 Music App

A full-stack music streaming web application built with React and Node.js.

🔗 **Live Demo:** [liel-music-app.netlify.app](https://liel-music-app.netlify.app)

---

## About

Music App lets users search for songs using the Spotify API and play full audio through a YouTube player running in the background. Users can create accounts, build playlists, and add songs to them.

---

## Tech Stack

**Frontend**
- React 18 (functional components, custom hooks)
- Vite
- CSS (per-component stylesheets)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication + bcrypt password hashing
- Deployed as Netlify serverless functions

**APIs**
- Spotify Web API — song search
- YouTube IFrame API — full audio playback

---

## Features

- 🔐 User signup and login with JWT authentication
- 🔍 Search millions of songs via Spotify
- ▶️ Play full songs through a hidden YouTube player
- 📋 Create and manage playlists
- ➕ Add songs from search results to any playlist

---

## Project Structure

```
music-app/
├── Client/                   # React frontend
│   ├── src/
│   │   ├── components/       # NavBar, SideNav, Player
│   │   ├── views/            # Home, Playlists, Songs, SearchSongs, Login, Signup
│   │   ├── hooks/            # usePlaylists, useSpotify
│   │   ├── App.jsx
│   │   └── api.js            # Axios instance with JWT interceptor
│   └── vite.config.js
├── Server/
│   ├── routes/               # auth, playlists, music
│   ├── models/               # User, Playlist
│   ├── middleware/           # JWT authenticate
│   ├── app.js                # Express app
│   ├── server.js             # Local dev entry point
│   └── config.js             # Environment config
├── netlify/
│   └── functions/api.js      # Serverless function wrapper
└── netlify.toml              # Netlify build config
```

---

## Running Locally

**Requirements:** Node.js, MongoDB Atlas account, Spotify Developer account

**1. Clone the repo**
```bash
git clone https://github.com/lielcochabi/music-app.git
cd music-app
```

**2. Create `env.json` in the root**
```json
{
  "MONGODB_URI": "your_mongodb_connection_string",
  "SPOTIFY_CLIENT_ID": "your_spotify_client_id",
  "SPOTIFY_CLIENT_SECRET": "your_spotify_client_secret",
  "JWT_SECRET": "any_long_random_string"
}
```

**3. Start the server**
```bash
npm install
node Server/server.js
```

**4. Start the client**
```bash
cd Client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)
