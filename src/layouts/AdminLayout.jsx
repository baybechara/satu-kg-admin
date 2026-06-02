import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-neutral-50/50 font-sans text-neutral-900">
      <div className="w-full max-w-[820px] mx-auto min-h-screen flex flex-col relative pb-[100px] px-4 sm:px-6">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
