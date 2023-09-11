import { useState } from 'react';
import { Transaction } from "@/@types/types";
import { deleteItem} from "@/utils/deleteItem";
import { formatDate } from "@/utils/formatDate";
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function TransactionsList({ transactions }: any) {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  transactions.sort((a: Transaction, b: Transaction) => {
    const dateA = new Date(a.expentAt).getTime();
    const dateB = new Date(b.expentAt).getTime();
    return dateB - dateA;
  });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const transactionsToDisplay = transactions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow-md rounded my-6 overflow-x-auto h-full">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left"></th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Type</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {transactionsToDisplay.map((transaction: Transaction) => {
            const formattedDate = formatDate(transaction.expentAt);
            const id = transaction.id;
            return (
              <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <span
                    className='hover:text-red-500 transition-all cursor-pointer'
                    onClick={() => {
                      toast.success(`${transaction.title}, deleted!`);
                      deleteItem({email, token, id})
                    }}>
                    <FaTrash />
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{transaction.title}</td>
                <td className="py-3 px-6 text-left">${transaction.amount}</td>
                <td className="py-3 px-6 text-left">{transaction.category}</td>
                <td className="py-3 px-6 text-left">{formattedDate}</td>
                {transaction.type === 'income' ? (
                  <td className="py-3 px-6 text-left text-green-500">{transaction.type}</td>
                ) : (
                  <td className="py-3 px-6 text-left text-red-500">{transaction.type}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <ul className="flex">
          {Array(Math.ceil(transactions.length / itemsPerPage))
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`cursor-pointer mx-1 ${currentPage === index + 1 ? 'text-blue-500 font-bold' : 'text-gray-500'
                  }`}
              >
                {index + 1}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
