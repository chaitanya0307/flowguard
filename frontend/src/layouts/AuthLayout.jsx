import { Outlet } from 'react-router-dom'
import { ListChecks, ShieldCheck, Timer } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import './AuthLayout.css'

const highlights = [
  {
    icon: ListChecks,
    title: 'Clear ownership',
    text: 'Every issue is assigned to a named owner.',
  },
  {
    icon: Timer,
    title: 'SLA tracking',
    text: 'Deadlines, countdowns and automatic escalation.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified resolutions',
    text: 'Issues close only when the reporter agrees.',
  },
]

function AuthLayout() {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <Logo theme="dark" size={38} />

        <div className="auth__headline">
          <h2>Every issue deserves an owner.</h2>
          <p>Every resolution needs proof.</p>
        </div>

        <ul className="auth__features">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <li className="auth__feature" key={item.title}>
                <span className="auth__feature-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  {item.text}
                </span>
              </li>
            )
          })}
        </ul>

        <p className="auth__footer-note">
          FlowGuard: Intelligent Service Operations Platform
        </p>
      </aside>

      <section className="auth__panel">
        <div className="auth__mobile-logo">
          <Logo theme="light" size={38} />
        </div>
        <Outlet />
      </section>
    </div>
  )
}

export default AuthLayout
