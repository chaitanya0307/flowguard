import './App.css'

const brandColors = [
  { name: 'Midnight Navy', hex: '#101C2C' },
  { name: 'Deep Slate', hex: '#1C3445' },
  { name: 'Electric Teal', hex: '#20C9A6' },
  { name: 'Soft Mint', hex: '#D7F5EA' },
  { name: 'Background', hex: '#F5F7FA' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Warning Amber', hex: '#F4B740' },
  { name: 'Critical Red', hex: '#E45B65' },
]

function App() {
  return (
    <main className="preview">
      <header className="preview__header">
        <h1>FlowGuard design system</h1>
        <p className="text-muted">
          Every issue deserves an owner. Every resolution needs proof.
        </p>
      </header>

      <section className="swatch-grid">
        {brandColors.map((color) => (
          <div className="swatch" key={color.hex}>
            <div
              className="swatch__color"
              style={{ backgroundColor: color.hex }}
            />
            <strong>{color.name}</strong>
            <span className="text-muted">{color.hex}</span>
          </div>
        ))}
      </section>

      <section className="card preview__card">
        <h2>Components</h2>

        <div className="preview__row">
          <button className="btn btn--primary">Create issue</button>
          <button className="btn btn--secondary">Cancel</button>
          <button className="btn btn--danger">Reject resolution</button>
        </div>

        <div className="preview__row">
          <span className="badge badge--low">Low</span>
          <span className="badge badge--medium">Medium</span>
          <span className="badge badge--high">High</span>
          <span className="badge badge--critical">Critical</span>
        </div>
      </section>
    </main>
  )
}

export default App