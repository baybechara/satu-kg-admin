import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, GripVertical, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Toggle from '../components/Toggle'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const initialCategories = [
  { id: 1, name: 'Соковыжималки', count: 8, active: true },
  { id: 2, name: 'Утюги', count: 12, active: true },
  { id: 3, name: 'Стиральные машины', count: 4, active: false },
  { id: 4, name: 'Блендеры', count: 2, active: true },
]

function SortableCategoryRow({ category, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onEdit(category)}
      className={`flex items-center px-4 py-3 border-b border-neutral-100 last:border-0 cursor-pointer transition-colors bg-white ${isDragging ? 'opacity-70 bg-neutral-50 shadow-md ring-1 ring-neutral-200' : 'hover:bg-neutral-50/50'}`}
    >
      <button
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="text-neutral-400 cursor-grab active:cursor-grabbing select-none hover:text-neutral-600 transition-colors outline-none p-2 -ml-2 mr-2"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      
      <span className="flex-1 text-[15px] font-medium text-neutral-900 tracking-tight">
        {category.name}
      </span>
      
      <div className="min-w-[24px] h-[24px] px-2 flex items-center justify-center bg-neutral-100 rounded-full text-[12px] font-semibold text-neutral-600">
        {category.count}
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(initialCategories)
  const [activeTab, setActiveTab] = useState('active') // 'active' or 'hidden'
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  
  const [newCategoryName, setNewCategoryName] = useState('')

  const filteredCategories = categories.filter(c => activeTab === 'active' ? c.active : !c.active)
  const activeCount = categories.filter(c => c.active).length
  const hiddenCount = categories.filter(c => !c.active).length

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

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
    <div className="flex flex-col min-h-screen bg-neutral-50/50 font-sans">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="w-full max-w-[820px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-neutral-200 shrink-0 active:scale-95 transition-all hover:bg-neutral-50"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <h1 className="text-[20px] font-bold tracking-tight text-neutral-900">Категории</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[820px] mx-auto px-4 sm:px-6 pt-[84px] pb-[140px] flex flex-col gap-6">
        
        {/* Status Tabs */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto inline-block">
            <TabsList className="h-9 bg-neutral-100/80 p-1 rounded-lg inline-flex gap-1">
              <TabsTrigger
                value="active"
                className="h-full px-3 rounded-md gap-2 text-[13px] font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm data-[state=inactive]:text-neutral-500 hover:text-neutral-700 border-0"
              >
                Активно
                <span className={`text-[11px] font-medium rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 ${activeTab === 'active' ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-200/50 text-neutral-500'}`}>
                  {activeCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="hidden"
                className="h-full px-3 rounded-md gap-2 text-[13px] font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm data-[state=inactive]:text-neutral-500 hover:text-neutral-700 border-0"
              >
                Скрыто
                <span className={`text-[11px] font-medium rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 ${activeTab === 'hidden' ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-200/50 text-neutral-500'}`}>
                  {hiddenCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* List */}
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={filteredCategories.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col">
                {filteredCategories.map((cat) => (
                  <SortableCategoryRow 
                    key={cat.id} 
                    category={cat} 
                    onEdit={setEditingCategory} 
                  />
                ))}
                {filteredCategories.length === 0 && (
                  <div className="py-8 text-center text-neutral-500 text-[14px]">
                    Нет категорий
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </main>

      {/* Floating Add Button */}
      <div className="fixed bottom-[84px] sm:bottom-[96px] left-0 w-full z-50 pointer-events-none flex justify-center">
        <div className="w-full max-w-[820px] px-4 sm:px-6 flex justify-end">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="h-[48px] px-6 rounded-full shadow-none bg-neutral-900 hover:bg-neutral-800 text-white gap-2 font-medium text-[14px] pointer-events-auto"
          >
            <Plus className="w-5 h-5" />
            Добавить категорию
          </Button>
        </div>
      </div>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold">Создать категорию</DialogTitle>
          </DialogHeader>
          <div className="grid gap-5 py-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="category-name" className="text-[14px] font-semibold text-neutral-800">Название</Label>
              <Input 
                id="category-name"
                placeholder="Например, книги" 
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                autoFocus
                className="h-[44px] rounded-[10px] text-[14px] px-3 border-neutral-300 focus-visible:ring-1 focus-visible:border-neutral-400 bg-neutral-0"
              />
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-[14px] font-semibold text-neutral-800">Скрыт</span>
              <Toggle enabled={false} onChange={() => {}} />
            </div>
          </div>
          <DialogFooter className="bg-neutral-50 border-t border-neutral-200 px-6 py-4 -mx-6 -mb-6 mt-6 rounded-b-[20px] gap-2 sm:gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="h-[44px] rounded-[10px] text-[14px] font-semibold px-5 border-neutral-300 bg-white">Отмена</Button>
            </DialogClose>
            <Button onClick={handleSaveCategory} className="h-[44px] rounded-[10px] text-[14px] font-semibold px-5 bg-neutral-900 hover:bg-neutral-800 text-white">Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-bold">Изменить категорию</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-5 py-2 mt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-category-name" className="text-[14px] font-semibold text-neutral-800">Название</Label>
                <Input 
                  id="edit-category-name"
                  value={editingCategory.name}
                  onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                  autoFocus
                  className="h-[44px] rounded-[10px] text-[14px] px-3 border-neutral-300 focus-visible:ring-1 focus-visible:border-neutral-400 bg-neutral-0"
                />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className={`text-[14px] font-semibold ${editingCategory.active ? 'text-green-600' : 'text-neutral-500'}`}>
                  {editingCategory.active ? 'Активен' : 'Скрыт'}
                </span>
                <Toggle enabled={editingCategory.active} onChange={() => setEditingCategory({...editingCategory, active: !editingCategory.active})} />
              </div>
            </div>
          )}
          <DialogFooter className="bg-neutral-50 border-t border-neutral-200 px-6 py-4 -mx-6 -mb-6 mt-6 rounded-b-[20px] gap-2 sm:gap-3">
            <DialogClose asChild>
              <Button variant="outline" className="h-[44px] rounded-[10px] text-[14px] font-semibold px-5 border-neutral-300 bg-white">Отмена</Button>
            </DialogClose>
            <Button onClick={handleSaveCategory} className="h-[44px] rounded-[10px] text-[14px] font-semibold px-5 bg-neutral-900 hover:bg-neutral-800 text-white">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
