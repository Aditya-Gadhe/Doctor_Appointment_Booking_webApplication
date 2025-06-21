import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl mx-auto p-4'>
      <p className='mb-5 text-xl font-semibold text-gray-800'>🗓️ All Appointments</p>

      {/* Table for large screens */}
      <div className='hidden sm:block bg-white border rounded overflow-x-auto'>
        <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1fr] bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-600'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => (
            <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_1fr] items-center px-6 py-5 border-b text-sm'>
              <p>{index + 1}</p>

              <div className='flex items-center gap-3'>
                <img src={item.userData.image} alt='patient' className='w-9 h-9 rounded-full object-cover border' />
                <p>{item.userData.name}</p>
              </div>

              <p className={`font-medium ${item.payment ? 'text-green-600' : 'text-yellow-600'} `}>
                {item.payment ? 'Online' : 'Cash'}
              </p>

              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency}{item.amount}</p>

              {
                item.cancelled 
                ? <p className='text-red-500 font-medium'>Cancelled</p>
                : item.isCompleted
                  ?<p className='text-green-500 font-medium'>Completed</p>
                  : <div className='flex gap-3 justify-center lg:mr-12'>
                      <button onClick={()=>cancelAppointment(item._id)} title="Cancel" className='text-red-500 hover:text-red-600 transition'>
                        <FaTimesCircle size={20} />
                      </button>
                      <button onClick={()=>completeAppointment(item._id)} title="Complete" className='text-green-500 hover:text-green-600 transition'>
                        <FaCheckCircle size={20} />
                      </button>
                    </div>
              }
              
            </div>
          ))
        }
      </div>

      {/* Card layout for mobile */}
      <div className='sm:hidden flex flex-col gap-4'>
        {
          appointments.map((item, index) => (
            <div key={index} className='bg-white border rounded-lg p-4 shadow-sm'>
              <div className='flex items-center gap-3 mb-2'>
                <img src={item.userData.image} alt='user' className='w-10 h-10 rounded-full object-cover border' />
                <div>
                  <p className='font-medium text-gray-800'>{item.userData.name}</p>
                  <p className='text-xs text-gray-500'>Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              <p className='text-sm text-gray-600 mb-1'><span className='font-medium'>Date:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className='text-sm text-gray-600 mb-1'><span className='font-medium'>Payment:</span> {item.payment ? 'Online' : 'Cash'}</p>
              <p className='text-sm text-gray-600 mb-1'><span className='font-medium'>Fees:</span> {currency}{item.amount}</p>
              
              {
                item.cancelled 
                ? <p className='text-red-500 font-medium'>Cancelled</p>
                : item.isCompleted
                  ?<p className='text-green-500 font-medium'>Completed</p>
                  : <div className='flex justify-end gap-4 mt-3'>
                      <button onClick={()=>cancelAppointment(item._id)} title="Cancel" className='text-red-500 hover:text-red-600 transition'>
                        <FaTimesCircle size={20} />
                      </button>
                      <button onClick={()=>completeAppointment(item._id)} title="Complete" className='text-green-500 hover:text-green-600 transition'>
                        <FaCheckCircle size={20} />
                      </button>
                    </div>
              }
            
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointment
