import { useState, useEffect } from 'react'
import './NavBar.css'

export default function NavBar({ onChangeTab, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const tabs = [
    { name: 'SignUpForm', text: 'Sign Up' },
    { name: 'LoginForm', text: 'Login' },
  ]

  function handleSearch(e) {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearch(searchQuery.trim())
      setSearchQuery('')
    }
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('accessToken')
    setUser({})
    onChangeTab('Home')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="https://cdn-icons-png.flaticon.com/128/3669/3669986.png" alt="Logo" className="logo" />
        <span>MySongApp</span>
      </div>
      <div className="navbar-right">
        <input
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleSearch}
          placeholder="Search for a song"
        />
        <ul className="navbar-menu">
          <div className="nav-item">
            {user.name ? (
              <span className="nav-link" onClick={logout}>
                Welcome {user.name} &nbsp;(Logout)
              </span>
            ) : (
              <span className="space">
                {tabs.map((tab) => (
                  <span key={tab.name} className="nav-link" onClick={() => onChangeTab(tab.name)}>
                    {tab.text}
                  </span>
                ))}
              </span>
            )}
          </div>
        </ul>
      </div>
    </nav>
  )
}
