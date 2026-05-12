import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg' // Импортируем ваш логотип

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F0F0F0]">
      <div className="max-w-[820px] w-full mx-auto bg-white min-h-screen flex flex-col items-center justify-center relative shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="w-[180px] h-[180px] flex items-center justify-center">
            <img src={logo} alt="Satu.KG Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#F1F1F1] border-t-[#2D2D2D] rounded-full animate-spin"></div>
          <p className="text-[14px] text-[#8F8F8F] font-['Open_Sans']">Загрузка...</p>
        </div>
      </div>
    </div>
  )
}
