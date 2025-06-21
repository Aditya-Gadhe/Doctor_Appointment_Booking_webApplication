import { useState } from "react"
import { createContext } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const [docData,setDocData] = useState(false)

    const getAppointments = async ()=> {
        try {
            const {data} = await axios.get(backendURL + '/api/doctor/doctor-appointments',{headers:{dToken}})
            if(data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendURL + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if(data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendURL + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if(data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendURL + '/api/doctor/doctor-dashboard',{headers:{dToken}})
            if(data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDocData = async () => {
        try {
            const {data} = await axios.get(backendURL + '/api/doctor/doctor-profile',{headers:{dToken}})
            if(data.success) {
                setDocData(data.docData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    

    const value = {
        backendURL,
        dToken , setDToken,
        appointments , setAppointments ,
        getAppointments ,
        completeAppointment , cancelAppointment ,
        dashData, setDashData, getDashData ,
        getDocData , docData ,setDocData
    }
    return <DoctorContext.Provider value={value} >
        {props.children}
    </DoctorContext.Provider>
}

export default DoctorContextProvider