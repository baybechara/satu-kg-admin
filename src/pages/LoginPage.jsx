import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'

export default function LoginPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F0F0F0]">
      <div className="max-w-[820px] w-full mx-auto bg-[#F8F8F8] min-h-screen flex flex-col justify-between auth-padding pt-14 pb-10 shadow-2xl">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-text-primary">Вход в Satu.KG</h1>
            <p className="text-[16px] text-text-disabled">Введите ваши данные, чтобы продолжить работу</p>
          </div>

          <div className="flex flex-col gap-6">
            <InputField 
              label="Номер телефона" 
              required 
              icon="call" 
              placeholder="Введите номер телефона" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <InputField 
                label="Пароль" 
                required 
                icon="lock" 
                type="password"
                placeholder="Введите пароль" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="text-[14px] font-semibold text-accent text-left w-fit hover:opacity-80 transition-opacity">
                Забыли пароль?
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-12">
          <Button variant="dark" onClick={() => navigate('/onboarding')}>
            Войти
          </Button>
          <div className="flex items-center justify-center gap-2 text-[15px]">
            <span className="text-text-disabled text-center">Ещё не зарегистрированы?</span>
            <button 
              onClick={() => navigate('/register')}
              className="font-bold text-text-primary hover:opacity-80 transition-opacity"
            >
              Создать аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
