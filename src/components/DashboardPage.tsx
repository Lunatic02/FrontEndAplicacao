import { Transaction } from '@/@types/types';
import React from 'react'

interface DashboardPageProps {
  transactions: Transaction[];
}

export default function DashboardPage({transactions} : DashboardPageProps) {
  return (
    <div>{transactions.map((transaction)=>{
      return (
        <div key={transaction.id}>{transaction.title}</div>
      )
    })}</div>
  )
}
