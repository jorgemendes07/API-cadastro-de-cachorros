export default function TextField ({ label, name, value, onChange, maxLenght, required = false, placeHolder = ""}) {
    return (
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>

                <input 
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={maxLenght}
                    required={required}
                    placeholder={placeHolder}
                 />

            </div> 
    )
}