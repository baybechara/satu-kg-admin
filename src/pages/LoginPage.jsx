import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 font-sans">
      <div className="w-full max-w-[400px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl shadow-xs p-6 sm:p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col gap-1.5 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Войдите в аккаунт
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Введите ваш email ниже, чтобы войти в аккаунт
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 border-zinc-200 bg-white focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300 dark:bg-zinc-950"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Пароль
              </Label>
              <button 
                type="button" 
                className="text-xs text-zinc-500 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                Забыли пароль?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 border-zinc-200 bg-white focus-visible:ring-zinc-950 dark:border-zinc-800 dark:focus-visible:ring-zinc-300 dark:bg-zinc-950"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => navigate('/onboarding')}
            className="w-full h-10 bg-zinc-950 hover:bg-zinc-900 text-white font-medium rounded-md shadow-xs transition-colors dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900"
          >
            Войти
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => {}}
            className="w-full h-10 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 font-medium rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-50"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.81 15.69 17.6V20.35H19.26C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.35L15.69 17.6C14.71 18.26 13.46 18.66 12 18.66C9.17 18.66 6.76 16.75 5.91 14.18H2.23V17.03C4.03 20.61 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.91 14.18C5.69 13.53 5.57 12.78 5.57 12C5.57 11.22 5.69 10.47 5.91 9.82V6.97H2.23C1.49 8.44 1.07 10.15 1.07 12C1.07 13.85 1.49 15.56 2.23 17.03L5.91 14.18Z" fill="#FBBC05"/>
              <path d="M12 5.34C13.62 5.34 15.07 5.9 16.21 6.99L19.34 3.86C17.46 2.11 14.97 1 12 1C7.7 1 4.03 3.39 2.23 6.97L5.91 9.82C6.76 7.25 9.17 5.34 12 5.34Z" fill="#EA4335"/>
            </svg>
            Войти через Google
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Нет аккаунта?{' '}
          <button 
            onClick={() => navigate('/register')}
            className="font-medium text-zinc-950 underline underline-offset-4 hover:text-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-200 transition-colors"
          >
            Зарегистрироваться
          </button>
        </div>

      </div>
    </div>
  )
}

