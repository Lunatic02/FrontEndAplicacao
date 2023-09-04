'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //      if (token) {
  //         setAuthenticated(true);
  //        } else {
  //         setAuthenticated(false);
  //       }
  // }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function Login(e: any){
    e.preventDefault()
    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('email', email)
            localStorage.setItem('token', data.token);
            window.location.href = '/login';
        } else {
            alert('Falha no login. Verifique suas credenciais.');
        }
    })
    .catch(error => {
        console.error('Erro no login:', error);
        alert('Ocorreu um erro no login.');
    });
  }

  return (
    <main className='h-screen w-screen bg-zinc-200 sm:flex'>
      <div className='sm:w-1/2 sm:h-screen sm:bg-blue-500 sm:flex justify-center'>
        <div className='text-blue-500 sm:text-zinc-200 flex flex-col justify-center content-center'>
          <h1 className='bebas-font text-6xl md:text-8xl sm:text-left text-center mt-16 sm:mt-1'>PayGuardian</h1>
          <h3 className='text-4xl sm:text-left text-center mt-4 sm:mt-1'>
              Guarding Your Expenses,<br/>
              Ensuring Your Future
          </h3>
        </div>
      </div>
      <div className='flex items-center justify-center sm:w-1/2 sm:mt-0 mt-28 sm:h-screen content-center'>
        <div>
          <form onSubmit={Login} className='flex flex-col'>
            <input type="email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }} className='mb-3 w-80 md:w-96 h-12 rounded-lg border border-blue-500'/>
            <input type="password"
             onChange={(e)=>{
              setPassword(e.target.value)
            }} 
            className='mb-4 h-12 rounded-lg border border-blue-500'/>
            <button className='h-12 rounded-lg bg-blue-500 text-white text-lg'>LOGIN</button>
          </form>
          <div className='w-72 md:w-80 h-0.5 bg-gray-400 m-auto my-8' />
          <div className='flex justify-center'>
          <button className='h-12 w-64 rounded-lg bg-green-500 text-white text-lg'>REGISTER</button>
          </div>
        </div>
      </div>
    </main>
  )
}