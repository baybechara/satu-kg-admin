import Icon from './Icon.jsx'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/**
 * Unified InputField component with validation states
 * Variants: default | success | error
 */
export default function InputField({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = 'text',
  rightIcon,
  onRightIconClick,
  state = 'default', // default, success, error
  hint,
  required = false,
  ...props
}) {
  const stateClass = {
    success: 'input-success',
    error: 'input-error',
    default: '',
  }[state]

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label className="text-[16px] font-semibold text-text-primary">
          {label} {required && <span className="text-error">*</span>}
        </Label>
      )}
      <div className={`input-wrap ${stateClass}`}>
        {icon && (
          <Icon name={icon} className="input-icon"  />
        )}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent border-none outline-none shadow-none focus-visible:ring-0 focus-visible:border-none p-0 h-auto text-[18px] text-text-primary placeholder:text-text-placeholder"
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="text-text-placeholder hover:text-text-secondary transition-colors p-1"
          >
            <Icon name={rightIcon} className="text-[24px]"  />
          </button>
        )}
      </div>
      {hint && (
        <div className={`input-hint ${state === 'success' ? 'input-hint-success' : 'input-hint-error'}`}>
          <Icon name={state === 'success' ? 'done_all' : 'error'} className="text-[16px]"  />
          {hint}
        </div>
      )}
    </div>
  )
}

