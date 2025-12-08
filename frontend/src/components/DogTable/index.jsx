export default function DogTable({ cachorros, onDelete, onEdit, onView }) {

    return (
        <div className="w-[95%] mx-auto mt-6 shadow-md rounded overflow-hidden">
            <table className="w-full">
                <thead className="text-center text-gray-800 bg-orange-100">
                    <tr>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Nome</th>
                        <th className="py-3 px-4">Raça</th>
                        <th className="py-3 px-4">Porte</th>
                        <th className="py-3 px-4">Ações</th>
                    </tr>
                    
                </thead>

                <tbody>
                    {cachorros.map((cachorro) => (
                        <tr key={cachorro.id} className="text-center bg-white text-gray-600 border-b border-gray-200 hover:bg-blue-200 duration-300">
                            <td className="py-3 px-4">#{cachorro.id}</td>
                            <td className="py-3 px-4">{cachorro.nome}</td>
                            <td className="py-3 px-4">{cachorro.raca}</td>
                            <td className="py-3 px-4">{cachorro.porte}</td>
                            <td className="py-3">
                                <i className="fa-solid fa-eye cursor-pointer"
                                onClick={() => onView(cachorro)}
                                title="Visualizar Detalhes"
                                ></i>
                                <i className="fa-solid fa-pen  mx-4 cursor-pointer"
                                onClick={() => onEdit(cachorro)}
                                ></i>
                                <i className="fa-solid fa-trash cursor-pointer"
                                onClick={() => onDelete(cachorro.id)}
                                ></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}