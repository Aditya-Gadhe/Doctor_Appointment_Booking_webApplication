import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  // Shared sidebar item component
  const SidebarItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 py-3 px-4 hover:bg-[#f2f3ff] transition-all duration-200
        ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
      }
    >
      <img src={icon} alt={label} className='w-5 h-5' />
      <span className='hidden md:inline text-sm sm:text-base'>{label}</span>
    </NavLink>
  )

  return (
    <div className='fixed top-22 left-0 h-screen bg-white border-r w-16 md:w-60 xl:w-72 transition-all duration-300 overflow-hidden z-40'>
      {(aToken || dToken) && (
        <ul className='text-[#515151] mt-5 space-y-1'>
          {/* Admin Sidebar */}
          {aToken && (
            <>
              <SidebarItem to='/admin-dashboard' icon={assets.home_icon} label='Dashboard' />
              <SidebarItem to='/appointments' icon={assets.appointment_icon} label='Appointments' />
              <SidebarItem to='/add-doctor' icon={assets.add_icon} label='Add Doctor' />
              <SidebarItem to='/doctor-list' icon={assets.people_icon} label='Doctor List' />
            </>
          )}

          {/* Doctor Sidebar */}
          {dToken && (
            <>
              <SidebarItem to='/doctor-dashboard' icon={assets.home_icon} label='Dashboard' />
              <SidebarItem to='/doctor-appointments' icon={assets.appointment_icon} label='Appointments' />
              <li></li><SidebarItem to='/doctor-profile' icon={assets.people_icon} label='Profile' />
            </>
          )}
        </ul>
      )}
    </div>
  )
}

export default Sidebar
