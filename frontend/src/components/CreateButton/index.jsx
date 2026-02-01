export default function CreateButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full md:w-auto mx-auto md:mx-0 bg-white text-l rounded shadow-md p-3 cursor-pointer hover:bg-blue-200 duration-300 flex items-center justify-center">
                <i className="fa-solid fa-plus mr-1"></i>
                Adicionar Cachorro
        </button>
    )
}