import './StatusBadge.css'

function StatusBadge({ status }) {
  const variant = status.toLowerCase().replace(/ /g, '-')

  return <span className={`status status--${variant}`}>{status}</span>
}

export default StatusBadge
