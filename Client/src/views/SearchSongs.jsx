import { useState, useEffect, useRef } from 'react'
import { spotifySearch } from '../hooks/useSpotify.js'
import { usePlaylists } from '../hooks/usePlaylists.js'
import './SearchSongs.css'

export default function SearchSongs({ searchQuery, onPlaySong }) {
  const { playlists, fetchPlaylists, addSongToPlaylist } = usePlaylists()
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [searchStatus, setSearchStatus] = useState('')
  const [addStatus, setAddStatus] = useState('')
  const lastQuery = useRef('')

  useEffect(() => { fetchPlaylists() }, [])

  useEffect(() => {
    if (searchQuery && searchQuery !== lastQuery.current) {
      lastQuery.current = searchQuery
      doSearch(searchQuery)
    }
  }, [searchQuery])

  async function doSearch(query) {
    setSearchStatus('Searching...')
    try {
      const results = await spotifySearch(query)
      setSongs(results)
      setSearchStatus(results.length ? '' : 'No results found')
    } catch {
      setSearchStatus('Search failed. Please try again.')
    }
  }

  function selectSong(song) {
    setSelectedSong((prev) => (prev === song ? null : song))
    setSelectedPlaylist(null)
  }

  async function selectPlaylist(playlist) {
    if (!selectedSong) {
      setAddStatus('Select a song first')
      setTimeout(() => setAddStatus(''), 2000)
      return
    }
    if (selectedPlaylist === playlist) {
      try {
        await addSongToPlaylist(playlist.name, selectedSong)
        setAddStatus(`Added to ${playlist.name}`)
        setSelectedSong(null)
        setSelectedPlaylist(null)
      } catch {
        setAddStatus(`Failed to add to ${playlist.name}`)
      }
      setTimeout(() => setAddStatus(''), 2500)
    } else {
      setSelectedPlaylist(playlist)
    }
  }

  return (
    <div className="search-layout">
      <div className="songs-table">
        <h2>Songs</h2>
        {searchStatus && <p className="status-msg">{searchStatus}</p>}
        {songs.length > 0 && (
          <table>
            <thead>
              <tr><th>Image</th><th>Name</th><th>Artist</th></tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr
                  key={song.id}
                  className={selectedSong === song ? 'glow' : ''}
                  onClick={() => selectSong(song)}
                  onDoubleClick={() => onPlaySong(song)}
                >
                  <td><img src={song.album.images[0]?.url || ''} alt="Song" className="song-img" /></td>
                  <td>{song.name}</td>
                  <td>{song.artists.map((a) => a.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="playlists-table">
        <h2>Playlists</h2>
        <p className="hint">
          {selectedSong
            ? <>Click a playlist to add <strong>{selectedSong.name}</strong>.</>
            : 'Select a song first, then click a playlist to add it.'}
        </p>
        {addStatus && <p className="status-msg">{addStatus}</p>}
        <table>
          <thead>
            <tr><th>Playlist Name</th></tr>
          </thead>
          <tbody>
            {playlists.map((playlist) => (
              <tr
                key={playlist._id}
                className={selectedPlaylist === playlist ? 'glow' : ''}
                onClick={() => selectPlaylist(playlist)}
              >
                <td>{playlist.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
