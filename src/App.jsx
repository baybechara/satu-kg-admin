import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import CatalogPage from './pages/CatalogPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AddProductPage from './pages/AddProductPage'
import CategoriesPage from './pages/CategoriesPage'
import SplashScreen from './pages/SplashScreen'
import OrdersPage from './pages/OrdersPage'
import SettingsPage from './pages/SettingsPage'
import SharePage from './pages/SharePage'

function App() {
  return (
    <Routes>
      {/* Начальный экран - Сплеш */}
      <Route path="/" element={<SplashScreen />} />
      
      {/* Авторизация и Онбординг */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      
      {/* Админ-панель */}
      <Route element={<AdminLayout />}>
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="/share" element={<SharePage />} />
      </Route>

      {/* Редирект для всех остальных путей */}
      <Route path="*" element={<Navigate to="/catalog" replace />} />
    </Routes>
  )
}

export default App
