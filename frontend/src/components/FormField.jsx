import './FormField.css'

function FormField({ label, htmlFor, error, children }) {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label className="form-field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && (
        <p className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField