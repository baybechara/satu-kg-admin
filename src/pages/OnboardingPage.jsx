import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import ScheduleCard from '../components/ScheduleCard'
import SwitchCard from '../components/SwitchCard'
import RadioCard from '../components/RadioCard'
import Modal from '../components/Modal'
import IconButton from '../components/IconButton'

const TOTAL_STEPS = 9

function ProgressBar({ current, total }) {
  return (
    <div className="flex gap-1.5 w-full max-w-[180px]">
      {Array.from({ length: total }).map((_, i) => (
        <div 
          key={i} 
          className={`h-[3.5px] flex-1 rounded-full transition-all duration-500 ${
            i <= current ? 'bg-[#2D2D2D]' : 'bg-[#E5E5E5]'
          }`}
        />
      ))}
    </div>
  )
}

function StepHeader({ title, subtitle, currentStep, onExit }) {
  return (
    <div className="flex flex-col gap-8 mb-4">
      <div className="flex items-center justify-between">
        <ProgressBar current={currentStep} total={TOTAL_STEPS} />
        <IconButton icon="close" onClick={onExit} />
      </div>
      <div className="onboarding-title-group">
        <h2 className="text-[28px] font-bold leading-[1.2] text-text-primary">{title}</h2>
        {subtitle && <p className="text-[15px] leading-relaxed text-text-disabled">{subtitle}</p>}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)

  const [domain, setDomain] = useState('')
  const [storeName, setStoreName] = useState('')
  const [description, setDescription] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [whatsappBackup, setWhatsappBackup] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneBackups, setPhoneBackups] = useState([])
  const [address, setAddress] = useState('')
  
  const [instagram, setInstagram] = useState('')
  const [telegram, setTelegram] = useState('')
  const [customLinks, setCustomLinks] = useState([])

  const [schedule, setSchedule] = useState({
    mon: { enabled: true, from: '08:00', to: '19:00' },
    tue: { enabled: true, from: '08:00', to: '19:00' },
    wed: { enabled: true, from: '08:00', to: '19:00' },
    thu: { enabled: true, from: '08:00', to: '19:00' },
    fri: { enabled: true, from: '08:00', to: '19:00' },
    sat: { enabled: false, from: '08:00', to: '19:00' },
    sun: { enabled: false, from: '08:00', to: '19:00' },
  })

  const [deliveryPickup, setDeliveryPickup] = useState(false)
  const [deliveryCourier, setDeliveryCourier] = useState(false)
  const [deliveryCourierCost, setDeliveryCourierCost] = useState('')
  const [deliveryFixed, setDeliveryFixed] = useState(false)
  const [deliveryFixedCost, setDeliveryFixedCost] = useState('')
  const [deliveryFreeLimit, setDeliveryFreeLimit] = useState(false)
  const [deliveryFreeLimitThreshold, setDeliveryFreeLimitThreshold] = useState('')

  const dayLabels = { mon:'Пн', tue:'Вт', wed:'Ср', thu:'Чт', fri:'Пт', sat:'Сб', sun:'Вс' }

  const handleNext = () => { step < TOTAL_STEPS - 1 ? setStep(step + 1) : navigate('/catalog') }
  const handleBack = () => { if (step > 0) setStep(step - 1) }

  const addPhoneBackup = () => { if (phoneBackups.length < 2) setPhoneBackups([...phoneBackups, '']) }
  const updatePhoneBackup = (index, value) => {
    const newBackups = [...phoneBackups]
    newBackups[index] = value
    setPhoneBackups(newBackups)
  }
  const updateTime = (key, from, to) => {
    setSchedule({ ...schedule, [key]: { ...schedule[key], from, to } })
  }

  const addCustomLink = () => { if (customLinks.length < 3) setCustomLinks([...customLinks, '']) }
  const updateCustomLink = (index, value) => {
    const newLinks = [...customLinks]
    newLinks[index] = value
    setCustomLinks(newLinks)
  }

  const renderStep = () => {
    const commonProps = { currentStep: step, onExit: () => setIsExitModalOpen(true) }
    
    switch (step) {
      case 0: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Название вашего магазина" subtitle="Адрес будет выглядеть так: mystore.satu.kg (только латинские буквы)" />
          <div className="flex flex-col gap-6 mt-4">
            <InputField label="Адрес магазина (домен)" required icon="link" placeholder="mystore (латинские буквы)" value={domain} onChange={(e) => setDomain(e.target.value)} />
            <InputField label="Название магазина" required icon="storefront" placeholder="Напр. Beko Kyrgyzstan" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
        </div>
      )
      case 1: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Расскажите о вашем магазине" subtitle="Опишите чем занимается ваш магазин. Покупатели увидят это на витрине." />
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center justify-between">
              <label className="text-[16px] font-semibold text-text-primary">Описание <span className="text-error">*</span></label>
              <span className="text-[13px] text-text-disabled">осталось {200 - description.length} символов</span>
            </div>
            <div className="textarea-wrap">
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                placeholder="Напр. Магазин бытовой техники с доставкой по Бишкеку" 
                className="h-32 pt-4 px-4 bg-surface rounded-[16px] border border-border focus:border-accent outline-none transition-all resize-none text-[16px]" 
              />
            </div>
          </div>
        </div>
      )
      case 2: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Загрузите логотип магазина" subtitle="Рекомендуемый размер: 600×600 пкс, не более 5 МБ. Форматы: JPG, PNG" />
          <Button variant="alt" className="mt-4 flex items-center justify-center gap-3">
            <span className="material-symbols-rounded text-[28px]">add_a_photo</span>
            <span>Выбрать логотип</span>
          </Button>
        </div>
      )
      case 3: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Номер WhatsApp для приёма заказов" subtitle="На этот номер будут приходить уведомления о новых заказах." />
          <div className="flex flex-col gap-6 mt-4">
            <InputField label="Основной номер WhatsApp" required icon="chat" placeholder="Введите номер WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            <InputField label="Резервный номер (необязательно)" icon="chat" placeholder="Введите номер WhatsApp" value={whatsappBackup} onChange={(e) => setWhatsappBackup(e.target.value)} />
          </div>
        </div>
      )
      case 4: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Контакты магазина" subtitle="Укажите телефон для связи — покупатели увидят его на витрине." />
          <div className="flex flex-col gap-6 mt-4">
            <InputField label="Номер телефона" required icon="call" placeholder="Введите номер" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {phoneBackups.map((val, idx) => (
              <InputField key={idx} label={`Резервный номер ${idx + 1} (необязательно)`} icon="call" placeholder="Введите номер" value={val} onChange={(e) => updatePhoneBackup(idx, e.target.value)} />
            ))}
            {phoneBackups.length < 2 && (
              <Button variant="alt" onClick={addPhoneBackup} className="flex items-center justify-center gap-3">
                <span className="material-symbols-rounded text-[24px]">add_call</span>
                <span>Добавить резервный номер</span>
              </Button>
            )}
          </div>
        </div>
      )
      case 5: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Адрес магазина" subtitle="Укажите адрес магазина или точку выдачи заказов." />
          <div className="mt-4">
            <InputField label="Адрес магазина" required icon="location_on" placeholder="г. Бишкек, ул. ..." value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
      )
      case 6: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Часы работы" subtitle="Укажите время работы вашего магазина." />
          <div className="flex flex-col gap-3 mt-4">
            {Object.entries(dayLabels).map(([key, name]) => (
              <ScheduleCard 
                key={key} day={name} timeFrom={schedule[key].from} timeTo={schedule[key].to} enabled={schedule[key].enabled}
                onToggle={(v) => setSchedule({ ...schedule, [key]: { ...schedule[key], enabled: v } })}
                onTimeChange={(from, to) => updateTime(key, from, to)}
              />
            ))}
          </div>
        </div>
      )
      case 7: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Доставка" subtitle="Выберите способы и настройте стоимость доставки." />
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-3">
              <SwitchCard label="Самовывоз (забрать из магазина)" icon="store" enabled={deliveryPickup} onChange={setDeliveryPickup} />
              {deliveryPickup && (
                <div className="bg-[#F5F5F5] rounded-[16px] p-4 animate-fade-in text-[14px] text-text-secondary">
                  Покупатели увидят адрес: <span className="font-bold">{address || 'не указан'}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <SwitchCard label="Доставка курьером" icon="local_shipping" enabled={deliveryCourier} onChange={setDeliveryCourier} />
              {deliveryCourier && (
                <div className="animate-fade-in"><InputField label="Стоимость доставки (сом)" placeholder="Напр. 150" value={deliveryCourierCost} onChange={(e) => setDeliveryCourierCost(e.target.value)} /></div>
              )}
            </div>
            <h3 className="section-header">Глобальные настройки стоимости</h3>
            <div className="flex flex-col gap-3">
              <SwitchCard label="Фиксированная стоимость на всё" icon="payments" enabled={deliveryFixed} onChange={setDeliveryFixed} />
              {deliveryFixed && (
                <div className="animate-fade-in"><InputField label="Сумма (сом)" placeholder="Напр. 200" value={deliveryFixedCost} onChange={(e) => setDeliveryFixedCost(e.target.value)} required /></div>
              )}
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <SwitchCard label="Бесплатно при заказе от суммы" icon="redeem" enabled={deliveryFreeLimit} onChange={setDeliveryFreeLimit} />
              {deliveryFreeLimit && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  <InputField label="Порог бесплатной доставки (сом)" placeholder="Напр. 2000" value={deliveryFreeLimitThreshold} onChange={(e) => setDeliveryFreeLimitThreshold(e.target.value)} />
                </div>
              )}
            </div>
          </div>
        </div>
      )
      case 8: return (
        <div className="flex flex-col gap-0">
          <StepHeader {...commonProps} title="Ваши соцсети и сайты" subtitle="Вы можете создавать ссылки на внешние сайты, которые будут отображаться в верхней части вашего магазина." />
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-2.5">
              <label className="text-[16px] font-semibold text-text-primary">Instagram</label>
              <div className="input-wrap bg-surface">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6" alt="IG" />
                </div>
                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="instagram.com/ваш_магазин" className="input-field" />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="text-[16px] font-semibold text-text-primary">Telegram</label>
              <div className="input-wrap bg-surface">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-6 h-6" alt="TG" />
                </div>
                <input type="text" value={telegram} onChange={(e) => setTelegram(e.target.value)} placeholder="https://www.telegram.com/..." className="input-field" />
              </div>
            </div>
            {customLinks.map((val, idx) => (
              <div key={idx} className="flex flex-col gap-2.5 animate-fade-in">
                <label className="text-[16px] font-semibold text-text-primary">Другой сайт {idx + 1}</label>
                <div className="input-wrap bg-surface">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 text-text-placeholder">
                    <span className="material-symbols-rounded text-[24px]">language</span>
                  </div>
                  <input type="text" value={val} onChange={(e) => updateCustomLink(idx, e.target.value)} placeholder="https://yoursite.com" className="input-field" />
                </div>
              </div>
            ))}
            {customLinks.length < 3 && (
              <Button variant="alt" onClick={addCustomLink} className="flex items-center justify-center gap-3">
                <span className="material-symbols-rounded text-[24px]">add</span>
                <span>Добавить еще</span>
              </Button>
            )}
          </div>
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F0F0F0]">
      <div className="max-w-[820px] w-full mx-auto bg-[#F8F8F8] min-h-screen flex flex-col shadow-2xl">
        <div className="flex-1 flex flex-col justify-between auth-padding pt-14 pb-10">
          <div className="flex flex-col">{renderStep()}</div>
          <div className="auth-button-group">
            <Button variant="dark" onClick={() => step < TOTAL_STEPS - 1 ? setStep(step + 1) : navigate('/catalog')}>{step === TOTAL_STEPS - 1 ? 'Открыть мой магазин' : 'Далее'}</Button>
            {step > 0 && <Button variant="light" onClick={handleBack}>Назад</Button>}
          </div>
        </div>
      </div>
      <Modal isOpen={isExitModalOpen} onClose={() => setIsExitModalOpen(false)} onConfirm={() => navigate('/login')} title="Выйти" message="Вы уверены, что хотите прервать настройку? Введенные данные могут не сохраниться." />
    </div>
  )
}
