'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(`http://localhost:3333/me/${email}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const user = await response.json();
          setUserName(user.name)
          console.log(userName);
        } else {
          console.error('Erro ao buscar dados do usuário.');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
    };
    
    fetching();
  }, [])
  
  
  

  return (
    <div className="w-full bg-zinc-900">
      <div className="flex justify-around text-white p-5">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          {token ? (
            <p>{userName}</p>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
