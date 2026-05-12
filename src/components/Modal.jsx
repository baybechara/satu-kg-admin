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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-[24px] font-bold text-text-primary">{title}</h3>
          <IconButton icon="close" onClick={onClose} />
        </div>
        
        <div className="modal-body">
          <div className="modal-inner-card">
            <p className="text-[18px] font-medium text-text-primary">{message}</p>
            <div className="flex gap-3">
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
    </div>
  )
}
