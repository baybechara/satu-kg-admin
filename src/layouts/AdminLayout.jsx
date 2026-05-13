import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-neutral-100">
      <div className="flex-1 max-w-[820px] w-full mx-auto bg-neutral-50 min-h-screen relative shadow-2xl">
        <Outlet />
        <BottomNav />
      </div>
    </div>
  )
}
