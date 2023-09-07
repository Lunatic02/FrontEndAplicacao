import { Transaction } from '@/@types/types';
import React from 'react'

interface TransactionsListProps {
  transactions: Transaction[];
}

export default function TransactionsList({transactions} : TransactionsListProps) {
  return (
    <div>{transactions.map((transaction)=>{
      return (
        <div key={transaction.id}>{transaction.id}</div>
      )
    })}</div>
  )
}
