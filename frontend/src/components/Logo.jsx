import './Logo.css'

function Logo({ size = 36, showText = true, theme = 'light' }) {
  return (
    <div className={`logo logo--${theme}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        role="img"
        aria-label="FlowGuard logo"
      >
        <path
          className="logo__shield"
          d="M20 3 L34 8 V19 C34 28 28 34 20 37 C12 34 6 28 6 19 V8 Z"
        />
        <path className="logo__check" d="M12.5 21 L17.5 26 L27.5 14.5" />
      </svg>

      {showText && (
        <span className="logo__text">
          Flow<span className="logo__accent">Guard</span>
        </span>
      )}
    </div>
  )
}

export default Logo