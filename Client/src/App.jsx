import { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import SideNav from './components/SideNav.jsx'
import Player from './components/Player.jsx'
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import LoginForm from './views/LoginForm.jsx'
import SignUpForm from './views/SignUpForm.jsx'
import Playlists from './views/Playlists.jsx'
import Songs from './views/Songs.jsx'
import SearchSongs from './views/SearchSongs.jsx'

const VALID_TABS = ['Home', 'SignUpForm', 'LoginForm', 'About', 'Playlists', 'Songs', 'SearchSongs']

export default function App() {
  const [currentTab, setCurrentTab] = useState('Home')
  const [playlistName, setPlaylistName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTrack, setCurrentTrack] = useState(null)

  function changeTab(tabName) {
    if (VALID_TABS.includes(tabName)) {
      setCurrentTab(tabName)
    } else {
      setPlaylistName(tabName)
      setCurrentTab('Songs')
    }
  }

  function onAuthSuccess() {
    changeTab('Home')
  }

  return (
    <div>
      <NavBar onChangeTab={changeTab} onSearch={(q) => { setSearchQuery(q); setCurrentTab('SearchSongs') }} />
      <div className="content">
        {currentTab === 'SignUpForm' && <SignUpForm onAuthSuccess={onAuthSuccess} />}
        {currentTab === 'LoginForm' && <LoginForm onChangeTab={changeTab} onAuthSuccess={onAuthSuccess} />}
        {currentTab === 'Home'      && <Home onChangeTab={changeTab} />}
        {currentTab === 'About'     && <About />}
        {currentTab === 'Playlists' && <Playlists onChangeTab={changeTab} />}
        {currentTab === 'Songs'     && <Songs playlistName={playlistName} onPlaySong={setCurrentTrack} />}
        {currentTab === 'SearchSongs' && <SearchSongs searchQuery={searchQuery} onPlaySong={setCurrentTrack} />}
        <SideNav onChangeTab={changeTab} />
      </div>
      <Player currentTrack={currentTrack} />
    </div>
  )
}
