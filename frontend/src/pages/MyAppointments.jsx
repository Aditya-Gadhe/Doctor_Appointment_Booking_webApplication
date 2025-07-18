import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const MyAppointment = () => {

  const {backendURL,token,getDoctorsData} = useContext(AppContext)

  const navigate = useNavigate()

  const [appointments,setAppointments] = useState([])
  const months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " +dateArray[2]
  }
  const getUserAppointments = async ()=>{
    try {
      
      const {data} = await axios.get(backendURL + '/api/user/appointments',{headers:{token}})
      if(data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURL + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      name : 'Appointment Payment',
      description : 'Appointment Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler : async (responce) =>{
        try {
          const {data} = await axios.post(backendURL + '/api/user/verifyRazorpay',responce,{headers:{token}})
          if(data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendURL + '/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if(data.success) {
        initPay(data.order)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div>
        <p className='pb-3 mt-12 text-xl font-medium text-zinc-700 border-b'>My Appointments</p>
        <div>
          {
            appointments.map((item,index)=>(
              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                <div>
                  <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semiboldd'>{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>
                  <p className='text-zinc-800 font-medium mt-1'>Address</p>
                  <p className='text-sm'>{item.docData.address}</p>
                  <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium mr-1'>Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                </div>
                  <div></div>
                  <div className='flex flex-col gap-2 justify-end'>
                    {!item.cancelled && item.isCompleted && <button className='sm:min-w-48 py-2 border rounded bg-green-500 text-stone-500 mb-9'>Completed</button>}
                    {!item.cancelled && !item.isCompleted && item.payment && <button className='sm:min-w-48 py-2 border rounded bg-green-500 text-stone-500'>Paid</button>}
                    {!item.cancelled && !item.isCompleted && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
                    {!item.cancelled && !item.isCompleted  && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500'>Cancel appointment</button>}
                    {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 mb-9'>Appointment Cancelled</button>}
                  </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default MyAppointment