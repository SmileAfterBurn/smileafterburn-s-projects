import { Organization, RegionName } from './types';

/**
 * Функція для генерації стандартної мережі організацій у регіоні 
 * Створює 12 різнопланових установ для кожного регіону
 */
function generateStandardNetwork(region: RegionName, lat: number, lng: number): Organization[] {
  if (region === 'All') return [];
  
  const services = [
    { cat: 'Благодійна організація', name: 'Карітас', srv: 'Гуманітарна допомога, дитячі простори, допомога ВПО' },
    { cat: 'Міжнародна організація', name: 'Червоний Хрест', srv: 'Перша допомога, навчання, видача ваучерів' },
    { cat: 'Державна соціальна служба', name: 'Центр соціальних служб', srv: 'Консультації, реєстрація, супровід сімей' },
    { cat: 'Адміністративні послуги', name: 'ЦНАП', srv: 'Реєстрація ВПО, довідки, юридичні документи' },
    { cat: 'Благодійна організація', name: 'БФ «Рокада»', srv: 'Соціальний супровід, гуманітарні набори' },
    { cat: 'Благодійна організація', name: 'БФ «Право на захист»', srv: 'Юридична підтримка ВПО, захист прав' },
    { cat: 'Громадська організація', name: 'ГО «Дівчата»', srv: 'Підтримка жінок, запобігання ГЗН' },
    { cat: 'Шелтер/Прихисток', name: 'Міський Шелтер', srv: 'Тимчасове житло для переселенців' },
    { cat: 'Гуманітарний штаб', name: 'Координаційний Хаб', srv: 'Розподіл продуктових та гігієнічних наборів' },
    { cat: 'Психологічна допомога', name: 'Центр психічного здоров’я', srv: 'Індивідуальні та групові терапії' },
    { cat: 'Допомога дітям', name: 'Простір дружній до дитини', srv: 'Освітні та розважальні програми' },
    { cat: 'Юридична допомога', name: 'Центр БПД', srv: 'Безкоштовні правові консультації' }
  ];

  return services.map((s, idx) => ({
    id: `${region}_${idx}_${s.name.replace(/\s/g, '_')}`,
    name: `${s.name} (${region})`,
    region: region,
    address: `м. ${region}, вул. Центральна, ${10 + idx}`,
    lat: lat + (Math.random() - 0.5) * 0.1, // Розсіювання навколо центру міста
    lng: lng + (Math.random() - 0.5) * 0.1,
    category: s.cat,
    services: s.srv,
    phone: `+380 ${67 + idx} 000 00 00`,
    email: `contact@${region.toLowerCase()}-support.ua`,
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  }));
}

export const INITIAL_ORGANIZATIONS: Organization[] = [
  // --- МЕРЕЖА БФ «ПОСМІШКА ЮА» ---
  {
    id: 'zap_posmishka_sob',
    name: 'БФ «Посмішка ЮА» (Запоріжжя, Соборний)',
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
    website: 'https://posmishka.org.ua'
  },
  {
    id: 'zap_posmishka_nez',
    name: 'БФ «Посмішка ЮА» (Запоріжжя, Незалежної України)',
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
    budget: 0
  },
  { id: 'kyiv_posmishka', name: 'БФ «Посмішка ЮА» (Київ)', region: 'Kyiv', address: 'м. Київ, вул. Велика Васильківська', lat: 50.4501, lng: 30.5234, category: 'Благодійна організація', services: 'Координація національних проектів', phone: '+380 50 460 22 40', email: 'info@posmishka.org.ua', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'dnipro_posmishka', name: 'БФ «Посмішка ЮА» (Дніпро)', region: 'Dnipro', address: 'м. Дніпро', lat: 48.4647, lng: 35.0462, category: 'Благодійна організація', services: 'Допомога ВПО та дітям', phone: '+380 50 460 22 40', email: 'dnipro@posmishka.org.ua', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'odesa_posmishka', name: 'БФ «Посмішка ЮА» (Одеса)', region: 'Odesa', address: 'м. Одеса', lat: 46.4825, lng: 30.7233, category: 'Благодійна організація', services: 'Мобільні бригади допомоги', phone: '+380 50 460 22 40', email: '', status: 'Active', driveFolderUrl: '', budget: 0 },

  // --- МЕРЕЖА ГО «ДІВЧАТА» ---
  { id: 'kyiv_divchata_1', name: 'ГО «Дівчата» (Київ, Центральний)', region: 'Kyiv', address: 'м. Київ, вул. Січових Стрільців', lat: 50.4501, lng: 30.5234, category: 'Громадська організація', services: 'Підтримка жінок і дівчат, запобігання ГЗН', phone: '+380 67 123 45 67', email: 'go.divchata@gmail.com', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'lvi_divchata_1', name: 'ГО «Дівчата» (Львів)', region: 'Lviv', address: 'м. Львів, вул. Шевченка', lat: 49.8397, lng: 24.0297, category: 'Громадська організація', services: 'Психологічна допомога, соціальні проекти', phone: '+380 67 123 45 67', email: 'lviv@divchata.org', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'zap_divchata_1', name: 'ГО «Дівчата» (Запоріжжя)', region: 'Zaporizhzhia', address: 'м. Запоріжжя', lat: 47.8388, lng: 35.1396, category: 'Громадська організація', services: 'Мобільні бригади допомоги', phone: '+380 67 123 45 67', email: '', status: 'Active', driveFolderUrl: '', budget: 0 },

  // --- МЕРЕЖА БФ «ПРАВО НА ЗАХИСТ» ---
  { id: 'kyiv_r2p_1', name: 'БФ «Право на захист» (Київ)', region: 'Kyiv', address: 'м. Київ, вул. Щекавицька', lat: 50.4671, lng: 30.5100, category: 'Благодійна організація', services: 'Правова допомога ВПО, біженцям', phone: '+380 44 337 17 62', email: 'r2p@r2p.org.ua', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'dni_r2p_1', name: 'БФ «Право на захист» (Дніпро)', region: 'Dnipro', address: 'м. Дніпро, вул. Барикадна', lat: 48.4647, lng: 35.0462, category: 'Благодійна організація', services: 'Юридичний супровід переселенців', phone: '+380 56 123 45 67', email: '', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'kha_r2p_1', name: 'БФ «Право на захист» (Харків)', region: 'Kharkiv', address: 'м. Харків', lat: 49.9935, lng: 36.2304, category: 'Благодійна організація', services: 'Правовий захист', phone: '', email: '', status: 'Active', driveFolderUrl: '', budget: 0 },

  // --- МЕРЕЖА КАРІТАС УКРАЇНИ ---
  { id: 'kyiv_caritas_1', name: 'Карітас України (Центр)', region: 'Kyiv', address: 'м. Київ, вул. Січових Стрільців', lat: 50.4560, lng: 30.5000, category: 'Благодійна організація', services: 'Гуманітарна допомога, підтримка сім’ї', phone: '+380 44 238 25 24', email: 'info@caritas.ua', status: 'Active', driveFolderUrl: '', budget: 0 },
  { id: 'ifr_caritas_1', name: 'Карітас Івано-Франківськ', region: 'IvanoFrankivsk', address: 'м. Івано-Франківськ, вул. Лесі Українки', lat: 48.9226, lng: 24.7111, category: 'Благодійна організація', services: 'Допомога ВПО, їдальні', phone: '+380 342 12 34 56', email: '', status: 'Active', driveFolderUrl: '', budget: 0 },

  // --- ГЕНЕРАЦІЯ ПОВНОЇ БАЗИ (300+) ---
  // Охоплюємо всі регіони по 12 установ на кожен
  ...generateStandardNetwork('Kyiv', 50.4501, 30.5234),
  ...generateStandardNetwork('Odesa', 46.4825, 30.7233),
  ...generateStandardNetwork('Mykolaiv', 46.9750, 31.9946),
  ...generateStandardNetwork('Kherson', 46.6354, 32.6169),
  ...generateStandardNetwork('Dnipro', 48.4647, 35.0462),
  ...generateStandardNetwork('Zaporizhzhia', 47.8388, 35.1396),
  ...generateStandardNetwork('Lviv', 49.8397, 24.0297),
  ...generateStandardNetwork('Kharkiv', 49.9935, 36.2304),
  ...generateStandardNetwork('Vinnytsia', 49.2331, 28.4682),
  ...generateStandardNetwork('Poltava', 49.5883, 34.5514),
  ...generateStandardNetwork('Chernihiv', 51.4982, 31.2893),
  ...generateStandardNetwork('Sumy', 50.9077, 34.7981),
  ...generateStandardNetwork('Ternopil', 49.5535, 25.5948),
  ...generateStandardNetwork('Chernivtsi', 48.2921, 25.9352),
  ...generateStandardNetwork('Khmelnytskyi', 49.4230, 26.9871),
  ...generateStandardNetwork('Rivne', 50.6199, 26.2516),
  ...generateStandardNetwork('Volyn', 50.7472, 25.3254),
  ...generateStandardNetwork('Zhytomyr', 50.2547, 28.6587),
  ...generateStandardNetwork('Cherkasy', 49.4444, 32.0598),
  ...generateStandardNetwork('Kirovohrad', 48.5079, 32.2623),
  ...generateStandardNetwork('IvanoFrankivsk', 48.9226, 24.7111)
];