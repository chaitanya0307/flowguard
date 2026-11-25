import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Gauge, Paperclip, X } from 'lucide-react'
import FormField from '../../components/FormField.jsx'
import PriorityBadge from '../../components/PriorityBadge.jsx'
import {
  calculatePriority,
  categories,
  maxScore,
} from '../../utils/priorityEngine.js'
import '../../styles/dashboard.css'
import './NewIssue.css'

const MAX_FILES = 5
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'application/pdf',
  'text/plain',
]

const urgencyOptions = [
  { value: 1, label: 'Low', hint: 'Can wait a few days' },
  { value: 2, label: 'Normal', hint: 'Needed this week' },
  { value: 3, label: 'High', hint: 'Blocking my work today' },
  { value: 4, label: 'Immediate', hint: 'Work has stopped' },
]

const impactOptions = [
  { value: 1, label: 'Only me', hint: 'Affects one person' },
  { value: 2, label: 'My team', hint: 'Affects a small group' },
  { value: 3, label: 'My department', hint: 'Affects a whole department' },
  { value: 4, label: 'Organisation', hint: 'Affects many departments' },
]

const emptyForm = {
  title: '',
  category: '',
  description: '',
  urgency: 0,
  impact: 0,
}

// A small component used only in this file: a group of radio buttons shown as cards.
function ChoiceGroup({ legend, name, options, value, onChange, error }) {
  return (
    <fieldset className={`choice-group ${error ? 'choice-group--error' : ''}`}>
      <legend className="form-field__label">{legend}</legend>

      <div className="choice-group__options">
        {options.map((option) => (
          <label
            key={option.value}
            className={`choice ${value === option.value ? 'choice--selected' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(name, option.value)}
            />
            <span className="choice__label">{option.label}</span>
            <span className="choice__hint">{option.hint}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

function NewIssue() {
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState({})
  const [submittedIssue, setSubmittedIssue] = useState(null)

  // The preview is derived from the form. It is not stored in state.
  const prediction =
    form.category && form.urgency && form.impact
      ? calculatePriority(form)
      : null

  function handleTextChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleChoiceChange(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleFilesChosen(event) {
    const chosenFiles = Array.from(event.target.files)
    const acceptedFiles = [...files]
    const problems = []

    for (const file of chosenFiles) {
      if (acceptedFiles.length >= MAX_FILES) {
        problems.push(`You can attach up to ${MAX_FILES} files.`)
        break
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        problems.push(`${file.name}: only PNG, JPG, PDF or TXT files are allowed.`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        problems.push(`${file.name}: file is larger than 5 MB.`)
        continue
      }
      acceptedFiles.push(file)
    }

    setFiles(acceptedFiles)
    setErrors((previous) => ({ ...previous, files: problems.join(' ') }))

    // Reset the input so the same file can be chosen again after removing it
    event.target.value = ''
  }

  function handleRemoveFile(indexToRemove) {
    setFiles((previous) =>
      previous.filter((file, index) => index !== indexToRemove),
    )
  }

  function validateForm() {
    const newErrors = {}

    if (form.title.trim().length < 5) {
      newErrors.title = 'Enter a short title (at least 5 characters).'
    }
    if (!form.category) {
      newErrors.category = 'Select a category.'
    }
    if (form.description.trim().length < 20) {
      newErrors.description = 'Describe the problem in at least 20 characters.'
    }
    if (!form.urgency) {
      newErrors.urgency = 'Select how urgent this is.'
    }
    if (!form.impact) {
      newErrors.impact = 'Select the business impact.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    // TEMPORARY: the issue is not saved yet. The Spring Boot API will store it in Phase 5.
    const priority = calculatePriority(form)
    const dueAt = new Date(Date.now() + priority.slaHours * 60 * 60 * 1000)

    setSubmittedIssue({
      id: `FG-${Math.floor(1100 + Math.random() * 900)}`,
      title: form.title.trim(),
      priority,
      dueAt,
    })
    setForm(emptyForm)
    setFiles([])
  }

  function handleCreateAnother() {
    setSubmittedIssue(null)
    setErrors({})
  }

  if (submittedIssue) {
    return (
      <section className="card success-card">
        <span className="success-card__icon">
          <BadgeCheck size={28} aria-hidden="true" />
        </span>
        <h1>Issue submitted</h1>
        <p className="text-muted">
          {submittedIssue.id}: {submittedIssue.title}
        </p>

        <div className="success-card__facts">
          <PriorityBadge level={submittedIssue.priority.level} />
          <span>Score {submittedIssue.priority.score}</span>
          <span>
            Resolve by{' '}
            {submittedIssue.dueAt.toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        </div>

        <div className="success-card__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleCreateAnother}
          >
            Create another issue
          </button>
          <Link to="/employee" className="btn btn--primary">
            Back to dashboard
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <header className="page-header">
        <div className="page-header__text">
          <h1>Create a new issue</h1>
          <p className="text-muted">
            Tell us what is wrong. FlowGuard calculates the priority and the
            resolution deadline for you.
          </p>
        </div>
      </header>

      <div className="new-issue">
        <form className="card new-issue__form" onSubmit={handleSubmit} noValidate>
          <FormField label="Title" htmlFor="title" error={errors.title}>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              placeholder="Short summary of the problem"
              value={form.title}
              onChange={handleTextChange}
            />
          </FormField>

          <FormField label="Category" htmlFor="category" error={errors.category}>
            <select
              id="category"
              name="category"
              className="form-input"
              value={form.category}
              onChange={handleTextChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            error={errors.description}
          >
            <textarea
              id="description"
              name="description"
              className="form-input"
              rows={5}
              placeholder="What happened, when it started and what you have already tried"
              value={form.description}
              onChange={handleTextChange}
            />
          </FormField>

          <ChoiceGroup
            legend="Urgency"
            name="urgency"
            options={urgencyOptions}
            value={form.urgency}
            onChange={handleChoiceChange}
            error={errors.urgency}
          />

          <ChoiceGroup
            legend="Business impact"
            name="impact"
            options={impactOptions}
            value={form.impact}
            onChange={handleChoiceChange}
            error={errors.impact}
          />

          <FormField label="Supporting evidence (optional)" htmlFor="evidence" error={errors.files}>
            <label className="file-picker" htmlFor="evidence">
              <Paperclip size={16} aria-hidden="true" />
              Attach files
            </label>
            <input
              id="evidence"
              type="file"
              className="visually-hidden"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.txt"
              onChange={handleFilesChosen}
            />
            <p className="text-muted file-hint">
              Up to 5 files, 5 MB each. PNG, JPG, PDF or TXT.
            </p>

            {files.length > 0 && (
              <ul className="file-list">
                {files.map((file, index) => (
                  <li className="file-item" key={`${file.name}-${index}`}>
                    <span>
                      {file.name} ({Math.max(1, Math.round(file.size / 1024))} KB)
                    </span>
                    <button
                      type="button"
                      className="file-item__remove"
                      onClick={() => handleRemoveFile(index)}
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </FormField>

          <button type="submit" className="btn btn--primary">
            Submit issue
          </button>
        </form>

        <aside className="card preview-card" aria-label="Priority preview">
          <div className="preview-card__title">
            <Gauge size={18} aria-hidden="true" />
            <h2>Priority preview</h2>
          </div>

          {prediction ? (
            <>
              <div className="score">
                <span className="score__value">{prediction.score}</span>
                <span className="text-muted">of {maxScore} points</span>
                <PriorityBadge level={prediction.level} />
              </div>

              <div className="meter" aria-hidden="true">
                <div
                  className={`meter__bar meter__bar--${prediction.level.toLowerCase()}`}
                  style={{ width: `${(prediction.score / maxScore) * 100}%` }}
                />
              </div>

              <p>
                Resolution target:{' '}
                <strong>{prediction.slaHours} hours</strong> after submission.
              </p>

              <ul className="breakdown">
                {prediction.breakdown.map((row) => (
                  <li key={row.label}>
                    <span>
                      {row.label}
                      <span className="text-muted"> ({row.detail})</span>
                    </span>
                    <strong>+{row.points}</strong>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted">
              Choose a category, urgency and business impact to see the
              calculated priority and deadline.
            </p>
          )}
        </aside>
      </div>
    </>
  )
}

export default NewIssue