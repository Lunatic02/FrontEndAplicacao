import Link from 'next/link'
import React, { useState } from 'react'
import { BiSolidReport, BiLogOut } from 'react-icons/bi'
import {GiArrowCursor, GiHamburgerMenu} from 'react-icons/gi'
import { BsHouseFill, BsCoin, BsFillCalculatorFill } from 'react-icons/bs'

interface SideBarMenuParams {
  user: {
    name: String,
    email: String,
  }
}

export default function SideBarMenu({ user }: SideBarMenuParams) {
  const [active, setActive] = useState(false)
  
  function Logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    window.location.href = '/login';
  }

  if(active){
   return(
    <div>
    <div className='h-screen w-60 bg-gray-100 p-3 flex flex-col border'>
      <div className='flex'>
        <h1 className='bebas-font text-xl md:text-3xl flex-1'>PayGuardian</h1> <button onClick={()=>setActive(!active)}><GiArrowCursor /></button>
      </div>
      <div className='flex-1'>
        <span className='flex items-center hover:bg-blue-500 hover:text-white my-4 p-1 rounded-md '>
          <i className='mr-3'><BsHouseFill size={24} /></i><Link href='/' className='text-xl'>Dashboard</Link>
        </span>
        <span className='flex items-center hover:bg-blue-500 hover:text-white my-4 p-1 rounded-md '>
          <i className='mr-3'><BiSolidReport size={24} /></i><Link href='/' className='text-xl'>Transactions</Link>
        </span>
        <span className='flex items-center hover:bg-blue-500 hover:text-white my-4 p-1 rounded-md '>
          <i className='mr-3'><BsCoin size={24} /></i><Link href='/' className='text-xl'>Cryptos</Link>
        </span>
        <span className='flex items-center hover:bg-blue-500 hover:text-white my-4 p-1 rounded-md '>
          <i className='mr-3'><BsFillCalculatorFill size={24} /></i><Link href='/' className='text-xl'>Calculators</Link>
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
    <div>
      <button onClick={()=>setActive(!active)}><GiHamburgerMenu /></button>
    </div>
  )
}
