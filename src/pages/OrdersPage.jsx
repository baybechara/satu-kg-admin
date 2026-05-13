import { useState } from 'react'
import Header from '../components/Header'

const NewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="cutout">
      <rect width="24" height="24" fill="white" />
      <circle cx="17.5" cy="6.5" r="3" fill="black" />
    </mask>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" mask="url(#cutout)"/>
    <path d="M8.5 12L11 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="17.5" cy="6.5" r="2.5" fill="currentColor"/>
  </svg>
)

const CompletedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13L8.5 16.5L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 13L13.5 16.5L20 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CancelledIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const mockOrders = [
  {
    id: 'Заказ №1', customer: 'Азамат Касымов', phone: '+996 555 123 456', delivery: 'Самовывоз', comment: 'Заберу вечером в 19:00',
    items: [
      { name: 'Блендер погружной BEKO BKK 3020 HB', qty: 2, price: 4228, image: 'https://img.freepik.com/free-photo/blender-isolated-on-white-background_1232-1547.jpg' },
      { name: 'Утюг Beko SIM 4123 T', qty: 1, price: 4044, image: 'https://img.freepik.com/free-photo/iron-isolated-on-white-background_1232-1549.jpg' }
    ],
    total: 12500, status: 'new', date: '12 мая 2026', time: '14:30', color: '#3B82F6'
  },
  {
    id: 'Заказ №2', customer: 'Айгуль Жумабекова', phone: '+996 700 789 012', delivery: 'Доставка', comment: '',
    items: [
      { name: 'Утюг Philips GC4564/20', qty: 1, price: 4200, image: 'https://img.freepik.com/free-photo/iron-isolated-on-white-background_1232-1549.jpg' },
      { name: 'Тостер Smeg TSF01', qty: 1, price: 15800, image: 'https://img.freepik.com/free-photo/blender-isolated-on-white-background_1232-1547.jpg' }
    ],
    total: 20000, status: 'new', date: '12 мая 2026', time: '12:15', color: '#10B981'
  }
]

const tabs = [
  { key: 'new', label: 'Новые', Icon: NewIcon },
  { key: 'completed', label: 'Выполнено', Icon: CompletedIcon },
  { key: 'cancelled', label: 'Отменено', Icon: CancelledIcon },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('new')
  const [expandedOrder, setExpandedOrder] = useState('Заказ №1')

  const filteredOrders = mockOrders.filter((o) => o.status === activeTab)

  return (
    <div className="w-full max-w-[820px] mx-auto min-h-screen bg-neutral-50 relative pb-24 flex flex-col">
      <Header title="Заказы" />

      {/* Tab bar */}
      <div className="page-padding pt-2">
        <div className="orders-tab-container">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`orders-tab-btn ${isActive ? 'active' : ''}`}
              >
                <div className="orders-tab-icon"><tab.Icon /></div>
                <span className="orders-tab-label">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Orders list */}
      <div className="orders-list page-padding">
        {filteredOrders.length === 0 ? (
          <div className="orders-empty-state">
            <div className="orders-empty-card">
              <div className="orders-empty-icon">
                <span className="material-symbols-rounded" style={{fontSize: '28px'}}>info</span>
              </div>
              <p className="orders-empty-text">
                Новых заказов пока нет.<br />
                Поделитесь ссылкой на магазин.
              </p>
              <button className="orders-empty-link">Поделиться</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              
              return (
                <div key={order.id} className="orders-card">
                  <div 
                    className="orders-card-header cursor-pointer" 
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex-1">
                      <div className="orders-id-row">
                        <span className="orders-id" style={{color: order.color}}>{order.id}</span>
                        <span className="orders-date">{order.date} • {order.time}</span>
                      </div>
                      <div className="orders-customer">{order.customer}</div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-center gap-1">
                      <button className="orders-expand-btn">
                        <span className="material-symbols-rounded">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="orders-expanded-content">
                      <div className="orders-divider"></div>
                      
                      {/* Customer Info */}
                      <div className="orders-section-title">
                        <span>Информация о заказе</span>
                        <button className="orders-copy-btn">
                          <span className="material-symbols-rounded" style={{fontSize: '20px'}}>content_copy</span>
                        </button>
                      </div>
                      
                      <div className="orders-info-box">
                        <div className="orders-info-row">
                          <div className="orders-info-icon">
                            <span className="material-symbols-rounded">call</span>
                          </div>
                          <div className="flex-1">
                            <div className="orders-info-label">Телефон покупателя:</div>
                            <div className="orders-info-value">{order.phone}</div>
                          </div>
                        </div>
                        <div className="orders-info-row">
                          <div className="orders-info-icon">
                            <span className="material-symbols-rounded">inventory_2</span>
                          </div>
                          <div className="flex-1">
                            <div className="orders-info-label">Способ получения:</div>
                            <div className="orders-info-value">{order.delivery}</div>
                          </div>
                        </div>
                        {order.comment && (
                          <div className="orders-info-row">
                            <div className="orders-info-icon">
                              <span className="material-symbols-rounded">chat</span>
                            </div>
                            <div className="flex-1">
                              <div className="orders-info-label">Комментарий покупателя:</div>
                              <div className="orders-info-value">{order.comment}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="orders-section-title mt-4">Товары</div>
                      
                      {/* Items */}
                      <div className="orders-items-box">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="orders-item-row">
                            <div className="orders-item-img-container">
                              <img src={item.image} alt="" className="orders-item-img" />
                            </div>
                            <div className="flex-1">
                              <div className="orders-item-name">{item.name}</div>
                              <div className="orders-item-price-block">
                                <span className="orders-item-qty">{item.qty} шт.</span>
                                <span className="orders-item-price">{item.price * item.qty} сом</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="orders-total-row mt-4">
                        <span className="orders-total-label">Итого:</span>
                        <span className="orders-total-value">{order.total} сом</span>
                      </div>

                      {order.status === 'new' && (
                        <>
                          {/* Распорка */}
                          <div className="w-full h-[24px]"></div>
                          <div className="orders-actions flex gap-3">
                            <button className="orders-btn-cancel flex-1 flex items-center justify-center gap-1.5">
                            <span className="material-symbols-rounded text-[20px]">close</span>
                            <span>Отменить</span>
                          </button>
                          <button className="orders-btn-complete flex-1 flex items-center justify-center gap-1.5">
                            <span className="material-symbols-rounded text-[20px]">check</span>
                            <span>Выполнен</span>
                          </button>
                        </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Spacer for BottomNav */}
      <div style={{ height: '120px', flexShrink: 0, width: '100%' }} />
    </div>
  )
}
