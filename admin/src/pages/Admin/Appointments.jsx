import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets'

const Appointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)



  useEffect(() => {
    getAllAppointments()
  }, [aToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <p className='mb-4 text-2xl font-semibold text-gray-800'>All Appointments</p>

      <div className='bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>

        {/* Header Row (visible on sm and above) */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] bg-gray-100 py-3 px-6 border-b text-gray-700 font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.length === 0 ? (
          <p className='p-6 text-center text-gray-400'>No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-start sm:items-center py-4 px-4 sm:px-6 border-b hover:bg-gray-50 text-gray-600 gap-3 sm:gap-0'
            >
              {/* # */}
              <p className='font-medium'>{index + 1}</p>

              {/* Patient */}
              <div className='flex items-center gap-3 w-full'>
                <img
                  className='w-8 h-8 rounded-full object-cover border bg-gray-200'
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <p className='truncate'>{item.userData.name}</p>
              </div>

              {/* Age */}
              <p>{item.userData.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>

              {/* Date & Time */}
              <p className='text-sm text-gray-500'>{slotDateFormat(item.slotDate)} at {item.slotTime}</p>

              {/* Doctor */}
              <div className='flex items-center gap-3 w-full'>
                <img
                  className='w-8 h-8 rounded-full object-cover border bg-gray-200'
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <p className='truncate'>{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p className='text-green-600 font-medium'>{currency}{item.docData.fees}</p>

              {/* Actions */}
              {
                item.cancelled 
                ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Appointments
