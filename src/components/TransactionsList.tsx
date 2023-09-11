import { Transaction } from "@/@types/types"


export default function TransactionsList({ transactions }: any) {
  return (
    <div>
      {transactions.map((transaction: Transaction) => {
        return (
          <div key={transaction.id}>
            {transaction.title}
            {transaction.amount}
            {transaction.category}
          </div>
        )
      })}
    </div>
  )
}
