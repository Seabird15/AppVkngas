import { Routes, Route } from 'react-router-dom'
import { Home } from './component/Home'
import { Login } from './component/Login'
import { ProtectedRoute } from './component/ProtectedRoute'
import { Register } from './component/Register'
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
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App