import { useState, useCallback } from 'react'
import api from '../api.js'

function getUserId() {
  const user = localStorage.getItem('user')
  if (!user) throw new Error('Not logged in')
  return JSON.parse(user)._id
}

export function usePlaylists() {
  const [playlists, setPlaylists] = useState([])
  const [error, setError] = useState('')

  const fetchPlaylists = useCallback(async () => {
    try {
      const userId = getUserId()
      const response = await api.get(`/api/user/${userId}/playlists`)
      setPlaylists(response.data)
    } catch (err) {
      setError('Failed to load playlists')
      console.error('Error fetching playlists:', err)
    }
  }, [])

  const createPlaylist = useCallback(async (name) => {
    try {
      const userId = getUserId()
      const response = await api.post(`/api/user/${userId}/playlists`, { name })
      setPlaylists((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      setError('Failed to create playlist')
      console.error('Error creating playlist:', err)
    }
  }, [])

  const addSongToPlaylist = useCallback(async (playlistName, song) => {
    try {
      const userId = getUserId()
      await api.post(`/api/user/${userId}/playlists/${playlistName}/songs`, { song })
    } catch (err) {
      setError(`Failed to add song to ${playlistName}`)
      console.error('Error adding song:', err)
      throw err
    }
  }, [])

  return { playlists, error, setError, fetchPlaylists, createPlaylist, addSongToPlaylist }
}
