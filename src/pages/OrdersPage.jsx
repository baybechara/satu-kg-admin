import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const mockOrders = [
  {
    id: 'ORD-001', customer: 'Азамат Касымов', phone: '+996 555 123 456',
    items: [{ name: 'Соковыжималка Braun J700', qty: 1, price: 12500 }],
    total: 12500, status: 'new', date: '12 мая 2026', time: '14:30',
  },
  {
    id: 'ORD-002', customer: 'Айгуль Жумабекова', phone: '+996 700 789 012',
    items: [
      { name: 'Утюг Philips GC4564/20', qty: 1, price: 4200 },
      { name: 'Тостер Smeg TSF01', qty: 1, price: 15800 },
    ],
    total: 20000, status: 'new', date: '12 мая 2026', time: '12:15',
  },
  {
    id: 'ORD-003', customer: 'Бакыт Турсунбеков', phone: '+996 550 456 789',
    items: [{ name: 'Пылесос Dyson V15', qty: 1, price: 45000 }],
    total: 45000, status: 'completed', date: '11 мая 2026', time: '09:45',
  },
  {
    id: 'ORD-004', customer: 'Нуржан Абдырахманов', phone: '+996 777 321 654',
    items: [{ name: 'Блендер Bosch MMB6174S', qty: 2, price: 8700 }],
    total: 17400, status: 'cancelled', date: '10 мая 2026', time: '16:20',
  },
]

const tabs = [
  { key: 'new', label: 'Новые', icon: 'inbox' },
  { key: 'completed', label: 'Выполнено', icon: 'check_circle' },
  { key: 'cancelled', label: 'Отменено', icon: 'cancel' },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('new')
  const [expandedOrder, setExpandedOrder] = useState(null)

  const filteredOrders = mockOrders.filter((o) => o.status === activeTab)

  const statusBadge = {
    new: 'bg-info text-white',
    completed: 'bg-accent text-white',
    cancelled: 'bg-error text-white',
  }

  return (
    <div className="min-h-screen bg-bg">
      <PageHeader title="Заказы" />

      {/* Tab bar */}
      <div className="page-padding pt-4">
        <div className="bg-surface-alt rounded-[20px] p-[3px] flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-[16px] t-caption font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-text-primary shadow-sm'
                  : 'text-text-muted'
              }`}
            >
              <span className="material-symbols-rounded text-[18px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      <div className="flex flex-col gap-2.5 page-padding pt-5 pb-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="material-symbols-rounded text-[64px] text-[#D4D4D4]">receipt_long</span>
            <p className="t-subtitle text-text-disabled">Заказов пока нет</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="card !p-0 overflow-hidden transition-all">
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="t-caption font-bold text-text-primary">{order.id}</span>
                    <span className={`t-small px-2 py-0.5 rounded-full ${statusBadge[order.status]}`}>
                      {order.status === 'new' ? 'Новый' : order.status === 'completed' ? 'Выполнен' : 'Отменён'}
                    </span>
                  </div>
                  <p className="t-subtitle font-medium text-text-secondary">{order.customer}</p>
                  <p className="text-[13px] text-text-disabled mt-0.5">{order.date} • {order.time}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="t-btn font-bold text-text-primary">{order.total.toLocaleString()} сом</span>
                  <span className={`material-symbols-rounded text-[20px] text-text-disabled transition-transform duration-200 ${expandedOrder === order.id ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </button>

              {expandedOrder === order.id && (
                <div className="border-t border-surface-alt px-4 py-3 bg-[#FAFAFA] animate-slide-down">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-rounded text-[18px] text-text-disabled">phone</span>
                    <span className="t-caption text-text-secondary">{order.phone}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="t-caption text-text-secondary">{item.name} × {item.qty}</span>
                        <span className="t-caption font-semibold text-text-primary">{item.price.toLocaleString()} сом</span>
                      </div>
                    ))}
                  </div>
                  {order.status === 'new' && (
                    <div className="flex gap-2 mt-4">
                      <button className="btn btn-accent flex-1 !py-2.5 !text-[14px] !rounded-xl">Выполнить</button>
                      <button className="btn btn-danger flex-1 !py-2.5 !text-[14px] !rounded-xl">Отменить</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
