import { useState, useEffect } from 'react'
import { usePlaylists } from '../hooks/usePlaylists.js'
import './Playlists.css'

export default function Playlists({ onChangeTab }) {
  const { playlists, error, setError, fetchPlaylists, createPlaylist } = usePlaylists()
  const [newName, setNewName] = useState('')
  const [inlineMessage, setInlineMessage] = useState('')

  useEffect(() => { fetchPlaylists() }, [])

  async function handleCreate() {
    setInlineMessage('')
    setError('')
    if (!newName.trim()) { setInlineMessage('Please enter a playlist name'); return }
    if (playlists.some((p) => p.name === newName.trim())) {
      setInlineMessage('A playlist with that name already exists'); return
    }
    await createPlaylist(newName.trim())
    if (!error) {
      setNewName('')
      setInlineMessage('Playlist created!')
      setTimeout(() => setInlineMessage(''), 2000)
    }
  }

  return (
    <div>
      <div className="inputAndButton">
        <input
          className="pl-input"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="Enter playlist name"
        />
        <button className="pl-button" onClick={handleCreate}>Add Playlist</button>
      </div>
      {error && <p className="pl-error">{error}</p>}
      {inlineMessage && <p className="pl-message">{inlineMessage}</p>}
      <h1 className="pl-title">Playlists:</h1>
      <div className="playlist-container">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="playlist" onClick={() => onChangeTab(playlist.name)}>
            <h2>{playlist.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
