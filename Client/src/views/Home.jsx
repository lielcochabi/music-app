import './Home.css'

const albums = [
  { id: 1, name: 'Top 50', cover: 'https://www.kolibrimusic.com/wp-content/uploads/2017/10/spotify-top-50-global.jpg' },
  { id: 2, name: 'Favorites', cover: 'https://misc.scdn.co/liked-songs/liked-songs-300.png' },
]

export default function Home({ onChangeTab }) {
  return (
    <div className="home-page">
      <main>
        <section className="hero">
          <h2>Discover New Music</h2>
          <button className="browse-button" onClick={() => onChangeTab('Playlists')}>
            Browse Playlists
          </button>
        </section>
        <section className="featured-albums">
          <h3>Featured Albums</h3>
          <div className="album-grid">
            {albums.map((album) => (
              <div key={album.id} className="album" onClick={() => onChangeTab(album.name)}>
                <img src={album.cover} alt={album.name} />
                <p>{album.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 MusicApp. All rights reserved.</p>
      </footer>
    </div>
  )
}
