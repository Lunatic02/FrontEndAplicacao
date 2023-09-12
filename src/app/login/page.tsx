'use client'
import LeftSideRegister from '@/components/LeftSideRegister';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Login() {
  const [barelyAuthenticated, setBarelyAuthenticated] = useState(false);

  useEffect(() => {
    const barelyAuthenticated = localStorage.getItem('barelyAuthenticated');
       if (barelyAuthenticated) {
        setBarelyAuthenticated(true);
         } else {
          setBarelyAuthenticated(false);
        }

    const token = localStorage.getItem('token') 
    if(token){
      window.location.href = '/';
    }
  }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [wrongCredentials, setWrongCredentials] = useState(false)

  function Login(e: any){
    e.preventDefault()
    fetch('https://back-end-aplicacao-k3611chlj-lunatic02.vercel.app/login', {
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
            localStorage.removeItem('barelyAuthenticated')
            window.location.href = '/';
        } else {
          setWrongCredentials(true)
        }
    })
    .catch(error => {
        console.error('Erro no login:', error);
        setWrongCredentials(true)
    });
  }

  return (
    <main className='h-screen w-screen bg-zinc-200 sm:flex'>
     <LeftSideRegister />
      <div className='flex items-center justify-center sm:w-1/2 sm:mt-0 mt-28 sm:h-screen content-center'>
        <div>
          {barelyAuthenticated ? (
          <div className='text-center mb-4 text-lg text-zinc-900'>Login to confirm your credentials</div>
        ) : null}
          <form onSubmit={Login} className='flex flex-col'>
            <input type="email"
            placeholder='EMAIL'
            onChange={(e)=>{
              setEmail(e.target.value.toLowerCase())
              setWrongCredentials(false)
            }} className='mb-3 p-4 w-80 md:w-96 h-12 rounded-lg border border-blue-500'/>
            <input type="password"
            minLength={6}
             onChange={(e)=>{
              setPassword(e.target.value)
              setWrongCredentials(false)
            }} 
            placeholder='PASSWORD'
            className=' p-4 h-12 rounded-lg border border-blue-500'/>
            {wrongCredentials ? (
              <div className='text-red-500'>Wrong Credentials</div>
            ): null}
            <button className='mt-4 h-12 rounded-lg bg-blue-500 hover:bg-blue-600 hover:duration-100 text-white text-lg'>LOGIN</button>
          </form>
          <div className='w-72 md:w-80 h-0.5 bg-gray-400 m-auto my-8' />
          <div className='flex justify-center'>
          <Link href='/register'>
            <button className='h-12 w-64 rounded-lg bg-green-500 hover:bg-green-600 hover:duration-100 text-white text-lg'>
              Register
            </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}