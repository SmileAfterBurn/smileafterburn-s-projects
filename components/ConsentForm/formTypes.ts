export enum FormFieldType {
    MultipleChoice = 'Multiple choice',
    ShortAnswer = 'Short answer',
    Dropdown = 'Dropdown',
    Date = 'Date',
    Paragraph = 'Paragraph',
    Checkbox = 'Checkbox',
}

export interface FormField {
    id: string;
    label: string;
    type: FormFieldType;
    options?: string[];
}

export interface FormSection {
    title: string;
    fields: FormField[];
}