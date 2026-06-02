import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background animate-fade-in relative">
      <div className="flex flex-col items-center gap-6">
        <div className="w-[180px] h-[180px] flex items-center justify-center">
          <img src={logo} alt="Satu.KG Logo" className="w-full h-full object-contain" />
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground font-medium">Загрузка...</p>
      </div>
    </div>
  )
}
