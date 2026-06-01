import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-neutral-50/50 font-sans">
      <Outlet />
      <BottomNav />
    </div>
  )
}
