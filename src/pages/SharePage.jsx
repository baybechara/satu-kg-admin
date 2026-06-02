import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ExternalLink, Copy, Printer } from 'lucide-react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
        <div className="w-full bg-card border rounded-xl p-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[16px] font-semibold tracking-tight">Ссылка на магазин</h2>
            <p className="text-[14px] text-muted-foreground leading-snug">
              Отправьте ссылку покупателям — они попадут прямо в ваш каталог
            </p>
          </div>
          
          <div className="flex flex-col gap-4 mt-2">
            <div className="relative">
              <Input
                id="store-link"
                defaultValue="https://mystore.satu.kg"
                readOnly
                className="pr-10 h-11 text-[15px] bg-background"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={copyLink}
              >
                <Copy className="h-[18px] w-[18px]" />
                <span className="sr-only">Копировать</span>
              </Button>
            </div>
            
            <Button 
              className="w-full h-11 bg-[#84cc16] hover:bg-[#65a30d] text-white font-semibold text-[15px]"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Мой магазин',
                    url: 'https://mystore.satu.kg'
                  })
                }
              }}
            >
              Поделиться
            </Button>
          </div>
        </div>

        {/* Card 2: Socials */}
        <div className="w-full bg-card border rounded-xl p-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[16px] font-semibold tracking-tight">Поделиться в соцсетях</h2>
            <p className="text-[14px] text-muted-foreground leading-snug">
              Отправьте ссылку на магазин в Instagram, Telegram или WhatsApp
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button className="w-[52px] h-[52px] rounded-full bg-[#25D366] hover:bg-[#20b858] p-0 shrink-0">
              <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-7 h-7" alt="WhatsApp" />
            </Button>
            <Button className="w-[52px] h-[52px] rounded-full p-0 shrink-0 border-0" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <img src="https://cdn.simpleicons.org/instagram/white" className="w-7 h-7" alt="Instagram" />
            </Button>
            <Button className="w-[52px] h-[52px] rounded-full bg-[#24A1DE] hover:bg-[#1e8ec5] p-0 shrink-0">
              <img src="https://cdn.simpleicons.org/telegram/white" className="w-7 h-7" alt="Telegram" />
            </Button>
            <Button className="w-[52px] h-[52px] rounded-full bg-black hover:bg-neutral-800 p-0 shrink-0">
              <img src="https://cdn.simpleicons.org/x/white" className="w-6 h-6" alt="X" />
            </Button>
            <Button className="w-[52px] h-[52px] rounded-full bg-[#0077FF] hover:bg-[#0066dd] p-0 shrink-0">
              <img src="https://cdn.simpleicons.org/vk/white" className="w-7 h-7" alt="VK" />
            </Button>
          </div>
        </div>

        {/* Card 3: QR Code */}
        <div className="w-full bg-card border rounded-xl flex flex-col pt-8">
          <div className="flex flex-col items-center px-6 text-center pb-8">
            <div className="p-4 rounded-2xl border bg-white inline-flex mb-6">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mystore.satu.kg" 
                alt="QR Code" 
                className="w-40 h-40 object-contain" 
              />
            </div>
            <h2 className="text-[16px] font-semibold tracking-tight mb-2">Отсканируйте для перехода</h2>
            <p className="text-sm text-muted-foreground leading-snug max-w-[280px]">
              Распечатайте этот код и разместите у кассы, чтобы покупатели могли сразу попасть в ваш магазин.
            </p>
          </div>
          <div className="border-t p-4 bg-muted/10 rounded-b-xl">
            <Button 
              variant="secondary"
              className="w-full h-10 font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
            >
              <Printer className="w-4 h-4 mr-2 text-muted-foreground" />
              Распечатать QR-код
            </Button>
          </div>
        </div>

      </div>
    </>
  )
}
