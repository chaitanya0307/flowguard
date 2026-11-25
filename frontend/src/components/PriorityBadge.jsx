function PriorityBadge({ level }) {
  return (
    <span className={`badge badge--${level.toLowerCase()}`}>{level}</span>
  )
}

export default PriorityBadge
