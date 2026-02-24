import {useState, useEffect} from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export function useDogForm({isOpen, dogToEdit, onSuccess, onClose}) {

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
                    contato_2: dogToEdit.contato_2 || "",
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

        const camposBooleanos = [
            "castrado",
            "passeia",
            "necessidades_em_casa",
            "plano_de_saude",
            "restricao_alimentar",
            "restricao_medica",
            "utiliza_medicacao",
            "dependente",
            "experiencia_com_hospedagem",
            "posse_alimento",
            "posse_objeto"
        ]

        if (camposBooleanos.includes(name)) {
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

        const dadosParaEnviar = { ...formData };

        if (dadosParaEnviar.vacina_antirrabica === "") {
            dadosParaEnviar.vacina_antirrabica = null;
        }

        if (dadosParaEnviar.vacina_polivalente === "") {
            dadosParaEnviar.vacina_polivalente = null;
        }

        if (dadosParaEnviar.data_nascimento === "") {
            dadosParaEnviar.data_nascimento = null;
        }
        
        try {
            if (dogToEdit) {
                await axios.put(`${API_BASE}/cachorros/${dogToEdit.id}`, dadosParaEnviar);
                alert("Cachorro atualizado com sucesso!");
            } else {
                await axios.post(`${API_BASE}/cachorros`, dadosParaEnviar);
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

    const modalTitle = dogToEdit ? "Editar Cachorro" : "Novo Cachorro"
    const buttonText = loading ? 'Salvando...' : (dogToEdit ? "Atualizar" : "Salvar");

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
        modalTitle,
        buttonText,
    };
}