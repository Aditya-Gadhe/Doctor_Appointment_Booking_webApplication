import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointments from './pages/Admin/Appointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ?
    (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <div className="ml-16 md:ml-60 xl:ml-72 w-full">
            <Routes>
              {aToken ? <Route path='/' element={<Dashboard />} /> : dToken ? <Route path='/' element={<DoctorDashboard />} /> : <></>}
              {/* Admin Routes */}
              <Route path='/admin-dashboard' element={<Dashboard />}/>
              <Route path='/appointments' element={<Appointments />}/>
              <Route path='/add-doctor' element={<AddDoctor />}/>
              <Route path='/doctor-list' element={<DoctorList />}/>
              {/* Doctor Routes */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
              <Route path='/doctor-appointments' element={<DoctorAppointment />}/>
              <Route path='/doctor-profile' element={<DoctorProfile />}/>
            </Routes>
          </div>
        </div>
      </div>
    ) : 
    (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App