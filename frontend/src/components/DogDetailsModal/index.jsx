export default function DogDetailsModal({ isOpen, onClose, dog }) {
    if (!isOpen || !dog) return null;

    return (
        <div className="fixed inset-0 bg-emerald-50/90 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md shadow-xl w-full max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Ficha do Cachorro</h2>
                
                <div className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Nome</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.nome}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Raça</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.raca}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Data de Nascimento</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.data_nascimento}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Porte</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.porte}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Tutor</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.nome_tutor? (
                                dog.nome_tutor
                            ) : (
                                <span>Não informado</span>
                            )}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Contato</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.contato? (
                                dog.contato
                            ) : (
                                <span>Não informado</span>
                            )}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Castrado</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-lg">
                            {dog.castrado === null || dog.castrado === undefined ? (
                                <span className="text-base">Não informado</span>
                            ) : (
                                dog.castrado ? "Sim" : "Não"
                            )}
                        </p>
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">ID do Sistema</label>
                        <p className="w-full py-2 border-b border-gray-200 text-gray-900 text-sm">
                            #{dog.id}
                        </p>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 duration-300 flex items-center cursor-pointer shadow-md"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}