import { useState, useEffect } from 'react'
import axios from 'axios'

import DogTable from './components/DogTable'
import CreateButton from './components/CreateButton'
import DogForm from './components/DogForm'

function App() {

  const [cachorros, setCachorros] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
    
  
  return (
    <div className="min-h-screen bg-emerald-100 p-8">
        <div className="w-[90%] mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de cadastros</h1>
            
            <CreateButton onClick={handleOpenModal} />
        </div>

        <DogTable cachorros={cachorros} />

        <DogForm
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            onSuccess={fetchCachorros}
        />
    </div>
  )
}

export default App
