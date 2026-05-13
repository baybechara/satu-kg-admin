import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toggle from '../components/Toggle'
import Header from '../components/Header'

const initialCategories = [
  { id: 1, name: 'Соковыжималки', count: 8, active: true },
  { id: 2, name: 'Утюги', count: 12, active: true },
  { id: 3, name: 'Стиральные машины', count: 4, active: false },
]

export default function CategoriesPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(initialCategories)
  const [activeTab, setActiveTab] = useState('active') // 'active' or 'hidden'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')

  const filteredCategories = categories.filter(c => activeTab === 'active' ? c.active : !c.active)
  const activeCount = categories.filter(c => c.active).length
  const hiddenCount = categories.filter(c => !c.active).length

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? editingCategory : c))
      setEditingCategory(null)
    } else if (newCategoryName) {
      const newCat = {
        id: Date.now(),
        name: newCategoryName,
        count: 0,
        active: true
      }
      setCategories([...categories, newCat])
      setIsAddModalOpen(false)
      setNewCategoryName('')
    }
  }

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    setEditingCategory(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 pb-32">
      
      <Header 
        title="Категории" 
        leftIcon="arrow_back" 
        onLeftClick={() => navigate(-1)} 
      />

      <div className="admin-container mt-4">
        
        {/* Tabs */}
        <div className="tab-container">
          <button 
            onClick={() => setActiveTab('active')}
            className={`tab-btn ${activeTab === 'active' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            <span>Активные</span>
            <span className={`tab-badge ${activeTab === 'active' ? 'tab-badge-active' : 'tab-badge-inactive'}`}>
              {activeCount}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('hidden')}
            className={`tab-btn ${activeTab === 'hidden' ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            <span>Скрытые</span>
            <span className={`tab-badge ${activeTab === 'hidden' ? 'tab-badge-active' : 'tab-badge-inactive'}`}>
              {hiddenCount}
            </span>
          </button>
        </div>

        {/* Category List */}
        <div className="flex flex-col">
          {filteredCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-item cursor-pointer shadow-sm border border-transparent hover:border-green-500/20"
              onClick={() => setEditingCategory(cat)}
            >
              <span className="material-symbols-rounded text-neutral-300 select-none">drag_indicator</span>
              <span className="flex-1 text-[18px] font-bold text-neutral-900 font-['Open_Sans']">{cat.name}</span>
              <div className="count-badge">{cat.count}</div>
            </div>
          ))}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-[104px] left-1/2 -translate-x-1/2 w-full max-w-[820px] admin-container z-30 flex justify-end">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-add-product"
          >
            <span className="material-symbols-rounded text-[24px]">add</span>
            <span>Добавить категорию</span>
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setIsAddModalOpen(false)}>
          <div className="custom-modal-outer" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-neutral-900 font-['Open_Sans'] tracking-tight">Создать</h2>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm" onClick={() => setIsAddModalOpen(false)}>
                <span className="material-symbols-rounded text-neutral-900 text-[20px]">close</span>
              </button>
            </div>
            
            <div className="custom-modal-inner shadow-sm">
              <div className="flex flex-col">
                <label className="text-[16px] font-medium text-neutral-900 font-['Open_Sans']" style={{ marginBottom: '12px' }}>
                  Название категории <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-input !border-neutral-200 focus:!border-blue-500" 
                  placeholder="Например, книги"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between" style={{ marginTop: '16px' }}>
                <span className="text-[15px] font-semibold text-neutral-400 font-['Open_Sans']">Скрыт</span>
                <Toggle enabled={false} onChange={() => {}} />
              </div>

              <button 
                onClick={handleSaveCategory}
                className="w-full h-14 bg-neutral-800 hover:bg-neutral-900 rounded-2xl text-white font-semibold text-[16px] font-['Open_Sans'] transition-colors"
                style={{ marginTop: '24px' }}
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setEditingCategory(null)}>
          <div className="custom-modal-outer" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-neutral-900 font-['Open_Sans'] tracking-tight">Изменить</h2>
              <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm" onClick={() => setEditingCategory(null)}>
                <span className="material-symbols-rounded text-neutral-900 text-[20px]">close</span>
              </button>
            </div>
            
            <div className="custom-modal-inner shadow-sm">
              <div className="flex flex-col">
                <label className="text-[16px] font-medium text-neutral-900 font-['Open_Sans']" style={{ marginBottom: '12px' }}>
                  Название категории
                </label>
                <input 
                  type="text" 
                  className="form-input !border-neutral-200 focus:!border-blue-500" 
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between" style={{ marginTop: '16px' }}>
                <span className={`text-[15px] font-semibold font-['Open_Sans'] ${editingCategory.active ? 'text-green-500' : 'text-neutral-400'}`}>
                  {editingCategory.active ? 'Активнен' : 'Скрыт'}
                </span>
                <Toggle enabled={editingCategory.active} onChange={() => setEditingCategory({...editingCategory, active: !editingCategory.active})} />
              </div>

              <div className="flex gap-3" style={{ marginTop: '24px' }}>
                <button 
                  onClick={() => handleDeleteCategory(editingCategory.id)}
                  className="flex-1 h-14 rounded-2xl border border-neutral-200 bg-white text-neutral-900 font-semibold text-[16px] font-['Open_Sans'] transition-colors hover:bg-neutral-50"
                >
                  Удалить
                </button>
                <button 
                  onClick={handleSaveCategory}
                  className="flex-1 h-14 rounded-2xl bg-neutral-800 hover:bg-neutral-900 text-white font-semibold text-[16px] font-['Open_Sans'] transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
