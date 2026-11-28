export default function Placeholder({ section, go }) {
  const { icon: Icon, label, text, phase, planned = [] } = section;
  return (
    <div className="d-placeholder">
      <span className="d-ph-icon"><Icon size={34} /></span>
      <h2>{label}</h2>
      <p className="d-sub">{text}</p>
      <span className="d-badge">Coming in Phase {phase}</span>

      {planned.length > 0 && (
        <div className="d-planned">
          <h4>Planned features</h4>
          <ul>
            {planned.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn btn-outline d-back" onClick={() => go('home')}>
        Back to Home
      </button>
    </div>
  );
}
