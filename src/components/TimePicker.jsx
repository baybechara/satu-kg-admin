import { useRef } from 'react'

export default function TimePicker({ value, onChange }) {
  const inputRef = useRef(null)

  return (
    <div
      className="h-[34px] w-[90px] flex items-center bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-[8px] px-2 transition-all focus-within:border-neutral-400 focus-within:bg-white cursor-pointer"
      onClick={() => inputRef.current?.showPicker?.()}
    >
      <input
        ref={inputRef}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-none outline-none text-[13px] font-semibold text-neutral-700 pointer-events-none"
      />
    </div>
  )
}
