import { useDogForm } from "../../hooks/useDogForm";
import TextField from "../TextField";
import TextAreaField from "../TextAreaField";
import DateField from "../DateField";
import BooleanField from "../BooleanField";
import BooleanTextField from "../BooleanTextField";
import BooleanTextAreaField from "../BooleanTextAreaField";
import SelectField from "../SelectField";

export default function DogFormModal({
    isOpen,
    dogToEdit,
    onSuccess,
    onClose,
}) {

    const {
        formData,
        loading,
        handleChange,
        handleSubmit,
        modalTitle,
        buttonText,
    } = useDogForm({
        isOpen,
        dogToEdit,
        onSuccess,
        onClose,
    });

    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-emerald-50/90 overflow-y-auto w-full flex justify-center items-start py-8 z-50">
            <div className="bg-white p-8 rounded-md shadow-xl w-[90%] max-w-md relative">
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{modalTitle}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Nome */}
                    <TextField 
                        label="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />
                    
                    {/* Raça */}
                    <TextField 
                        label="Raça"
                        name="raca"
                        value={formData.raca}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />

                    {/* Data de nascimento */}
                    <DateField 
                        label="Data de Nascimento"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        required
                    />

                    {/* Porte */}
                    <SelectField 
                        label="Porte"
                        name="porte"
                        value={formData.porte}
                        onChange={handleChange}
                        options={[
                            { value: "Pequeno", label: "Pequeno" },
                            { value: "Médio", label: "Médio" },
                            { value: "Grande", label: "Grande" },
                        ]}
                    
                    />

                    {/* Nome do tutor */}
                    <TextField 
                        label="Nome do tutor"
                        name="nome_tutor"
                        value={formData.nome_tutor}
                        onChange={handleChange}
                        maxLength={100}
                    />

                    {/* Contato */}
                    <TextField 
                        label="Contato 1"
                        name="contato"
                        value={formData.contato}
                        onChange={handleChange}
                        maxLength={11}
                        placeholder="Preencha apenas com números"
                    />

                    {/* Contato 2*/}
                    <TextField 
                        label="Contato 2"
                        name="contato_2"
                        value={formData.contato_2}
                        onChange={handleChange}
                        maxLength={11}
                        placeholder="Preencha apenas com números"
                    />

                    {/* Endereço do tutor*/}
                    <TextAreaField 
                        label="Endereço do tutor"
                        name="endereco_tutor"
                        value={formData.endereco_tutor}
                        onChange={handleChange}
                        maxLength={255}
                    />

                    {/* Castrado */}
                    <BooleanField 
                        label="Castrado"
                        name="castrado"
                        value={formData.castrado}
                        onChange={handleChange}
                    />

                    {/* Vacina antirrábica */}
                    <DateField 
                        label="Data da ultima vacina antirrábica"
                        name="vacina_antirrabica"
                        value={formData.vacina_antirrabica}
                        onChange={handleChange}
                    />

                    {/* Vacina polivalente */}
                    <DateField 
                        label="Data da ultima vacina polivalente"
                        name="vacina_polivalente"
                        value={formData.vacina_polivalente}
                        onChange={handleChange}
                    />

                    {/* Passeia */}
                    <BooleanField 
                        label="Seu pet passeia?"
                        name="passeia"
                        value={formData.passeia}
                        onChange={handleChange}
                    />

                    {/* Necessidades em casa */}
                    <BooleanField 
                        label="Seu pet faz as necessidades em casa?"
                        name="necessidades_em_casa"
                        value={formData.necessidades_em_casa}
                        onChange={handleChange}
                    />
                    
                    {/* Plano de saude */}
                    <BooleanTextField 
                        label="Seu pet possui plano de saúde?"
                        name="plano_de_saude"
                        value={formData.plano_de_saude}
                        onChange={handleChange}
                        textName="nome_plano_de_saude"
                        textValue={formData.nome_plano_de_saude}
                        maxLength={100}
                        placeholder="Qual o nome do plano?"
                    />

                    {/* Contato veterinario*/}
                    <TextField 
                        label="Contato do veterinário"
                        name="contato_veterinario"
                        value={formData.contato_veterinario}
                        onChange={handleChange}
                        maxLength={11}
                        placeholder="Preencha apenas com números"
                    />

                    {/* Enderço da clínica veterinária*/}
                    <TextAreaField 
                        label="Enderço da clínica veterinária"
                        name="endereco_clinica_veterinaria"
                        value={formData.endereco_clinica_veterinaria}
                        onChange={handleChange}
                        maxLength={255}
                    />

                    {/* Contato clinica veterinária 24 horas */}
                    <TextField 
                        label="Contato da clínica veterinária 24h"
                        name="contato_clinica_veterinaria_24_horas"
                        value={formData.contato_clinica_veterinaria_24_horas}
                        onChange={handleChange}
                        maxLength={11}
                        placeholder="Preencha apenas com números"
                    />

                    {/* Endereço da clínica veterinária 24 horas*/}
                    <TextAreaField 
                        label="Endreço da clínica veterinária 24h"
                        name="endereco_clinica_veterinaria_24_horas"
                        value={formData.endereco_clinica_veterinaria_24_horas}
                        onChange={handleChange}
                        maxLength={255}
                    />

                    {/* Restrição alimentar */}
                    <BooleanTextAreaField 
                        label="Seu pet possui alguma restrição alimentar?"
                        name="restricao_alimentar"
                        value={formData.restricao_alimentar}
                        onChange={handleChange}
                        textName="descricao_restricao_alimentar"
                        textValue={formData.descricao_restricao_alimentar}
                        maxLength={255}
                        placeholder="Quais restrições alimentares?"
                    />

                    {/* Horário alimentação manhã */}
                    <TextField 
                        label="Horário da alimentação da manhã"
                        name="horario_alimentacao_manha"
                        value={formData.horario_alimentacao_manha}
                        onChange={handleChange}
                        maxLength={50}
                    />

                    {/* Porção alimentação manhã */}
                    <TextField 
                        label="Porção da alimentação da manhã"
                        name="porcao_alimentacao_manha"
                        value={formData.porcao_alimentacao_manha}
                        onChange={handleChange}
                        maxLength={100}
                    />

                    {/* Horário alimentação tarde */}
                    <TextField 
                        label="Horário da alimentação da tarde"
                        name="horario_alimentacao_tarde"
                        value={formData.horario_alimentacao_tarde}
                        onChange={handleChange}
                        maxLength={50}
                    />

                    {/* Porção alimentação tarde */}
                    <TextField 
                        label="Porção da alimentação da tarde"
                        name="porcao_alimentacao_tarde"
                        value={formData.porcao_alimentacao_tarde}
                        onChange={handleChange}
                        maxLength={100}
                    />

                    {/* Horário alimentação noite */}
                    <TextField 
                        label="Horário da alimentação da noite"
                        name="horario_alimentacao_noite"
                        value={formData.horario_alimentacao_noite}
                        onChange={handleChange}
                        maxLength={50}
                    />

                    {/* Porção alimentação noite */}
                    <TextField 
                        label="Porção da alimentação da noite"
                        name="porcao_alimentacao_noite"
                        value={formData.porcao_alimentacao_noite}
                        onChange={handleChange}
                        maxLength={100}
                    />

                    {/* Restrição de saude */}
                    <BooleanTextAreaField 
                        label="Seu pet possui alguma restrição de saúde que influencia na rotina do animal?"
                        name="restricao_medica"
                        value={formData.restricao_medica}
                        onChange={handleChange}
                        textName="descricao_restricao_medica"
                        textValue={formData.descricao_restricao_medica}
                        maxLength={255}
                        placeholder="Quais restrições alimentares?"
                    />

                    {/* Uso de medicamento */}
                    <BooleanTextAreaField 
                        label="Seu pet faz uso de alguma medicação?"
                        name="utiliza_medicacao"
                        value={formData.utiliza_medicacao}
                        onChange={handleChange}
                        textName="descricao_utiliza_medicacao"
                        textValue={formData.descricao_utiliza_medicacao}
                        maxLength={500}
                        placeholder="Quais medicações e quais horários?"
                    />

                    {/* comportamento */}
                    <TextAreaField 
                        label="Como é o comportamento do seu pet?"
                        name="comportamento"
                        value={formData.comportamento}
                        onChange={handleChange}
                        maxLength={1000}
                    />

                    {/* medo */}
                    <TextAreaField 
                        label="Seu pet tem medo de alguma coisa?"
                        name="medo"
                        value={formData.medo}
                        onChange={handleChange}
                        maxLength={1000}
                    />

                    {/* relacionamento com outros animais */}
                    <TextAreaField 
                        label="Como o seu pet se relaciona com outros animais?"
                        name="relacionamento_com_outros_animais"
                        value={formData.relacionamento_com_outros_animais}
                        onChange={handleChange}
                        maxLength={1000}
                    />

                    {/* relacionamento com outras pessoas */}
                    <TextAreaField 
                        label="Como o seu pet se relaciona com novas pessoas?"
                        name="relacionamento_com_pessoas"
                        value={formData.relacionamento_com_pessoas}
                        onChange={handleChange}
                        maxLength={1000}
                    />

                    {/* dependência */}
                    <BooleanField 
                        label="Seu pet é dependente de você?"
                        name="dependente"
                        value={formData.dependente}
                        onChange={handleChange}
                    />

                    {/* Experiência com hospedagem */}
                    <BooleanTextAreaField 
                        label="Seu pet já frequentou creche, hotel ou doghero?"
                        name="experiencia_com_hospedagem"
                        value={formData.experiencia_com_hospedagem}
                        onChange={handleChange}
                        textName="descricao_experiencia_com_hospedagem"
                        textValue={formData.descricao_experiencia_com_hospedagem}
                        maxLength={255}
                        placeholder="Quais?"
                    />

                    {/* posse com alimentos */}
                    <BooleanField 
                        label="Seu pet possui posse com alimentos?"
                        name="posse_alimento"
                        value={formData.posse_alimento}
                        onChange={handleChange}
                    />
                    
                    {/* Posse com objetos */}
                    <BooleanTextAreaField 
                        label="Seu pet tem posse com algum objeto?"
                        name="posse_objeto"
                        value={formData.posse_objeto}
                        onChange={handleChange}
                        textName="descricao_posse_objeto"
                        textValue={formData.descricao_posse_objeto}
                        maxLength={255}
                        placeholder="Quais?"
                    />

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