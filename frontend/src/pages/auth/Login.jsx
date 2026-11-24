import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import FormField from '../../components/FormField.jsx'
import { validateEmail, validateRequired } from '../../utils/validators.js'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const justRegistered = location.state?.registered === true

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {
      email: validateEmail(form.email),
      password: validateRequired(form.password, 'Password'),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    // TEMPORARY: real authentication against the Spring Boot API is added in Phase 6.
    navigate('/employee')
  }

  return (
    <div className="card auth-card">
      <div className="auth-card__header">
        <h1>Sign in</h1>
        <p className="text-muted">Welcome back. Enter your details to continue.</p>
      </div>

      {justRegistered && (
        <p className="alert alert--success" role="status">
          Account created. Please sign in.
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="you@company.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        <button type="submit" className="btn btn--primary btn--block">
          Sign in
        </button>
      </form>

      <p className="auth-card__footer">
        New to FlowGuard? <Link to="/register">Create an account</Link>
      </p>
    </div>
  )
}

export default Login