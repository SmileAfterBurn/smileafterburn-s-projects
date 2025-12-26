import React from 'react';

interface CheckboxInputProps {
    id: string;
    label: string;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    option: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ id, label, isChecked, onChange, option }) => (
    <div className="md:col-span-2 flex flex-col">
        <label className="font-medium text-gray-300 mb-2">{label}</label>
        <div className="flex items-center">
            <input
                id={id}
                name={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                className="w-5 h-5 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
            />
            <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-300">{option}</label>
        </div>
    </div>
);

export default CheckboxInput;