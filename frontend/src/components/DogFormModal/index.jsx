import { useState, useEffect } from "react";
import axios from "axios";

export default function DogFormModal({isOpen, onClose, onSuccess, dogToEdit}) {
    const initialFormState = {
        nome: "",
        raca: "",
        data_nascimento: "",
        porte: "Médio",
        nome_tutor: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (dogToEdit) {
                setFormData({
                    nome: dogToEdit.nome,
                    raca: dogToEdit.raca,
                    data_nascimento: dogToEdit.data_data_nascimento,
                    porte: dogToEdit.porte,
                    nome_tutor: dogToEdit.nome_tutor || ""
                });
            } else {
                setFormData(initialFormState);
            }
        }
    }, [isOpen, dogToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (dogToEdit) {
                await axios.put(`http://127.0.0.1:8000/cachorros/${dogToEdit.id}`, formData);
                alert("Cachorro atualizado com sucesso!");
            } else {
                await axios.post("http://127.0.0.1:8000/cachorros", formData);
            alert("Cachorro cadastrado com sucesso!");
            }

            setFormData(initialFormState);
            onSuccess();
            onClose();

        } catch (error) {
            console.error("Erro ao salvar:", error);
            const acao = dogToEdit ? "atualizar" : "cadastrar"
            alert(`Erro ao ${acao}. Verifique o console`)
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const modalTitle = dogToEdit ? "Editar Cachorro" : "Novo Cachorro"
    const buttonText = loading ? 'Salvando...' : (dogToEdit ? "Atualizar" : "Salvar");

    return (
        <div className="fixed inset-0 bg-emerald-50/90 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md shadow-xl w-full max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{modalTitle}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Raça</label>
                        <input
                            type="text"
                            name="raca"
                            value={formData.raca}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento</label>
                        <input
                            type="date"
                            name="data_nascimento"
                            value={formData.data_nascimento}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Porte</label>
                        <select
                            name="porte"
                            value={formData.porte}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="Pequeno">Pequeno</option>
                            <option value="Médio">Médio</option>
                            <option value="Grande">Grande</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nome do tutor</label>
                        <input
                            type="text"
                            name="nome_tutor"
                            value={formData.nome_tutor}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 duration-300 cursor-pointer"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 duration-300 flex items-center cursor-pointer"
                            disabled={loading}
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};