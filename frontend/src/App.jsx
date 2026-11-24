import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import PagePlaceholder from './pages/PagePlaceholder.jsx'
import { navigation } from './config/navigation.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {Object.keys(navigation).map((role) => (
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
                element={<PagePlaceholder title={item.label} />}
              />
            ),
          )}
        </Route>
      ))}

      <Route path="*" element={<PagePlaceholder title="Page not found" />} />
    </Routes>
  )
}

export default App