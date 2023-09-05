  'use client'
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'
import SideBarMenu from '@/components/SideBarMenu';

  export default function Home() {
    const [user, setUser] = useState([])
    
    useEffect(() => {
      async function fetchData() {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
        } else {
          try {
            const user = await getUserData();
            setUser(user)
          } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
          }
        }
      }
      fetchData();
    }, [])
    console.log(user)
   
    return (
      <main>
        <SideBarMenu user={user}/>
      </main>
    )
  }
