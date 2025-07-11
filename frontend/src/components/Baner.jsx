import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Baner = () => {

  const {token} = useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 pt-10 sm:px-10 my-20 md:mx-10 '>
        {/* ----left side---- */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-14 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Book Appointment</p>
                <p className='mt-4'>with 100+ Trusted Doctors</p>
            </div>
            {
              !token &&
              <button onClick={()=>{
                navigate('/login');
                scrollTo(0,0);
              }} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-600 hover:bg-black hover:text-white'>Create account</button>
            }
        </div>
        {/* ----right side---- */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md z-1' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Baner