import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutGrid, ShoppingBag, Settings, Share } from 'lucide-react'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'catalog', label: 'Каталог', icon: LayoutGrid, path: '/catalog' },
    { id: 'orders', label: 'Заказы', icon: ShoppingBag, path: '/orders' },
    { id: 'settings', label: 'Настройки', icon: Settings, path: '/settings' },
    { id: 'share', label: 'Поделиться', icon: Share, path: '/share' },
  ]

  return (
    <div className="fixed bottom-0 left-0 w-full h-[64px] sm:h-[72px] bg-white/90 backdrop-blur-md border-t border-neutral-200 flex justify-center z-50 shadow-sm">
      <div className="w-full max-w-[820px] flex items-center justify-around px-2 sm:px-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path 
            || (item.id === 'catalog' && location.pathname.startsWith('/add-product'))
            || (item.id === 'settings' && location.pathname.startsWith('/settings'))
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 w-16 h-full transition-all outline-none group"
            >
              <div className={`transition-all duration-200 flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 group-hover:bg-neutral-50'}`}>
                <item.icon 
                  className={`w-[20px] h-[20px] transition-all ${isActive ? 'stroke-[2.5px]' : 'stroke-[2px]'}`}
                />
              </div>
              <span className={`text-[10px] transition-all tracking-tight ${
                isActive 
                  ? 'font-bold text-neutral-900' 
                  : 'font-medium text-neutral-500'
              }`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
