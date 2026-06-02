import { useState } from 'react'
import Icon from '@/components/Icon'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Copy, Phone, Package, MessageSquare, ChevronDown, ChevronUp, Check, X, Info, Trash2 } from 'lucide-react'

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
  const [orders, setOrders] = useState(mockOrders)
  const [activeTab, setActiveTab] = useState('new')
  const [expandedOrder, setExpandedOrder] = useState('Заказ №1')
  const [itemToDelete, setItemToDelete] = useState(null)

  const filteredOrders = orders.filter((o) => o.status === activeTab)

  const handleDeleteClick = (orderId, itemIndex, item, e) => {
    e.stopPropagation()
    setItemToDelete({ orderId, itemIndex, item })
  }

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    setOrders(prev => prev.map(order => {
      if (order.id !== itemToDelete.orderId) return order;
      
      const newItems = [...order.items];
      const removedItem = newItems.splice(itemToDelete.itemIndex, 1)[0];
      const newTotal = order.total - (removedItem.price * removedItem.qty);
      
      return {
        ...order,
        items: newItems,
        total: Math.max(0, newTotal)
      }
    }));
    
    setItemToDelete(null)
  }

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
                <span className={`text-[12px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 ${activeTab === tab.key ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-200/50 text-neutral-500'}`}>
                  {orders.filter(o => o.status === tab.key).length}
                </span>
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
                      <div className="flex items-center justify-between mb-4 mt-2">
                        <div className="flex flex-col gap-0.5">
                          <h3 className="text-[15px] font-semibold text-neutral-900 tracking-tight">Информация о заказе</h3>
                          <p className="text-[13px] text-muted-foreground">Контактные данные и способ доставки.</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 shrink-0 rounded-lg -mr-2">
                          <Copy className="w-4 h-4" />
                          <span className="text-[13px] font-semibold hidden sm:inline">Скопировать</span>
                        </Button>
                      </div>
                      
                      <div className="flex flex-col mt-2 mb-2">
                        <div className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center shrink-0">
                              <Phone className="w-4 h-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[14px] font-medium text-neutral-900">{order.customer}</span>
                              <span className="text-[13px] text-muted-foreground">Телефон покупателя</span>
                            </div>
                          </div>
                          <span className="text-[14px] font-medium text-neutral-600">{order.phone}</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-t">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center shrink-0">
                              <Package className="w-4 h-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[14px] font-medium text-neutral-900">{order.delivery}</span>
                              <span className="text-[13px] text-muted-foreground">Способ получения</span>
                            </div>
                          </div>
                          <span className="text-[14px] font-medium text-neutral-600">
                            {order.delivery === 'Самовывоз' ? 'Пункт выдачи' : 'Адрес курьера'}
                          </span>
                        </div>

                        {order.comment && (
                          <div className="flex items-start justify-between py-3 border-t gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center shrink-0 mt-0.5">
                                <MessageSquare className="w-4 h-4 text-neutral-600" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[14px] font-medium text-neutral-900">Комментарий</span>
                                <span className="text-[13px] text-muted-foreground leading-snug max-w-[250px] sm:max-w-[300px]">{order.comment}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3">Товары</h3>
                      
                      {/* Items */}
                      <div className="flex flex-col gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-3 rounded-xl bg-muted/30 items-center transition-colors hover:bg-muted/50">
                            <div className="w-[52px] h-[52px] rounded-xl border bg-white overflow-hidden shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center flex-1 min-w-0">
                              <div className="text-[15px] font-medium text-neutral-900 leading-tight truncate">{item.name}</div>
                              <div className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mt-1">
                                {item.qty} ШТ. · {item.price} СОМ
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-center shrink-0 pr-1">
                              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">Сумма</div>
                              <div className="text-[15px] font-bold text-neutral-900">{item.price * item.qty} сом</div>
                            </div>
                            
                            {order.status === 'new' && order.items.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 ml-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                                onClick={(e) => handleDeleteClick(order.id, idx, item, e)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="border-t mx-[-16px] sm:mx-[-20px] mb-[-20px] mt-6 bg-muted/5 flex flex-col">
                        <div className="px-4 sm:px-5 py-5 flex flex-col gap-5">
                          <div className="flex items-center justify-between">
                            <span className="text-[15px] font-medium text-muted-foreground">Итоговая сумма</span>
                            <span className="text-lg font-bold text-neutral-900">{order.total} сом</span>
                          </div>

                          {order.status === 'new' && (
                            <div className="flex flex-col gap-3">
                              <div className="flex gap-3">
                                <Button 
                                  variant="outline" 
                                  className="flex-1 h-11 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 font-semibold bg-white"
                                >
                                  <X className="w-5 h-5 mr-1.5" />
                                  Отменить
                                </Button>
                                <Button 
                                  className="flex-1 h-11 font-semibold"
                                >
                                  <Check className="w-5 h-5 mr-1.5" />
                                  Выполнен
                                </Button>
                              </div>
                              <p className="text-[13px] text-center text-muted-foreground leading-snug">
                                Отмененные заказы нельзя будет восстановить.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Dialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg">Удалить товар?</DialogTitle>
            <DialogDescription className="text-sm mt-1.5">
              Вы уверены, что хотите удалить <b>{itemToDelete?.item?.name}</b> из заказа? Это действие пересчитает общую сумму.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-2">
            <Button variant="outline" onClick={() => setItemToDelete(null)} className="flex-1">
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="flex-1">
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
