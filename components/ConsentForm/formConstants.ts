import { FormSection, FormFieldType } from './formTypes';

export const formStructure: FormSection[] = [
    {
        title: 'Локація',
        fields: [
            { id: 'oblast', label: 'Область', type: FormFieldType.MultipleChoice, options: ['Одеська', 'Миколаївська', 'Херсонська'] },
            { id: 'hromada', label: 'Громада', type: FormFieldType.ShortAnswer },
            { id: 'naselenyi-punkt', label: 'Населений пункт', type: FormFieldType.ShortAnswer },
        ],
    },
    {
        title: 'Дані законного представника',
        fields: [
            { id: 'predstavnyk-pib', label: 'ПІБ законного представника', type: FormFieldType.ShortAnswer },
            { id: 'predstavnyk-status', label: 'Статус законного представника', type: FormFieldType.Dropdown, options: ['Батько', 'Мати', 'Опікун', 'Піклувальник'] },
            { id: 'predstavnyk-contact-phone', label: 'Контактний номер телефону', type: FormFieldType.ShortAnswer },
            { id: 'blyzka-liudyna-phone', label: 'Телефон близької людини', type: FormFieldType.ShortAnswer },
            { id: 'blyzka-liudyna-pib', label: 'ПІБ близької людини', type: FormFieldType.ShortAnswer },
        ],
    },
    {
        title: 'Дані дитини',
        fields: [
            { id: 'dytyna-pib', label: 'ПІБ дитини', type: FormFieldType.ShortAnswer },
            { id: 'dytyna-vik', label: 'Вік', type: FormFieldType.ShortAnswer },
            { id: 'dytyna-dob', label: 'Дата народження', type: FormFieldType.Date },
            { id: 'dytyna-gender', label: 'Гендер', type: FormFieldType.MultipleChoice, options: ['Чоловіча', 'Жіноча', 'Інше'] },
            { id: 'dytyna-vpo-status', label: 'Статус ВПО', type: FormFieldType.MultipleChoice, options: ['Так', 'Ні'] },
            { id: 'dytyna-health', label: 'Стан здоров’я', type: FormFieldType.MultipleChoice, options: ['Інвалідність офіційно оформлена', 'Хронічні захворювання', 'Не має проблем'] },
            { id: 'dytyna-special-needs', label: 'Чи є особливі потреби?', type: FormFieldType.MultipleChoice, options: ['Так', 'Ні'] },
            { id: 'dytyna-special-needs-desc', label: 'Опис особливих потреб', type: FormFieldType.Paragraph },
        ],
    },
    {
        title: 'Згоди',
        fields: [
            { id: 'zgoda-uchast', label: 'Згода на участь дитини', type: FormFieldType.Checkbox, options: ['Погоджуюсь'] },
            { id: 'zgoda-personal-data', label: 'Згода на обробку персональних даних', type: FormFieldType.Checkbox, options: ['Погоджуюсь'] },
            { id: 'zgoda-photo-video', label: 'Згода на фото/відео', type: FormFieldType.Checkbox, options: ['Погоджуюсь'] },
            { id: 'dozvil-samostiine', label: 'Дозвіл на самостійне відвідування', type: FormFieldType.Checkbox, options: ['Погоджуюсь'] },
            { id: 'data-zapovnennia', label: 'Дата заповнення', type: FormFieldType.Date },
        ],
    },
];