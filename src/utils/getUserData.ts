
export async function getUserData({email, token}: any) {
  try {
    const response = await fetch(`https://back-end-aplicacao-k3611chlj-lunatic02.vercel.app/me/${email}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user
    } else {
      console.error('Erro ao buscar dados do usuário.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
  }
}