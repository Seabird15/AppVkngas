import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { Alert } from './Alert'
import backgroundImg from '../assets/bgGrises.png'


export const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { login, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(user.email, user.password)
      navigate('/')

    } catch (error) {
      setError(error.message)

    }

  }

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleResetPassword = async () => {
    if (!user.email) return setError('Por favor ingresa email');
    try {
      await resetPassword(user.email)
      setError('Te hemos enviado un email para restablecer la contraseña')
    } catch (error) {
      setError(error.message)
    }
  }

  return (

    <>
      <div className='relative bg-center bg-no-repeat bg-cover h-1/3 ' style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className='absolute inset-0 '></div>
        <div className='relative flex items-center justify-center min-h-screen'>
          <div className='w-full max-w-xs'>
            {/* Muestra el error imprimiéndolo */}
            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 bg-white rounded shadow-md">

              <div className='mb-4'>
                <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor="email">Correo</label>
                <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline focus:shadow-outline' type="email" name="email" id="email" placeholder="Ingresa tu correo"
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor="password">Contraseña</label>
                <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline focus:shadow-outline' type="password" name="password" placeholder="******" id="password"
                  onChange={handleChange}
                />
              </div>

              <div className='flex items-center justify-between mb-4'>
                <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'>Login</button>
                <a onClick={handleResetPassword} className='inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800' href="#">Olvidaste tu contraseña?</a>
              </div>
              <p className='flex justify-between px-3 text-sm text-black'><Link to='/register'>Registrate!</Link></p>
              <div className='flex p-2 rounded-md shadow-md'>

                <button className='cursor-pointer' onClick={handleGoogleSignin}>
                  Iniciar sesión con Google
                </button>
                <img src="https://i.ibb.co/f0C5z5g/pngwing-com.png" alt="" className='mx-auto' width='46' height='46' />

              </div>
            </form>


          </div>

        </div>
      </div>
    </>


  )

}
