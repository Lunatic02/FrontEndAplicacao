'use client'

import { useState } from "react"

export default function Page() {
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
            window.location.href = '/';
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
    <form action="" onSubmit={Login}>
      <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="border-black border"/>
      <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="border-black border"/>
      <button className="border-black border">Enviar</button>
    </form>
  )
}
