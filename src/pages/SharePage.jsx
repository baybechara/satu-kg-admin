import Icon from '../components/Icon.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Header from '../components/Header'

export default function SharePage() {
  const navigate = useNavigate()

  const copyLink = () => {
    navigator.clipboard.writeText('mystore.satu.kg')
    alert('Ссылка скопирована!')
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 pb-32">
      <Header title="Поделиться магазином" />

      <div 
        className="w-full max-w-[820px] mx-auto pt-6 flex flex-col items-center flex-1 gap-4"
        style={{ paddingLeft: '20px', paddingRight: '20px' }}
      >
        
        {/* Card 1: Link */}
        <div 
          className="w-full bg-white rounded-[20px] shadow-sm flex flex-col gap-4"
          style={{ padding: '20px' }}
        >
          <h2 className="text-[18px] font-bold text-neutral-900 font-['Open_Sans']">Ссылка на магазин</h2>
          <p className="text-[14px] text-neutral-700 leading-[1.4] font-['Open_Sans']">
            Отправьте ссылку покупателям — они попадут прямо в ваш каталог
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-blue-50 border border-blue-600 text-blue-600 flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all active:scale-[0.98]">
              <span className="text-[16px] font-semibold font-['Open_Sans']">mystore.satu.kg</span>
              <Icon name="arrow_outward" className="text-[20px]"  />
            </button>
            <button 
              onClick={copyLink}
              className="w-full bg-white border border-neutral-300 text-neutral-900 flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all active:scale-[0.98]"
            >
              <Icon name="content_copy" className="text-[24px] text-neutral-700"  />
              <span className="text-[16px] font-semibold font-['Open_Sans']">Копировать ссылку</span>
            </button>
          </div>
        </div>

        {/* Card 2: Socials */}
        <div 
          className="w-full bg-white rounded-[20px] shadow-sm flex flex-col gap-4"
          style={{ padding: '20px' }}
        >
          <h2 className="text-[18px] font-bold text-neutral-900 font-['Open_Sans']">Поделиться в соцсетях</h2>
          <p className="text-[14px] text-neutral-700 leading-[1.4] font-['Open_Sans']">
            Отправьте ссылку на магазин в Instagram, Telegram или WhatsApp
          </p>
          <div className="flex items-center gap-3 mt-1">
            <button className="w-[52px] h-[52px] rounded-full bg-green-500 flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://cdn.simpleicons.org/whatsapp/white" className="w-7 h-7" alt="WhatsApp" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <img src="https://cdn.simpleicons.org/instagram/white" className="w-7 h-7" alt="Instagram" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-blue-600 flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://cdn.simpleicons.org/telegram/white" className="w-7 h-7" alt="Telegram" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-black flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://cdn.simpleicons.org/x/white" className="w-6 h-6" alt="X" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-blue-500 flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://cdn.simpleicons.org/vk/white" className="w-7 h-7" alt="VK" />
            </button>
          </div>
        </div>

        {/* Card 3: QR Code */}
        <div 
          className="w-full bg-white rounded-[20px] shadow-sm flex flex-col gap-4"
          style={{ padding: '20px' }}
        >
          <h2 className="text-[18px] font-bold text-neutral-900 font-['Open_Sans']">QR-код магазина</h2>
          <p className="text-[14px] text-neutral-700 leading-[1.4] font-['Open_Sans']">
            Распечатайте и разместите у кассы — покупатели смогут сканировать и сразу попасть в ваш магазин
          </p>
          <button className="w-full bg-white border border-neutral-300 text-neutral-900 flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all active:scale-[0.98] mt-1">
            <Icon name="print" className="text-[24px] text-neutral-700"  />
            <span className="text-[16px] font-semibold font-['Open_Sans']">Распечатать QR-код</span>
          </button>
        </div>

        {/* Spacer for BottomNav */}
        <div style={{ height: '120px', flexShrink: 0, width: '100%' }} />

      </div>
    </div>
  )
}
