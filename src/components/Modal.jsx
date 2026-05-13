import Button from './Button'
import IconButton from './IconButton'

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  confirmText = 'ДА', 
  cancelText = 'НЕТ', 
  onConfirm 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={onClose}>
      <div className="custom-modal-outer" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-neutral-900 font-['Open_Sans'] tracking-tight">{title}</h2>
          <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm" onClick={onClose}>
            <span className="material-symbols-rounded text-neutral-900 text-[20px]">close</span>
          </button>
        </div>
        
        <div className="custom-modal-inner shadow-sm">
          <p className="text-[16px] font-medium text-neutral-900 font-['Open_Sans']">{message}</p>
          <div className="flex gap-3" style={{ marginTop: '24px' }}>
            <Button 
              variant="alt" 
              onClick={onClose}
              className="flex-1 uppercase font-bold"
            >
              {cancelText}
            </Button>
            <Button 
              variant="dark" 
              onClick={onConfirm}
              className="flex-1 uppercase font-bold"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
