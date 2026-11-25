import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import EmployeeDashboard from './pages/employee/EmployeeDashboard.jsx'
import NewIssue from './pages/employee/NewIssue.jsx'
import PagePlaceholder from './pages/PagePlaceholder.jsx'
import { navigation } from './config/navigation.js'

// Pages that are already built. Key format: "role" for the dashboard home, "role/path" for others.
// Anything not listed here still shows a placeholder.
const pageComponents = {
  employee: EmployeeDashboard,
  'employee/new-issue': NewIssue,
}

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
          {navigation[role].map((item) => {
            const pageKey = item.path ? `${role}/${item.path}` : role
            const Page = pageComponents[pageKey]
            const element = Page ? (
              <Page />
            ) : (
              <PagePlaceholder title={item.label} />
            )

            return item.path ? (
              <Route key={pageKey} path={item.path} element={element} />
            ) : (
              <Route key={pageKey} index element={element} />
            )
          })}
        </Route>
      ))}

      <Route path="*" element={<PagePlaceholder title="Page not found" />} />
    </Routes>
  )
}

export default App