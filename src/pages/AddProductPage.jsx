import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Plus, Check, Save, CloudUpload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function AddProductPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [categories, setCategories] = useState([
    { id: 1, label: 'Все', checked: false },
    { id: 2, label: 'Соковыжималки', checked: true },
    { id: 3, label: 'Утюги', checked: false },
    { id: 4, label: 'Стиральные машины', checked: false },
  ])

  const isFormValid = title.trim().length > 0 && description.trim().length > 0

  const toggleCategory = (id) => {
    if (id === 1) {
      const allChecked = !categories.find(c => c.id === 1).checked
      setCategories(prev => prev.map(cat => ({ ...cat, checked: allChecked })))
    } else {
      setCategories(prev => {
        const nextState = prev.map(cat => 
          cat.id === id ? { ...cat, checked: !cat.checked } : cat
        )
        const otherCats = nextState.filter(c => c.id !== 1)
        const allOthersSelected = otherCats.every(c => c.checked)
        return nextState.map(cat => cat.id === 1 ? { ...cat, checked: allOthersSelected } : cat)
      })
    }
  }

  const textareaClasses = "flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"

  return (
    <>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="w-full max-w-[820px] mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-neutral-200 shrink-0 active:scale-95 transition-all hover:bg-neutral-50"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <h1 className="text-lg font-semibold tracking-tight text-neutral-900">Добавить товар</h1>
          </div>
          <Button 
            disabled={!isFormValid}
            onClick={() => navigate('/catalog')} 
            size="sm"
            className="h-8 gap-2 font-medium hidden sm:flex bg-neutral-900 hover:bg-neutral-800 text-white"
          >
            <Save className="w-4 h-4" />
            Сохранить
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[84px] flex flex-col gap-6">
        
        {/* Фотографии */}
        <section className="rounded-xl border bg-card text-card-foreground">
          <div className="flex flex-col space-y-1.5 p-5">
            <h3 className="font-semibold leading-none tracking-tight">Фотографии товара</h3>
            <p className="text-sm text-muted-foreground">Перетащите файлы сюда или нажмите для выбора</p>
          </div>
          
          <div className="p-5 pt-0">
            <div className="w-full rounded-xl border border-dashed border-input bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center py-10 px-4 cursor-pointer text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <CloudUpload className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-neutral-900">Загрузить файлы</span>
                <span className="text-[13px] text-muted-foreground">PNG, JPG до 5 МБ</span>
              </div>
              <Button variant="outline" className="mt-2 h-9 px-4 rounded-md font-medium">
                Выбрать файлы
              </Button>
            </div>
          </div>
        </section>

        {/* Название */}
        <section className="rounded-xl border bg-card text-card-foreground">
          <div className="p-5 flex flex-col space-y-3">
            <Label htmlFor="title" className="font-semibold">Название товара <span className="text-red-500">*</span></Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например, красное платье"
            />
          </div>
        </section>

        {/* Описание */}
        <section className="rounded-xl border bg-card text-card-foreground">
          <div className="p-5 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="desc" className="font-semibold">Описание товара <span className="text-red-500">*</span></Label>
              <span className="text-xs text-muted-foreground">{description.length} / 2000</span>
            </div>
            <textarea 
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={textareaClasses}
              placeholder="Напр. Блендер погружной BEKO BKK 3020 HB..."
            />
          </div>
        </section>

        {/* Цена и Количество (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Цена */}
          <section className="rounded-xl border bg-card text-card-foreground">
            <div className="p-5 flex flex-col space-y-3">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price" className="font-semibold">Цена товара</Label>
                <p className="text-[13px] text-muted-foreground">Если не указать, будет "Без цены"</p>
              </div>
              <div className="relative">
                <Input 
                  id="price"
                  type="text" 
                  className="pr-12" 
                  placeholder="0"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">сом</div>
              </div>
            </div>
          </section>

          {/* Количество */}
          <section className="rounded-xl border bg-card text-card-foreground">
            <div className="p-5 flex flex-col space-y-3">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="qty" className="font-semibold">Количество</Label>
                <p className="text-[13px] text-muted-foreground">Остаток на складе</p>
              </div>
              <div className="relative">
                <Input 
                  id="qty"
                  type="text" 
                  className="pr-10" 
                  placeholder="10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">шт</div>
              </div>
            </div>
          </section>
        </div>

        {/* Категории */}
        <section className="rounded-xl border bg-card text-card-foreground">
          <div className="p-6 flex flex-col space-y-4">
            <h3 className="font-semibold leading-none tracking-tight">Категории</h3>
            <div className="flex flex-col space-y-3 mt-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`category-${cat.id}`}
                    checked={cat.checked}
                    onCheckedChange={() => toggleCategory(cat.id)}
                  />
                  <Label 
                    htmlFor={`category-${cat.id}`}
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cat.label}
                  </Label>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="mt-2 w-full sm:w-fit border-dashed text-muted-foreground hover:text-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Создать новую категорию
            </Button>
          </div>
        </section>

      </main>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t p-4 sm:hidden z-40 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button 
          disabled={!isFormValid}
          onClick={() => navigate('/catalog')} 
          className="w-full gap-2 bg-neutral-900 hover:bg-neutral-800 text-white"
        >
          <Save className="w-4 h-4" />
          Сохранить товар
        </Button>
      </div>

    </>
  )
}
