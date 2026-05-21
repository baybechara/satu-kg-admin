import Toggle from './Toggle'
import TimePicker from './TimePicker'

export default function ScheduleCard({ day, timeFrom, timeTo, enabled, onToggle, onTimeChange }) {
  return (
    <div className={`
      flex items-center justify-between px-3 py-2.5 rounded-[10px] border transition-all
      ${enabled
        ? 'bg-white border-neutral-200'
        : 'bg-neutral-50 border-neutral-100'
      }
    `}>
      {/* Day label */}
      <span className={`w-[28px] text-[13px] font-bold shrink-0 ${enabled ? 'text-neutral-800' : 'text-neutral-400'}`}>
        {day}
      </span>

      {/* Time range */}
      <div className="flex items-center gap-1.5 flex-1 mx-3">
        {enabled ? (
          <>
            <TimePicker value={timeFrom} onChange={(v) => onTimeChange(v, timeTo)} />
            <span className="text-[12px] text-neutral-400 select-none">—</span>
            <TimePicker value={timeTo} onChange={(v) => onTimeChange(timeFrom, v)} />
          </>
        ) : (
          <span className="text-[12px] text-neutral-400 italic">выходной</span>
        )}
      </div>

      {/* Toggle */}
      <Toggle enabled={enabled} onChange={onToggle} />
    </div>
  )
}
