import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors,aToken,getAllDoctors,changeAvailibility} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken) {
      getAllDoctors()
    }
  },[aToken])

  return (
      <div className='min-h-screen pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12  py-6 w-full bg-gray-50'>
        <div className='max-w-[1600px] mx-auto px-4'>
          <h1 className='text-xl font-semibold mb-6 text-center md:text-left'>All Doctors</h1>
          <div className='w-full flex flex-wrap justify-center xl:justify-start gap-4 pt-5 gap-y-6'>
          {
            doctors.map((item,index)=>(
              <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                <img className='w-56 h-56 object-cover bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm '>{item.speciality}</p>
                  <div className='mt-2 flex items-center gap-1 text-sm'>
                    <input onChange={()=> changeAvailibility(item._id)} type="checkbox" checked={item.available} />
                    <p>Available</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorList
