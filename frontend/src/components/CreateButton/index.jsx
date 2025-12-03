export default function CreateButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white text-l rounded shadow-md p-3 cursor-pointer hover:bg-blue-200 duration-300">
                <i className="fa-solid fa-plus mr-1"></i>
                Adicionar Cachorro
        </button>
    )
}