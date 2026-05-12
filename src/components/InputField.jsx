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
  required = false
}) {
  const stateClass = {
    success: 'input-success',
    error: 'input-error',
    default: '',
  }[state]

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-[16px] font-semibold text-text-primary">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <div className={`input-wrap ${stateClass}`}>
        {icon && (
          <span className="material-symbols-rounded input-icon">{icon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="text-text-placeholder hover:text-text-secondary transition-colors p-1"
          >
            <span className="material-symbols-rounded text-[24px]">
              {rightIcon}
            </span>
          </button>
        )}
      </div>
      {hint && (
        <div className={`input-hint ${state === 'success' ? 'input-hint-success' : 'input-hint-error'}`}>
          <span className="material-symbols-rounded text-[16px]">
            {state === 'success' ? 'done_all' : 'error'}
          </span>
          {hint}
        </div>
      )}
    </div>
  )
}
