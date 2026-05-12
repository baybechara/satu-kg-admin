import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'catalog', label: 'Каталог', icon: 'grid_view', path: '/catalog' },
    { id: 'orders', label: 'Заказы', icon: 'shopping_bag', path: '/orders' },
    { id: 'settings', label: 'Настройки', icon: 'settings', path: '/settings' },
    { id: 'share', label: 'Поделиться', icon: 'ios_share', path: '/share' },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[820px] h-[84px] bg-white border-t border-[#F1F1F1] flex items-center justify-around px-4 z-50 shadow-[0px_-4px_20px_rgba(0,0,0,0.03)]">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path || (item.id === 'catalog' && location.pathname === '/add-product')
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1.5 min-w-[80px] transition-all outline-none"
          >
            <div className={`transition-all duration-300 ${isActive ? 'text-[#151515]' : 'text-[#8F8F8F]'}`}>
              <span 
                className="material-symbols-rounded text-[30px] block transition-all"
                style={{ 
                  fontVariationSettings: isActive 
                    ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" 
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" 
                }}
              >
                {item.icon}
              </span>
            </div>
            <span className={`text-[12px] transition-all tracking-tight ${
              isActive 
                ? 'font-bold text-[#151515]' 
                : 'font-medium text-[#8F8F8F]'
            }`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
