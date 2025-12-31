
import React from 'react';

interface FormInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'date' | 'number' | 'tel';
}

const FormInput: React.FC<FormInputProps> = ({ id, label, value, onChange, type = 'text' }) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="mb-2 font-medium text-gray-300">{label}</label>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 outline-none"
        />
    </div>
);

export default FormInput;
