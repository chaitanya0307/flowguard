import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import './DashboardLayout.css'

function DashboardLayout({ role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="layout">
      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <div
          className="layout__overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="layout__main">
        <Topbar role={role} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout