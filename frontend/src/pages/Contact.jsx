import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
          <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
      <div className='flex flex-col justify-center gap-12 my-10 md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col items-start justify-center gap-5 text-gray-600'>
          <p className='text-gray-700 text-lg font-medium'>OUR OFFICE</p>
          <p>Pune</p>
          <p>Tel: +91&nbsp;&nbsp;9527089728 <br />
          Email: adityagadhe08@gmail.com</p>
          <p className='text-gray-700 text-lg font-medium'>CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <p>If you're a doctor and would like to register on our platform,<br />simply send your details to us at: <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJqVxJlXVgwsPnDfBppqpBTZMwNbGMhzrBbvDhQftLMnnJHmfpjpWLDjTZdcCbDbRrLQWGq" target='_blank' className='text-blue-400'>adityagadhe@gmail.com</a></p>
          <button className='border border-gray-700 px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>EXPLORE JOBS</button>
        </div>
      </div> 
    </div>
  )
}

export default Contact