export default function RadioCard({ label, selected, onClick }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="card-base w-full text-left"
    >
      <span className="text-[16px] font-semibold text-text-secondary">{label}</span>
      <div className={`radio-circle ${selected ? 'radio-active' : ''}`}>
        {selected && <div className="radio-dot" />}
      </div>
    </button>
  )
}
