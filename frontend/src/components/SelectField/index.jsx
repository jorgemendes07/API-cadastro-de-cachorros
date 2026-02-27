export default function SelectField ({ label, name, value, onChange, options = [] }) {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    name={name}
                    value={value}
                    onChange={onChange}
                    
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
        </div>
    )
};