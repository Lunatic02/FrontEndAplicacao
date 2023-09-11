'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiSolidReport, BiLogOut } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { BsHouseFill, BsCoin, BsFillCalculatorFill } from 'react-icons/bs'

interface SideBarMenuParams {
  user: {
    name: String,
    email: String,
  }
}

export default function SideBarMenu({ user }: SideBarMenuParams) {
  function Logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    window.location.href = '/login';
  }
  const [active, setActive] = useState(true)

  const updateActiveState = () => {
    if (window.innerWidth < 640) { 
      setActive(false)
    } else {
      setActive(true)
    }
  }

  useEffect(() => {
    updateActiveState()
    window.addEventListener('resize', updateActiveState)
    return () => {
      window.removeEventListener('resize', updateActiveState)
    }
  }, [])

  if (active) {
    return (
      <div>
        <div className='absolute md:relative h-screen w-full sm:w-52  bg-gray-100 p-3 flex flex-col border'>
          <div className='flex'>
            <h1 className='bebas-font text-xl md:text-3xl flex-1'>PayGuardian</h1> <button className='md:hidden' onClick={() => setActive(!active)}><FaArrowAltCircleLeft size={20} /></button>
          </div>
          <div className='flex-1'>
            <span className='flex items-center hover:bg-blue-500 hover:text-white my-4 p-1 rounded-md '>
              <i className='mr-3'><BsHouseFill size={24} /></i><Link href='/' className='text-xl'>Dashboard</Link>
            </span>
            <span className='flex items-center hover:bg-blue-500 hover:text-white my-4 p-1 rounded-md '>
              <i className='mr-3'><BiSolidReport size={24} /></i><Link href='/transactions' className='text-xl'>Transactions</Link>
            </span>
          </div>
          <div>
            <div className='flex items-center border-t-2'>
              <h3 className='mr-3 font-black text-lg'>{user.name}</h3>
              <button onClick={Logout}><BiLogOut /></button>
            </div>
            <div className='text-sm'>
              {user.email}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <nav className='bg-gray-100'>
     <div className='flex flex-wrap justify-between p-3 text-zinc-950'>
     <button onClick={() => setActive(!active)}><GiHamburgerMenu size={20} /></button>
      <h1 className='bebas-font text-xl md:text-3xl'>PayGuardian</h1>
     </div>
    </nav>
  )
}
