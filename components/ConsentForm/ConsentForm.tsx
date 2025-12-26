import React, { useState, useCallback } from 'react';
import { formStructure } from './formConstants';
import { FormFieldType, FormField } from './formTypes';
import FormInput from './FormInput';
import RadioGroup from './RadioGroup';
import SelectInput from './SelectInput';
import CheckboxInput from './CheckboxInput';
import TextArea from './TextArea';

export const ConsentForm: React.FC = () => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [submittedData, setSubmittedData] = useState<string | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }, []);

    const downloadCsv = (data: Record<string, any>) => {
        const allFields = formStructure.flatMap(section => section.fields);

        const headers = allFields.map(field => `"${field.label.replace(/"/g, '""')}"`).join(',');
        const row = allFields.map(field => {
            const value = data[field.id];
            let cellValue: string;

            if (value === undefined || value === null) {
                cellValue = '';
            } else if (typeof value === 'boolean') {
                cellValue = value ? 'Так' : 'Ні';
            } else {
                cellValue = String(value);
            }

            return `"${cellValue.replace(/"/g, '""')}"`;
        }).join(',');

        const csvContent = `${headers}\n${row}`;

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.setAttribute('download', `form-submission-${timestamp}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataString = JSON.stringify(formData, null, 2);
        setSubmittedData(dataString);
        downloadCsv(formData);
    };

    const renderField = (field: FormField) => {
        const commonProps = {
            key: field.id,
            id: field.id,
            label: field.label,
            value: formData[field.id] || '',
            onChange: handleChange,
        };

        switch (field.type) {
            case FormFieldType.ShortAnswer:
                return <FormInput {...commonProps} type={field.label.toLowerCase().includes('вік') ? 'number' : 'text'} />;
            case FormFieldType.Date:
                return <FormInput {...commonProps} type="date" />;
            case FormFieldType.Paragraph:
                return <TextArea {...commonProps} />;
            case FormFieldType.MultipleChoice:
                return <RadioGroup {...commonProps} options={field.options || []} name={field.id} selectedValue={formData[field.id]} />;
            case FormFieldType.Dropdown:
                return <SelectInput {...commonProps} options={field.options || []} />;
            case FormFieldType.Checkbox:
                return <CheckboxInput key={field.id} id={field.id} label={field.label} isChecked={!!formData[field.id]} onChange={handleChange} option={field.options?.[0] || ''} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl">
                <header className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400">ПОСМІШКА</h1>
                    <p className="text-lg text-gray-400">БЛАГОДІЙНИЙ ФОНД</p>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">ЗГОДА НА УЧАСТЬ ДИТИНИ</h2>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {formStructure.map(section => (
                        <div key={section.title} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                            <h3 className="text-xl font-bold mb-6 text-cyan-300 border-b border-gray-600 pb-3">{section.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map(renderField)}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                            Надіслати
                        </button>
                    </div>
                </form>

                {submittedData && (
                    <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                        <h3 className="text-xl font-bold mb-4 text-cyan-300">Надіслані дані (JSON)</h3>
                        <pre className="bg-gray-900 text-green-300 p-4 rounded-md text-sm overflow-x-auto">
                            <code>{submittedData}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsentForm;