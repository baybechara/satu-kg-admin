import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import InputField from '../components/InputField'
import ScheduleCard from '../components/ScheduleCard'
import SwitchCard from '../components/SwitchCard'
import Header from '../components/Header'

// Shared Subpage Header
function SettingsSubpageHeader({ title, onBack }) {
  return <Header title={title} leftIcon="arrow_back" onLeftClick={onBack} variant="sub" />
}

function SaveButton() {
  return (
    <>
      {/* Spacer to push content above the floating button */}
      <div style={{ height: '200px', flexShrink: 0, width: '100%' }} />
      
      <div className="fixed bottom-[104px] left-1/2 -translate-x-1/2 w-full max-w-[820px] admin-container z-30">
        <button className="w-full bg-neutral-800 hover:bg-neutral-900 text-white flex items-center justify-center h-[56px] rounded-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] transition-all active:scale-95">
          <span className="text-[16px] font-bold font-['Open_Sans']">Сохранить изменения</span>
        </button>
      </div>
    </>
  )
}

function SettingsMenu() {
  const navigate = useNavigate()
  const sections = [
    { title: 'Доставка', items: [{ icon: 'inventory_2', label: 'Способы доставки заказа', path: '/settings/delivery' }] },
    { title: 'Контакты', items: [
      { icon: 'badge', label: 'Способы связи', path: '/settings/contacts' },
      { icon: 'location_on', label: 'Адрес компании', path: '/settings/address' },
      { icon: 'storefront', label: 'График работы', path: '/settings/schedule' },
      { icon: 'domain', label: 'Ссылки на внешние сайты', path: '/settings/socials' },
    ]},
    { title: 'О магазине', items: [
      { icon: 'store', label: 'Название компании', path: '/settings/name' },
      { icon: 'article', label: 'Описание', path: '/settings/description' },
      { icon: 'format_shapes', label: 'Логотип', path: '/settings/logo' },
      { icon: 'chat', label: 'Номер WhatsApp для заказов', path: '/settings/whatsapp' },
    ]},
  ]

  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-32 flex flex-col">
      <Header 
        title="Настройки магазина" 
        rightIcon="person" 
        onRightClick={() => navigate('/settings/profile')} 
      />

      <div className="flex flex-col gap-8 page-padding pt-6 pb-4">
        {sections.map((s) => (
          <div key={s.title} className="flex flex-col gap-4">
            <h2 className="text-[15px] font-medium text-neutral-500 font-['Open_Sans']">{s.title}</h2>
            <div className="flex flex-col gap-2">
              {s.items.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-4 h-[52px] text-left transition-all active:opacity-70 bg-transparent"
                >
                  <span className="material-symbols-rounded text-[28px] text-neutral-700 shrink-0">{item.icon}</span>
                  <span className="text-[17px] font-semibold text-neutral-900 font-['Open_Sans']">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spacer for BottomNav */}
      <div style={{ height: '100px', flexShrink: 0 }} />

      {/* Floating Help Button */}
      <div className="fixed bottom-[104px] left-1/2 -translate-x-1/2 w-full max-w-[820px] admin-container z-30 flex justify-end">
        <button className="btn-add-product bg-neutral-800 hover:bg-neutral-900 text-white flex items-center justify-center gap-2 px-6 h-[56px] rounded-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] transition-all active:scale-95">
          <span className="material-symbols-rounded text-[24px]">help</span>
          <span className="text-[16px] font-bold font-['Open_Sans']">Нужна помощь?</span>
        </button>
      </div>
    </div>
  )
}

function SettingsAddress() {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-[120px] flex flex-col">
      <SettingsSubpageHeader title="Адрес магазина" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Добавьте адрес</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">Адрес магазина или точки выдачи</p>
        </div>
        
        <InputField 
          label="Адрес" 
          icon="location_on" 
          placeholder="Введите адрес" 
          defaultValue="" 
        />
        
        <Button variant="alt" className="flex items-center justify-center gap-3 w-full bg-white">
          <span className="material-symbols-rounded text-[24px]">add_location_alt</span>
          <span>Добавить еще адрес</span>
        </Button>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsSocials() {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-[120px] flex flex-col">
      <SettingsSubpageHeader title="Соцсети и сайты" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Ваши соцсети и сайты</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Вы можете создавать ссылки на внешние сайты, которые будут отображаться в верхней части вашего магазина.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[16px] font-semibold text-neutral-900 font-['Open_Sans']">Instagram</label>
          <div className="input-wrap bg-neutral-100 !border-none">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 ml-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6" alt="IG" />
            </div>
            <input type="text" placeholder="https://www.instagram.com/..." className="input-field bg-transparent" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[16px] font-semibold text-neutral-900 font-['Open_Sans']">Telegram</label>
          <div className="input-wrap bg-neutral-100 !border-none">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 ml-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" className="w-6 h-6" alt="TG" />
            </div>
            <input type="text" placeholder="instagram.com/ваш_магазин" className="input-field bg-transparent" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[16px] font-semibold text-neutral-900 font-['Open_Sans']">Youtube</label>
          <div className="input-wrap bg-neutral-100 !border-none">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 ml-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" className="w-6 h-6" alt="YT" />
            </div>
            <input type="text" placeholder="https://www.youtube.com/..." className="input-field bg-transparent" />
          </div>
        </div>

        <Button variant="alt" className="flex items-center justify-center gap-3 w-full mt-2 bg-white">
          <span className="material-symbols-rounded text-[24px]">link</span>
          <span>Добавить еще</span>
        </Button>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsSchedule() {
  const navigate = useNavigate()
  const dayLabels = { mon:'Понедельник', tue:'Вторник', wed:'Среда', thu:'Четверг', fri:'Пятница', sat:'Суббота', sun:'Воскресенье' }
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
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-[120px] flex flex-col">
      <SettingsSubpageHeader title="График работы" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Часы работы магазина</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Рекомендуемый размер — 600 x 600 пикселей, максимальный размер — 5 МБ.
          </p>
        </div>

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
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-[120px] flex flex-col">
      <SettingsSubpageHeader title="Контакты" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Контакты магазина</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Укажите телефон для связи — покупатели увидят его на витрине.
          </p>
        </div>
        
        <InputField 
          label={<>Номер телефона <span className="text-red-500">*</span></>} 
          icon="phone_enabled" 
          defaultValue="+996 503 310 794" 
        />

        <InputField 
          label="Резервный номер (необязательно)" 
          icon="phone_enabled" 
          defaultValue="+996 503 310 794" 
        />
        
        <Button variant="alt" className="flex items-center justify-center gap-3 w-full mt-2 bg-white">
          <span className="material-symbols-rounded text-[24px]">add_call</span>
          <span>Добавить резервный номер</span>
        </Button>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsDelivery() {
  const navigate = useNavigate()
  const [deliveryPickup, setDeliveryPickup] = useState(true)
  const [deliveryCourier, setDeliveryCourier] = useState(true)
  const [deliveryCourierCost, setDeliveryCourierCost] = useState('150')
  const [deliveryFixed, setDeliveryFixed] = useState(false)
  const [deliveryFixedCost, setDeliveryFixedCost] = useState('')
  const [deliveryFreeLimit, setDeliveryFreeLimit] = useState(false)
  const [deliveryFreeLimitThreshold, setDeliveryFreeLimitThreshold] = useState('')

  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-[120px] flex flex-col">
      <SettingsSubpageHeader title="Доставка" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Доставка</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Выберите способы и настройте стоимость доставки.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <SwitchCard label="Самовывоз (забрать из магазина)" icon="store" enabled={deliveryPickup} onChange={setDeliveryPickup} />
            {deliveryPickup && (
              <div className="bg-neutral-300 rounded-[16px] p-4 text-[14px] text-neutral-700">
                Покупатели увидят адрес: <span className="font-bold">г. Бишкек, ЦУМ</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <SwitchCard label="Доставка курьером" icon="local_shipping" enabled={deliveryCourier} onChange={setDeliveryCourier} />
            {deliveryCourier && (
              <InputField label="Стоимость доставки (сом)" placeholder="Напр. 150" value={deliveryCourierCost} onChange={(e) => setDeliveryCourierCost(e.target.value)} />
            )}
          </div>

          <h3 className="text-[15px] font-bold text-neutral-900 uppercase tracking-wider mt-4">Глобальные настройки стоимости</h3>
          
          <div className="flex flex-col gap-3">
            <SwitchCard label="Фиксированная стоимость на всё" icon="payments" enabled={deliveryFixed} onChange={setDeliveryFixed} />
            {deliveryFixed && (
              <InputField label="Сумма (сом)" placeholder="Напр. 200" value={deliveryFixedCost} onChange={(e) => setDeliveryFixedCost(e.target.value)} />
            )}
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <SwitchCard label="Бесплатно при заказе от суммы" icon="redeem" enabled={deliveryFreeLimit} onChange={setDeliveryFreeLimit} />
            {deliveryFreeLimit && (
              <InputField label="Порог бесплатной доставки (сом)" placeholder="Напр. 2000" value={deliveryFreeLimitThreshold} onChange={(e) => setDeliveryFreeLimitThreshold(e.target.value)} />
            )}
          </div>
        </div>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsLogo() {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-[120px] flex flex-col">
      <SettingsSubpageHeader title="Логотип магазина" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Логотип магазина</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Рекомендуемый размер: 600×600 пкс, не более 5 МБ. Форматы: JPG, PNG.
          </p>
        </div>

        <div className="w-[140px] h-[140px] rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-sm mx-0">
          <span className="text-white text-[32px] font-bold">beko</span>
        </div>
        
        <div className="flex flex-col gap-3 mt-2">
          <Button variant="alt" className="flex items-center justify-center gap-3 w-full bg-white">
            <span className="material-symbols-rounded text-[24px]">add_a_photo</span>
            <span>Загрузить логотип</span>
          </Button>
          
          <Button variant="alt" className="flex items-center justify-center gap-3 w-full bg-white border-transparent shadow-none text-neutral-900">
            <span className="material-symbols-rounded text-[24px]">delete</span>
            <span>Удалить логотип</span>
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
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative flex flex-col">
      <SettingsSubpageHeader title="Название компании" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Название магазина</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Это название увидят покупатели на вашей витрине.
          </p>
        </div>
        <InputField 
          label="Название" 
          placeholder="Например, Супермаркет 'Глобус'" 
          defaultValue="Beko" 
        />
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsDescription() {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative flex flex-col">
      <SettingsSubpageHeader title="Описание магазина" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Описание</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Коротко расскажите о вашем магазине, товарах или услугах. Это поможет покупателям больше узнать о вас.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-neutral-500 uppercase tracking-wider">О магазине</label>
          <textarea 
            className="w-full bg-neutral-100 rounded-[16px] p-4 text-[16px] text-neutral-900 outline-none border-none resize-none min-h-[140px] font-['Open_Sans']"
            placeholder="Опишите ваш магазин..."
            defaultValue="Официальный представитель Beko в Кыргызстане."
          />
        </div>
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsWhatsapp() {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative flex flex-col">
      <SettingsSubpageHeader title="WhatsApp" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-neutral-900 mb-2 font-['Open_Sans']">Номер для заказов</h2>
          <p className="text-[15px] text-neutral-700 font-['Open_Sans'] leading-[1.4]">
            Укажите номер WhatsApp, на который будут приходить уведомления о новых заказах от покупателей.
          </p>
        </div>
        <InputField 
          label="Номер WhatsApp" 
          icon="chat" 
          placeholder="+996 ..." 
          defaultValue="+996 503 310 794" 
        />
      </div>
      <SaveButton />
    </div>
  )
}

function SettingsProfile() {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative flex flex-col">
      <SettingsSubpageHeader title="Профиль" onBack={() => navigate('/settings')} />
      <div className="page-padding pt-6 flex flex-col gap-8 pb-[120px]">
        
        <div className="flex items-center gap-4 bg-white p-5 rounded-[20px] shadow-sm">
          <div className="w-16 h-16 rounded-[18px] bg-neutral-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-rounded text-[32px] text-neutral-500">person</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold text-neutral-900 font-['Open_Sans']">Имя Владельца</h2>
            <p className="text-[14px] text-neutral-500 font-['Open_Sans']">+996 500 00 00 00</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[15px] font-medium text-neutral-500 font-['Open_Sans']">Аккаунт</h2>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-4 h-[52px] text-left transition-all active:opacity-70 bg-transparent">
              <span className="material-symbols-rounded text-[28px] text-neutral-700 shrink-0">lock</span>
              <span className="text-[17px] font-semibold text-neutral-900 font-['Open_Sans']">Сменить пароль</span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-4 h-[52px] text-left transition-all active:opacity-70 bg-transparent"
            >
              <span className="material-symbols-rounded text-[28px] text-red-500 shrink-0">logout</span>
              <span className="text-[17px] font-semibold text-red-500 font-['Open_Sans']">Выйти из аккаунта</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <h2 className="text-[15px] font-medium text-neutral-500 font-['Open_Sans']">Опасная зона</h2>
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-4 h-[52px] text-left transition-all active:opacity-70 bg-transparent">
              <span className="material-symbols-rounded text-[28px] text-red-500 shrink-0">delete_forever</span>
              <span className="text-[17px] font-semibold text-red-500 font-['Open_Sans']">Удалить магазин навсегда</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// Ensure the wildcard route falls back correctly
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
      {/* Catch-all to default to menu */}
      <Route path="*" element={<SettingsMenu />} />
    </Routes>
  )
}
