import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import PagePlaceholder from './pages/PagePlaceholder.jsx'
import { navigation } from './config/navigation.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/employee" replace />} />

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