import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {


  const {speciality} = useParams()
  const {doctors , token} = useContext(AppContext)
  const  [filterdoc,setFilterDoc] = useState([])
  const [showFilter,setShowFilter] = useState(false)
  const navigate = useNavigate();
  console.log(token)
  const applyFilter = ()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>
        doc.speciality === speciality
      ))

    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button onClick={()=>setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>filters</button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p onClick={()=>{ speciality==='General Physician' ? navigate('/doctors'): navigate('/doctors/General Physician')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General Physician' ? 'bg-indigo-100 text-black' : ''} animation`}>General Physician</p>
            <p onClick={()=>{ speciality==='Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist' ? 'bg-indigo-100 text-black' : ''} animation`}>Gynecologist</p>
            <p onClick={()=>{ speciality==='Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist' ? 'bg-indigo-100 text-black' : ''} animation`}>Dermatologist</p>
            <p onClick={()=>{ speciality==='Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians' ? 'bg-indigo-100 text-black' : ''} animation`}>Pediatricians</p>
            <p onClick={()=>{ speciality==='Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist' ? 'bg-indigo-100 text-black' : ''} animation`}>Neurologist</p>
            <p onClick={()=>{ speciality==='Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gastroenterologist' ? 'bg-indigo-100 text-black' : ''} animation`}>Gastroenterologist</p>
            <p onClick={()=>{ speciality==='Cardiologist' ? navigate('/doctors'): navigate('/doctors/Cardiologist')}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Cardiologist' ? 'bg-indigo-100 text-black' : ''} animation`}>Cardiologist</p>
          </div>
          {
            !token ?
              <p className='items-center m-auto text-2xl text-red-500'>⚠️ please login or create account to browse doctors</p>
            :
            filterdoc.length === 0 
              ?
              <p className='items-center m-auto text-2xl text-red-500'>⚠️ Important: <br /> No doctors found in your city at the moment. <br /> Please check again soon or try a different location.</p>
              :
          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
           {
              filterdoc.map((item,index)=>(
                    <div onClick={()=>{
                        navigate(`/appointment/${item._id}`);
                    }} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img src={item.image} className='bg-blue-50 object-cover' alt="" />
                        <div className='p-4'>
                            {item.available
                              ?
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
      </div>
      
    </div>
  )
}

export default Doctors