'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch('http://localhost:3333/hi', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (token) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        })
        .catch(error => {
          console.error('Erro na verificação de autenticação:', error);
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  if (authenticated) {
    return <div>Usuário autenticado. Conteúdo protegido.</div>;
  }

  return <div>Desautorizado. Faça login para acessar.</div>;
}