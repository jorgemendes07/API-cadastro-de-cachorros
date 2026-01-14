import { useState, useEffect } from "react";
import axios from "axios";

export default function DogFormModal({isOpen, onClose, onSuccess, dogToEdit}) {
    const initialFormState = {
        nome: "",
        raca: "",
        data_nascimento: "",
        porte: "Médio",
        nome_tutor: "",
        contato: "",
        contato_2: "",
        endereco_tutor: "",
        castrado: null,
        vacina_antirrabica: "",
        vacina_polivalente: "",
        passeia: null,
        necessidades_em_casa: null,
        plano_de_saude: null,
        nome_plano_de_saude: "",
        contato_veterinario: "",
        endereco_clinica_veterinaria: "",
        contato_clinica_veterinaria_24_horas: "",
        endereco_clinica_veterinaria_24_horas: "",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (dogToEdit) {
                setFormData({
                    nome: dogToEdit.nome,
                    raca: dogToEdit.raca,
                    data_nascimento: dogToEdit.data_nascimento,
                    porte: dogToEdit.porte,
                    nome_tutor: dogToEdit.nome_tutor || "",
                    contato: dogToEdit.contato || "",
                    contato_3: dogToEdit.contato_2 || "",
                    endereco_tutor: dogToEdit.endereco_tutor || "",
                    castrado: dogToEdit.castrado ?? "",
                    vacina_antirrabica: dogToEdit.vacina_antirrabica || "",
                    vacina_polivalente: dogToEdit.vacina_polivalente || "",
                    passeia: dogToEdit.passeia ?? "",
                    necessidades_em_casa: dogToEdit.necessidades_em_casa ?? "",
                    plano_de_saude: dogToEdit.plano_de_saude ?? "",
                    nome_plano_de_saude: dogToEdit.nome_plano_de_saude || "",
                    contato_veterinario: dogToEdit.contato_veterinario || "",
                    endereco_clinica_veterinaria: dogToEdit.endereco_clinica_veterinaria || "",
                    contato_clinica_veterinaria_24_horas: dogToEdit.contato_clinica_veterinaria_24_horas || "",
                    endereco_clinica_veterinaria_24_horas: dogToEdit.endereco_clinica_veterinaria_24_horas || "",
                });
            } else {
                setFormData(initialFormState);
            }
        }
    }, [isOpen, dogToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === "castrado") {
            finalValue = value === "true"
        }

        if (name === "passeia") {
            finalValue = value === "true"
        }

        if (name === "necessidades_em_casa") {
            finalValue = value === "true"
        }

        if (name === "plano_de_saude") {
            finalValue = value === "true"
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: finalValue
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
        <div className="fixed inset-0 bg-emerald-50/90 overflow-y-auto w-full flex justify-center items-start py-8 z-50">
            <div className="bg-white p-8 rounded-md shadow-xl w-full max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{modalTitle}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Nome */}
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
                    
                    {/* Raça */}
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

                    {/* Data de nascimento */}
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

                    {/* Porte */}
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

                    {/* Nome do tutor */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nome do tutor</label>
                        <input
                            type="text"
                            name="nome_tutor"
                            value={formData.nome_tutor}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contato */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contato</label>
                        <input
                            type="text"
                            name="contato"
                            value={formData.contato}
                            placeholder="Preencha apenas com números"
                            maxLength={11}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contato 2*/}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contato 2</label>
                        <input
                            type="text"
                            name="contato_2"
                            value={formData.contato_2}
                            placeholder="Preencha apenas com números"
                            maxLength={11}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Endereço do tutor*/}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Endreço do tutor</label>
                        <textarea
                            name="endereco_tutor"
                            rows={2}
                            value={formData.endereco_tutor}
                            maxLength={255}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Castrado */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Castrado</label>
                        <div>
                            <input
                            type="radio"
                            name="castrado"
                            id="castrado_sim"
                            value="true"
                            checked={formData.castrado === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="castrado_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="castrado"
                            id="castrado_nao"
                            value="false"
                            checked={formData.castrado === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="castrado_nao">Não</label>
                        </div>
                    </div>

                    {/* Vacina antirrábica */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Data da ultima vacina antirrábica</label>
                        <input
                            type="date"
                            name="vacina_antirrabica"
                            value={formData.vacina_antirrabica}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Vacina polivalente */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Data da ultima vacina polivalente</label>
                        <input
                            type="date"
                            name="vacina_polivalente"
                            value={formData.vacina_polivalente}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Passeia */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet passeia?</label>
                        <div>
                            <input
                            type="radio"
                            name="passeia"
                            id="passeia_sim"
                            value="true"
                            checked={formData.passeia === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="passeia_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="passeia"
                            id="passeia_nao"
                            value="false"
                            checked={formData.passeia === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="passeia_nao">Não</label>
                        </div>
                    </div>

                    {/* Necessidades em casa */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet faz as necessidades em casa?</label>
                        <div>
                            <input
                            type="radio"
                            name="necessidades_em_casa"
                            id="necessidades_em_casa_sim"
                            value="true"
                            checked={formData.necessidades_em_casa === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="necessidades_em_casa_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="necessidades_em_casa"
                            id="necessidades_em_casa_nao"
                            value="false"
                            checked={formData.necessidades_em_casa === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="necessidades_em_casa_nao">Não</label>
                        </div>
                    </div>

                    {/* Plano de saude */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet possui plano de saúde?</label>
                        <div>
                            <input
                            type="radio"
                            name="plano_de_saude"
                            id="plano_de_saude_sim"
                            value="true"
                            checked={formData.plano_de_saude === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="plano_de_saude_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="plano_de_saude"
                            id="plano_de_saude_nao"
                            value="false"
                            checked={formData.plano_de_saude === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="plano_de_saude_nao">Não</label>
                        </div>

                        {formData.plano_de_saude === true && (
                            <div className="mt-2"> 
                                <input
                                    type="text"
                                    name="nome_plano_de_saude"
                                    value={formData.nome_plano_de_saude}
                                    onChange={handleChange}
                                    placeholder="Qual o nome do plano?"
                                    className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Contato veterinario*/}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contato do veterinário</label>
                        <input
                            type="text"
                            name="contato_veterinario"
                            value={formData.contato_veterinario}
                            placeholder="Preencha apenas com números"
                            maxLength={11}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Enderço da clínica veterinária*/}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Enderço da clínica veterinária</label>
                        <textarea
                            name="endereco_clinica_veterinaria"
                            rows={2}
                            value={formData.endereco_clinica_veterinaria}
                            maxLength={255}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contato clinica veterinária 24 horas */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contato da clínica veterinária 24h</label>
                        <input
                            type="text"
                            name="contato_clinica_veterinaria_24_horas"
                            value={formData.contato_clinica_veterinaria_24_horas}
                            placeholder="Preencha apenas com números"
                            maxLength={11}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Endereço da clínica veterinária 24 horas*/}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Endreço da clínica veterinária 24h</label>
                        <textarea
                            name="endereco_clinica_veterinaria_24_horas"
                            rows={2}
                            value={formData.endereco_clinica_veterinaria_24_horas}
                            maxLength={255}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Botão para fechar modal */}

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