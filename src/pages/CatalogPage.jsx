import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Toggle from '../components/Toggle'

const initialProducts = [
  { id: '1', name: 'Блендер погружной BEKO BKK 3020 HB', price: 2884, active: true, image: 'https://img.freepik.com/free-photo/blender-isolated-on-white-background_1232-1547.jpg', stock: 24, category: 'Блендеры' },
  { id: '2', name: 'Утюг Beko SIM 4123 T', price: 2622, active: true, image: 'https://img.freepik.com/free-photo/iron-isolated-on-white-background_1232-1549.jpg', stock: 5, category: 'Утюги' },
  { id: '3', name: 'Утюг Beko SIM 4123 T', price: 2884, active: false, image: 'https://img.freepik.com/free-photo/iron-isolated-on-white-background_1232-1549.jpg', stock: 24, category: 'Утюги' },
]

const categories = [
  { id: 'all', label: 'Все товары', width: '110px' },
  { id: 'juicers', label: 'Соковыжималки', width: '150px' },
  { id: 'washers', label: 'Стиральные машины', width: '200px' },
  { id: 'irons', label: 'Утюги', width: '81px' },
  { id: 'blenders', label: 'Блендеры', width: '100px' }
]

export default function CatalogPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState(initialProducts)
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [activeStatus, setActiveStatus] = useState('active')
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const filteredProducts = products.filter(p => {
    const activeCat = categories.find(c => c.id === activeCategoryId)
    const matchesCategory = activeCat.id === 'all' || p.category === activeCat.label
    const matchesStatus = activeStatus === 'active' ? p.active : !p.active
    return matchesCategory && matchesStatus
  })

  const activeCount = products.filter(p => p.active).length
  const hiddenCount = products.filter(p => !p.active).length

  const toggleProductStatus = (id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ))
    setShowToast(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      
      {showToast && (
        <div className="toast-overlay" onClick={() => setShowToast(false)}>
          <div className="toast-box" onClick={e => e.stopPropagation()}>
            <div className="w-[56px] h-[56px] rounded-full bg-green-500/10 flex items-center justify-center">
              <span className="material-symbols-rounded text-green-500 text-[32px]">check_circle</span>
            </div>
            <div className="text-center">
              <p className="text-[18px] font-bold text-neutral-900 font-['Open_Sans'] leading-[1.4]">
                Статус товара<br />успешно изменен!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FIXED Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[820px] bg-neutral-50">
        <header className="admin-header admin-container flex items-center justify-between">
          <div className="text-neutral-900 text-[24px] font-semibold font-['Open_Sans'] leading-none">Каталог</div>
          <button 
            onClick={() => navigate('/categories')}
            className="flex items-center justify-center gap-3 bg-neutral-100 w-[161px] h-[40px] rounded-[8px] border-none cursor-pointer shadow-sm"
          >
            <span className="material-symbols-rounded text-neutral-900 text-[24px]">grid_view</span>
            <span className="text-neutral-700 text-[18px] font-semibold font-['Open_Sans']">Категории</span>
          </button>
        </header>
      </div>

      {/* Spacer for Header (~70px) */}
      <div className="h-[70px] w-full" />

      {/* Category Chips Container with custom class */}
      <div className="category-chips-container">
        <div className="flex gap-[8px] overflow-x-auto no-scrollbar admin-container">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              style={{ width: cat.width }}
              className={`chip-base ${activeCategoryId === cat.id ? 'chip-active' : 'chip-inactive'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filters */}
      <div className="filter-status-container admin-container flex gap-2.5 bg-transparent">
        <button onClick={() => setActiveStatus('active')} className={`filter-btn-base ${activeStatus === 'active' ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
          <span>Активно</span>
          <span className={`status-badge ${activeStatus === 'active' ? 'badge-active' : 'badge-inactive'}`}>
            {activeCount}
          </span>
        </button>
        <button onClick={() => setActiveStatus('hidden')} className={`filter-btn-base ${activeStatus === 'hidden' ? 'filter-btn-active' : 'filter-btn-inactive'}`}>
          <span>Отключено</span>
          <span className={`status-badge ${activeStatus === 'hidden' ? 'badge-active' : 'badge-inactive'}`}>
            {hiddenCount}
          </span>
        </button>
      </div>

      {/* Product List */}
      <div className="admin-container product-list-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center p-1">
                <span className="material-symbols-rounded text-neutral-300 text-[20px] select-none">drag_indicator</span>
              </div>
              <div className="product-img-container">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              </div>
              <h3 className="text-[16px] font-bold text-neutral-900 leading-[1.3] flex-1 font-['Open_Sans']">
                {product.name}
              </h3>
            </div>
            <div className="product-divider" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <div className="product-stat-chip">{product.price} сом</div>
                <div className="product-stat-chip">{product.stock} шт.</div>
              </div>
              <Toggle enabled={product.active} onChange={() => toggleProductStatus(product.id)} />
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center text-neutral-500 font-['Open_Sans']">
            В этом разделе пока нет товаров
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-[104px] left-1/2 -translate-x-1/2 w-full max-w-[820px] admin-container z-30 flex justify-end">
        <button 
          onClick={() => navigate('/add-product')}
          className="btn-add-product"
        >
          <span className="material-symbols-rounded text-[24px]">add</span>
          <span>Добавить товар</span>
        </button>
      </div>
    </div>
  )
}
