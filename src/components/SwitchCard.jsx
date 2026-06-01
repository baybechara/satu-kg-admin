import Icon from './Icon.jsx'
import Toggle from './Toggle'

export default function SwitchCard({ label, icon, enabled, onChange }) {
  return (
    <div className="card-base">
      <div className="flex items-center gap-3">
        {icon && <Icon name={icon} className="text-[24px] text-text-placeholder"  />}
        <span className="text-[16px] font-semibold text-text-secondary">{label}</span>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  )
}
