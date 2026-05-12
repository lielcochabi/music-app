import api from '../api.js'

export async function getSpotifyToken() {
  let token = localStorage.getItem('accessToken')
  if (token) return token

  const response = await api.post('/api/token')
  token = response.data.access_token
  localStorage.setItem('accessToken', token)
  return token
}

export async function spotifySearch(query) {
  let token = await getSpotifyToken()

  const doSearch = (t) =>
    fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      headers: { Authorization: `Bearer ${t}` },
    })

  let res = await doSearch(token)
  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    token = await getSpotifyToken()
    res = await doSearch(token)
  }

  if (!res.ok) throw new Error('Spotify search failed')
  const data = await res.json()
  return data.tracks.items
}
