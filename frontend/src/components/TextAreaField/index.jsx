export default function TextAreaField ({ label, name, value, onChange, maxLength, required = false, placeholder = ""}) {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>

            <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name={name} 
                rows={2}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                required={required}
                placeholder={placeholder}
            >
            </textarea>
        </div>
    )
}