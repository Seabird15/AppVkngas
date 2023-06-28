import { Routes, Route } from 'react-router-dom'
import { Encuestas } from './component/Encuestas'
import { Home } from './component/Home'
import { Login } from './component/Login'
import { ProtectedRoute } from './component/ProtectedRoute'
import { Register } from './component/Register'
import { Wall } from './component/Wall'
import { AuthProvider } from './context/authContext'



function App() {
  return (
    <div className='h-screen bg-[#E9E9E9] '>
      <div className='loginBg'></div>
      <AuthProvider>
        <Routes>

          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } end />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/wall' element={
            <ProtectedRoute>
              <Wall />
            </ProtectedRoute>
          } end />
          <Route path='/encuesta' element={
            <ProtectedRoute>
              <Encuestas />
            </ProtectedRoute>
          } end />

        </Routes>
      </AuthProvider>

    </div>
  )
}

export default App