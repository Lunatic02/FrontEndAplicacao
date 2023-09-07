  'use client'
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'
import SideBarMenu from '@/components/SideBarMenu';
import { getUserTransactions } from '@/utils/getUserTransactions';
import { filterTransactionsByPeriod, last24Hours, last30Days, last7Days, lastYear, today } from '@/utils/filterTransactionsByPeriod';
import { Transaction } from '@/@types/types';
import DashboardPage from '@/components/DashboardPage';


  export default function Home() {
    const [user, setUser] = useState<any>([])
    const [transactionsLast24Hours, setTransactionsLast24Hours] = useState<Transaction[]>([]);
    const [transactionsLast24HoursActive, setTransactionsLast24HoursActive] = useState(false)
    const [transactionsLast7Days, setTransactionsLast7Days] = useState<Transaction[]>([]);
    const [transactionsLast7DaysActive, setTransactionsLast7DaysActive] = useState(false)
    const [transactionsLast30Days, setTransactionsLast30Days] = useState<Transaction[]>([]);
    const [transactionsLast30DaysActive, setTransactionsLast30DaysActive] = useState(false)
    const [transactionsLastYear, setTransactionsLastYear] = useState<Transaction[]>([]);
    const [transactionsLastYearActive, setTransactionsLastYearActive] = useState(true)
    
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
    if(transactionsLast24HoursActive && transactionsLastYear.length > 0){
      content = <DashboardPage transactions={transactionsLast24Hours}/>
    }else if(transactionsLast30DaysActive && transactionsLastYear.length > 0){
      content = <DashboardPage transactions={transactionsLast30Days}/>
    }else if(transactionsLast7DaysActive && transactionsLastYear.length > 0){
      content = <DashboardPage transactions={transactionsLast7Days}/>
    } else if(transactionsLastYearActive && transactionsLastYear.length > 0){
      content = <DashboardPage transactions={transactionsLastYear}/>
    } else{
      content = 'Você não possui Transactions adicione uma nova!'
    }
    
    return (
      <main className='sm:flex'>
        <SideBarMenu user={user}/>
        <main  className='p-3'>
          <div>
            <h3 className='mr-3 font-black text-2xl'>
              Finances Dashboard
            </h3>
            <p>Welcome back, {user.name}</p>
          </div>
          <nav className='flex flex-wrap sm:mt-5'>
            <div>
              <button className={transactionsLastYearActive ? `bg-blue-500 text-white p-1 sm:p-2 border rounded-l-lg cursor-auto` :`p-1 sm:p-2 border rounded-l-lg hover:bg-blue-500 hover:text-white`  }
              onClick={()=>{
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(true)
              }}>12 months</button>
              <button className={transactionsLast30DaysActive ? `bg-blue-500 text-white p-1 sm:p-2 border cursor-auto` : `p-1 sm:p-2 border hover:bg-blue-500 hover:text-white`  }
               onClick={()=>{
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(true)
                setTransactionsLastYearActive(false)
              }}>30 days</button>
              <button className={transactionsLast7DaysActive ? `bg-blue-500 text-white p-1 sm:p-2 border cursor-auto` : `p-1 sm:p-2 border hover:bg-blue-500 hover:text-white` }
               onClick={()=>{
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(true)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(false)
              }}>7 days</button>
              <button className={transactionsLast24HoursActive ? `bg-blue-500 text-white p-1 sm:p-2 border rounded-r-lg cursor-auto` : `p-1 sm:p-2 border rounded-r-lg hover:bg-blue-500 hover:text-white` }
               onClick={()=>{
                setTransactionsLast24HoursActive(true)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(false)
              }}>24 hours</button>
              </div>
              
          </nav>
          {content}
        </main>
      </main>
    )
  }
