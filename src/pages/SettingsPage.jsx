import PageHeader from '../components/PageHeader'
import Button from '../components/Button'

export default function SettingsPage() {
  const sections = [
    { title: 'Доставка', items: [{ icon: 'local_shipping', label: 'Способы доставки заказа' }] },
    { title: 'Контакты', items: [
      { icon: 'call', label: 'Способы связи' },
      { icon: 'location_on', label: 'Адрес компании' },
      { icon: 'schedule', label: 'График работы' },
      { icon: 'link', label: 'Ссылки на внешние сайты' },
    ]},
    { title: 'О магазине', items: [
      { icon: 'badge', label: 'Название компании' },
      { icon: 'description', label: 'Описание' },
      { icon: 'image', label: 'Логотип' },
      { icon: 'chat', label: 'Номер WhatsApp для заказов' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-bg">
      <PageHeader title="Настройки магазина">
        <button className="w-10 h-10 bg-white rounded-[16px] flex items-center justify-center" style={{ boxShadow: 'var(--shadow-card)' }}>
          <span className="material-symbols-rounded text-[20px] text-text-primary">close</span>
        </button>
      </PageHeader>

      <div className="flex flex-col gap-10 page-padding pt-6 pb-4">
        {sections.map((s) => (
          <div key={s.title} className="flex flex-col gap-4">
            <h2 className="t-caption text-text-disabled">{s.title}</h2>
            <div className="flex flex-col gap-2">
              {s.items.map((item) => (
                <button key={item.label} className="flex items-center gap-3 bg-bg rounded-xl px-4 py-3 text-left hover:bg-surface-alt transition-all group">
                  <span className="material-symbols-rounded text-[24px] text-text-disabled group-hover:text-text-secondary transition-colors">{item.icon}</span>
                  <span className="text-[16px] font-medium text-text-primary leading-[1.36] flex-1">{item.label}</span>
                  <span className="material-symbols-rounded text-[20px] text-[#D4D4D4]">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="page-padding pb-6 pt-4">
        <Button variant="dark">
          <span className="material-symbols-rounded text-[24px]">help</span>
          Нужна помощь?
        </Button>
      </div>
    </div>
  )
}
