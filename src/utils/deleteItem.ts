
export async function deleteItem({email, token, id}: any) {
  try {
    const response = await fetch(`http://localhost:3333/transaction/${email}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user
    } else {
      console.error('Erro ao Deletar');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}