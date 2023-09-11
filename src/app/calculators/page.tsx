'use client'
import SideBarMenu from '@/components/SideBarMenu';
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [user, setUser] = useState<any>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    async function fetchData() {
      if (!token) {
        window.location.href = '/login';
      } else {
        try {
          const user = await getUserData({ email, token });
          setUser(user);
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      }
    }
    fetchData()
  }, [])
  
  return (
    <main className='md:flex'>
      <SideBarMenu user={user} />
      <section className="p-3 w-full">
        <div>
          <h3 className='mr-3 font-black text-2xl'>
            Calculators
          </h3>
          <p>Here you can make some accounting</p>
        </div>
       </section> 
    </main>
  )
}
