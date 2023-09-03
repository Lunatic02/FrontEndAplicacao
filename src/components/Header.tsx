'use client'
import { getUserData } from "@/utils/getUserData";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState([])

  useEffect(() => {
    async function fetching() {
      const usuario = await getUserData()
      setUser(usuario)
    }
    fetching()
  }, [])
  
  return (
    <div className="w-full bg-zinc-900">
      <div className="flex justify-around text-white p-5">
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          {token ? (
            <p>{user.name}</p>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
