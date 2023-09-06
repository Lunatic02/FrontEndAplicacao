  'use client'
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'
import SideBarMenu from '@/components/SideBarMenu';
import { getUserTransactions } from '@/utils/getUserTransactions';
import { filterTransactionsByPeriod, last24Hours, last30Days, last7Days, lastYear, today } from '@/utils/filterTransactionsByPeriod';
import { Transaction } from '@/@types/types';


  export default function Home() {
    const [user, setUser] = useState<any>([])
    const [transactionsLast24Hours, setTransactionsLast24Hours] = useState<Transaction[]>([]);
    const [transactionsLast7Days, setTransactionsLast7Days] = useState<Transaction[]>([]);
    const [transactionsLast30Days, setTransactionsLast30Days] = useState<Transaction[]>([]);
    const [transactionsLastYear, setTransactionsLastYear] = useState<Transaction[]>([]);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
        const email = localStorage.getItem('email')
      async function fetchData() {
        
        if (!token) {
          window.location.href = '/login';
        } else {
          try {
            const user = await getUserData({email, token});
            setUser(user)
          } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
          }
        }
      }
      async function fetchUserTransactions() {
        try {
        const transactions = await getUserTransactions({email, token});
        const transactionsLast24Hours = filterTransactionsByPeriod(last24Hours, today, transactions);
        setTransactionsLast24Hours(transactionsLast24Hours);
        const transactionsLast7Days = filterTransactionsByPeriod(last7Days, today, transactions);
        setTransactionsLast7Days(transactionsLast7Days)
        const transactionsLast30Days = filterTransactionsByPeriod(last30Days, today, transactions);
        setTransactionsLast30Days(transactionsLast30Days)
        const transactionsLastYear = filterTransactionsByPeriod(lastYear, today, transactions);
        setTransactionsLastYear(transactionsLastYear)
          
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      }

      fetchData();
      fetchUserTransactions()
    }, [])

    return (
      <main className='flex'>
        <SideBarMenu user={user}/>
        <main  className='p-3'>
          <div>
            <h3 className='mr-3 font-black text-2xl'>
              Finances Dashboard
            </h3>
            <p>Welcome back, {user.name}</p>
          </div>
          <div>

          </div>
        </main>
      </main>
    )
  }
