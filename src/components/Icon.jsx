import { 
  ArrowLeft, LayoutGrid, Plus, X, GripVertical, Camera, Check, Store, Truck, 
  CreditCard, Gift, Info, Copy, Phone, Package, MessageSquare, ArrowUpRight, 
  Printer, HelpCircle, MapPinPlus, Link, Trash2, User, Lock, LogOut, 
  Trash, ChevronRight, Search, Menu, MoreVertical, Edit2
} from 'lucide-react'

const iconMap = {
  'arrow_back': ArrowLeft,
  'grid_view': LayoutGrid,
  'add': Plus,
  'close': X,
  'drag_indicator': GripVertical,
  'add_a_photo': Camera,
  'check': Check,
  'store': Store,
  'local_shipping': Truck,
  'payments': CreditCard,
  'redeem': Gift,
  'info': Info,
  'content_copy': Copy,
  'call': Phone,
  'inventory_2': Package,
  'chat': MessageSquare,
  'arrow_outward': ArrowUpRight,
  'print': Printer,
  'help': HelpCircle,
  'add_location_alt': MapPinPlus,
  'link': Link,
  'add_call': Phone,
  'delete': Trash2,
  'person': User,
  'lock': Lock,
  'logout': LogOut,
  'delete_forever': Trash,
  'chevron_right': ChevronRight,
  'search': Search,
  'menu': Menu,
  'more_vert': MoreVertical,
  'edit': Edit2
}

export default function Icon({ name, className, ...props }) {
  const LucideIcon = iconMap[name]
  if (!LucideIcon) {
    console.warn(`Icon ${name} not found in Icon.jsx`)
    return null
  }
  return <LucideIcon className={className} {...props} />
}
