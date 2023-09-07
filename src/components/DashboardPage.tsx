import { Transaction } from '@/@types/types';
import React from 'react'

interface DashboardPageProps {
  transactions: Transaction[];
}

export default function DashboardPage({transactions} : DashboardPageProps) {
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
  const getTotalIncome = ()=>{
    let total = 0;
    transactions.forEach((transaction) => {
      if(transaction.type === 'income'){
        total += transaction.amount
      }
    });
    return total;
  }
  const getTotalOutcome = ()=>{
    let total = 0;
    transactions.forEach((transaction) => {
      if(transaction.type === 'outcome'){
        total += transaction.amount
      }
    });
    return total;
  }

  const totalAmount = getTotalAmount();
  const totalAmountIncome = getTotalIncome();
  const totalAmountOutcome = getTotalOutcome()
  return (
    <section>
      <div className='sm:flex flex-wrap'>
        <div>
          {totalAmount}
        </div>
        <div>
        {totalAmountIncome}
        </div>
        <div>
        {totalAmountOutcome}
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}
