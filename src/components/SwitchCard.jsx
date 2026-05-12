import Toggle from './Toggle'

export default function SwitchCard({ label, icon, enabled, onChange }) {
  return (
    <div className="card-base">
      <div className="flex items-center gap-3">
        {icon && <span className="material-symbols-rounded text-[24px] text-text-placeholder">{icon}</span>}
        <span className="text-[16px] font-semibold text-text-secondary">{label}</span>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  )
}
