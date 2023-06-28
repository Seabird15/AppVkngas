import { useAuth } from '../context/authContext'
import { uploadFile } from '../firebase'
import { useState } from 'react'
import { Eventos } from './Eventos'
import { FormEvents } from './FormEvents'
import { EditProfile } from './EditProfile'

import { BiLogOut } from "react-icons/bi";
import { StickyBar } from './StickyBar'



export const Home = () => {


  const { user, logout, loading } = useAuth()
  console.log(user)
  const [photoURL, setPhotoURL] = useState(user.photoURL || '');


  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)

    }
  }

  if (loading) return <h1>Loading</h1>

  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await uploadFile(file)
      console.log(result)
    } catch (error) {
      console.log(error)
      alert('Fallo interno, intente más tarde')
    }
  }


  return (
    <>
      <div className='w-full max-w-xs m-auto text-black md:max-w-4xl'>
        <div className=''>
          <div className='p-3 mb-5 border rounded-sm '>
            <h1 className='mb-4 text-center text-md'>Hola! {user.displayName || user.email} </h1>
            {user.photoURL && <img src={user.photoURL} alt="Profile" className="mx-auto rounded-full w-22 h-22" />}
            <div className='flex justify-center mt-2'>
              <EditProfile photoURL={photoURL} setPhotoURL={setPhotoURL} />
              <button className='px-4 py-2 text-white bg-red-300 rounded shadow-lg hover:bg-slate-300' onClick={handleLogout}>
                <BiLogOut />logout
              </button>
            </div>
          </div>
          {/* Subir archivos */}
          {/* <form onSubmit={handleSubmit}>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button className='px-4 py-2 text-black bg-green-200 rounded shadow-md hover:bg-green-300'>Subir</button>
        </form> */}

          {/* Eventos */}

          <div>
            <FormEvents />
            <Eventos />
          </div>

        </div>

      </div>
      <StickyBar />
    </>

  )
}

export default Home