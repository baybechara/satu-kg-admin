import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Button from './Button'

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  confirmText = 'ДА', 
  cancelText = 'НЕТ', 
  onConfirm 
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-[400px] p-6 gap-6 rounded-2xl bg-white border border-neutral-100 shadow-xl" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between gap-4">
          <DialogTitle className="text-[22px] font-semibold text-neutral-900 tracking-tight leading-none">
            {title}
          </DialogTitle>
          <button 
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-neutral-100 hover:bg-neutral-50 transition-colors" 
            onClick={onClose}
          >
            <span className="material-symbols-rounded text-neutral-900 text-[20px]">close</span>
          </button>
        </DialogHeader>
        
        <div className="flex flex-col gap-6">
          <p className="text-[16px] font-medium text-neutral-600 leading-normal">
            {message}
          </p>
          <div className="flex gap-3">
            <Button 
              variant="alt" 
              onClick={onClose}
              className="flex-1 uppercase font-bold text-sm h-12 rounded-xl"
            >
              {cancelText}
            </Button>
            <Button 
              variant="dark" 
              onClick={onConfirm}
              className="flex-1 uppercase font-bold text-sm h-12 rounded-xl"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

