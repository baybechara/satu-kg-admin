import Icon from './Icon.jsx'
import { Button as ShadcnButton } from "@/components/ui/button"

export default function IconButton({ 
  icon, 
  onClick, 
  className = '', 
  rounded = 'full', // 'full' (circle) or 'xl' (rounded square)
  type = 'button' 
}) {
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-[14px]'
  
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      className={`icon-btn ${roundedClass} ${className}`}
    >
      <Icon name={icon} className="text-[22px]"  />
    </ShadcnButton>
  )
}

