import Icon from '../components/Icon.jsx'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ScheduleCard from '../components/ScheduleCard'
import Toggle from '../components/Toggle'
import Modal from '../components/Modal'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const TOTAL_STEPS = 9

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, children, right }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <Label className="font-semibold text-neutral-800">
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
          </Label>
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
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  )
}

// ─── Add button ───────────────────────────────────────────────────────────────
function AddButton({ onClick, children }) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className="w-full text-foreground"
    >
      <Icon name="add" className="text-[18px] mr-2"  />
      {children}
    </Button>
  )
}

// ─── Social input ─────────────────────────────────────────────────────────────
function SocialInput({ logo, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground">
        {logo}
      </div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-9"
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
            <Input type="text" placeholder="mystore" value={domain} onChange={e => setDomain(e.target.value)} />
            <p className="text-[12px] text-muted-foreground mt-0.5">mystore.satu.kg</p>
          </Field>
          <Field label="Название магазина" required>
            <Input type="text" placeholder="Напр. Beko Kyrgyzstan" value={storeName} onChange={e => setStoreName(e.target.value)} />
          </Field>
        </div>
      )

      case 1: return (
        <div className="flex flex-col gap-2">
          <Field
            label="Описание"
            required
            right={<span className="text-[12px] text-muted-foreground">{200 - description.length} симв.</span>}
          >
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 200))}
              placeholder="Напр. Магазин бытовой техники с доставкой по Бишкеку"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            />
          </Field>
        </div>
      )

      case 2: return (
        <div className="flex flex-col gap-3">
          <div className="w-full aspect-square max-h-[180px] border-2 border-dashed border-input rounded-[14px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-neutral-300 hover:bg-neutral-50 transition-all text-muted-foreground">
            <Icon name="add_a_photo" className="text-[36px]"  />
            <span className="text-[13px]">Нажмите, чтобы выбрать логотип</span>
          </div>
        </div>
      )

      case 3: return (
        <div className="flex flex-col gap-4">
          <Field label="Основной номер WhatsApp" required>
            <Input type="tel" placeholder="+996 (___) ___-___" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          </Field>
          <Field label="Резервный номер (необязательно)">
            <Input type="tel" placeholder="+996 (___) ___-___" value={whatsappBackup} onChange={e => setWhatsappBackup(e.target.value)} />
          </Field>
        </div>
      )

      case 4: return (
        <div className="flex flex-col gap-4">
          <Field label="Номер телефона" required>
            <Input type="tel" placeholder="+996 (___) ___-___" value={phone} onChange={e => setPhone(e.target.value)} />
          </Field>
          {phoneBackups.map((val, idx) => (
            <Field key={idx} label={`Резервный номер ${idx + 1}`}>
              <Input type="tel" placeholder="+996 (___) ___-___" value={val} onChange={e => {
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
          <Input type="text" placeholder="г. Бишкек, ул. ..." value={address} onChange={e => setAddress(e.target.value)} />
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
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Способы доставки</p>

            {/* Самовывоз */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryPickup
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-input bg-card hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryPickup}
                onCheckedChange={setDeliveryPickup}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-sm font-semibold text-neutral-800">Самовывоз из магазина</span>
                <span className="text-xs text-muted-foreground">
                  {address ? address : 'Покупатель заберёт заказ сам'}
                </span>
              </div>
              <Icon name="store" className="text-[22px] text-muted-foreground shrink-0"  />
            </label>

            {/* Курьер */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryCourier
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-input bg-card hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryCourier}
                onCheckedChange={setDeliveryCourier}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-neutral-800">Доставка курьером</span>
                  <span className="text-xs text-muted-foreground">Укажите стоимость доставки</span>
                </div>
                {deliveryCourier && (
                  <div
                    className="flex items-center border border-input rounded-md overflow-hidden bg-background"
                    onClick={e => e.preventDefault()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={deliveryCourierCost}
                      onChange={e => setDeliveryCourierCost(e.target.value)}
                      className="flex-1 h-9 px-2.5 text-sm text-neutral-800 placeholder:text-muted-foreground outline-none bg-transparent"
                    />
                    <span className="text-xs text-muted-foreground pr-3 shrink-0">сом</span>
                  </div>
                )}
              </div>
              <Icon name="local_shipping" className="text-[22px] text-muted-foreground shrink-0"  />
            </label>
          </div>

          {/* ── Ценовые модификаторы ── */}
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Ценовые правила</p>

            {/* Фиксированная цена */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryFixed
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-input bg-card hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryFixed}
                onCheckedChange={setDeliveryFixed}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-neutral-800">Фиксированная цена на всё</span>
                  <span className="text-xs text-muted-foreground">Одна цена доставки для всех товаров</span>
                </div>
                {deliveryFixed && (
                  <div
                    className="flex items-center border border-input rounded-md overflow-hidden bg-background"
                    onClick={e => e.preventDefault()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={deliveryFixedCost}
                      onChange={e => setDeliveryFixedCost(e.target.value)}
                      className="flex-1 h-9 px-2.5 text-sm text-neutral-800 placeholder:text-muted-foreground outline-none bg-transparent"
                    />
                    <span className="text-xs text-muted-foreground pr-3 shrink-0">сом</span>
                  </div>
                )}
              </div>
              <Icon name="payments" className="text-[22px] text-muted-foreground shrink-0"  />
            </label>

            {/* Бесплатно от суммы */}
            <label
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryFreeLimit
                  ? 'border-green-300 bg-green-50/40'
                  : 'border-input bg-card hover:border-neutral-300'
              }`}
            >
              <Checkbox
                checked={deliveryFreeLimit}
                onCheckedChange={setDeliveryFreeLimit}
                className="mt-0.5 shrink-0"
              />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-neutral-800">Бесплатно от суммы</span>
                  <span className="text-xs text-muted-foreground">Доставка бесплатна при заказе выше порога</span>
                </div>
                {deliveryFreeLimit && (
                  <div
                    className="flex items-center border border-input rounded-md overflow-hidden bg-background"
                    onClick={e => e.preventDefault()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={deliveryFreeLimitThreshold}
                      onChange={e => setDeliveryFreeLimitThreshold(e.target.value)}
                      className="flex-1 h-9 px-2.5 text-sm text-neutral-800 placeholder:text-muted-foreground outline-none bg-transparent"
                    />
                    <span className="text-xs text-muted-foreground pr-3 shrink-0">сом</span>
                  </div>
                )}
              </div>
              <Icon name="redeem" className="text-[22px] text-muted-foreground shrink-0"  />
            </label>
          </div>

        </div>
      )


      case 8: return (
        <div className="flex flex-col gap-4">
          <Field label="Instagram">
            <SocialInput
              logo={<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-4 h-4 grayscale opacity-70" alt="IG" />}
              placeholder="instagram.com/ваш_магазин"
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
            />
          </Field>
          <Field label="Telegram">
            <SocialInput
              logo={<img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-4 h-4 grayscale opacity-70" alt="TG" />}
              placeholder="t.me/ваш_канал"
              value={telegram}
              onChange={e => setTelegram(e.target.value)}
            />
          </Field>
          {customLinks.map((val, idx) => (
            <Field key={idx} label={`Другой сайт ${idx + 1}`}>
              <SocialInput 
                logo={<Icon name="link" className="w-4 h-4 grayscale opacity-70" />}
                placeholder="https://yoursite.com" 
                value={val} 
                onChange={e => {
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
    <div className="min-h-screen w-full flex items-start justify-center bg-neutral-100 p-4 py-8 font-sans">
      <div className="w-full max-w-[480px] bg-card text-card-foreground rounded-xl border border-border shadow-sm flex flex-col gap-0 overflow-hidden">

        {/* Progress */}
        <div className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Шаг {step + 1} из {TOTAL_STEPS}
            </span>
            <button
              onClick={() => setIsExitModalOpen(true)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <Icon name="close" className="text-[18px]"  />
            </button>
          </div>
          <ProgressBar current={step} total={TOTAL_STEPS} />
        </div>

        {/* Header */}
        <div className="px-6 pt-5 pb-1 flex flex-col space-y-1.5">
          <h1 className="text-lg font-semibold tracking-tight leading-none">
            {steps[step]?.title}
          </h1>
          {steps[step]?.subtitle && (
            <p className="text-sm text-muted-foreground">
              {steps[step].subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {renderContent()}
        </div>

        {/* Footer buttons */}
        <div className="px-6 pb-6 flex flex-col gap-2.5 border-t border-border pt-4">
          <Button
            onClick={handleNext}
            className="w-full"
          >
            {step === TOTAL_STEPS - 1 ? 'Открыть мой магазин' : 'Далее'}
          </Button>
          {step > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="w-full"
            >
              Назад
            </Button>
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
