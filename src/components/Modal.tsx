export function Modal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Título do Modal</h2>
        <p>Conteúdo do seu modal aqui.</p>
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Fechar</button>
        </div>
      </div>
    </div>
  )
}
