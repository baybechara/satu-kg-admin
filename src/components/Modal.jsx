import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  confirmText = 'Да', 
  cancelText = 'Отмена', 
  onConfirm,
  variant = 'default',
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent
        className="max-w-[420px] rounded-lg border border-neutral-200 bg-white p-6 shadow-lg gap-0"
        showCloseButton={false}
      >
        {/* Close X — точно как у shadcn */}
        <DialogClose asChild>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-sm text-neutral-500 hover:text-neutral-900 transition-colors ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <XIcon size={16} strokeWidth={2} />
            <span className="sr-only">Закрыть</span>
          </button>
        </DialogClose>

        {/* Header */}
        <DialogHeader className="mb-1 pr-6">
          <DialogTitle className="text-[17px] font-semibold text-neutral-900 leading-snug tracking-tight">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Message */}
        {message && (
          <DialogDescription className="text-[14px] text-neutral-500 leading-relaxed mb-6">
            {message}
          </DialogDescription>
        )}

        {/* Buttons — правый угол, как у shadcn */}
        <DialogFooter className="flex flex-row justify-end gap-2 sm:flex-row sm:space-x-0">
          <button
            onClick={onClose}
            className="h-[38px] px-5 border border-neutral-200 bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-900 text-[14px] font-medium rounded-md transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`h-[38px] px-5 active:scale-[0.98] text-white text-[14px] font-medium rounded-md transition-all ${
              variant === 'danger'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-neutral-900 hover:bg-neutral-800'
            }`}
          >
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
