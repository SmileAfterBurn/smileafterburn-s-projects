import { Organization } from './types';

export const INITIAL_ORGANIZATIONS: Organization[] = [
  // --- ПРІОРИТЕТНІ ПАРТНЕРИ: ПОСМІШКА ЮА ---
  {
    id: 'zap_posmishka_sobornyi',
    name: 'БФ «Посмішка ЮА» (пр. Соборний)',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, проспект Соборний, 189',
    lat: 47.8510,
    lng: 35.1120,
    category: 'Благодійна організація',
    services: 'Комплексна гуманітарна допомога, центри підтримки сім’ї, психологічна підтримка',
    phone: '+380 50 460 22 40',
    email: 'info@posmishka.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://posmishka.org.ua',
    establishedDate: '2013'
  },
  {
    id: 'zap_posmishka_nezalezhnosti',
    name: 'БФ «Посмішка ЮА» (вул. Незалежної України)',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, вул. Незалежної України, 90',
    lat: 47.8380,
    lng: 35.1350,
    category: 'Благодійна організація',
    services: 'Осередок допомоги, соціальні консультації, дитячий простір',
    phone: '+380 50 460 22 40',
    email: 'info@posmishka.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://posmishka.org.ua',
    establishedDate: '2013'
  },
  { id: 'kyiv_posmishka', name: 'БФ «Посмішка ЮА» (Київ)', region: 'Kyiv', address: 'м. Київ', lat: 50.4501, lng: 30.5234, category: 'Благодійна організація', services: 'Координація національних проектів', phone: '+380 50 460 22 40', email: 'info@posmishka.org.ua', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '2013' },
  { id: 'dnipro_posmishka', name: 'БФ «Посмішка ЮА» (Дніпро)', region: 'Dnipro', address: 'м. Дніпро', lat: 48.4647, lng: 35.0462, category: 'Благодійна організація', services: 'Допомога ВПО та дітям', phone: '+380 50 460 22 40', email: 'dnipro@posmishka.org.ua', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '2013' },
  { id: 'odesa_posmishka', name: 'БФ «Посмішка ЮА» (Одеса)', region: 'Odesa', address: 'м. Одеса', lat: 46.4825, lng: 30.7233, category: 'Благодійна організація', services: 'Мобільні бригади допомоги', phone: '+380 50 460 22 40', email: '', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '2013' },
  { id: 'myk_posmishka', name: 'БФ «Посмішка ЮА» (Миколаїв)', region: 'Mykolaiv', address: 'м. Миколаїв', lat: 46.9750, lng: 31.9946, category: 'Благодійна організація', services: 'Гуманітарна місія', phone: '+380 50 460 22 40', email: '', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '2013' },
  { id: 'kher_posmishka', name: 'БФ «Посмішка ЮА» (Херсон)', region: 'Kherson', address: 'м. Херсон', lat: 46.6354, lng: 32.6169, category: 'Благодійна організація', services: 'Екстрена допомога', phone: '+380 50 460 22 40', email: '', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '2013' },

  // --- ХЕРСОНСЬКА ОБЛАСТЬ (НОВІ) ---
  {
    id: 'h_csv_crisis',
    name: 'Кризовий центр (Херсон)',
    region: 'Kherson',
    address: 'м. Херсон',
    lat: 46.6354,
    lng: 32.6178,
    category: 'Шелтер/Прихисток',
    services: 'Тимчасовий прихисток, первинна медична допомога, психологічна підтримка',
    phone: '+380 (50) 318-22-14',
    email: '',
    status: 'In Development',
    driveFolderUrl: '',
    budget: 0,
    notes: 'Працює у партнерстві з управлінням соцзахисту міста.'
  },
  {
    id: 'h_csv_mobile',
    name: 'Мобільна гуманітарна група (Херсонщина)',
    region: 'Kherson',
    address: 'Херсонська область (мобільна робота)',
    lat: 46.8384,
    lng: 33.3763,
    category: 'Благодійна організація',
    services: 'Оцінка потреб, видача наборів невідкладної допомоги, направлення до shelter hub',
    phone: '+380 (93) 447-10-82',
    email: '',
    status: 'In Development',
    driveFolderUrl: '',
    budget: 0,
    notes: 'Працює щотижнево у громадах правобережжя.'
  },

  // --- МИКОЛАЇВСЬКА ОБЛАСТЬ (НОВІ) ---
  {
    id: 'm_csv_shelter',
    name: 'Миколаївський кризовий центр (Притулок)',
    region: 'Mykolaiv',
    address: 'м. Миколаїв (за попереднім записом)',
    lat: 46.9753,
    lng: 31.9946,
    category: 'Шелтер/Прихисток',
    services: 'Екстрене розміщення, психологічна підтримка, юридичні консультації',
    phone: '+380 (512) 37-12-45',
    email: 'support@mykolaiv-crisis.org',
    status: 'In Development',
    driveFolderUrl: '',
    budget: 0,
    notes: 'Прийом за попереднім записом через гарячу лінію.'
  },

  // --- ОДЕСЬКА ОБЛАСТЬ (НОВІ) ---
  {
    id: 'o_csv_shelter',
    name: 'Притулок для постраждалих (Одеса)',
    region: 'Odesa',
    address: 'м. Одеса (центр)',
    lat: 46.4825,
    lng: 30.7326,
    category: 'Шелтер/Прихисток',
    services: 'Притулок, психологічні сесії, супровід до медичних клінік',
    phone: '+380 (48) 728-62-11',
    email: '',
    status: 'In Development',
    driveFolderUrl: '',
    budget: 0,
    notes: 'Конфіденційне місцезнаходження.'
  },

  // --- ЗАПОРІЗЬКА ОБЛАСТЬ ---
  { id: 'z1', name: 'Новомиколаївська селищна рада', region: 'Zaporizhzhia', address: 'смт Новомиколаївка', lat: 47.9781, lng: 35.9125, category: 'Державна соціальна служба', services: 'Соціальний захист громади', phone: '+380505955437', email: 'nnikpossovet@ukr.net', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'z2', name: 'Петро-Михайлівська сільська рада', region: 'Zaporizhzhia', address: 'с. Петро-Михайлівка', lat: 47.9554, lng: 35.2558, category: 'Державна соціальна служба', services: 'Соціальна підтримка', phone: '+380953223080', email: 'pm.gromada@ukr.net', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'z3', name: 'Центр життєстійкості Петро-Михайлівки', region: 'Zaporizhzhia', address: 'с. Петро-Михайлівка', lat: 47.9560, lng: 35.2565, category: 'Соціальний захист', services: 'Психосоціальна допомога', phone: '+380977303307', email: 'amorskaja@gmail.com', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'z16', name: 'УТОГ (Запоріжжя)', region: 'Zaporizhzhia', address: 'м. Запоріжжя', lat: 47.8388, lng: 35.1396, category: 'Громадська організація', services: 'Підтримка людей з порушенням слуху', phone: '+380669257543', email: '', status: 'Active', driveFolderUrl: '', budget: 0 },

  // --- КИЇВ ---
  { id: 'k1', name: 'Червоний Хрест (Нацкомітет)', region: 'Kyiv', address: 'м. Київ, вул. Пушкінська, 30', lat: 50.4450, lng: 30.5180, category: 'Благодійна організація', services: 'Загальна допомога', phone: '0800332656', email: 'national@redcross.org.ua', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '1918' },
  { id: 'k2', name: 'ГО "Дівчата" (Київ)', region: 'Kyiv', address: 'м. Київ', lat: 50.4530, lng: 30.5230, category: 'Громадська організація', services: 'Допомога жінкам', phone: '+380734603860', email: 'go.divchata@gmail.com', status: 'Active', driveFolderUrl: '', budget: 0, establishedDate: '2016' }
];
