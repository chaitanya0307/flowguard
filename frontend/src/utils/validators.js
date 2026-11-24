// Each validator returns an error message, or an empty string when the value is valid.

export function validateRequired(value, label) {
  return value.trim() ? '' : `${label} is required.`
}

export function validateEmail(value) {
  if (!value.trim()) {
    return 'Email is required.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(value.trim())) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validatePassword(value) {
  if (!value) {
    return 'Password is required.'
  }

  if (value.length < 8) {
    return 'Password must be at least 8 characters.'
  }

  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return 'Password must contain at least one letter and one number.'
  }

  return ''
}