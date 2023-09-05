  'use client'
  import React, { useEffect } from 'react'

  export default function Home() {
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
      }
    }, []);
    return (
      <button onClick={()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        window.location.href = '/login';
      }}>Logout</button>
    )
  }
