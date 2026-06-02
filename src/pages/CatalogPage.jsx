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
import Header from '../components/Header'
import { GripVertical, LayoutGrid, Plus } from 'lucide-react'
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
      className={`border-neutral-200 transition-colors bg-white ${isDragging ? 'opacity-70 bg-neutral-50 shadow-md ring-1 ring-neutral-200' : 'hover:bg-neutral-50/50'}`}
    >
      {/* Drag handle */}
      <TableCell className="pl-4 w-[40px]">
        <button
          {...attributes}
          {...listeners}
          className="text-neutral-400 cursor-grab active:cursor-grabbing select-none hover:text-neutral-600 transition-colors outline-none block p-2 -m-2"
        >
          <GripVertical className="w-5 h-5" />
        </button>
      </TableCell>

      {/* Name + image */}
      <TableCell className="max-w-[160px] sm:max-w-none py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] overflow-hidden border border-neutral-100 shrink-0 bg-neutral-50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[14px] font-medium text-neutral-900 leading-tight whitespace-normal break-words">
            {product.name}
          </span>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell className="hidden sm:table-cell py-3">
        <Badge variant="outline" className="text-[12px] font-medium text-neutral-600 border-neutral-200 bg-neutral-50/50 rounded-[6px]">
          {product.category}
        </Badge>
      </TableCell>

      {/* Price */}
      <TableCell className="text-right text-[14px] font-medium text-neutral-900 tabular-nums py-3">
        {product.price.toLocaleString()} сом
      </TableCell>

      {/* Stock */}
      <TableCell className="text-right text-[14px] text-neutral-500 hidden sm:table-cell tabular-nums py-3">
        {product.stock} шт.
      </TableCell>

      {/* Toggle */}
      <TableCell className="text-right pr-4 py-3">
        <div onPointerDown={(e) => e.stopPropagation()} className="inline-block">
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
        distance: 5,
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
    <>

      {/* Header */}
      <Header 
        title="Каталог" 
        rightNode={
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/categories')}
            className="h-8 gap-2 font-medium"
          >
            <LayoutGrid className="w-4 h-4" />
            Категории
          </Button>
        }
      />

      {/* Main Content */}
      <main className="flex-1 pt-6 pb-[140px] flex flex-col gap-6">
        
        {/* Category Chips */}
        <div className="w-[calc(100%+32px)] sm:w-[calc(100%+48px)] -ml-4 sm:-ml-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-1 after:content-[''] after:min-w-[1px] sm:after:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border shrink-0 h-8 px-3 ${
                  activeCategoryId === cat.id
                    ? 'bg-neutral-100 border-neutral-200 text-neutral-900'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Tabs */}
        <div>
          <Tabs value={activeStatus} onValueChange={setActiveStatus} className="w-full sm:w-auto inline-block">
            <TabsList className="h-11 bg-neutral-200/50 p-1 rounded-xl inline-flex gap-1">
              <TabsTrigger
                value="active"
                className="h-full px-4 rounded-lg gap-2 text-[14px] font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm data-[state=inactive]:text-neutral-500 hover:text-neutral-700 border-0"
              >
                Активно
                <span className={`text-[12px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 ${activeStatus === 'active' ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-200/50 text-neutral-500'}`}>
                  {activeCount}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="hidden"
                className="h-full px-4 rounded-lg gap-2 text-[14px] font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm data-[state=inactive]:text-neutral-500 hover:text-neutral-700 border-0"
              >
                Отключено
                <span className={`text-[12px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 ${activeStatus === 'hidden' ? 'bg-neutral-200 text-neutral-900' : 'bg-neutral-200/50 text-neutral-500'}`}>
                  {hiddenCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-200 hover:bg-transparent bg-neutral-50/50">
                  <TableHead className="w-[40px] pl-4" />
                  <TableHead className="text-[13px] font-medium text-neutral-500 h-10">Товар</TableHead>
                  <TableHead className="text-[13px] font-medium text-neutral-500 h-10 hidden sm:table-cell">Категория</TableHead>
                  <TableHead className="text-[13px] font-medium text-neutral-500 h-10 text-right">Цена</TableHead>
                  <TableHead className="text-[13px] font-medium text-neutral-500 h-10 text-right hidden sm:table-cell">Склад</TableHead>
                  <TableHead className="text-[13px] font-medium text-neutral-500 h-10 text-right pr-4">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-neutral-400 text-[14px]">
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
            <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 bg-neutral-50/50">
              <span className="text-[13px] text-neutral-500 font-medium">
                Всего товаров: {filteredProducts.length}
              </span>
            </div>
          )}
        </div>
      </main>

      {/* Floating Add Button */}
      <div className="fixed bottom-[84px] sm:bottom-[96px] left-0 w-full z-50 pointer-events-none flex justify-center">
        <div className="w-full max-w-[820px] px-4 sm:px-6 flex justify-end">
          <Button 
            onClick={() => navigate('/add-product')}
            className="h-[48px] px-6 rounded-full shadow-none bg-neutral-900 hover:bg-neutral-800 text-white gap-2 font-medium text-[14px] pointer-events-auto"
          >
            <Plus className="w-5 h-5" />
            Добавить товар
          </Button>
        </div>
      </div>

    </>
  )
}
