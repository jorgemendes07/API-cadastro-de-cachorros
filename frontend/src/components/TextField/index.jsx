export default function TextField ({ label, name, value, onChange, required = false }) {
    return (
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>

                <input 
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={required}
                 />

            </div> 
    )
}