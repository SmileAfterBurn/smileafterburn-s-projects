
import React from 'react';

interface TextAreaProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ id, label, value, onChange }) => (
    <div className="flex flex-col md:col-span-2">
        <label htmlFor={id} className="mb-2 font-medium text-gray-300">{label}</label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            rows={4}
            className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 outline-none resize-y"
        />
    </div>
);

export default TextArea;
