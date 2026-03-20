import { Package } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-center items-center gap-4 px-2 py-4 bg-white shadow-sm border-b border-b-amber-50'>

            <div>
                <h1 className='text-center text-blue-500 font-bold text-2xl sm:text-2xl md:text-2xl  '>Parcel Tracking System</h1>
                <p className='text-center text-gray-400'>Track your shipments in real-time</p>
            </div>
           
        </div>
    )
}

export default Navbar
