import { Transaction } from '@/@types/types';
import { MdOutlineAttachMoney } from 'react-icons/md'
import React from 'react'
import { get } from 'http';

interface DashboardPageProps {
  transactions: Transaction[];
  date: string
}


export default function DashboardPage({ transactions, date }: DashboardPageProps) {
  const getTotalAmount = () => {
    let total = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        total += transaction.amount;
      } else if (transaction.type === 'outcome') {
        total -= transaction.amount;
      }
    });
    return total;
  };
  
  const getTotalIncome = () => {
    let total = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        total += transaction.amount
      }
    });
    return total;
  }

  const getTotalOutcome = () => {
    let total = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === 'outcome') {
        total += transaction.amount
      }
    });
    return total;
  }

  const totalAmount = getTotalAmount();
  const totalAmountIncome = getTotalIncome()
  const totalAmountOutcome = getTotalOutcome()
  return (
    <section className='mt-5'>
      <div className='flex gap-5 flex-wrap justify-around'>
        <div className='border rounded-lg shadow-xl'>
          <div>
            <span className='flex items-center'>
              <h4 className='text-xl p-6 mr-20'>Current Balance</h4>
              <MdOutlineAttachMoney className='text-green-500 m-6' size={40} />
            </span>
            <div className='px-6 text-blue-500'>
              in the {date}
            </div>
            <h3 className='p-6 text-3xl'>$ {totalAmount}</h3>
          </div>
        </div>
        <div className='border rounded-lg shadow-xl'>
          <div>
            <span className='flex items-center'>
              <h4 className='text-xl p-6 mr-20'>Total Income</h4>
              <MdOutlineAttachMoney className='text-green-500 m-6' size={40} />
            </span>
            <div className='px-6 text-blue-500'>
            in the {date}
            </div>
            <h3 className='p-6 text-3xl'>$ {totalAmountIncome}</h3>
          </div>
        </div>
        <div className='border rounded-lg shadow-xl'>
          <div>
            <span className='flex items-center'>
              <h4 className='text-xl p-6 mr-20'>Total Expends</h4>
              <MdOutlineAttachMoney className='text-green-500 m-6' size={40} />
            </span>
            <div className='px-6 text-blue-500'>
              in the {date}
            </div>
            <h3 className='p-6 text-3xl'>$ -{totalAmountOutcome}</h3>
          </div>
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}
