import { useState, useEffect } from 'react'
import { usePlaylists } from '../hooks/usePlaylists.js'
import './Songs.css'

export default function Songs({ playlistName, onPlaySong }) {
  const { playlists, fetchPlaylists } = usePlaylists()
  const [songs, setSongs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      setErrorMessage('You must be logged in to view playlists')
      return
    }
    fetchPlaylists().then(() => {})
  }, [])

  useEffect(() => {
    const playlist = playlists.find((p) => p.name === playlistName)
    setSongs(playlist?.songs ?? [])
  }, [playlists, playlistName])

  return (
    <div className="songs-view">
      <h2 className="playlist-title">{playlistName}</h2>
      {errorMessage && <p className="songs-error">{errorMessage}</p>}
      {!songs.length && !errorMessage && <p className="songs-empty">No songs in this playlist yet.</p>}
      {songs.map((song, index) => (
        <div key={index} className="song-card" onClick={() => onPlaySong(song)}>
          <img src={song.imageUrl || ''} alt={song.songName} className="song-image" />
          <div className="song-name">{song.songName}</div>
          <div className="song-artist">{song.artistNames.join(', ')}</div>
        </div>
      ))}
    </div>
  )
}
