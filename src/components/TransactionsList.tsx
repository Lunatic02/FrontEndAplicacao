import { Transaction } from "@/@types/types";
import { formatDate } from "@/utils/formatDate";

export default function TransactionsList({ transactions }: any) {
  transactions.sort((a: Transaction, b: Transaction) => {
    const dateA = new Date(a.expentAt).getTime();
    const dateB = new Date(b.expentAt).getTime();
    return dateB - dateA;
  });

  return (
    <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Type</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {transactions.map((transaction: Transaction) => {
            const formattedDate = formatDate(transaction.expentAt);
            return (
              <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{transaction.title}</td>
                <td className="py-3 px-6 text-left">{transaction.amount}</td>
                <td className="py-3 px-6 text-left">{transaction.category}</td>
                <td className="py-3 px-6 text-left">{formattedDate}</td>
                <td className="py-3 px-6 text-left">{transaction.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
