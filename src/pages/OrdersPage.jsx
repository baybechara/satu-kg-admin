import { useState } from 'react'
import Icon from '@/components/Icon'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Copy, Phone, Package, MessageSquare, ChevronDown, ChevronUp, Check, X, Info } from 'lucide-react'

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
    <>
      <Header title="Заказы" />

      <div className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-12 bg-neutral-200/50 rounded-xl p-1 mb-4">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.key} 
                value={tab.key} 
                className="flex items-center justify-center gap-2 text-[14px] font-medium rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm data-[state=inactive]:text-neutral-500 hover:text-neutral-700"
              >
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="pb-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-dashed bg-card text-card-foreground mt-2">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-1">Новых заказов пока нет</h3>
            <p className="text-sm text-muted-foreground mb-5">Поделитесь ссылкой на магазин.</p>
            <Button variant="outline" className="h-11 px-6 rounded-lg font-semibold">
              Поделиться
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            {filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;
              
              return (
                <div key={order.id} className="rounded-xl border bg-card text-card-foreground overflow-hidden transition-all">
                  <div 
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors" 
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-semibold tracking-tight" style={{color: order.color}}>{order.id}</span>
                        <Badge variant="secondary" className="font-medium text-muted-foreground hover:bg-secondary">{order.date} • {order.time}</Badge>
                      </div>
                      <div className="text-[15px] font-medium leading-none">{order.customer}</div>
                    </div>
                    
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground shrink-0 hover:bg-muted-foreground/10 transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-3 animate-in slide-in-from-top-2 duration-200">
                      
                      {/* Customer Info */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Информация о заказе</h3>
                        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 -mr-2">
                          <Copy className="w-4 h-4" />
                          <span className="text-xs font-semibold hidden sm:inline">Скопировать</span>
                        </Button>
                      </div>
                      
                      <div className="rounded-lg bg-muted/50 p-4 flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">Телефон покупателя:</span>
                            <span className="text-sm font-semibold">{order.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Package className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">Способ получения:</span>
                            <span className="text-sm font-semibold">{order.delivery}</span>
                          </div>
                        </div>
                        {order.comment && (
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-medium text-muted-foreground">Комментарий покупателя:</span>
                              <span className="text-sm font-medium leading-snug">{order.comment}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3">Товары</h3>
                      
                      {/* Items */}
                      <div className="flex flex-col gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-3 rounded-lg border bg-card items-center">
                            <div className="w-[60px] h-[60px] rounded-md border bg-white overflow-hidden shrink-0 flex items-center justify-center">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-between flex-1 py-1">
                              <div className="text-sm font-medium leading-tight line-clamp-2">{item.name}</div>
                              <div className="flex items-center justify-between w-full mt-2">
                                <Badge variant="secondary" className="font-medium hover:bg-secondary">{item.qty} шт.</Badge>
                                <span className="text-sm font-semibold">{item.price * item.qty} сом</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <span className="text-sm font-semibold text-muted-foreground">Итого:</span>
                        <span className="text-lg font-bold">{order.total} сом</span>
                      </div>

                      {order.status === 'new' && (
                        <div className="flex gap-3 mt-6">
                          <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 font-semibold"
                          >
                            <X className="w-5 h-5 mr-1.5" />
                            Отменить
                          </Button>
                          <Button 
                            className="flex-1 h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                          >
                            <Check className="w-5 h-5 mr-1.5" />
                            Выполнен
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
