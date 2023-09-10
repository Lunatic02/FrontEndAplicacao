'use client'
import SideBarMenu from "@/components/SideBarMenu";
import { getUserData } from "@/utils/getUserData";
import { getUserTransactions } from "@/utils/getUserTransactions";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<any>([])
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email')
    async function fetchData() {

      if (!token) {
        window.location.href = '/login';
      } else {
        try {
          const user = await getUserData({ email, token });
          setUser(user)
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      }
    }
    async function fetchUserTransactions() {
      try {
        const transactions = await getUserTransactions({ email, token });
       
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    }
    fetchData();
    fetchUserTransactions()
  }, [])
  return (
    <main className='md:flex'>
      <SideBarMenu user={user} />
     </main> 
  )
}