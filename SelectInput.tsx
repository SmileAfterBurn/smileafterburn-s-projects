
import React from 'react';

interface SelectInputProps {
    id: string;
    label: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, value, options, onChange }) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 font-medium text-gray-300">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 outline-none"
        >
            <option value="">Виберіть...</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export default SelectInput;
