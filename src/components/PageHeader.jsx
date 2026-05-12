/**
 * Unified PageHeader component
 * Figma: 24px/600 title, space-between, padding 20px
 */
export default function PageHeader({ title, children }) {
  return (
    <div className="page-header">
      <h1 className="t-h1">{title}</h1>
      {children}
    </div>
  )
}
