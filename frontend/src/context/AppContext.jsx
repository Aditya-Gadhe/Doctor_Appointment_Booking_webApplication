import { createContext } from "react";
import axios from "axios"
import { useState } from "react";
import {toast} from 'react-toastify'
import { useEffect } from "react";

export const AppContext = createContext()


const AppContextProvider = (props)=>{
    const currencySymbol = "₹"

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [doctors,setDoctors] = useState([])
    const [userData,setUserData] = useState(false)

    useEffect(() => {
    if (userData) {
        filterDoctorsByCity();
    }
    }, [userData]);

    const filterDoctorsByCity = () => {
        axios.get(backendURL + '/api/doctor/list')
            .then(res => {
            if (res.data.success) {
                const filtered = res.data.doctors.filter(
                doctor => doctor.city.toLowerCase() === userData.city.toLowerCase()
                );
                setDoctors(filtered);
            } else {
                toast.error(res.data.message);
            }
            })
            .catch(err => {
            console.log(err);
            toast.error(err.message);
            });
    };


    const loadUserProfileData = async ()=>{
        try {
            const {data} = await axios.get(backendURL + '/api/user/get-profile' , {headers:{token}})
            if(data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors , filterDoctorsByCity,
        currencySymbol,
        token , setToken ,
        backendURL ,
        userData , setUserData , loadUserProfileData
    }

    
    useEffect(()=>{
        if(token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    },[token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider