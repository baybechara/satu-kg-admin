import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import ScheduleCard from '../components/ScheduleCard'
import { 
  Truck, Phone, MapPin, Clock, Link as LinkIcon, Store, FileText, 
  Image as ImageIcon, MessageCircle, ChevronRight, User, Lock, 
  LogOut, Trash2, HelpCircle, ArrowLeft, Camera, Trash, Plus, Check,
  AlertCircle, ArrowRight
} from 'lucide-react'

// ─── Shared Components ────────────────────────────────────────────────────────

function Field({ label, required, children, right }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <Label className="font-semibold text-neutral-800">
            {label}{required && <span className="text-destructive ml-0.5">*</span>}
          </Label>
          {right}
        </div>
      )}
      {children}
    </div>
  )
}

function AddButton({ onClick, children }) {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className="w-full text-foreground"
    >
      <Plus className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
}

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

// Shared Subpage Header
function SettingsSubpageHeader({ title, onBack }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="w-full max-w-[820px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-neutral-200 shrink-0 active:scale-95 transition-all hover:bg-neutral-50"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-900">{title}</h1>
        </div>
      </header>
      <div className="h-[60px] shrink-0 w-full mb-4" />
    </>
  )
}

function SaveButton() {
  return (
    <div className="fixed bottom-[84px] sm:bottom-[96px] left-0 w-full z-50 pointer-events-none flex justify-center">
      <div className="w-full max-w-[820px] px-4 sm:px-6 flex justify-end">
        <Button className="h-[48px] px-6 rounded-full shadow-none bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-[14px] pointer-events-auto">
          Сохранить изменения
        </Button>
      </div>
    </div>
  )
}

function SettingsMenu() {
  const navigate = useNavigate()
  const sections = [
    { title: 'Доставка', items: [{ icon: Truck, label: 'Способы доставки заказа', path: '/settings/delivery' }] },
    { title: 'Контакты', items: [
      { icon: Phone, label: 'Способы связи', path: '/settings/contacts' },
      { icon: MapPin, label: 'Адрес компании', path: '/settings/address' },
      { icon: Clock, label: 'График работы', path: '/settings/schedule' },
      { icon: LinkIcon, label: 'Ссылки на внешние сайты', path: '/settings/socials' },
    ]},
    { title: 'О магазине', items: [
      { icon: Store, label: 'Название компании', path: '/settings/name' },
      { icon: FileText, label: 'Описание', path: '/settings/description' },
      { icon: ImageIcon, label: 'Логотип', path: '/settings/logo' },
      { icon: MessageCircle, label: 'Номер WhatsApp для заказов', path: '/settings/whatsapp' },
    ]},
  ]

  return (
    <>
      <Header 
        title="Настройки магазина" 
        rightIcon="person" 
        onRightClick={() => navigate('/settings/profile')} 
      />

      <div className="flex flex-col gap-5 pt-6 pb-20">
        {sections.map((s) => (
          <div key={s.title} className="rounded-xl border bg-card text-card-foreground p-5 flex flex-col gap-4">
            <h2 className="text-[16px] font-semibold tracking-tight">{s.title}</h2>
            <div className="flex flex-col gap-2">
              {s.items.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span className="text-[14px] font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <Button variant="outline" className="h-14 rounded-xl border-dashed mt-4 bg-transparent">
          <HelpCircle className="w-5 h-5 mr-2 text-muted-foreground" />
          Нужна помощь?
        </Button>
      </div>
    </>
  )
}

function SettingsAddress() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Адрес магазина" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Адрес магазина или точки выдачи
        </p>
        
        <Field label="Адрес магазина">
          <Input type="text" placeholder="Введите адрес" defaultValue="г. Бишкек, ЦУМ" />
        </Field>
        
        <AddButton>Добавить еще адрес</AddButton>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsSocials() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Соцсети и сайты" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Вы можете создавать ссылки на внешние сайты, которые будут отображаться в верхней части вашего магазина.
        </p>

        <Field label="Instagram">
          <SocialInput 
            logo={<img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-4 h-4 grayscale opacity-70" alt="IG" />}
            placeholder="instagram.com/ваш_магазин" 
            defaultValue="https://instagram.com/beko.kg" 
          />
        </Field>

        <Field label="Telegram">
          <SocialInput 
            logo={<img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-4 h-4 grayscale opacity-70" alt="TG" />}
            placeholder="t.me/ваш_канал" 
            defaultValue="t.me/beko_kg" 
          />
        </Field>

        <Field label="Youtube">
          <SocialInput 
            logo={<img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" className="w-4 h-4 grayscale opacity-70" alt="YT" />}
            placeholder="https://www.youtube.com/..." 
          />
        </Field>

        <AddButton>Добавить еще</AddButton>
      </div>
      <SaveButton />
    </div>
  )
}


function SettingsSchedule() {
  const navigate = useNavigate()
  const dayLabels = { mon:'Пн', tue:'Вт', wed:'Ср', thu:'Чт', fri:'Пт', sat:'Сб', sun:'Вс' }
  const [schedule, setSchedule] = useState({
    mon: { enabled: true, from: '08:00', to: '19:00' },
    tue: { enabled: true, from: '08:00', to: '19:00' },
    wed: { enabled: true, from: '08:00', to: '19:00' },
    thu: { enabled: true, from: '08:00', to: '19:00' },
    fri: { enabled: true, from: '08:00', to: '19:00' },
    sat: { enabled: false, from: '08:00', to: '19:00' },
    sun: { enabled: false, from: '08:00', to: '19:00' },
  })

  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="График работы" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground mb-2">
          Настройте часы работы вашего магазина для каждого дня недели.
        </p>

        <div className="flex flex-col gap-3">
          {Object.entries(dayLabels).map(([key, name]) => (
            <ScheduleCard 
              key={key} 
              day={name} 
              timeFrom={schedule[key].from} 
              timeTo={schedule[key].to} 
              enabled={schedule[key].enabled}
              onToggle={(v) => setSchedule({ ...schedule, [key]: { ...schedule[key], enabled: v } })}
              onTimeChange={(from, to) => setSchedule({ ...schedule, [key]: { ...schedule[key], from, to } })}
            />
          ))}
        </div>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsContacts() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Контакты" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Укажите телефон для связи — покупатели увидят его на витрине.
        </p>
        
        <Field label="Номер телефона" required>
          <Input type="tel" placeholder="+996 (___) ___-___" defaultValue="+996 503 310 794" />
        </Field>

        <Field label="Резервный номер">
          <Input type="tel" placeholder="+996 (___) ___-___" />
        </Field>
        
        <AddButton>Добавить резервный номер</AddButton>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsDelivery() {
  const navigate = useNavigate()
  const [deliveryPickup, setPickup] = useState(true)
  const [deliveryCourier, setCourier] = useState(true)
  const [deliveryFixed, setFixed] = useState(false)
  const [deliveryFreeLimit, setFreeLimit] = useState(false)

  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Доставка" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground mb-2">
          Выберите способы и настройте стоимость доставки.
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Способы доставки</p>

          <label
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              deliveryPickup
                ? 'border-green-300 bg-green-50/40'
                : 'border-input bg-card hover:border-neutral-300'
            }`}
          >
            <Checkbox
              checked={deliveryPickup}
              onCheckedChange={setPickup}
              className="mt-0.5 shrink-0"
            />
            <div className="flex flex-col gap-0.5 flex-1">
              <span className="text-sm font-semibold text-neutral-800">Самовывоз из магазина</span>
              <span className="text-xs text-muted-foreground">г. Бишкек, ЦУМ</span>
            </div>
            <Store className="w-5 h-5 text-muted-foreground shrink-0" />
          </label>

          <label
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              deliveryCourier
                ? 'border-green-300 bg-green-50/40'
                : 'border-input bg-card hover:border-neutral-300'
            }`}
          >
            <Checkbox
              checked={deliveryCourier}
              onCheckedChange={setCourier}
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
                    defaultValue="150"
                    className="flex-1 h-9 px-2.5 text-sm text-neutral-800 placeholder:text-muted-foreground outline-none bg-transparent"
                  />
                  <span className="text-xs text-muted-foreground pr-3 shrink-0">сом</span>
                </div>
              )}
            </div>
            <Truck className="w-5 h-5 text-muted-foreground shrink-0" />
          </label>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Ценовые правила</p>

          <label
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              deliveryFixed
                ? 'border-green-300 bg-green-50/40'
                : 'border-input bg-card hover:border-neutral-300'
            }`}
          >
            <Checkbox
              checked={deliveryFixed}
              onCheckedChange={setFixed}
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
                    className="flex-1 h-9 px-2.5 text-sm text-neutral-800 placeholder:text-muted-foreground outline-none bg-transparent"
                  />
                  <span className="text-xs text-muted-foreground pr-3 shrink-0">сом</span>
                </div>
              )}
            </div>
            <Check className="w-5 h-5 text-muted-foreground shrink-0" />
          </label>

          <label
            className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              deliveryFreeLimit
                ? 'border-green-300 bg-green-50/40'
                : 'border-input bg-card hover:border-neutral-300'
            }`}
          >
            <Checkbox
              checked={deliveryFreeLimit}
              onCheckedChange={setFreeLimit}
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
                    className="flex-1 h-9 px-2.5 text-sm text-neutral-800 placeholder:text-muted-foreground outline-none bg-transparent"
                  />
                  <span className="text-xs text-muted-foreground pr-3 shrink-0">сом</span>
                </div>
              )}
            </div>
            <Check className="w-5 h-5 text-muted-foreground shrink-0" />
          </label>
        </div>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsLogo() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Логотип магазина" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Рекомендуемый размер: 600×600 пкс, не более 5 МБ. Форматы: JPG, PNG.
        </p>

        <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center mx-auto">
          <span className="text-white text-3xl font-bold">beko</span>
        </div>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button variant="outline" className="w-full flex gap-2">
            <Camera className="w-4 h-4" /> Загрузить логотип
          </Button>
          <Button variant="ghost" className="w-full flex gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash className="w-4 h-4" /> Удалить логотип
          </Button>
        </div>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsName() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Название компании" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Это название увидят покупатели на вашей витрине.
        </p>
        <Field label="Название магазина">
          <Input placeholder="Например, Супермаркет 'Глобус'" defaultValue="Beko" />
        </Field>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsDescription() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Описание магазина" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Коротко расскажите о вашем магазине, товарах или услугах. Это поможет покупателям больше узнать о вас.
        </p>
        <Field label="О магазине">
          <textarea 
            className="flex min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            placeholder="Опишите ваш магазин..."
            defaultValue="Официальный представитель Beko в Кыргызстане."
          />
        </Field>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsWhatsapp() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="WhatsApp" onBack={() => navigate('/settings')} />
      <div className="bg-card border rounded-xl p-5 flex flex-col gap-6">
        <p className="text-sm text-muted-foreground">
          Укажите номер WhatsApp, на который будут приходить уведомления о новых заказах от покупателей.
        </p>
        <Field label="Основной номер WhatsApp">
          <Input type="tel" placeholder="+996 (___) ___-___" defaultValue="+996 503 310 794" />
        </Field>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsProfile() {
  const navigate = useNavigate()
  return (
    <div className="pt-4 pb-20">
      <SettingsSubpageHeader title="Профиль" onBack={() => navigate('/settings')} />
      
      <div className="flex flex-col bg-card border rounded-xl">
        <div className="flex flex-col p-5 sm:p-6 gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">Доступ к аккаунту</h2>
            <p className="text-sm text-muted-foreground">Обновите свои данные для входа или выйдите из аккаунта.</p>
          </div>

          <div className="flex flex-col gap-4">
            <Field label="Имя Владельца">
              <Input type="text" defaultValue="Имя Владельца" readOnly className="bg-muted/30" />
            </Field>

            <Field label="Номер телефона">
              <Input type="tel" defaultValue="+996 500 00 00 00" readOnly className="bg-muted/30" />
            </Field>

            <Field label="Текущий пароль">
              <div className="relative">
                <Input type="password" defaultValue="........" readOnly className="bg-muted/30 pr-24" />
                <Button variant="ghost" size="sm" className="absolute right-1 top-1 h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold uppercase text-xs tracking-wider">
                  Изменить
                </Button>
              </div>
            </Field>
          </div>
        </div>

        <div className="border-t bg-muted/10 p-5 flex flex-col gap-4 rounded-b-xl">
          <Button 
            variant="outline"
            className="w-full font-semibold h-11 bg-white hover:bg-muted/50"
            onClick={() => navigate('/login')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти из аккаунта
          </Button>

          <button className="flex items-center justify-between p-4 rounded-xl border bg-white hover:bg-red-50 transition-colors text-left group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-destructive" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-medium text-destructive">Опасная зона</span>
                <span className="text-[13px] text-muted-foreground group-hover:text-neutral-600 transition-colors">Удалить магазин навсегда</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Routes>
      <Route path="/" element={<SettingsMenu />} />
      <Route path="profile" element={<SettingsProfile />} />
      <Route path="delivery" element={<SettingsDelivery />} />
      <Route path="address" element={<SettingsAddress />} />
      <Route path="socials" element={<SettingsSocials />} />
      <Route path="schedule" element={<SettingsSchedule />} />
      <Route path="contacts" element={<SettingsContacts />} />
      <Route path="name" element={<SettingsName />} />
      <Route path="description" element={<SettingsDescription />} />
      <Route path="logo" element={<SettingsLogo />} />
      <Route path="whatsapp" element={<SettingsWhatsapp />} />
      <Route path="*" element={<SettingsMenu />} />
    </Routes>
  )
}
