import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'

export default function AddProductPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([
    { id: 1, label: 'Все', checked: false },
    { id: 2, label: 'Соковыжималки', checked: true },
    { id: 3, label: 'Утюги', checked: false },
    { id: 4, label: 'Стиральные машины', checked: false },
  ])

  const toggleCategory = (id) => {
    if (id === 1) {
      // Логика "Выбрать все"
      const allChecked = !categories.find(c => c.id === 1).checked
      setCategories(prev => prev.map(cat => ({ ...cat, checked: allChecked })))
    } else {
      // Логика обычного чекбокса
      setCategories(prev => {
        const nextState = prev.map(cat => 
          cat.id === id ? { ...cat, checked: !cat.checked } : cat
        )
        // Если все остальные выбраны, ставим галочку на "Все"
        const otherCats = nextState.filter(c => c.id !== 1)
        const allOthersSelected = otherCats.every(c => c.checked)
        return nextState.map(cat => cat.id === 1 ? { ...cat, checked: allOthersSelected } : cat)
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] pb-32">
      
      {/* Header */}
      <Header 
        title="Добавить новый товар" 
        leftIcon="arrow_back" 
        onLeftClick={() => navigate(-1)} 
        variant="sub"
      />

      <div className="admin-container flex flex-col gap-5 mt-2">
        
        {/* Фотографии */}
        <section className="form-card">
          <h2 className="form-label">Выбор фотографии</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="image-upload-square">
                <span className="material-symbols-rounded text-[#D4D4D4] text-[32px]">add_a_photo</span>
              </div>
            ))}
          </div>
          <p className="form-hint">
            Рекомендуемый размер:<br />
            800×800 пкс, не более 5 МБ
          </p>
        </section>

        {/* Название */}
        <section className="form-card">
          <h2 className="form-label">Название товара<span>*</span></h2>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Например, красное платье"
          />
        </section>

        {/* Описание */}
        <section className="form-card">
          <div className="flex justify-between items-center">
            <h2 className="form-label">Описание товара<span>*</span></h2>
            <span className="text-[12px] text-[#8F8F8F]">200 символов</span>
          </div>
          <textarea 
            className="form-textarea"
            placeholder="Напр. Блендер погружной BEKO BKK 3020 HB"
          />
        </section>

        {/* Цена */}
        <section className="form-card">
          <h2 className="form-label">Цена товара</h2>
          <p className="form-hint -mt-2">
            Если цена не указана, товар отобразится без цены
          </p>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Напр. 2500 (в сомах)"
          />
        </section>

        {/* Категории */}
        <section className="form-card">
          <h2 className="form-label">Выберите категории</h2>
          <div className="flex flex-col">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => toggleCategory(cat.id)}
                className={`category-checkbox ${cat.checked ? 'checkbox-active' : ''}`}
              >
                <div className="checkbox-box">
                  {cat.checked && <span className="material-symbols-rounded text-white text-[18px]">check</span>}
                </div>
                <span className={`text-[16px] font-medium ${cat.checked ? 'text-[#151515]' : 'text-[#8F8F8F]'}`}>
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
          <button className="btn-secondary mt-2">
            <span className="material-symbols-rounded">add</span>
            <span>Создать новую категорию</span>
          </button>
        </section>

        {/* Кнопка сохранения */}
        <div className="mt-4">
          <button 
            onClick={() => navigate('/catalog')}
            className="btn-add-product w-full bg-[#2D2D2D] hover:bg-[#151515] shadow-none"
          >
            Сохранить товар
          </button>
        </div>

      </div>
    </div>
  )
}
