import { Switch } from "@/components/ui/switch"

export default function Toggle({ enabled, onChange, className = "", ...props }) {
  return (
    <Switch 
      checked={enabled}
      onCheckedChange={onChange}
      className={className}
      {...props}
    />
  )
}

