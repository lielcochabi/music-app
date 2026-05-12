import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  playlists: [
    {
      name: String,
      songs: [
        {
          songId:      String,
          songName:    String,
          artistNames: [String],
          imageUrl:    String,
        },
      ],
    },
  ],
});

export default mongoose.model("Playlist", playlistSchema);
