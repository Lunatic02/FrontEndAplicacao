  'use client'
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'
import SideBarMenu from '@/components/SideBarMenu';
import { getUserTransactions } from '@/utils/getUserTransactions';
import { filterTransactionsByPeriod, last24Hours, last30Days, last7Days, lastYear, today } from '@/utils/filterTransactionsByPeriod';
import { Transaction } from '@/@types/types';
import TransactionsList from '@/components/TransactionsList';


  export default function Home() {
    const [user, setUser] = useState<any>([])
    const [transactionsLast24Hours, setTransactionsLast24Hours] = useState<Transaction[]>([]);
    const [transactionsLast24HoursActive, setTransactionsLast24HoursActive] = useState(false)
    const [transactionsLast7Days, setTransactionsLast7Days] = useState<Transaction[]>([]);
    const [transactionsLast7DaysActive, setTransactionsLast7DaysActive] = useState(false)
    const [transactionsLast30Days, setTransactionsLast30Days] = useState<Transaction[]>([]);
    const [transactionsLast30DaysActive, setTransactionsLast30DaysActive] = useState(false)
    const [transactionsLastYear, setTransactionsLastYear] = useState<Transaction[]>([]);
    const [transactionsLastYearActive, setTransactionsLastYearActive] = useState(false)

    
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
    let content;
    if(transactionsLast24HoursActive){
      content = <TransactionsList transactions={transactionsLast24Hours}/>
    }else if(transactionsLast30DaysActive){
      content = <TransactionsList transactions={transactionsLast30Days}/>
    }else if(transactionsLast7DaysActive){
      content = <TransactionsList transactions={transactionsLast7Days}/>
    } else{
      content = <TransactionsList transactions={transactionsLastYear}/>
    }

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
          <nav className='flex sm:mt-5'>
              <button className={transactionsLastYearActive ? `bg-blue-500 text-white sm:p-2 border rounded-l-lg` : `sm:p-2 border rounded-l-lg` }
              onClick={()=>{
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(true)
              }}>12 months</button>
              <button className={transactionsLast30DaysActive ? `bg-blue-500 text-white p-2 border ` : `p-2 border ` }
               onClick={()=>{
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(true)
                setTransactionsLastYearActive(false)
              }}>30 days</button>
              <button className={transactionsLast7DaysActive ? `bg-blue-500 text-white p-2 border ` : `p-2 border ` }
               onClick={()=>{
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(true)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(false)
              }}>7 days</button>
              <button className={transactionsLast24HoursActive ? `bg-blue-500 text-white p-2 border rounded-r-lg` : `p-2 border rounded-r-lg` }
               onClick={()=>{
                setTransactionsLast24HoursActive(true)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(false)
              }}>24 hours</button>
          </nav>
          {content}
        </main>
      </main>
    )
  }
