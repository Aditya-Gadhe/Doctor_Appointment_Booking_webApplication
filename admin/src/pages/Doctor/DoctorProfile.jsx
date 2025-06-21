import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { getDocData, docData, setDocData, dToken, backendURL } = useContext(DoctorContext)

  useEffect(() => {
    getDocData()
  }, [])

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateDoctorProfileData = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', docData.name)
      formData.append('experience', docData.experience)
      formData.append('fees', Number(docData.fees))
      formData.append('about', docData.about)
      formData.append('address', docData.address)
      formData.append('city', docData.city)
      image && formData.append('image', image)

      const { data } = await axios.post(backendURL + '/api/doctor/update-profile', formData, {
        headers: { dToken },
      })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    docData && (
      <div className="pl-4 pr-4 sm:pl-8 sm:pr-8 lg:pl-16 lg:pr-16 py-6 w-full max-w-5xl mx-auto">
        <div className='flex flex-col md:flex-row gap-6 items-start md:items-center'>
          <div className='relative'>
            {isEdit ? (
              <label htmlFor='image' className='cursor-pointer block'>
                <img
                  className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-full opacity-80'
                  src={image ? URL.createObjectURL(image) : docData.image}
                  alt='Doctor'
                />
                <div className='absolute bottom-0 right-0 p-1 bg-white rounded-full shadow'>
                  <img src={assets.upload_icon} className='w-6 h-6' alt='Upload Icon' />
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
              </label>
            ) : (
              <img className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-full' src={docData.image} alt='Doctor' />
            )}
          </div>
          <div className='flex-1 w-full'>
            <div className='flex justify-between items-start'>
              {isEdit ? (
                <input
                  className='text-3xl font-semibold w-full bg-gray-50 px-2 py-1 rounded'
                  type='text'
                  value={docData.name}
                  onChange={(e) => setDocData((prev) => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <p className='text-3xl font-semibold'>{docData.name}</p>
              )}
            </div>
            <p className='text-sm text-gray-500 mt-1'>{docData.email}</p>
          </div>
        </div>

        <hr className='my-6' />

        <div className='space-y-4'>
          <h2 className='text-lg font-semibold text-gray-700'>Contact Information</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm text-gray-600'>Address</label>
              {isEdit ? (
                <input
                  className='w-full bg-gray-100 p-2 rounded'
                  type='text'
                  value={docData.address}
                  onChange={(e) => setDocData((prev) => ({ ...prev, address: e.target.value }))}
                />
              ) : (
                <p className='text-gray-700'>{docData.address}</p>
              )}
            </div>
            <div>
              <label className='text-sm text-gray-600'>City</label>
              {isEdit ? (
                <input
                  className='w-full bg-gray-100 p-2 rounded'
                  type='text'
                  value={docData.city}
                  onChange={(e) => setDocData((prev) => ({ ...prev, city: e.target.value }))}
                />
              ) : (
                <p className='text-gray-700'>{docData.city}</p>
              )}
            </div>
          </div>
        </div>

        <div className='space-y-4 mt-6'>
          <h2 className='text-lg font-semibold text-gray-700'>Basic Information</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm text-gray-600'>Experience</label>
              {isEdit ? (
                <input
                  className='w-full bg-gray-100 p-2 rounded'
                  type='text'
                  value={docData.experience}
                  onChange={(e) => setDocData((prev) => ({ ...prev, experience: e.target.value }))}
                />
              ) : (
                <p className='text-blue-500'>{docData.experience}</p>
              )}
            </div>
            <div>
              <label className='text-sm text-gray-600'>Fees</label>
              {isEdit ? (
                <input
                  className='w-full bg-gray-100 p-2 rounded'
                  type='text'
                  value={docData.fees}
                  onChange={(e) => setDocData((prev) => ({ ...prev, fees: e.target.value }))}
                />
              ) : (
                <p className='text-gray-700'>{docData.fees}</p>
              )}
            </div>
            <div className='sm:col-span-2'>
              <label className='text-sm text-gray-600'>About</label>
              {isEdit ? (
                <textarea
                  className='w-full bg-gray-100 p-2 rounded resize-none h-24'
                  value={docData.about}
                  onChange={(e) => setDocData((prev) => ({ ...prev, about: e.target.value }))}
                />
              ) : (
                <p className='text-gray-700'>{docData.about}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Left-aligned Button */}
        <div className='mt-10'>
          {isEdit ? (
            <button
              disabled={loading}
              className={`px-6 py-2 rounded-full text-white transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
              }`}
              onClick={updateDoctorProfileData}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          ) : (
            <button
              className='px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all'
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  )
}

export default DoctorProfile
