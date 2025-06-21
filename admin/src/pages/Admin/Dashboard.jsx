import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Users, CalendarDays, Stethoscope } from 'lucide-react' // Optional: install lucide-react

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      if (aToken) {
        setLoading(true)
        await getDashData()
        setLoading(false)
      }
    }
    fetch()
  }, [aToken])

  return dashData && (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Users className="text-blue-500 w-6 h-6 mb-2" />
          <p className="text-gray-500 text-sm">Total Patients</p>
          <p className="text-2xl font-semibold text-blue-700">{dashData.patients}</p>
        </div>
        <div className="bg-white shadow-md border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Stethoscope className="text-green-500 w-6 h-6 mb-2" />
          <p className="text-gray-500 text-sm">Total Doctors</p>
          <p className="text-2xl font-semibold text-green-700">{dashData.doctors}</p>
        </div>
        <div className="bg-white shadow-md border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <CalendarDays className="text-purple-500 w-6 h-6 mb-2" />
          <p className="text-gray-500 text-sm">Total Appointments</p>
          <p className="text-2xl font-semibold text-purple-700">{dashData.appointments}</p>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white border rounded-xl shadow-md overflow-hidden">
        <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">📅 Latest Appointments</h3>

        {loading ? (
          <p className="p-6 text-center text-gray-400">Loading...</p>
        ) : dashData.latestAppointments.length === 0 ? (
          <p className="p-6 text-center text-gray-400">No appointments found.</p>
        ) : (
          <div className="divide-y">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.userData.name}</p>
                    <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">{item.docData.name}</p>
                  <p className="text-green-600 font-medium">{currency}{item.docData.fees}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
