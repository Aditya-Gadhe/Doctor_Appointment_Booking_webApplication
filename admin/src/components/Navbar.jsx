import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/login')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
    <div className='z-50 sticky top-0 flex flex-wrap justify-between items-center px-4 sm:px-6 lg:px-10 py-3 border-b bg-white w-full z-20'>
      {/* Logo + Role */}
      <div className='flex items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-0'>
        <img
          className='w-32 sm:w-40 cursor-pointer'
          src={assets.admin_logo}
          alt='Admin Logo'
        />
        <p className='border px-2 py-0.5 rounded-full border-gray-500 text-gray-600 whitespace-nowrap'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className='bg-primary text-white text-xs sm:text-sm px-6 sm:px-8 lg:px-10 py-2 rounded-full transition hover:opacity-90'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
