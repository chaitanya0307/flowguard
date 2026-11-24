import { Bell, Menu, Search } from 'lucide-react'
import { roleProfiles } from '../config/navigation.js'
import './Topbar.css'

function Topbar({ role, onMenuClick }) {
  const profile = roleProfiles[role]

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__menu"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      <label className="topbar__search">
        <Search size={16} aria-hidden="true" />
        <input type="search" placeholder="Search issues..." />
      </label>

      <div className="topbar__actions">
        <button
          type="button"
          className="topbar__icon-btn"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <div className="topbar__user">
          <span className="topbar__avatar">{profile.initials}</span>
          <div className="topbar__user-text">
            <strong>{profile.name}</strong>
            <span className="text-muted">{profile.label}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar