import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.81 15.69 17.6V20.35H19.26C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12 23C14.97 23 17.46 22.02 19.26 20.35L15.69 17.6C14.71 18.26 13.46 18.66 12 18.66C9.17 18.66 6.76 16.75 5.91 14.18H2.23V17.03C4.03 20.61 7.7 23 12 23Z" fill="#34A853"/>
    <path d="M5.91 14.18C5.69 13.53 5.57 12.78 5.57 12C5.57 11.22 5.69 10.47 5.91 9.82V6.97H2.23C1.49 8.44 1.07 10.15 1.07 12C1.07 13.85 1.49 15.56 2.23 17.03L5.91 14.18Z" fill="#FBBC05"/>
    <path d="M12 5.34C13.62 5.34 15.07 5.9 16.21 6.99L19.34 3.86C17.46 2.11 14.97 1 12 1C7.7 1 4.03 3.39 2.23 6.97L5.91 9.82C6.76 7.25 9.17 5.34 12 5.34Z" fill="#EA4335"/>
  </svg>
)

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 p-4 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-xl border border-neutral-200 shadow-sm p-7 flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            Создайте аккаунт
          </h1>
          <p className="text-sm text-muted-foreground">
            Зарегистрируйтесь, чтобы начать продавать
          </p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="font-semibold text-neutral-800">Ваше имя</Label>
            <Input
              id="name"
              type="text"
              placeholder="Как вас зовут?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="font-semibold text-neutral-800">Номер телефона</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+996 (___) ___-___"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="font-semibold text-neutral-800">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Придумайте пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 mt-1">
          <Button
            onClick={() => navigate('/onboarding')}
            className="w-full"
          >
            Зарегистрироваться
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full"
          >
            <GoogleIcon />
            Регистрация через Google
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-2">
          Уже есть аккаунт?{' '}
          <button
            onClick={() => navigate('/login')}
            className="font-semibold text-neutral-900 hover:underline underline-offset-2 transition-all"
          >
            Войти
          </button>
        </p>

      </div>
    </div>
  )
}
