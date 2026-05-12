export default function IconButton({ 
  icon, 
  onClick, 
  className = '', 
  rounded = 'full', // 'full' (circle) or 'xl' (rounded square)
  type = 'button' 
}) {
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-[14px]'
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`icon-btn ${roundedClass} ${className}`}
    >
      <span className="material-symbols-rounded text-[22px]">{icon}</span>
    </button>
  )
}
