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
        restricao_alimentar: null,
        descricao_restricao_alimentar: "",
        horario_alimentacao_manha: "",
        porcao_alimentacao_manha: "",
        horario_alimentacao_tarde: "",
        porcao_alimentacao_tarde: "",
        horario_alimentacao_noite: "",
        porcao_alimentacao_noite: "",
        restricao_medica: null,
        descricao_restricao_medica: "",
        utiliza_medicacao: null,
        descricao_utiliza_medicacao: "",
        comportamento: "",
        medo: "",
        relacionamento_com_outros_animais: "",
        relacionamento_com_pessoas: "",
        dependente: null,
        experiencia_com_hospedagem: null,
        descricao_experiencia_com_hospedagem: "",
        posse_alimento: null,
        posse_objeto: null,
        descricao_posse_objeto: "",
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
                    restricao_alimentar: dogToEdit.restricao_alimentar ?? "",
                    descricao_restricao_alimentar: dogToEdit.descricao_restricao_alimentar || "",
                    horario_alimentacao_manha: dogToEdit.horario_alimentacao_manha || "",
                    porcao_alimentacao_manha: dogToEdit.porcao_alimentacao_manha || "",
                    horario_alimentacao_tarde: dogToEdit.horario_alimentacao_tarde || "",
                    porcao_alimentacao_tarde: dogToEdit.porcao_alimentacao_tarde || "",
                    horario_alimentacao_noite: dogToEdit.horario_alimentacao_noite || "",
                    porcao_alimentacao_noite: dogToEdit.porcao_alimentacao_noite || "",
                    restricao_medica: dogToEdit.restricao_medica ?? "",
                    descricao_restricao_medica: dogToEdit.descricao_restricao_medica || "",
                    utiliza_medicacao: dogToEdit.utiliza_medicacao ?? "",
                    descricao_utiliza_medicacao: dogToEdit.descricao_utiliza_medicacao || "",
                    comportamento: dogToEdit.comportamento || "",
                    medo: dogToEdit.medo ?? "",
                    relacionamento_com_outros_animais: dogToEdit.relacionamento_com_outros_animais || "",
                    relacionamento_com_pessoas: dogToEdit.relacionamento_com_pessoas || "",
                    dependente: dogToEdit.dependente ?? "",
                    experiencia_com_hospedagem: dogToEdit.experiencia_com_hospedagem ?? "",
                    descricao_experiencia_com_hospedagem: dogToEdit.descricao_experiencia_com_hospedagem || "",
                    posse_alimento: dogToEdit.posse_alimento ?? "",
                    posse_objeto: dogToEdit.posse_objeto ?? "",
                    descricao_posse_objeto: dogToEdit.descricao_posse_objeto || "",
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

        if (name === "restricao_alimentar") {
            finalValue = value === "true"
        }

        if (name === "restricao_medica") {
            finalValue = value === "true"
        }

        if (name === "utiliza_medicacao") {
            finalValue = value === "true"
        }

        if (name === "dependente") {
            finalValue = value === "true"
        }

        if (name === "experiencia_com_hospedagem") {
            finalValue = value === "true"
        }

        if (name === "posse_alimento") {
            finalValue = value === "true"
        }

        if (name === "posse_objeto") {
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

                    {/* Restrição alimentar */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet possui alguma restrição alimentar?</label>
                        <div>
                            <input
                            type="radio"
                            name="restricao_alimentar"
                            id="restricao_alimentar_sim"
                            value="true"
                            checked={formData.restricao_alimentar === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="restricao_alimentar_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="restricao_alimentar"
                            id="restricao_alimentar_nao"
                            value="false"
                            checked={formData.restricao_alimentar === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="restricao_alimentar_nao">Não</label>
                        </div>

                        {formData.restricao_alimentar === true && (
                            <div className="mt-2"> 
                                <textarea
                                    name="descricao_restricao_alimentar"
                                    rows={2}
                                    maxLength={255}
                                    value={formData.descricao_restricao_alimentar}
                                    onChange={handleChange}
                                    placeholder="Quais restrições alimentares?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Horário alimentação manhã */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Horário da alimentação da manhã</label>
                        <input
                            type="text"
                            name="horario_alimentacao_manha"
                            maxLength={50}
                            value={formData.horario_alimentacao_manha}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Porção alimentação manhã */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Porção da alimentação da manhã</label>
                        <input
                            type="text"
                            name="porcao_alimentacao_manha"
                            maxLength={100}
                            value={formData.porcao_alimentacao_manha}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Horário alimentação tarde */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Horário da alimentação da tarde</label>
                        <input
                            type="text"
                            name="horario_alimentacao_tarde"
                            maxLength={50}
                            value={formData.horario_alimentacao_tarde}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Porção alimentação tarde */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Porção da alimentação da tarde</label>
                        <input
                            type="text"
                            name="porcao_alimentacao_tarde"
                            maxLength={100}
                            value={formData.porcao_alimentacao_tarde}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Horário alimentação noite */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Horário da alimentação da noite</label>
                        <input
                            type="text"
                            name="horario_alimentacao_noite"
                            maxLength={50}
                            value={formData.horario_alimentacao_noite}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Porção alimentação noite */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Porção da alimentação da noite</label>
                        <input
                            type="text"
                            name="porcao_alimentacao_noite"
                            maxLength={100}
                            value={formData.porcao_alimentacao_noite}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Restrição de saude */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet possui alguma restrição de saúde que influencia na rotina do animal?</label>
                        <div>
                            <input
                            type="radio"
                            name="restricao_medica"
                            id="restricao_medica_sim"
                            value="true"
                            checked={formData.restricao_medica === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="restricao_medica_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="restricao_medica"
                            id="restricao_medica_nao"
                            value="false"
                            checked={formData.restricao_medica === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="restricao_medica_nao">Não</label>
                        </div>

                        {formData.restricao_medica === true && (
                            <div className="mt-2"> 
                                <textarea
                                    name="descricao_restricao_medica"
                                    rows={2}
                                    maxLength={255}
                                    value={formData.descricao_restricao_medica}
                                    onChange={handleChange}
                                    placeholder="Quais restrições de saúde?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Uso de medicamento */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet faz uso de alguma medicação?</label>
                        <div>
                            <input
                            type="radio"
                            name="utiliza_medicacao"
                            id="utiliza_medicacao_sim"
                            value="true"
                            checked={formData.utiliza_medicacao === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="utiliza_medicacao_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="utiliza_medicacao"
                            id="utiliza_medicacao_nao"
                            value="false"
                            checked={formData.utiliza_medicacao === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="utiliza_medicacao_nao">Não</label>
                        </div>

                        {formData.utiliza_medicacao === true && (
                            <div className="mt-2"> 
                                <textarea
                                    name="descricao_utiliza_medicacao"
                                    rows={2}
                                    maxLength={500}
                                    value={formData.descricao_utiliza_medicacao}
                                    onChange={handleChange}
                                    placeholder="Quais medicações e quais horários?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* comportamento */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Como é o comportamento do seu pet?</label>
                        <textarea
                            rows={2}
                            name="comportamento"
                            maxLength={1000}
                            value={formData.comportamento}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* medo */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet tem medo de alguma coisa?</label>
                        <textarea
                            rows={2}
                            name="medo"
                            maxLength={1000}
                            value={formData.medo}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* relacionamento com outros animais */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Como o seu pet se relaciona com outros animais?</label>
                        <textarea
                            rows={2}
                            name="relacionamento_com_outros_animais"
                            maxLength={1000}
                            value={formData.relacionamento_com_outros_animais}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* relacionamento com outras pessoas */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Como o seu pet se relaciona com novas pessoas?</label>
                        <textarea
                            rows={2}
                            name="relacionamento_com_pessoas"
                            maxLength={1000}
                            value={formData.relacionamento_com_pessoas}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* dependência */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet é dependente de você?</label>
                        <div>
                            <input
                            type="radio"
                            name="dependente"
                            id="dependente_sim"
                            value="true"
                            checked={formData.dependente === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="dependente_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="dependente"
                            id="dependente_nao"
                            value="false"
                            checked={formData.dependente === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="dependente_nao">Não</label>
                        </div>
                    </div>

                    {/* Experiência com hospedagem */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet já frequentou creche, hotel ou doghero?</label>
                        <div>
                            <input
                            type="radio"
                            name="experiencia_com_hospedagem"
                            id="experiencia_com_hospedagem_sim"
                            value="true"
                            checked={formData.experiencia_com_hospedagem === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="experiencia_com_hospedagem_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="experiencia_com_hospedagem"
                            id="experiencia_com_hospedagem_nao"
                            value="false"
                            checked={formData.experiencia_com_hospedagem === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="experiencia_com_hospedagem_nao">Não</label>
                        </div>

                        {formData.experiencia_com_hospedagem === true && (
                            <div className="mt-2"> 
                                <textarea
                                    name="descricao_experiencia_com_hospedagem"
                                    rows={2}
                                    maxLength={255}
                                    value={formData.descricao_experiencia_com_hospedagem}
                                    onChange={handleChange}
                                    placeholder="Quais?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* posse com alimentos */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet possui posse com alimentos?</label>
                        <div>
                            <input
                            type="radio"
                            name="posse_alimento"
                            id="posse_alimento_sim"
                            value="true"
                            checked={formData.posse_alimento === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="posse_alimento_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="posse_alimento"
                            id="posse_alimento_nao"
                            value="false"
                            checked={formData.posse_alimento === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="posse_alimento_nao">Não</label>
                        </div>
                    </div>

                    {/* Posse com objetos */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Seu pet tem posse com algum objeto?</label>
                        <div>
                            <input
                            type="radio"
                            name="posse_objeto"
                            id="posse_objeto_sim"
                            value="true"
                            checked={formData.posse_objeto === true}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="posse_objeto_sim">Sim</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            name="posse_objeto"
                            id="posse_objeto_nao"
                            value="false"
                            checked={formData.posse_objeto === false}
                            onChange={handleChange}
                            className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500"
                            />
                            <label htmlFor="posse_objeto_nao">Não</label>
                        </div>

                        {formData.posse_objeto === true && (
                            <div className="mt-2"> 
                                <textarea
                                    name="descricao_posse_objeto"
                                    rows={2}
                                    maxLength={100}
                                    value={formData.descricao_posse_objeto}
                                    onChange={handleChange}
                                    placeholder="Quais?"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
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