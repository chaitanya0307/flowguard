import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import EmployeeDashboard from './pages/employee/EmployeeDashboard.jsx'
import PagePlaceholder from './pages/PagePlaceholder.jsx'
import { navigation } from './config/navigation.js'

// Roles that already have a real dashboard page. The others still use a placeholder.
const dashboardPages = {
  employee: EmployeeDashboard,
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {Object.keys(navigation).map((role) => {
        const HomePage = dashboardPages[role]

        return (
          <Route
            key={role}
            path={`/${role}`}
            element={<DashboardLayout role={role} />}
          >
            {navigation[role].map((item) =>
              item.path ? (
                <Route
                  key={item.path}
                  path={item.path}
                  element={<PagePlaceholder title={item.label} />}
                />
              ) : (
                <Route
                  key="home"
                  index
                  element={
                    HomePage ? (
                      <HomePage />
                    ) : (
                      <PagePlaceholder title={item.label} />
                    )
                  }
                />
              ),
            )}
          </Route>
        )
      })}

      <Route path="*" element={<PagePlaceholder title="Page not found" />} />
    </Routes>
  )
}

export default App