import { Router } from "express";
import Playlist from "../models/Playlist.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

const ownUser = (req, res) => {
  if (req.userId !== req.params.userId) {
    res.status(403).json({ message: "Forbidden" });
    return false;
  }
  return true;
};

router.get("/:userId/playlists", authenticate, async (req, res) => {
  if (!ownUser(req, res)) return;
  try {
    const docs = await Playlist.find({ userId: req.params.userId });
    if (!docs?.length) return res.status(404).json({ message: "Playlists not found" });
    res.json(docs.flatMap((doc) => doc.playlists));
  } catch (err) {
    console.error("Get playlists error:", err);
    res.status(500).json({ message: "Error retrieving playlists" });
  }
});

router.post("/:userId/playlists", authenticate, async (req, res) => {
  if (!ownUser(req, res)) return;
  const { name } = req.body;
  try {
    const doc = await Playlist.findOne({ userId: req.params.userId });
    if (!doc) return res.status(404).json({ message: "User not found" });
    doc.playlists.push({ name, songs: [] });
    await doc.save();
    res.json(doc.playlists.find((p) => p.name === name));
  } catch (err) {
    console.error("Create playlist error:", err);
    res.status(500).json({ message: "Error adding playlist" });
  }
});

router.post("/:userId/playlists/:playlistName/songs", authenticate, async (req, res) => {
  if (!ownUser(req, res)) return;
  const { playlistName } = req.params;
  const { song } = req.body;
  try {
    const doc = await Playlist.findOne({ userId: req.params.userId });
    if (!doc) return res.status(404).json({ message: "User not found" });

    const playlist = doc.playlists.find((p) => p.name === playlistName);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    playlist.songs.push({
      songId:      song.id,
      songName:    song.name,
      artistNames: song.artists.map((a) => a.name),
      imageUrl:    song.album.images[0]?.url || "",
    });
    await doc.save();
    res.json(playlist);
  } catch (err) {
    console.error("Add song error:", err);
    res.status(500).json({ message: "Error adding song to playlist" });
  }
});

export default router;
