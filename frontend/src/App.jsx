import { useState, useEffect } from 'react'
import axios from 'axios'

import DogTable from './components/DogTable'
import CreateButton from './components/CreateButton'
import DogFormModal from './components/DogFormModal'

function App() {

  const [cachorros, setCachorros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDog, setEditingDog] = useState(null);

  const fetchCachorros = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/cachorros");
      setCachorros(response.data);
    } catch (error) {
      console.error("Erro ao buscar cachorror: ", error)
    }
  };

  useEffect(() => {
    fetchCachorros();
  }, []);

  const handleDelete = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir? Esta ação não poderá ser desfeita!");

    if (!confirmacao) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/cachorros/${id}`);

      alert("Cachorro excluído com sucesso!");

      fetchCachorros();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Houve um ero ao tentar excluir.")
    }
  }

  const handleOpenCreateModal = () => {
    setEditingDog(null);
    setIsModalOpen(true);
  }

  const handleEditClick = (dog) => {
    setEditingDog(dog);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDog(null);
  }
    
  
  return (
    <div className="min-h-screen bg-emerald-100 p-8">
        <div className="w-[90%] mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de cadastros</h1>
            
            <CreateButton onClick={handleOpenCreateModal} />
        </div>

        <DogTable 
          cachorros={cachorros} 
          onDelete={handleDelete} 
          onEdit={handleEditClick} 
        />

        <DogFormModal
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            onSuccess={fetchCachorros}
            dogToEdit={editingDog}
        />
    </div>
  )
}

export default App
