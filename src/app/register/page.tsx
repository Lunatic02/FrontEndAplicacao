'use client'
import LeftSideRegister from "@/components/LeftSideRegister"
import { useState } from "react"

export default function Register() {

 
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false)

  function Register(e: any){
    e.preventDefault()
    fetch('http://localhost:3333/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
          localStorage.setItem('barelyAuthenticated', 'barelyAuthenticated')
           window.location.href = '/login';
        } else {
          setEmailAlreadyInUse(true)
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
          <form onSubmit={Register} className='flex flex-col'>
          <input type="string"
            placeholder="NAME"
            onChange={(e)=>{
              setName(e.target.value)
            }}
            className='mb-3 p-4 w-80 md:w-96 h-12 rounded-lg border border-blue-500'/>
            <input type="email"
            placeholder="EMAIL"
            onChange={(e)=>{
              setEmail(e.target.value.toLowerCase())
              setEmailAlreadyInUse(false)
            }}
            className='p-4 w-80 md:w-96 h-12 rounded-lg border border-blue-500'/>
            {emailAlreadyInUse ? (
              <div>Email Already in use</div>
            ): null}
            <input type="password"
            placeholder="PASSWORD"
            minLength={6}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className='mb-4 mt-3 p-4 h-12 rounded-lg border border-blue-500'/>
            <button className='h-12 rounded-lg bg-blue-500 hover:bg-blue-600 hover:duration-100 text-white text-lg'>REGISTER</button>
          </form>
          
        </div>
      </div>
    </main>
  )
}
