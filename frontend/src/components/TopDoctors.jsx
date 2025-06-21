import React, { useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors,token} = useContext(AppContext)
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl fotn-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            {
                !token ?
                <p className='items-center m-auto text-2xl text-red-500'>⚠️ please login or create account to browse doctors</p>
                :
                doctors.length === 0 ?
                <p className='text-2xl text-red-500'>Sorry, we couldn’t find any doctors in your city.</p>
                :
                <div className='w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6 px-3 sm:px-0 '>                
                    {
                        doctors.slice(0,10).map((item,index)=>(
                            <div onClick={()=>{
                                navigate(`/appointment/${item._id}`);
                            }} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                                <img src={item.image} className='bg-blue-50' alt="" />
                                <div className='p-4'>
                                    {
                                        item.available ?
                                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                                            </div>
                                        :
                                            <div className='flex items-center gap-2 text-sm text-center text-gray-500'>
                                                <p className='w-2 h-2 bg-gray-500 rounded-full'></p><p>Not Available</p>
                                            </div>
                                    }
                                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                </div>
                            </div>

                        ))
                    }
                    
                </div>
            }
            <button onClick={()=>{
                navigate(`/doctors`);
                scrollTo(0,0);
            }} className='text-gray-800 px-12 py-3 bg-blue-50 rounded-full mt-10 hover:bg-black hover:text-white transition-all duration-600'>more</button>
        </div>
  )
}

export default TopDoctors