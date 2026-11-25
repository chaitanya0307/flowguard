import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import { formatDuration } from '../utils/time.js'
import './SlaCountdown.css'

// Shows time left until the SLA deadline, or how long ago it was breached.
function SlaCountdown({ createdAt, dueAt, status }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    // Refresh the current time every 30 seconds so the countdown stays live.
    const timerId = setInterval(() => setNow(Date.now()), 30000)

    // Cleanup: stop the timer when this component leaves the screen.
    return () => clearInterval(timerId)
  }, [])

  if (status === 'Closed') {
    return <span className="sla sla--done">Completed</span>
  }

  const totalWindow = new Date(dueAt) - new Date(createdAt)
  const remaining = new Date(dueAt) - now

  let state = 'ok'
  let label = `${formatDuration(remaining)} left`

  if (remaining < 0) {
    state = 'breached'
    label = `Breached ${formatDuration(-remaining)} ago`
  } else if (remaining < totalWindow * 0.25) {
    state = 'risk'
    label = `${formatDuration(remaining)} left (at risk)`
  }

  return (
    <span className={`sla sla--${state}`}>
      <Clock size={14} aria-hidden="true" />
      {label}
    </span>
  )
}

export default SlaCountdown
