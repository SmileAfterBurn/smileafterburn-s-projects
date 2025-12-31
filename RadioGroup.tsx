
import React from 'react';

interface RadioGroupProps {
    id: string;
    label: string;
    options: string[];
    name: string;
    selectedValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ id, label, options, name, selectedValue, onChange }) => (
    <div className="md:col-span-2">
        <label className="mb-2 font-medium text-gray-300 block">{label}</label>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {options.map(option => (
                <div key={option} className="flex items-center">
                    <input
                        id={`${id}-${option}`}
                        type="radio"
                        name={name}
                        value={option}
                        checked={selectedValue === option}
                        onChange={onChange}
                        className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500"
                    />
                    <label htmlFor={`${id}-${option}`} className="ml-2 text-sm font-medium text-gray-300">{option}</label>
                </div>
            ))}
        </div>
    </div>
);

export default RadioGroup;
