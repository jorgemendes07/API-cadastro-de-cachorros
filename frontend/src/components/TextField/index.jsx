export default function TextField ({ label, name, value, onChange, maxLength, required = false, placeholder = ""}) {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>

            <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                required={required}
                placeholder={placeholder}
            />
        </div> 
    )
}