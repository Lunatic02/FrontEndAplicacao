'use client'
import React from 'react'

export default function Home() {
  const token = localStorage.getItem('token')
  if(!token){
    window.location.href = '/login';
  }
  return (
    <button onClick={()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      window.location.href = '/login';
    }}>Logout</button>
  )
}
