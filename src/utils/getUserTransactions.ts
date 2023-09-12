
export async function getUserTransactions({email, token}: any) {
  try {
    const response = await fetch(`https://back-end-aplicacao-k3611chlj-lunatic02.vercel.app/transaction/${email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const transaction = await response.json();
      return transaction
    } else {
      console.error('Erro ao buscar transactions do usuário.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}