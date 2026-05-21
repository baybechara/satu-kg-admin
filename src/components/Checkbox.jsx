import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

/**
 * Unified Checkbox component
 * Matches Figma: Rounded 8px, Green when checked
 */
export default function Checkbox({ label, checked, onChange, className = "", ...props }) {
  const id = label ? `checkbox-${label.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}` : undefined;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ShadcnCheckbox
        id={id}
        checked={checked}
        onCheckedChange={(val) => onChange(!!val)}
        {...props}
      />
      {label && (
        <Label
          htmlFor={id}
          className="t-caption text-text-disabled hover:text-text-secondary cursor-pointer transition-colors"
        >
          {label}
        </Label>
      )}
    </div>
  )
}

