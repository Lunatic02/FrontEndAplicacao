'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LeftSideRegister from './components/LeftSideRegister';

export default function Home() {
  const [barelyAuthenticated, setBarelyAuthenticated] = useState(false);

  useEffect(() => {
    const barelyAuthenticated = localStorage.getItem('barelyAuthenticated');
       if (barelyAuthenticated) {
        setBarelyAuthenticated(true);
         } else {
          setBarelyAuthenticated(false);
        }
  }, []);

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
            localStorage.removeItem('barelyAuthenticated')
            window.location.href = '/home';
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
              setEmail(e.target.value)
            }} className='mb-3 p-4 w-80 md:w-96 h-12 rounded-lg border border-blue-500'/>
            <input type="password"
             onChange={(e)=>{
              setPassword(e.target.value)
            }} 
            placeholder='PASSWORD'
            className='mb-4 p-4 h-12 rounded-lg border border-blue-500'/>
            <button className='h-12 rounded-lg bg-blue-500 text-white text-lg'>LOGIN</button>
          </form>
          <div className='w-72 md:w-80 h-0.5 bg-gray-400 m-auto my-8' />
          <div className='flex justify-center'>
          <button className='h-12 w-64 rounded-lg bg-green-500 text-white text-lg'>
            <Link href='/register'>REGISTER</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}