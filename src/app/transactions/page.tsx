'use client';
import { Transaction } from "@/@types/types";
import SideBarMenu from "@/components/SideBarMenu";
import { getUserData } from "@/utils/getUserData";
import { getUserTransactions } from "@/utils/getUserTransactions";
import { useEffect, useState, lazy, Suspense } from "react";
import Loading from "../loading";
import TransactionsList from "@/components/TransactionsList";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const [user, setUser] = useState<any>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDate, setFilterDate] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    async function fetchData() {
      if (!token) {
        window.location.href = '/login';
      } else {
        try {
          const user = await getUserData({ email, token });
          setUser(user);
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      }
    }

    async function fetchUserTransactions() {
      try {
        const transactions = await getUserTransactions({ email, token });
        setTransactions(transactions);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    }

    fetchData();
    fetchUserTransactions();
  }, [transactions]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const allCategories = Array.from(
    new Set(transactions.map((transaction: Transaction) => transaction.category))
  );

  const allDates = Array.from(
    new Set(transactions.map((transaction: Transaction) => formatDate(transaction.expentAt)))
  );

  function filterTransactions() {
    return transactions.filter((transaction: Transaction) => {
      const typeMatch = filterType === "all" || transaction.type === filterType;
      const categoryMatch = filterCategory === "all" || transaction.category === filterCategory;
      const dateMatch = filterDate === "all" || formatDate(transaction.expentAt) === filterDate;
      return typeMatch && categoryMatch && dateMatch;
    });
  }

  const filteredTransactions = filterTransactions();

  return (
    <main className='md:flex'>
      <SideBarMenu user={user} />
      <section className="p-3 w-full">
        <div>
          <h3 className='mr-3 font-black text-2xl'>
            Transactions
          </h3>
          <p>Here you can manage all your transactions</p>
        </div>
        <div className="mb-3 flex space-x-3">
          <div>
            <label htmlFor="filterType">Filter by Type: </label>
            <select
              className="p-1"
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterCategory">Category: </label>
            <select
              className="p-1"
              id="filterCategory"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterDate">Date: </label>
            <select
              className="p-1"
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Dates</option>
              {allDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Suspense fallback={<Loading />}>
            {isLoading ? (
              <Loading />
            ) : (
              <TransactionsList transactions={filteredTransactions} />
            )}
          </Suspense>
        </div>
        <div>
          <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        </div>
      </section>
    </main>
  );
}
