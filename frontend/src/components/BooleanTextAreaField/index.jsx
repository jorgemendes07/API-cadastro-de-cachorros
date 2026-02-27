export default function BooleanTextAreaField ({ label, name, value, onChange, maxLength, textName, textValue, placeholder }) {
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

            {value === true && (
                <div className="mt-2"> 
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        textName={textName}
                        rows={2}
                        textValue={textValue}
                        onChange={onChange}
                        maxLength={maxLength}
                        placeholder={placeholder}
                    >
                    </textarea>
                </div>
            )}
        </div>
    )
}