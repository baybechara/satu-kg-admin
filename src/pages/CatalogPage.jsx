import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

const initialProducts = [
  { id: '1', name: 'Блендер погружной BEKO BKK 3020 HB', price: 2884, active: true, image: 'https://img.freepik.com/free-photo/blender-isolated-on-white-background_1232-1547.jpg', stock: 24, category: 'Блендеры' },
  { id: '2', name: 'Утюг Beko SIM 4123 T', price: 2622, active: true, image: 'https://img.freepik.com/free-photo/iron-isolated-on-white-background_1232-1549.jpg', stock: 5, category: 'Утюги' },
  { id: '3', name: 'Утюг Beko SIM 4123 T', price: 2884, active: false, image: 'https://img.freepik.com/free-photo/iron-isolated-on-white-background_1232-1549.jpg', stock: 24, category: 'Утюги' },
]

const categories = [
  { id: 'all', label: 'Все товары' },
  { id: 'juicers', label: 'Соковыжималки' },
  { id: 'washers', label: 'Стиральные машины' },
  { id: 'irons', label: 'Утюги' },
  { id: 'blenders', label: 'Блендеры' },
]

function SortableRow({ product, toggleProductStatus }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`border-neutral-100 transition-colors hover:bg-neutral-50/50 ${isDragging ? 'opacity-50 bg-neutral-100 shadow-md' : ''}`}
    >
      {/* Drag handle */}
      <TableCell className="pl-4">
        <span
          {...attributes}
          {...listeners}
          className="material-symbols-rounded text-neutral-300 text-[18px] cursor-grab active:cursor-grabbing select-none hover:text-neutral-500 transition-colors outline-none block p-2 -m-2"
        >
          drag_indicator
        </span>
      </TableCell>

      {/* Name + image */}
      <TableCell className="max-w-[160px] sm:max-w-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] overflow-hidden border border-neutral-100 shrink-0 bg-neutral-50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[14px] font-semibold text-neutral-900 leading-tight whitespace-normal break-words">
            {product.name}
          </span>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell className="hidden sm:table-cell">
        <Badge variant="outline" className="text-[12px] font-medium text-neutral-600 border-neutral-200 rounded-[6px]">
          {product.category}
        </Badge>
      </TableCell>

      {/* Price */}
      <TableCell className="text-right text-[14px] font-semibold text-neutral-800 tabular-nums">
        {product.price.toLocaleString()} сом
      </TableCell>

      {/* Stock */}
      <TableCell className="text-right text-[14px] text-neutral-500 hidden sm:table-cell tabular-nums">
        {product.stock} шт.
      </TableCell>

      {/* Toggle */}
      <TableCell className="text-center">
        {/* onClick handler stops propagation to prevent drag conflicts on the switch */}
        <div onPointerDown={(e) => e.stopPropagation()}>
          <Toggle enabled={product.active} onChange={() => toggleProductStatus(product.id)} />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default function CatalogPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState(initialProducts)
  const [activeCategoryId, setActiveCategoryId] = useState('all')
  const [activeStatus, setActiveStatus] = useState('active')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required before drag starts to allow clicks to pass through
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over?.id && over) {
      setProducts((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const filteredProducts = products.filter(p => {
    const activeCat = categories.find(c => c.id === activeCategoryId)
    const matchesCategory = activeCat.id === 'all' || p.category === activeCat.label
    const matchesStatus = activeStatus === 'active' ? p.active : !p.active
    return matchesCategory && matchesStatus
  })

  const activeCount = products.filter(p => p.active).length
  const hiddenCount = products.filter(p => !p.active).length

  const toggleProductStatus = (id) => {
    const product = products.find(p => p.id === id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
    toast.success(product?.active ? 'Товар скрыт' : 'Товар активирован', {
      description: product?.name,
      duration: 2500,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">

      {/* FIXED Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[820px] bg-neutral-50">
        <header className="admin-header admin-container flex items-center justify-between">
          <div className="text-neutral-900 text-[24px] font-semibold font-['Open_Sans'] leading-none">Каталог</div>
          <Button
            variant="outline"
            onClick={() => navigate('/categories')}
            className="h-[38px] gap-2 text-[14px] font-semibold"
          >
            <span className="material-symbols-rounded text-[18px]">grid_view</span>
            Категории
          </Button>
        </header>
      </div>

      {/* Spacer */}
      <div className="h-[70px] w-full" />

      {/* Category Chips */}
      <div className="category-chips-container">
        <div className="flex gap-[8px] overflow-x-auto no-scrollbar admin-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`chip-base shrink-0 ${activeCategoryId === cat.id ? 'chip-active' : 'chip-inactive'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Tabs */}
      <div className="filter-status-container admin-container">
        <Tabs value={activeStatus} onValueChange={setActiveStatus} className="w-full">
          <TabsList className="h-auto bg-transparent gap-2 p-0">
            <TabsTrigger
              value="active"
              className="h-[36px] px-3.5 rounded-[8px] gap-2 text-[14px] font-semibold data-[state=active]:bg-neutral-900 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-neutral-500 hover:text-neutral-700 transition-all shadow-none"
            >
              Активно
              <Badge className={`text-[12px] px-1.5 py-0 h-5 font-semibold border-0 ${activeStatus === 'active' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {activeCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="hidden"
              className="h-[36px] px-3.5 rounded-[8px] gap-2 text-[14px] font-semibold data-[state=active]:bg-neutral-900 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-neutral-500 hover:text-neutral-700 transition-all shadow-none"
            >
              Отключено
              <Badge className={`text-[12px] px-1.5 py-0 h-5 font-semibold border-0 ${activeStatus === 'hidden' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                {hiddenCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <div className="admin-container mt-2 mb-[140px]">
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-200 hover:bg-transparent">
                  <TableHead className="w-[32px] pl-4" />
                  <TableHead className="text-[13px] font-semibold text-neutral-600">Товар</TableHead>
                  <TableHead className="text-[13px] font-semibold text-neutral-600 hidden sm:table-cell">Категория</TableHead>
                  <TableHead className="text-[13px] font-semibold text-neutral-600 text-right">Цена</TableHead>
                  <TableHead className="text-[13px] font-semibold text-neutral-600 text-right hidden sm:table-cell">Склад</TableHead>
                  <TableHead className="text-[13px] font-semibold text-neutral-600 text-center">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-16 text-neutral-400 text-[14px]">
                      В этом разделе пока нет товаров
                    </TableCell>
                  </TableRow>
                ) : (
                  <SortableContext 
                    items={filteredProducts.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredProducts.map((product) => (
                      <SortableRow 
                        key={product.id} 
                        product={product} 
                        toggleProductStatus={toggleProductStatus} 
                      />
                    ))}
                  </SortableContext>
                )}
              </TableBody>
            </Table>
          </DndContext>

          {/* Table footer */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100">
              <span className="text-[13px] text-neutral-400">
                {filteredProducts.length} товаров
              </span>
            </div>
          )}
        </div>
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
