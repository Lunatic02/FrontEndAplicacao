  'use client'
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'
import SideBarMenu from '@/components/SideBarMenu';

  export default function Home() {
    const [user, setUser] = useState<any>([])
    
    useEffect(() => {
      async function fetchData() {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email')
        if (!token) {
          window.location.href = '/login';
        } else {
          try {
            const user = await getUserData({email, token});
            setUser(user)
          } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
          }
        }
      }
      fetchData();
    }, [])
   
    return (
      <main className='flex'>
        <SideBarMenu user={user}/>
        <main>
          <div className='p-3'>
            <h3 className='mr-3 font-black text-2xl'>
              Finances Dashboard
            </h3>
            <p>Welcome back, {user.name}</p>
          </div>
        </main>
      </main>
    )
  }
