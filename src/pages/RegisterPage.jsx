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
    <div className="min-h-screen flex flex-col items-center bg-[#F0F0F0]">
      <div className="max-w-[820px] w-full mx-auto bg-[#F8F8F8] min-h-screen flex flex-col justify-between auth-padding pt-14 pb-10 shadow-2xl">
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
          <div className="flex items-center justify-center gap-2 text-[15px]">
            <span className="text-text-disabled">Уже есть аккаунт?</span>
            <button 
              onClick={() => navigate('/login')}
              className="font-bold text-text-primary hover:opacity-80 transition-opacity"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
