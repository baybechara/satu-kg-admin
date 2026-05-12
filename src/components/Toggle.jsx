export default function Toggle({ enabled, onChange }) {
  return (
    <div 
      onClick={() => onChange(!enabled)}
      className={`switch-root ${enabled ? 'switch-on' : 'switch-off'}`}
    >
      <div className="switch-thumb" />
    </div>
  )
}
