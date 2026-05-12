/**
 * Unified Checkbox component
 * Matches Figma: Rounded 8px, Green when checked
 */
export default function Checkbox({ label, checked, onChange }) {
  return (
    <label 
      className="flex items-center gap-3 cursor-pointer group"
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
    >
      <div className={`checkbox ${checked ? 'checked' : ''}`}>
        {checked && (
          <span className="material-symbols-rounded text-white text-[18px]">
            check
          </span>
        )}
      </div>
      {label && (
        <span className="t-caption text-text-disabled group-hover:text-text-secondary transition-colors">
          {label}
        </span>
      )}
    </label>
  )
}
