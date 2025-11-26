import { useState, useEffect } from "react";
import axios from "axios";

export default function DogTable() {

    const [cachorros, setCachorros] = useState([]);

    useEffect(() => {
        const fetchCachorros = async () => {
            try {
                console.log("Buscando dados...");
                const response = await axios.get("http://127.0.0.1:8000/cachorros");

                setCachorros(response.data);
                console.log("Dados recebidos com sucesso!", response.data);
            } catch (error) {
                console.error("Erro ao buscar cachorros.", error);
                alert("Erro ao conectar com o servidor");
            }
        }

        fetchCachorros();
        
    }, []);

    return (
        <table className="w-[95%] mx-auto mt-6">
            <thead className="text-center  bg-gray-400">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Raça</th>
                <th className="py-3 px-4">Porte</th>
                <th className="py-3 px-4">Ações</th>
            </thead>

            {cachorros.map((cachorro) => (
                <tbody
                key={cachorro.id}
                className="text-center bg-white"
                >
                    <td className="py-3 px-4">{cachorro.nome}</td>
                    <td className="py-3 px-4">{cachorro.id}</td>
                    <td className="py-3 px-4">{cachorro.raca}</td>
                    <td className="py-3 px-4">{cachorro.porte}</td>
                    <td className="py-3">
                        <i className="fa-solid fa-eye cursor-pointer"></i>
                        <i className="fa-solid fa-pen  mx-4 cursor-pointer"></i>
                        <i className="fa-solid fa-trash cursor-pointer"></i>
                    </td>
                </tbody>
            ))}
                
        </table>
    )
}