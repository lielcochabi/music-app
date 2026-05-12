import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import playlistRoutes from "./routes/playlists.js";
import musicRoutes from "./routes/music.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api/user", playlistRoutes);
app.use("/api", musicRoutes);

export default app;
