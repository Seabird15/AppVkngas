import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { Alert } from './Alert'
import backgroundImg from '../assets/bgGrises.png'


export const Register = () => {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(user.email, user.password)
      navigate('/')

    } catch (error) {
      setError(error.message)

    }

  }

  return (

    <>
      <div className='relative bg-center bg-no-repeat bg-cover h-1/3 ' style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className='absolute inset-0 '></div>
        <div className='relative flex items-center justify-center min-h-screen'>
          <div className='w-full max-w-xs m-auto'>
            {/* Muestra el error imprimiendolo */}
            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">

              <div className='mb-4'>
                <label className='block my-2 text-sm font-bold text-gray-700' htmlFor="email">Email</label>
                <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="email" name="email" id="email" placeholder="Ingresa un correo"
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <label className='block my-2 text-sm font-bold text-gray-700' htmlFor="password">Password</label>
                <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' type="password" name="password" placeholder="Ingresa una contraseña" id="password"
                  onChange={handleChange}
                />
              </div>

              <p className='flex justify-between px-3 my-4 text-sm text-black'><Link to='/login'>¿Ya tienes una cuenta?</Link></p>
              <button className='px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'>Register</button>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

