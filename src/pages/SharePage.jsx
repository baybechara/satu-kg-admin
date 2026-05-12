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
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] pb-32">
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
          <h2 className="text-[18px] font-bold text-[#151515] font-['Open_Sans']">Ссылка на магазин</h2>
          <p className="text-[14px] text-[#4A4A4A] leading-[1.4] font-['Open_Sans']">
            Отправьте ссылку покупателям — они попадут прямо в ваш каталог
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full bg-[#F0F7FF] border border-[#0066FF] text-[#0066FF] flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all active:scale-[0.98]">
              <span className="text-[16px] font-semibold font-['Open_Sans']">mystore.satu.kg</span>
              <span className="material-symbols-rounded text-[20px]">arrow_outward</span>
            </button>
            <button 
              onClick={copyLink}
              className="w-full bg-white border border-[#E0E0E0] text-[#151515] flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-rounded text-[24px] text-[#4A4A4A]">content_copy</span>
              <span className="text-[16px] font-semibold font-['Open_Sans']">Копировать ссылку</span>
            </button>
          </div>
        </div>

        {/* Card 2: Socials */}
        <div 
          className="w-full bg-white rounded-[20px] shadow-sm flex flex-col gap-4"
          style={{ padding: '20px' }}
        >
          <h2 className="text-[18px] font-bold text-[#151515] font-['Open_Sans']">Поделиться в соцсетях</h2>
          <p className="text-[14px] text-[#4A4A4A] leading-[1.4] font-['Open_Sans']">
            Отправьте ссылку на магазин в Instagram, Telegram или WhatsApp
          </p>
          <div className="flex items-center gap-3 mt-1">
            <button className="w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-7 h-7 brightness-0 invert" alt="WhatsApp" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-7 h-7 brightness-0 invert" alt="Instagram" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-[#0088CC] flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-7 h-7 brightness-0 invert" alt="Telegram" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-black flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" className="w-6 h-6 brightness-0 invert" alt="X" />
            </button>
            <button className="w-[52px] h-[52px] rounded-full bg-[#2787F5] flex items-center justify-center transition-all active:scale-95 shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/VK_Compact_Logo_%282021-present%29.svg" className="w-7 h-7 brightness-0 invert" alt="VK" />
            </button>
          </div>
        </div>

        {/* Card 3: QR Code */}
        <div 
          className="w-full bg-white rounded-[20px] shadow-sm flex flex-col gap-4"
          style={{ padding: '20px' }}
        >
          <h2 className="text-[18px] font-bold text-[#151515] font-['Open_Sans']">QR-код магазина</h2>
          <p className="text-[14px] text-[#4A4A4A] leading-[1.4] font-['Open_Sans']">
            Распечатайте и разместите у кассы — покупатели смогут сканировать и сразу попасть в ваш магазин
          </p>
          <button className="w-full bg-white border border-[#E0E0E0] text-[#151515] flex items-center justify-center gap-2 h-[52px] rounded-[16px] transition-all active:scale-[0.98] mt-1">
            <span className="material-symbols-rounded text-[24px] text-[#4A4A4A]">print</span>
            <span className="text-[16px] font-semibold font-['Open_Sans']">Распечатать QR-код</span>
          </button>
        </div>

        {/* Spacer for BottomNav */}
        <div style={{ height: '120px', flexShrink: 0, width: '100%' }} />

      </div>
    </div>
  )
}
