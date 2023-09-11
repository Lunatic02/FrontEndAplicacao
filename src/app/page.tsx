'use client'
import { getUserData } from '@/utils/getUserData';
import React, { useEffect, useState } from 'react'
import SideBarMenu from '@/components/SideBarMenu';
import { getUserTransactions } from '@/utils/getUserTransactions';
import { filterTransactionsByPeriod, last24Hours, last30Days, last7Days, lastYear, today } from '@/utils/filterTransactionsByPeriod';
import { Transaction } from '@/@types/types';
import DashboardPage from '@/components/DashboardPage';
import { AiFillCloseCircle } from 'react-icons/ai'
import { incomeCategories, outcomeCategories } from '@/utils/categories';


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

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [type, setType] = useState('income')
  const [category, setCategory] = useState('')
  

  const [modalOn, setModalOn] = useState(false)


  const RegisterNewTransaction = async (e: any) => {
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token');
    e.preventDefault()
    const response = await fetch(`http://localhost:3333/transaction/${email}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, amount, description, category, type }),
    }).then(response => response.json())
      .then(data => {
        if (data) {
          setModalOn(false)
          window.location.href = '/transactions';
        } else {
          alert('Error')
        }
      })

  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email')
    async function fetchData() {

      if (!token) {
        window.location.href = '/login';
      } else {
        try {
          const user = await getUserData({ email, token });
          setUser(user)
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      }
    }
    async function fetchUserTransactions() {
      try {
        const transactions = await getUserTransactions({ email, token });
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
  }, [modalOn])
  let content;
  if (transactionsLast24HoursActive && transactionsLastYear.length > 0) {
    content = <DashboardPage date='Last 24 Hours' transactions={transactionsLast24Hours} />
  } else if (transactionsLast30DaysActive && transactionsLastYear.length > 0) {
    content = <DashboardPage date='Last 30 Days' transactions={transactionsLast30Days} />
  } else if (transactionsLast7DaysActive && transactionsLastYear.length > 0) {
    content = <DashboardPage date='Last 7 Days' transactions={transactionsLast7Days} />
  } else if (transactionsLastYearActive && transactionsLastYear.length > 0) {
    content = <DashboardPage date='Last Year' transactions={transactionsLastYear} />
  } else {
    content = 'Você não possui Transactions adicione uma nova!'
  }

  let modalContent = null;
  if (modalOn) {
    modalContent = (
      <div className="relative">
        <div className="absolute  left-1/2 transform -translate-x-1/2">
          <div className='border rounded-lg bg-zinc-200 p-3'>
            <div className='flex justify-between py-3'>
              <h1 className='rounded-full text-lg text-zinc-900'>New Transaction</h1>
              <button onClick={() => { setModalOn(!modalOn) }}>
                <AiFillCloseCircle className='text-zinc-900' size={30} />
              </button>
            </div>
            <form onSubmit={RegisterNewTransaction} className='flex flex-wrap flex-col gap-3'>
              <div className='flex flex-wrap gap-3'>
                <input className='border rounded-lg  p-3' onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' required />
                <input type="number" onChange={(e) => setAmount(Number(e.target.value))} className='w-24 border rounded-lg  p-3' min="1" max="10000000" placeholder='Amount' required />
              </div>
              <div>
                <textarea onChange={(e) => setDescription(e.target.value)} className='border rounded-lg' className='w-full rounded-xl p-3' placeholder='Description' required />
              </div>
              <div className='flex flexl flex-wrap gap-3  '>
                <select className='border rounded-lg p-3 bg-zinc-900 text-white ' required>
                  <option onClick={() => setType('income')} value="income">income</option>
                  <option onClick={() => setType('outcome')} value="outcome">outcome</option>
                </select>
                <select className='border rounded-lg flex-1 p-3 bg-zinc-900 text-white '>
                  { type === 'income' ? incomeCategories.map((categoria, index) => (
                    <option onClick={()=> setCategory(categoria)} key={index} value={categoria}>
                      {categoria}
                    </option>
                  )) : outcomeCategories.map((categoria, index) => (
                    <option onClick={()=> setCategory(categoria)} key={index} value={categoria}>
                      {categoria}
                    </option>
                  ))
                  }
                </select>
              </div>
              <button className='p-3 text-white bg-zinc-900 rounded-lg'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else { null }



  return (
    <main className='md:flex'>
      <SideBarMenu user={user} />
      <main className='p-3 w-full'>
        <div>
          <h3 className='mr-3 font-black text-2xl'>
            Finances Dashboard
          </h3>
          <p>Welcome back, {user.name}</p>
        </div>
        <nav className='flex justify-between p-3 flex-wrap sm:mt-5'>
          <div>
            <button className={transactionsLastYearActive ? `bg-blue-500 text-white p-1 sm:p-2 border rounded-l-lg cursor-auto` : `p-1 sm:p-2 border rounded-l-lg hover:bg-blue-500 hover:text-white`}
              onClick={() => {
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(true)
              }}>12 months</button>
            <button className={transactionsLast30DaysActive ? `bg-blue-500 text-white p-1 sm:p-2 border cursor-auto` : `p-1 sm:p-2 border hover:bg-blue-500 hover:text-white`}
              onClick={() => {
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(true)
                setTransactionsLastYearActive(false)
              }}>30 days</button>
            <button className={transactionsLast7DaysActive ? `bg-blue-500 text-white p-1 sm:p-2 border cursor-auto` : `p-1 sm:p-2 border hover:bg-blue-500 hover:text-white`}
              onClick={() => {
                setTransactionsLast24HoursActive(false)
                setTransactionsLast7DaysActive(true)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(false)
              }}>7 days</button>
            <button className={transactionsLast24HoursActive ? `bg-blue-500 text-white p-1 sm:p-2 border rounded-r-lg cursor-auto` : `p-1 sm:p-2 border rounded-r-lg hover:bg-blue-500 hover:text-white`}
              onClick={() => {
                setTransactionsLast24HoursActive(true)
                setTransactionsLast7DaysActive(false)
                setTransactionsLast30DaysActive(false)
                setTransactionsLastYearActive(false)
              }}>24 hours</button>
          </div>
          <div>
            <button onClick={() => setModalOn(!modalOn)} className='p-1 sm:p-2 border rounded-lg hover:bg-blue-500 transition-all hover:text-white'>
              New Transaction
            </button>
          </div>
        </nav>
        {modalOn ? modalContent : null}
        {content}
      </main>
    </main>
  )
}
