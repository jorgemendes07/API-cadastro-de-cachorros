export default function BooleanField({ label, name, value, onChange }) {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            
            <div>
                <label>
                    <input 
                        className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500 cursor-pointer"
                        type="radio"
                        name={name}
                        value="true"
                        checked={value === true}
                        onChange={onChange}
                    />
                    Sim
                </label>
                
            </div>

            <div>
                <label>
                    <input 
                        className="px-3 py-2 mr-2 border-gray-300 focus:outline-none focus:ring-blue-500 cursor-pointer"
                        type="radio"
                        name={name}
                        value="false"
                        checked={value === false}
                        onChange={onChange}
                    />
                    Não
                </label>
            
            </div>
        </div>
    )
}