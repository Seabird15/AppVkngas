import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { Alert } from './Alert'

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
    <div className='w-full max-w-xs m-auto'>
      {/* Muestra el error imprimiendolo */}
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold my-2' htmlFor="email">Email</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" name="email" id="email" placeholder="youremail@company.ltd"
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold my-2' htmlFor="password">password</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" name="password" placeholder="******" id="password"
            onChange={handleChange}
          />
        </div>

        <p className='my-4 text-sm flex justify-between px-3 text-black'><Link to='/login'>Ya tienes una cuenta?</Link></p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Register</button>
      </form>
    </div>
  )
}
