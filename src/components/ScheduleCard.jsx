import Toggle from './Toggle'

export default function ScheduleCard({ 
  day, 
  timeFrom, 
  timeTo, 
  enabled, 
  onToggle,
  onTimeChange 
}) {
  const openPicker = (e) => {
    const input = e.currentTarget.querySelector('input');
    if (input && input.showPicker) {
      input.showPicker();
    }
  };

  return (
    <div className="card-base !px-6">
      <span className="text-[16px] font-bold text-text-primary w-[50px]">{day}</span>
      
      <div className="flex items-center gap-4">
        {enabled && (
          <div className="time-range-box">
            <div 
              onClick={openPicker}
              className="flex-1 h-full flex items-center justify-center gap-1.5 hover:bg-black/5 transition-colors cursor-pointer"
            >
              <input 
                type="time" 
                value={timeFrom}
                onChange={(e) => onTimeChange(e.target.value, timeTo)}
                className="bg-transparent border-none outline-none text-inherit font-inherit pointer-events-none w-[46px] text-[15px]"
              />
              <span className="material-symbols-rounded text-[18px] text-text-placeholder">schedule</span>
            </div>

            <span className="text-text-disabled select-none mx-0.5">—</span>

            <div 
              onClick={openPicker}
              className="flex-1 h-full flex items-center justify-center gap-1.5 hover:bg-black/5 transition-colors cursor-pointer"
            >
              <input 
                type="time" 
                value={timeTo}
                onChange={(e) => onTimeChange(timeFrom, e.target.value)}
                className="bg-transparent border-none outline-none text-inherit font-inherit pointer-events-none w-[46px] text-[15px]"
              />
              <span className="material-symbols-rounded text-[18px] text-text-placeholder">schedule</span>
            </div>
          </div>
        )}
        <Toggle enabled={enabled} onChange={onToggle} />
      </div>
    </div>
  )
}
