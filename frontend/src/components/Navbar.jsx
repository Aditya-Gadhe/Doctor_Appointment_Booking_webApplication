import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const {token,setToken,userData} = useContext(AppContext)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/')
    }

    const [showMenu , setShowMenu] = useState(false);
    const goToProjectDoctorPanel = () => {
        window.open(`${process.env.VITE_ADMIN_URL}`, "_blank"); // or "_self" for same tab
    };

  return (

    
    <div className='sticky top-0 bg-white z-50 flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        
        <img onClick={()=>{navigate('/')}} src={assets.logo} alt="" className='w-44 cursor-pointer' />
        <ul className='hidden md:flex item-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1 animation'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1 animation'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1 animation'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1 animation'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to=''>
                <li className='animation px-2 py-0.8 text-base text-white bg-primary border rounded-full' onClick={goToProjectDoctorPanel}>Doctor Panel</li>
            </NavLink>
        </ul>
        <div className='flex item-center  gap-4'>
            {
                token && userData ?
                <div className='flex item-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' onClick={()=>{navigate('/my-profile')}} src={userData.image} alt="" />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block`}>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p className='hover:text-black cursor-pointer' onClick={()=>navigate('/my-profile')}>My Profile</p>
                            <p className='hover:text-black cursor-pointer' onClick={()=>navigate('/my-appointments')}>My Appointments</p>
                            <p className='hover:text-black cursor-pointer' onClick={logout}>Logout</p>
                        </div>
                    </div>
                </div> 
                : <button
                 onClick={()=>{
                    navigate('/login');
                }} 
                className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block font-semibold hover:scale-105 transition-all duration-300'>Create account</button>
            }


            <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            {/* ----mobile menu---- */}
            {showMenu && (
            <div>
                className="fixed inset-0 bg-black bg-opacity-40 z-10"
                onClick={() => setShowMenu(false)}
            </div>
            )}

            <div
            className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white z-20 shadow-lg transform transition-transform duration-300 ease-in-out 
                ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
            >
            <div className="flex items-center justify-between px-5 py-6">
                <img className="w-36" src={assets.logo} alt="Logo" />
                <img
                className="w-7 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close"
                />
            </div>

            <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
                <li>
                <NavLink onClick={() => setShowMenu(false)} to="/">
                    <p className='px-2 py-2'>Home</p>
                </NavLink>
                </li>
                <li>
                <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                    <p className='px-2 py-2'>All Doctors</p>
                </NavLink>
                </li>
                <li>
                <NavLink onClick={() => setShowMenu(false)} to="/about">
                    <p className='px-2 py-2'>About</p>
                </NavLink>
                </li>
                <li>
                <NavLink onClick={() => setShowMenu(false)} to="/contact">
                    <p className='px-2 py-2'>Contact</p>
                </NavLink>
                </li>
            </ul>
            </div>
        </div>
    </div>      
  )
}

export default Navbar