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
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] pb-32">
      
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
              className="category-item cursor-pointer shadow-sm border border-transparent hover:border-[#10B981]/20"
              onClick={() => setEditingCategory(cat)}
            >
              <span className="material-symbols-rounded text-[#D4D4D4] select-none">drag_indicator</span>
              <span className="flex-1 text-[18px] font-bold text-[#151515] font-['Open_Sans']">{cat.name}</span>
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
        <div className="modal-overlay-blur" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
              <span className="material-symbols-rounded text-[#151515]">close</span>
            </button>
            <h2 className="text-[24px] font-bold text-[#151515] mb-8 font-['Open_Sans']">Создать категорию</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[16px] font-bold text-[#151515] font-['Open_Sans']">
                  Название категории <span className="text-[#FF4D4D]">*</span>
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Например, книги"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[16px] font-semibold text-[#8F8F8F] font-['Open_Sans']">Скрыть</span>
                <Toggle enabled={false} onChange={() => {}} />
              </div>

              <button 
                onClick={handleSaveCategory}
                className="btn-add-product w-full bg-[#2D2D2D] hover:bg-[#151515] shadow-none mt-2 justify-center"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <div className="modal-overlay-blur" onClick={() => setEditingCategory(null)}>
          <div className="modal-content-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEditingCategory(null)}>
              <span className="material-symbols-rounded text-[#151515]">close</span>
            </button>
            <h2 className="text-[24px] font-bold text-[#151515] mb-8 font-['Open_Sans']">Редактировать катего..</h2>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-[16px] font-bold text-[#151515] font-['Open_Sans']">
                  Название категории <span className="text-[#FF4D4D]">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="form-input !border-[#3B82F6]/50 !bg-[#EFF6FF]" 
                    value={editingCategory.name}
                    onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                  />
                  <div className="absolute inset-0 rounded-14 border-2 border-[#3B82F6] pointer-events-none opacity-20"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[16px] font-bold text-[#10B981] font-['Open_Sans']">Показывать</span>
                <Toggle enabled={editingCategory.active} onChange={() => setEditingCategory({...editingCategory, active: !editingCategory.active})} />
              </div>

              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => handleDeleteCategory(editingCategory.id)}
                  className="btn-secondary !border-[#F1F1F1] !text-[#151515]"
                >
                  Удалить
                </button>
                <button 
                  onClick={handleSaveCategory}
                  className="btn-add-product flex-1 bg-[#2D2D2D] hover:bg-[#151515] shadow-none justify-center"
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
