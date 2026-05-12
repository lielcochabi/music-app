import { useState, useEffect, useRef } from 'react'
import { API_URL } from '../config.js'
import './Player.css'

export default function Player({ currentTrack }) {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT?.Player) { initPlayer(); return; }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
    window.onYouTubeIframeAPIReady = initPlayer
  }, [])

  function initPlayer() {
    playerRef.current = new window.YT.Player('yt-hidden-player', {
      height: '1', width: '1',
      playerVars: { autoplay: 1, controls: 0 },
      events: {
        onReady: () => setIsReady(true),
        onStateChange: (e) => setIsPlaying(e.data === window.YT.PlayerState.PLAYING),
      },
    })
  }

  // When track changes, search YouTube and load the video
  useEffect(() => {
    if (!currentTrack || !isReady) return
    const artist = currentTrack.artists?.map(a => a.name).join(' ') || ''
    const q = encodeURIComponent(`${currentTrack.name} ${artist} official audio`)
    fetch(`${API_URL}/api/youtube/search?q=${q}`)
      .then(r => r.json())
      .then(data => {
        if (data.videoId) playerRef.current?.loadVideoById(data.videoId)
      })
      .catch(console.error)
  }, [currentTrack, isReady])

  function togglePlay() {
    if (!playerRef.current) return
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()
  }

  return (
    <>
      {/* Hidden YouTube player — audio still plays */}
      <div style={{ position: 'fixed', left: '-9999px', width: 1, height: 1 }}>
        <div id="yt-hidden-player" />
      </div>

      <div className="player">
        {currentTrack && (
          <div className="track-info">
            <img src={currentTrack.album?.images?.[0]?.url || ''} alt="Album Art" />
            <div className="track-details">
              <h4>{currentTrack.name}</h4>
              <p>{currentTrack.artists?.map(a => a.name).join(', ')}</p>
            </div>
          </div>
        )}
        <div className="controls">
          <button onClick={() => playerRef.current?.previousVideo?.()}>Previous</button>
          <button onClick={togglePlay} className={isPlaying ? 'playing' : ''}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => playerRef.current?.nextVideo?.()}>Next</button>
        </div>
        {!currentTrack && (
          <p style={{ color: '#b3b3b3', margin: 0, fontSize: '0.9em' }}>
            Search for a song and double-click to play
          </p>
        )}
      </div>
    </>
  )
}
