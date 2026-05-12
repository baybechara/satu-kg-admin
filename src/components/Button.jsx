/**
 * Unified Button component
 * Variants: primary | dark | light | accent | danger
 * Sizes: default (full-width) | sm (inline) | fab (floating)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    dark: 'btn-dark',
    light: 'btn-light',
    accent: 'btn-accent',
    danger: 'btn-danger',
    alt: 'btn-alt',
  }[variant] || 'btn-primary'

  const sizeClass = {
    default: '',
    sm: 'btn-sm',
    fab: 'btn-fab',
  }[size] || ''

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
