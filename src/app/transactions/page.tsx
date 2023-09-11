'use client';
import { Transaction } from "@/@types/types";
import SideBarMenu from "@/components/SideBarMenu";
import { getUserData } from "@/utils/getUserData";
import { getUserTransactions } from "@/utils/getUserTransactions";
import { useEffect, useState, lazy, Suspense } from "react";

const TransactionsList = lazy(() => import("@/components/TransactionsList"));
const Loading = lazy(() => import("./loading"));

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
        setIsLoading(false); // Indica que a busca está completa
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    }

    fetchData();
    fetchUserTransactions();
  }, []);

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
              <Loading /> // Exibir o componente de Loading enquanto carrega
            ) : (
              <TransactionsList transactions={transactions} />
            )}
          </Suspense>
        </div>
      </section>
    </main>
  );
}
