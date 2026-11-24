import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navigation, roleProfiles } from '../config/navigation.js'
import './Sidebar.css'

function Sidebar({ role, isOpen, onNavigate }) {
  const items = navigation[role]

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <Logo theme="dark" size={34} />
      </div>

      <p className="sidebar__section">{roleProfiles[role].label} workspace</p>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {items.map((item) => {
          const Icon = item.icon
          const target = item.path ? `/${role}/${item.path}` : `/${role}`

          return (
            <NavLink
              key={target}
              to={target}
              end={!item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__section">Demo: switch role</p>
        <div className="sidebar__demo">
          {Object.keys(navigation).map((demoRole) => (
            <NavLink
              key={demoRole}
              to={`/${demoRole}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                `sidebar__demo-link ${isActive ? 'sidebar__demo-link--active' : ''}`
              }
            >
              {demoRole}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar