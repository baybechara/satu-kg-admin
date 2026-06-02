import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Copy, Printer } from 'lucide-react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'

export default function SharePage() {
  const navigate = useNavigate()

  const copyLink = () => {
    navigator.clipboard.writeText('mystore.satu.kg')
    alert('Ссылка скопирована!')
  }

  return (
    <>
      <Header title="Поделиться магазином" />

      <div className="flex flex-col gap-6 pt-6 pb-20 w-full">
        
        {/* Card 1: Link */}
        <div className="w-full bg-card border rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight">Ссылка на магазин</h2>
            <p className="text-[14px] text-muted-foreground leading-snug">
              Отправьте ссылку покупателям — они попадут прямо в ваш каталог
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a 
              href="https://mystore.satu.kg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center gap-2 h-12 rounded-xl transition-colors"
            >
              <span className="text-[16px] font-semibold">mystore.satu.kg</span>
              <ExternalLink className="w-5 h-5" />
            </a>
            <Button 
              variant="outline"
              onClick={copyLink}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl text-neutral-900"
            >
              <Copy className="w-5 h-5 text-muted-foreground" />
              <span className="text-[16px] font-semibold">Копировать ссылку</span>
            </Button>
          </div>
        </div>

        {/* Card 2: Socials */}
        <div className="w-full bg-card border rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight">Поделиться в соцсетях</h2>
            <p className="text-[14px] text-muted-foreground leading-snug">
              Отправьте ссылку на магазин в Instagram, Telegram или WhatsApp
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="w-[52px] h-[52px] rounded-full bg-[#25D366] hover:bg-[#20b858] flex items-center justify-center transition-colors shrink-0">
              <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-7 h-7" alt="WhatsApp" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-opacity hover:opacity-90 shrink-0" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <img src="https://cdn.simpleicons.org/instagram/white" className="w-7 h-7" alt="Instagram" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-[#24A1DE] hover:bg-[#1e8ec5] flex items-center justify-center transition-colors shrink-0">
              <img src="https://cdn.simpleicons.org/telegram/white" className="w-7 h-7" alt="Telegram" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-black hover:bg-neutral-800 flex items-center justify-center transition-colors shrink-0">
              <img src="https://cdn.simpleicons.org/x/white" className="w-6 h-6" alt="X" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-[#0077FF] hover:bg-[#0066dd] flex items-center justify-center transition-colors shrink-0">
              <img src="https://cdn.simpleicons.org/vk/white" className="w-7 h-7" alt="VK" />
            </button>
          </div>
        </div>

        {/* Card 3: QR Code */}
        <div className="w-full bg-card border rounded-xl p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[18px] font-bold text-neutral-900 tracking-tight">QR-код магазина</h2>
            <p className="text-[14px] text-muted-foreground leading-snug">
              Распечатайте и разместите у кассы — покупатели смогут сканировать и сразу попасть в ваш магазин
            </p>
          </div>
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl text-neutral-900"
          >
            <Printer className="w-5 h-5 text-muted-foreground" />
            <span className="text-[16px] font-semibold">Распечатать QR-код</span>
          </Button>
        </div>

      </div>
    </>
  )
}
