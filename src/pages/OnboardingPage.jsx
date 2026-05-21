import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ScheduleCard from '../components/ScheduleCard'
import Toggle from '../components/Toggle'
import Modal from '../components/Modal'
import { Checkbox } from '@/components/ui/checkbox'

const TOTAL_STEPS = 9

// ─── Shared input style ───────────────────────────────────────────────────────
const inputCls =
  'h-[44px] w-full bg-white border border-neutral-300 rounded-[10px] px-3 text-[14px] text-neutral-800 placeholder:text-neutral-400 outline-none transition-all focus:border-neutral-400 focus:bg-neutral-50'

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, children, right }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-semibold text-neutral-700">
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {right}
        </div>
      )}
      {children}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 rounded-full transition-all duration-500 ${
            i <= current ? 'bg-neutral-800' : 'bg-neutral-200'
          }`}
        />
      ))}
    </div>
  )
}

// ─── Inline switch row ────────────────────────────────────────────────────────
function SwitchRow({ label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-[14px] text-neutral-700">{label}</span>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  )
}

// ─── Add button ───────────────────────────────────────────────────────────────
function AddButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[40px] border border-dashed border-neutral-300 rounded-[10px] text-[13px] font-semibold text-neutral-500 hover:border-neutral-400 hover:text-neutral-700 transition-all flex items-center justify-center gap-2"
    >
      <span className="material-symbols-rounded text-[18px]">add</span>
      {children}
    </button>
  )
}

// ─── Social input ─────────────────────────────────────────────────────────────
function SocialInput({ logo, placeholder, value, onChange }) {
  return (
    <div className="flex items-center border border-neutral-300 rounded-[10px] overflow-hidden focus-within:border-neutral-400 focus-within:bg-neutral-50 transition-all">
      <div className="flex items-center justify-center w-[44px] h-[44px] shrink-0 border-r border-neutral-200">
        {logo}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 h-[44px] px-3 text-[14px] text-neutral-800 placeholder:text-neutral-400 outline-none bg-transparent"
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function OnboardingPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const step = parseInt(searchParams.get('step') || '0', 10)
  const setStep = (n) => setSearchParams({ step: n.toString() })

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

  const handleNext = () => step < TOTAL_STEPS - 1 ? setStep(step + 1) : navigate('/catalog')
  const handleBack = () => { if (step > 0) navigate(-1) }

  const steps = [
    { title: 'Название магазина', subtitle: 'Адрес будет: mystore.satu.kg (латинские буквы)' },
    { title: 'О магазине', subtitle: 'Опишите чем занимается магазин. Покупатели увидят это на витрине.' },
    { title: 'Логотип', subtitle: 'Рекомендуемый размер: 600×600 пкс, до 5 МБ. Форматы: JPG, PNG' },
    { title: 'WhatsApp для заказов', subtitle: 'На этот номер будут приходить уведомления о новых заказах.' },
    { title: 'Контакты магазина', subtitle: 'Укажите телефон — покупатели увидят его на витрине.' },
    { title: 'Адрес магазина', subtitle: 'Укажите адрес или точку выдачи заказов.' },
    { title: 'Часы работы', subtitle: 'Укажите время работы вашего магазина.' },
    { title: 'Доставка', subtitle: 'Выберите способы и настройте стоимость доставки.' },
    { title: 'Соцсети и сайты', subtitle: 'Ссылки будут отображаться в верхней части вашего магазина.' },
  ]

  const renderContent = () => {
    switch (step) {

      case 0: return (
        <div className="flex flex-col gap-4">
          <Field label="Адрес магазина (домен)" required>
            <input className={inputCls} type="text" placeholder="mystore" value={domain} onChange={e => setDomain(e.target.value)} />
            <p className="text-[12px] text-neutral-400 mt-0.5">mystore.satu.kg</p>
          </Field>
          <Field label="Название магазина" required>
            <input className={inputCls} type="text" placeholder="Напр. Beko Kyrgyzstan" value={storeName} onChange={e => setStoreName(e.target.value)} />
          </Field>
        </div>
      )

      case 1: return (
        <div className="flex flex-col gap-2">
          <Field
            label="Описание"
            required
            right={<span className="text-[12px] text-neutral-400">{200 - description.length} симв.</span>}
          >
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 200))}
              placeholder="Напр. Магазин бытовой техники с доставкой по Бишкеку"
              className="w-full h-28 bg-white border border-neutral-300 rounded-[10px] px-3 py-2.5 text-[14px] text-neutral-800 placeholder:text-neutral-400 outline-none transition-all focus:border-neutral-400 focus:bg-neutral-50 resize-none"
            />
          </Field>
        </div>
      )

      case 2: return (
        <div className="flex flex-col gap-3">
          <div className="w-full aspect-square max-h-[180px] border-2 border-dashed border-neutral-200 rounded-[14px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-neutral-300 hover:bg-neutral-50 transition-all">
            <span className="material-symbols-rounded text-[36px] text-neutral-300">add_a_photo</span>
            <span className="text-[13px] text-neutral-400">Нажмите, чтобы выбрать логотип</span>
          </div>
        </div>
      )

      case 3: return (
        <div className="flex flex-col gap-4">
          <Field label="Основной номер WhatsApp" required>
            <input className={inputCls} type="tel" placeholder="+996 (___) ___-___" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          </Field>
          <Field label="Резервный номер (необязательно)">
            <input className={inputCls} type="tel" placeholder="+996 (___) ___-___" value={whatsappBackup} onChange={e => setWhatsappBackup(e.target.value)} />
          </Field>
        </div>
      )

      case 4: return (
        <div className="flex flex-col gap-4">
          <Field label="Номер телефона" required>
            <input className={inputCls} type="tel" placeholder="+996 (___) ___-___" value={phone} onChange={e => setPhone(e.target.value)} />
          </Field>
          {phoneBackups.map((val, idx) => (
            <Field key={idx} label={`Резервный номер ${idx + 1}`}>
              <input className={inputCls} type="tel" placeholder="+996 (___) ___-___" value={val} onChange={e => {
                const nb = [...phoneBackups]; nb[idx] = e.target.value; setPhoneBackups(nb)
              }} />
            </Field>
          ))}
          {phoneBackups.length < 2 && (
            <AddButton onClick={() => setPhoneBackups([...phoneBackups, ''])}>
              Добавить резервный номер
            </AddButton>
          )}
        </div>
      )

      case 5: return (
        <Field label="Адрес магазина" required>
          <input className={inputCls} type="text" placeholder="г. Бишкек, ул. ..." value={address} onChange={e => setAddress(e.target.value)} />
        </Field>
      )

      case 6: return (
        <div className="flex flex-col gap-2">
          {Object.entries(dayLabels).map(([key, name]) => (
            <ScheduleCard
              key={key}
              day={name}
              timeFrom={schedule[key].from}
              timeTo={schedule[key].to}
              enabled={schedule[key].enabled}
              onToggle={v => setSchedule({ ...schedule, [key]: { ...schedule[key], enabled: v } })}
              onTimeChange={(from, to) => setSchedule({ ...schedule, [key]: { ...schedule[key], from, to } })}
            />
          ))}
        </div>
      )

      case 7: return (
        <div className="flex flex-col gap-5">

          {/* ── Способы доставки ── */}
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Способы доставки</p>

            {/* Самовывоз */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-[12px] border cursor-pointer transition-all ${
                deliveryPickup
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryPickup}
                onCheckedChange={setDeliveryPickup}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[14px] font-semibold text-neutral-800">Самовывоз из магазина</span>
                <span className="text-[12px] text-neutral-400">
                  {address ? address : 'Покупатель заберёт заказ сам'}
                </span>
              </div>
              <span className="material-symbols-rounded text-[22px] text-neutral-300 shrink-0">store</span>
            </label>

            {/* Курьер */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-[12px] border cursor-pointer transition-all ${
                deliveryCourier
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryCourier}
                onCheckedChange={setDeliveryCourier}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-semibold text-neutral-800">Доставка курьером</span>
                  <span className="text-[12px] text-neutral-400">Укажите стоимость доставки</span>
                </div>
                {deliveryCourier && (
                  <div
                    className="flex items-center border border-neutral-200 rounded-[8px] overflow-hidden bg-white"
                    onClick={e => e.preventDefault()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={deliveryCourierCost}
                      onChange={e => setDeliveryCourierCost(e.target.value)}
                      className="flex-1 h-[36px] px-2.5 text-[14px] text-neutral-800 placeholder:text-neutral-300 outline-none bg-transparent"
                    />
                    <span className="text-[13px] text-neutral-400 pr-3 shrink-0">сом</span>
                  </div>
                )}
              </div>
              <span className="material-symbols-rounded text-[22px] text-neutral-300 shrink-0">local_shipping</span>
            </label>
          </div>

          {/* ── Ценовые модификаторы ── */}
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Ценовые правила</p>

            {/* Фиксированная цена */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-[12px] border cursor-pointer transition-all ${
                deliveryFixed
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryFixed}
                onCheckedChange={setDeliveryFixed}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-semibold text-neutral-800">Фиксированная цена на всё</span>
                  <span className="text-[12px] text-neutral-400">Одна цена доставки для всех товаров</span>
                </div>
                {deliveryFixed && (
                  <div
                    className="flex items-center border border-neutral-200 rounded-[8px] overflow-hidden bg-white"
                    onClick={e => e.preventDefault()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={deliveryFixedCost}
                      onChange={e => setDeliveryFixedCost(e.target.value)}
                      className="flex-1 h-[36px] px-2.5 text-[14px] text-neutral-800 placeholder:text-neutral-300 outline-none bg-transparent"
                    />
                    <span className="text-[13px] text-neutral-400 pr-3 shrink-0">сом</span>
                  </div>
                )}
              </div>
              <span className="material-symbols-rounded text-[22px] text-neutral-300 shrink-0">payments</span>
            </label>

            {/* Бесплатно от суммы */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-[12px] border cursor-pointer transition-all ${
                deliveryFreeLimit
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryFreeLimit}
                onCheckedChange={setDeliveryFreeLimit}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-semibold text-neutral-800">Бесплатно от суммы</span>
                  <span className="text-[12px] text-neutral-400">Доставка бесплатна при заказе выше порога</span>
                </div>
                {deliveryFreeLimit && (
                  <div
                    className="flex items-center border border-neutral-200 rounded-[8px] overflow-hidden bg-white"
                    onClick={e => e.preventDefault()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={deliveryFreeLimitThreshold}
                      onChange={e => setDeliveryFreeLimitThreshold(e.target.value)}
                      className="flex-1 h-[36px] px-2.5 text-[14px] text-neutral-800 placeholder:text-neutral-300 outline-none bg-transparent"
                    />
                    <span className="text-[13px] text-neutral-400 pr-3 shrink-0">сом</span>
                  </div>
                )}
              </div>
              <span className="material-symbols-rounded text-[22px] text-neutral-300 shrink-0">redeem</span>
            </label>
          </div>

        </div>
      )


      case 8: return (
        <div className="flex flex-col gap-4">
          <Field label="Instagram">
            <SocialInput
              logo={<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-5 h-5" alt="IG" />}
              placeholder="instagram.com/ваш_магазин"
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
            />
          </Field>
          <Field label="Telegram">
            <SocialInput
              logo={<img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-5 h-5" alt="TG" />}
              placeholder="t.me/ваш_канал"
              value={telegram}
              onChange={e => setTelegram(e.target.value)}
            />
          </Field>
          {customLinks.map((val, idx) => (
            <Field key={idx} label={`Другой сайт ${idx + 1}`}>
              <input className={inputCls} type="url" placeholder="https://yoursite.com" value={val} onChange={e => {
                const nl = [...customLinks]; nl[idx] = e.target.value; setCustomLinks(nl)
              }} />
            </Field>
          ))}
          {customLinks.length < 3 && (
            <AddButton onClick={() => setCustomLinks([...customLinks, ''])}>
              Добавить ещё сайт
            </AddButton>
          )}
        </div>
      )

      default: return null
    }
  }

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-neutral-100 p-4 py-8">
      <div className="w-full max-w-[480px] bg-white rounded-[20px] border border-neutral-300 shadow-sm flex flex-col gap-0 overflow-hidden">

        {/* Progress */}
        <div className="px-6 pt-5 pb-4 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold text-neutral-400 uppercase tracking-wide">
              Шаг {step + 1} из {TOTAL_STEPS}
            </span>
            <button
              onClick={() => setIsExitModalOpen(true)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-700"
            >
              <span className="material-symbols-rounded text-[18px]">close</span>
            </button>
          </div>
          <ProgressBar current={step} total={TOTAL_STEPS} />
        </div>

        {/* Header */}
        <div className="px-6 pt-5 pb-1">
          <h1 className="text-[18px] font-bold text-neutral-900 leading-snug">
            {steps[step]?.title}
          </h1>
          {steps[step]?.subtitle && (
            <p className="text-[13px] text-neutral-500 mt-1 leading-normal">
              {steps[step].subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {renderContent()}
        </div>

        {/* Footer buttons */}
        <div className="px-6 pb-6 flex flex-col gap-2.5 border-t border-neutral-100 pt-4">
          <button
            onClick={handleNext}
            className="w-full h-[44px] bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white text-[14px] font-semibold rounded-[10px] transition-all"
          >
            {step === TOTAL_STEPS - 1 ? 'Открыть мой магазин' : 'Далее'}
          </button>
          {step > 0 && (
            <button
              onClick={handleBack}
              className="w-full h-[44px] bg-white hover:bg-neutral-50 active:scale-[0.98] border border-neutral-300 text-neutral-700 text-[14px] font-semibold rounded-[10px] transition-all"
            >
              Назад
            </button>
          )}
        </div>

      </div>

      <Modal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => navigate('/login')}
        title="Выйти из настройки"
        message="Введённые данные могут не сохраниться."
      />
    </div>
  )
}
