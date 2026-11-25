import './StatCard.css'

function StatCard({ label, value, icon: Icon, tone = 'teal', hint }) {
  return (
    <div className="card stat-card">
      <span className={`stat-card__icon stat-card__icon--${tone}`}>
        <Icon size={20} aria-hidden="true" />
      </span>

      <div className="stat-card__body">
        <span className="stat-card__label">{label}</span>
        <strong className="stat-card__value">{value}</strong>
        {hint && <span className="stat-card__hint">{hint}</span>}
      </div>
    </div>
  )
}

export default StatCard
