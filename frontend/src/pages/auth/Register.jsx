import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import FormField from '../../components/FormField.jsx'
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../../utils/validators.js'

// Sample list for now. The real list will come from the backend departments table.
const departments = [
  'IT Support',
  'Human Resources',
  'Finance',
  'Operations',
  'Facilities',
]

const emptyForm = {
  fullName: '',
  email: '',
  department: '',
  password: '',
  confirmPassword: '',
}

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function validateForm() {
    return {
      fullName: validateRequired(form.fullName, 'Full name'),
      email: validateEmail(form.email),
      department: validateRequired(form.department, 'Department'),
      password: validatePassword(form.password),
      confirmPassword:
        form.confirmPassword === form.password
          ? validateRequired(form.confirmPassword, 'Confirm password')
          : 'Passwords do not match.',
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    // TEMPORARY: the account is not saved yet. The Spring Boot registration API is added later.
    navigate('/login', { state: { registered: true } })
  }

  return (
    <div className="card auth-card">
      <div className="auth-card__header">
        <h1>Create your account</h1>
        <p className="text-muted">
          Register as an employee to report and track issues.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField label="Full name" htmlFor="fullName" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-input"
            placeholder="Your full name"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Work email" htmlFor="email" error={errors.email}>
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

        <FormField
          label="Department"
          htmlFor="department"
          error={errors.department}
        >
          <select
            id="department"
            name="department"
            className="form-input"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select your department</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="At least 8 characters, with a number"
              autoComplete="new-password"
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

        <FormField
          label="Confirm password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword}
        >
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            className="form-input"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </FormField>

        <button type="submit" className="btn btn--primary btn--block">
          Create account
        </button>
      </form>

      <p className="auth-card__footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}

export default Register