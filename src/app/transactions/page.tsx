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
        <div>
          <Suspense fallback={<Loading />}>
            {isLoading ? (
              <Loading />
            ) : (
              <TransactionsList transactions={transactions} />
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
