import './SideNav.css'

const tabs = [
  { name: 'Home', text: 'Home' },
  { name: 'Playlists', text: 'Playlists' },
  { name: 'About', text: 'About' },
]

export default function SideNav({ onChangeTab }) {
  return (
    <div className="sidenav">
      <ul>
        {tabs.map((tab) => (
          <li key={tab.name} onClick={() => onChangeTab(tab.name)}>
            {tab.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
