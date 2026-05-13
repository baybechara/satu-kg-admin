import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center bg-neutral-100">
      <div className="max-w-[820px] w-full mx-auto bg-neutral-50 min-h-screen flex flex-col justify-between auth-padding pt-14 pb-10 shadow-2xl">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-text-primary">Регистрация</h1>
            <p className="text-[16px] text-text-disabled">Создайте аккаунт, чтобы начать продавать</p>
          </div>

          <div className="flex flex-col gap-6">
            <InputField 
              label="Ваше имя" 
              required 
              icon="person" 
              placeholder="Как вас зовут?" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField 
              label="Номер телефона" 
              required 
              icon="call" 
              placeholder="Введите номер телефона" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputField 
              label="Пароль" 
              required 
              icon="lock" 
              type="password"
              placeholder="Придумайте пароль" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-12">
          <Button variant="dark" onClick={() => navigate('/onboarding')}>
            Зарегистрироваться
          </Button>
          
          <Button variant="alt" className="flex items-center justify-center gap-3" onClick={() => {}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.81 15.69 17.6V20.35H19.26C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
              <path d="M12 23C14.97 23 17.46 22.02 19.26 20.35L15.69 17.6C14.71 18.26 13.46 18.66 12 18.66C9.17 18.66 6.76 16.75 5.91 14.18H2.23V17.03C4.03 20.61 7.7 23 12 23Z" fill="#34A853"/>
              <path d="M5.91 14.18C5.69 13.53 5.57 12.78 5.57 12C5.57 11.22 5.69 10.47 5.91 9.82V6.97H2.23C1.49 8.44 1.07 10.15 1.07 12C1.07 13.85 1.49 15.56 2.23 17.03L5.91 14.18Z" fill="#FBBC05"/>
              <path d="M12 5.34C13.62 5.34 15.07 5.9 16.21 6.99L19.34 3.86C17.46 2.11 14.97 1 12 1C7.7 1 4.03 3.39 2.23 6.97L5.91 9.82C6.76 7.25 9.17 5.34 12 5.34Z" fill="#EA4335"/>
            </svg>
            Регистрация через Google
          </Button>

          <div className="flex flex-col items-center justify-center gap-1 mt-6">
            <span className="text-neutral-500 text-[15px]">Уже есть аккаунт?</span>
            <button 
              onClick={() => navigate('/login')}
              className="font-semibold text-text-primary text-[15px] hover:opacity-80 transition-opacity"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
