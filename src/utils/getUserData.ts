const token = localStorage.getItem('token');
const email = localStorage.getItem('email')

export async function getUserData() {
  try {
    const response = await fetch(`http://localhost:3333/me/${email}`, {
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