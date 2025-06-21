import React from 'react'
import { assets } from '../assets/assets'
import { Github,Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <div className='md:mx-10'>

        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ----left section---- */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Prescripto is a smart and simple platform to book doctor appointments online. Easily connect with qualified doctors, view profiles, check availability, and schedule visits — all in one place. Designed for fast access to healthcare, anytime, anywhere.</p>
            </div>

            {/* ----center section---- */}
            <div >
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* ----right section---- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9527089728</li>
                    <li><a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJqVxJlXVgwsPnDfBppqpBTZMwNbGMhzrBbvDhQftLMnnJHmfpjpWLDjTZdcCbDbRrLQWGq" target='_blank' className='text-blue-400'>adityagadhe@gmail.com</a></li>
                </ul>
            </div>
        </div>
        <hr />
        {/* ----copyright section---- */}
        <div className='flex justify-center gap-3 mt-5 text-gray-600 text-base font-semibold mb-5'>
            <p>copyright 2025@ aditya - All Right Reserved</p>  
            <a className='text-indigo-500' href="https://github.com/Aditya-Gadhe" target='_blank'><Github /></a>
            <a className='text-indigo-500' href="https://www.linkedin.com/in/aditya-gadhe-965459257" target='_blank'><Linkedin  /></a>
        </div>
    </div>
  )
}

export default Footer