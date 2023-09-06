
export async function getUserTransactions({email, token}: any) {
  try {
    const response = await fetch(`http://localhost:3333/transaction/${email}`, {
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