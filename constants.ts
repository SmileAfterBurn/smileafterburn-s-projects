
import { Organization, RegionName, RemoteSupportActor } from './types';

export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1ev98ifed1h8xc16KcWaOmvaky8I9StuE0-6w7UPG4K4/edit?gid=1212063265#gid=1212063265';
export const DRIVE_URL = 'https://drive.google.com/drive/folders/1kSQKI_-2b8mmWfUw5ZHvGaDD9g4tPWqU?usp=sharing';
export const REFERRAL_DRIVE_URL = 'https://drive.google.com/drive/folders/1cBKp3HoTfujq8AamTKK37HjtHC59GHyt?usp=sharing';

// Config for regions with Icons, Gradients and Slogans matching the screenshot design
export const REGION_CONFIG: Record<RegionName, { center: [number, number], zoom: number, label: string, icon: string, gradient: string, description: string, customImage?: string }> = {
  'All': {
    center: [48.3794, 31.1656],
    zoom: 6,
    label: 'Вся Україна',
    icon: 'Tryzub', 
    gradient: 'from-slate-700 to-slate-900',
    description: 'ЄДИНА КРАЇНА'
  },
  'Odesa': {
    center: [46.4825, 30.7233],
    zoom: 12,
    label: 'Одеська область',
    icon: 'Anchor',
    gradient: 'from-sky-400 to-cyan-500',
    description: 'ПЕРЛИНА БІЛЯ МОРЯ'
  },
  'Mykolaiv': {
    center: [46.9750, 31.9946],
    zoom: 12,
    label: 'Миколаївська область',
    icon: 'Ship',
    gradient: 'from-indigo-400 to-violet-500',
    description: 'МІСТО НА ХВИЛІ'
  },
  'Kherson': {
    center: [46.6354, 32.6169],
    zoom: 12,
    label: 'Херсонська область',
    icon: 'Sun',
    gradient: 'from-lime-400 to-green-500',
    description: 'СОНЯЧНИЙ КРАЙ'
  },
  'Dnipro': {
    center: [48.4647, 35.0462],
    zoom: 11,
    label: 'Дніпропетровська область',
    icon: 'Building2',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'СЕРЦЕ ІНДУСТРІЇ'
  },
  'Zaporizhzhia': {
    center: [47.8388, 35.1396],
    zoom: 11,
    label: 'Запорізька область',
    icon: 'Zap',
    gradient: 'from-orange-500 to-red-500',
    description: 'КОЗАЦЬКА СИЛА'
  },
  'Kyiv': {
    center: [50.4501, 30.5234],
    zoom: 11,
    label: 'Київська область',
    icon: 'Church',
    gradient: 'from-emerald-500 to-teal-700',
    description: 'СЕРЦЕ УКРАЇНИ'
  },
  'Lviv': {
    center: [49.8397, 24.0297],
    zoom: 12,
    label: 'Львівська область',
    icon: 'Coffee',
    gradient: 'from-amber-700 to-orange-800',
    description: 'МІСТО ЛЕВА'
  },
  'Kharkiv': {
    center: [49.9935, 36.2304],
    zoom: 11,
    label: 'Харківська область',
    icon: 'GraduationCap',
    gradient: 'from-green-500 to-emerald-700',
    description: 'МІСТО МОЛОДІ'
  },
  'Volyn': {
    center: [50.7472, 25.3254],
    zoom: 12,
    label: 'Волинська область',
    icon: 'Trees',
    gradient: 'from-emerald-400 to-green-600',
    description: 'КРАЙ ЛІСІВ'
  },
  'Zhytomyr': {
    center: [50.2547, 28.6587],
    zoom: 12,
    label: 'Житомирська область',
    icon: 'Trees',
    gradient: 'from-green-600 to-emerald-800',
    description: 'ПОЛІСЬКИЙ КРАЙ'
  },
  'Rivne': {
    center: [50.6199, 26.2516],
    zoom: 12,
    label: 'Рівненська область',
    icon: 'Gem', 
    gradient: 'from-amber-400 to-yellow-600',
    description: 'БУРШТИНОВИЙ КРАЙ'
  },
  'Sumy': {
    center: [50.9077, 34.7981],
    zoom: 12,
    label: 'Сумська область',
    icon: 'Wheat',
    gradient: 'from-yellow-400 to-lime-600',
    description: 'КОЗАЦЬКИЙ КРАЙ'
  },
  'Ternopil': {
    center: [49.5535, 25.5948],
    zoom: 12,
    label: 'Тернопільська область',
    icon: 'Castle',
    gradient: 'from-teal-400 to-cyan-600',
    description: 'ФАЙНЕ МІСТО'
  },
  'Chernivtsi': {
    center: [48.2921, 25.9352],
    zoom: 12,
    label: 'Чернівецька область',
    icon: 'Landmark',
    gradient: 'from-red-600 to-rose-700',
    description: 'УКРАЇНСЬКИЙ ПАРИЖ'
  },
  'Khmelnytskyi': {
    center: [49.4230, 26.9871],
    zoom: 12,
    label: 'Хмельницька область',
    icon: 'Shield',
    gradient: 'from-indigo-500 to-blue-600',
    description: 'ПРОСТІР МОЖЛИВОСТЕЙ'
  },
  'Chernihiv': {
    center: [51.4982, 31.2893],
    zoom: 12,
    label: 'Чернігівська область',
    icon: 'Church',
    gradient: 'from-slate-500 to-gray-700',
    description: 'МІСТО ЛЕГЕНД'
  },
  'Poltava': {
    center: [49.5883, 34.5514],
    zoom: 11,
    label: 'Полтавська область',
    icon: 'Flower2',
    gradient: 'from-yellow-300 to-orange-500',
    description: 'ДУХОВНА СТОЛИЦЯ'
  },
  'IvanoFrankivsk': {
    center: [48.9226, 24.7111],
    zoom: 12,
    label: 'Івано-Франківська область',
    icon: 'Mountain',
    gradient: 'from-cyan-500 to-blue-700',
    description: 'ВОРОТА КАРПАТ'
  },
  'Kirovohrad': {
    center: [48.5079, 32.2623],
    zoom: 12,
    label: 'Кіровоградська область',
    icon: 'Wheat',
    gradient: 'from-yellow-500 to-amber-600',
    description: 'СЕРЦЕ СТЕПУ'
  }
};

// --- Дані для Дистанційної підтримки ---
export const REMOTE_SUPPORT_ACTORS: RemoteSupportActor[] = [
  {
    id: 'r1',
    name: 'Урядова гаряча лінія',
    category: 'Державні гарячі лінії',
    phones: ['1545'],
    description: 'Цілодобова урядова гаряча лінія з усіх питань.',
    website: 'https://ukc.gov.ua/'
  },
  {
    id: 'r_dv_1',
    name: 'Гаряча лінія протидії насильству',
    category: 'Соціальний захист',
    phones: ['1547'],
    description: 'Гаряча лінія з питань протидії торгівлі людьми, запобігання та протидії домашньому насильству. Безкоштовно, анонімно.',
    website: 'https://1547.ukc.gov.ua'
  },
  {
    id: 'r_dv_2',
    name: 'Онлайн-платформа «Аврора»',
    category: 'Психологічна підтримка',
    phones: [],
    description: 'Спеціалізована психотерапевтична підтримка особам, які зазнали насильства, пов’язаного з війною (зокрема, сексуального).',
    website: 'https://avrora-help.org.ua'
  },
  {
    id: 'r_health_1',
    name: 'Лінія здоров’я жінки',
    category: 'Охорона здоров\'я',
    phones: ['3033'],
    description: 'Лінія сексуально-репродуктивного здоров’я. Первинні консультації профільного фахівця. Щодня 9:00-18:00.',
  },
  {
    id: 'r2',
    name: 'Гаряча лінія Мінреінтеграції',
    category: 'Державні гарячі лінії',
    phones: ['1548', '+380960788433'],
    description: 'Питання ВПО, евакуації та гуманітарної допомоги.',
    website: 'https://minre.gov.ua/'
  },
  {
    id: 'r3',
    name: 'Безоплатна правова допомога',
    category: 'Юридична допомога',
    phones: ['0 800 213 103'],
    description: 'Консультації юристів, допомога в оформленні документів.',
    website: 'https://legalaid.gov.ua/'
  },
  {
    id: 'r4',
    name: 'Національна лінія психологічної підтримки',
    category: 'Психологічна підтримка',
    phones: ['0 800 100 102'],
    description: 'Безкоштовна та анонімна психологічна допомога.'
  },
  {
    id: 'r5',
    name: 'Гаряча лінія запобігання домашньому насильству',
    category: 'Соціальний захист',
    phones: ['116 123', '0 800 500 335'],
    description: 'Цілодобова підтримка постраждалих від насильства (La Strada).'
  },
  {
    id: 'r6',
    name: 'Юридичний порадник для ВПО',
    category: 'Юридична допомога',
    phones: [], 
    description: 'Чат-бот та онлайн ресурси для переселенців (Viber, Telegram, Facebook).',
    website: 'https://chatbot.r2p.org.ua/'
  },
  {
    id: 'r7',
    name: 'Лінія підтримки дітей та молоді (La Strada)',
    category: 'Психологічна підтримка',
    phones: ['116 111', '0 800 500 225'],
    description: 'Консультації для дітей, підлітків та батьків. Анонімно.',
    website: 'https://la-strada.org.ua/'
  },
  {
    id: 'r8',
    name: 'Національна гаряча лінія з питань ВІЛ/СНІД',
    category: 'Охорона здоров\'я',
    phones: ['0 800 500 451'],
    description: 'Цілодобова, безкоштовна та анонімна інформаційна підтримка.'
  },
  {
    id: 'r9',
    name: 'Lifeline Ukraine',
    category: 'Психологічна підтримка',
    phones: ['7333'],
    description: 'Національна лінія з питань профілактики самогубств та підтримки психічного здоров’я.',
    website: 'https://lifelineukraine.com/get-help'
  },
  {
    id: 'r10',
    name: 'Офіс Омбудсмана України',
    category: 'Права людини',
    phones: ['0 800 50 17 20', '044 299 74 08'],
    description: 'Гаряча лінія Уповноваженого ВРУ з прав людини. Розшук зниклих, права дітей, обмін полоненими.',
    website: 'https://ombudsman.gov.ua/'
  },
  {
    id: 'r11',
    name: 'Український ветеранський фонд',
    category: 'Психологічна підтримка',
    phones: ['0 800 33 20 29'],
    description: 'Гаряча лінія кризової підтримки для ветеранів та їхніх родин (цілодобово).',
    website: 'https://veteranfund.com.ua/'
  },
  {
    id: 'r12',
    name: 'Донбас SOS',
    category: 'Допомога ВПО',
    phones: ['0 800 309 110'],
    description: 'Інформаційна підтримка ВПО, юридичні питання, перетин лінії розмежування.',
    website: 'https://www.donbasssos.org/'
  },
  {
    id: 'r13',
    name: 'Helping to Leave',
    category: 'Евакуація',
    phones: ['(093) 177 64 58'],
    description: 'Допомога з евакуацією з зон бойових дій та окупованих територій.',
    website: 'https://helpingtoleave.org/ua'
  },
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  // === ZAPORIZHZHIA (HOME OF POSMISHKA) ===
  {
    id: 'zap_posmishka',
    name: 'БФ «Посмішка ЮА»',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, проспект Соборний, 151',
    lat: 47.8488,
    lng: 35.1396,
    category: 'Благодійна організація',
    services: 'Комплексна гуманітарна допомога, центри підтримки сім’ї, простір дружній до дитини, психологічна підтримка',
    phone: '+380 50 460 22 40',
    email: 'info@posmishka.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://posmishka.org.ua',
    notes: 'Генеральний партнер проекту. Працює по всій Україні.'
  },
  {
    id: 'zap_caritas',
    name: 'Карітас Запоріжжя',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, вул. Семафорна, 8',
    lat: 47.8200,
    lng: 35.1600,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, догляд вдома, робота з дітьми, кризовий центр',
    phone: '+380 50 322 46 00',
    email: 'caritas.zp@gmail.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://caritas-zp.org'
  },

  // === KYIV ===
  {
    id: 'kyiv_hq_redcross',
    name: 'Червоний Хрест України (Національний комітет)',
    region: 'Kyiv',
    address: 'м. Київ, вул. Пушкінська, 30',
    lat: 50.4450,
    lng: 30.5180,
    category: 'Благодійна організація',
    services: 'Перша допомога, гуманітарна підтримка, розшук зниклих, навчання населення',
    phone: '0 800 332 656',
    email: 'national@redcross.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://redcross.org.ua'
  },
  {
    id: 'kyiv_soc_dept',
    name: 'Департамент соціальної політики КМДА',
    region: 'Kyiv',
    address: 'м. Київ, пр-т Любомира Гузара, 7',
    lat: 50.4350,
    lng: 30.4100,
    category: 'Державна соціальна служба',
    services: 'Соціальні виплати, субсидії, допомога пільговикам, координація соцслужб',
    phone: '(044) 405-92-60',
    email: 'social@kyivcity.gov.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://dsp.kyivcity.gov.ua'
  },
  {
    id: 'kyiv_right_protection',
    name: 'БФ «Право на захист» (Київ)',
    region: 'Kyiv',
    address: 'м. Київ, вул. Щекавицька, 55',
    lat: 50.4700,
    lng: 30.5100,
    category: 'Благодійна організація',
    services: 'Юридична допомога ВПО, біженцям та особам без громадянства',
    phone: '(044) 337-15-56',
    email: 'pr@r2p.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://r2p.org.ua'
  },

  // === DNIPRO ===
  {
    id: 'dnipro_angely',
    name: 'БФ «Янголи Спасіння»',
    region: 'Dnipro',
    address: 'м. Дніпро',
    lat: 48.4600,
    lng: 35.0400,
    category: 'Благодійна організація',
    services: 'Евакуація, гуманітарна допомога прифронтовим зонам',
    phone: '0 800 334 620',
    email: 'info@charity-angels.org',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'dnipro_martin',
    name: 'ГО «Мартін-клуб»',
    region: 'Dnipro',
    address: 'м. Дніпро',
    lat: 48.4700,
    lng: 35.0200,
    category: 'Благодійна організація',
    services: 'Соціальний гуртожиток, допомога жінкам з дітьми',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // === LVIV ===
  {
    id: 'lviv_nezlamni',
    name: 'Національний реабілітаційний центр «НЕЗЛАМНІ»',
    region: 'Lviv',
    address: 'м. Львів, вул. Івана Мазепи, 25',
    lat: 49.8600,
    lng: 24.0300,
    category: 'Охорона здоров\'я',
    services: 'Медична евакуація, протезування, фізична та психологічна реабілітація',
    phone: '0 800 333 003',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://unbroken.org.ua'
  },
  {
    id: 'lviv_caritas',
    name: 'Карітас Львів УГКЦ',
    region: 'Lviv',
    address: 'м. Львів, вул. Коперника, 31/1',
    lat: 49.8350,
    lng: 24.0250,
    category: 'Благодійна організація',
    services: 'Допомога ВПО, дітям, людям з інвалідністю, благодійна їдальня',
    phone: '(032) 261-38-92',
    email: 'caritaslviv@gmail.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // === KHARKIV ===
  {
    id: 'kharkiv_soc_protection',
    name: 'Управління соціального захисту населення',
    region: 'Kharkiv',
    address: 'м. Харків, вул. Тобольська, 42',
    lat: 50.0300,
    lng: 36.2200,
    category: 'Державна соціальна служба',
    services: 'Державна допомога, реєстрація ВПО, субсидії',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kharkiv_station',
    name: 'Волонтерський пункт «Південний вокзал»',
    region: 'Kharkiv',
    address: 'м. Харків, Привокзальна площа, 1',
    lat: 49.9850,
    lng: 36.2100,
    category: 'Благодійна організація',
    services: 'Зустріч евакуаційних потягів, психологічна допомога, харчування',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // === ODESA ===
  {
    id: 'odesa_monsters',
    name: 'БФ «Корпорація Монстрів»',
    region: 'Odesa',
    address: 'м. Одеса, пров. Онілової, 16',
    lat: 46.4800,
    lng: 30.7300,
    category: 'Благодійна організація',
    services: 'Медична допомога, гуманітарна підтримка, допомога військовим та лікарням',
    phone: '',
    email: 'monstrov.org@gmail.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://monstrov.org'
  },
  {
    id: 'odesa_caritas',
    name: 'Карітас Одеса УГКЦ',
    region: 'Odesa',
    address: 'м. Одеса, вул. Південна, 40/1',
    lat: 46.4700,
    lng: 30.7100,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, дитячі центри, догляд вдома',
    phone: '+380 48 704 00 45',
    email: 'caritasodessa@post.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // === IVANO-FRANKIVSK ===
  {
    id: 'if_warm_city',
    name: 'Тепле Місто',
    region: 'IvanoFrankivsk',
    address: 'м. Івано-Франківськ',
    lat: 48.9200,
    lng: 24.7100,
    category: 'Благодійна організація',
    services: 'Координація волонтерів, підтримка переселенців, соціальні ініціативи',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- MYKOLAIV REGION ---
  {
    id: 'myk_dms',
    name: 'Управління ДМС у Миколаївській області',
    region: 'Mykolaiv',
    address: 'вул. Космонавтів, 144, м. Миколаїв, 54031',
    lat: 46.9531,
    lng: 32.0298,
    category: 'Державна соціальна служба',
    services: 'Оформлення паспортів, довідок, питань громадянства та міграції',
    phone: '(0512) 37-40-07',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://dmsu.gov.ua/mykolaiv'
  },
  {
    id: 'myk_nssu',
    name: 'Національна соціальна сервісна служба – Миколаївська область',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, вул. Фалєєвська, 14',
    lat: 46.9750,
    lng: 31.9946,
    category: 'Державна соціальна служба',
    services: 'Реалізація державної політики у сфері соціального захисту, захист прав дітей',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://nssu.gov.ua/domashnye-nasilstvo/specializovani-sluzhbi-pidtrimki/mikolayivska-oblast'
  },
  {
    id: 'myk_dept_soc',
    name: 'Департамент соціального захисту населення Миколаївської ОВА',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, вул. Фалєєвська',
    lat: 46.9700,
    lng: 32.0000,
    category: 'Державна соціальна служба',
    services: 'Соціальний захист населення, допомога ВПО, пільги, субсидії',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://ukrainian.city/oblast/mykolayivska'
  },
  {
    id: 'myk_vol_ua',
    name: 'Міжнародний благодійний фонд «Volunteer ua»',
    region: 'Mykolaiv',
    address: 'м. Миколаїв',
    lat: 46.9800,
    lng: 31.9900,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, підтримка постраждалих від війни, волонтерські ініціативи',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://volunteer.mk.ua/'
  },
  {
    id: 'myk_300',
    name: 'Громадська організація «300 миколаївців»',
    region: 'Mykolaiv',
    address: 'вул. Лягіна, 11, Миколаїв',
    lat: 46.9725,
    lng: 31.9920,
    category: 'Благодійна організація',
    services: 'Допомога ЗСУ, цивільному населенню, гуманітарні вантажі',
    phone: '(066) 903-XX-XX',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://www.300mykolayiv.org/'
  },
  {
    id: 'myk_phoenix',
    name: 'ГО «Фенікс» (допомога бездомним тваринам)',
    region: 'Mykolaiv',
    address: 'м. Миколаїв',
    lat: 46.9600,
    lng: 31.9800,
    category: 'Благодійна організація',
    services: 'Порятунок, лікування та прилаштування безпритульних тварин',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://top20.ua/mk/derzhustanovi-komunalni-sluzhbi/gromadski-organizatsiyi/'
  },
  {
    id: 'myk_eleos',
    name: 'Карта притулків та шелтерів Eleos Україна',
    region: 'Mykolaiv',
    address: 'м. Миколаїв (Онлайн ресурс)',
    lat: 46.9750,
    lng: 32.0100,
    category: 'Шелтер/Прихисток',
    services: 'Мережа шелтерів для ВПО, жінок та дітей, постраждалих від насильства',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://map.eleos.com.ua/'
  },
  {
    id: 'myk_shelter_inactive',
    name: 'Тимчасові шелтери для переселенців (Архів)',
    region: 'Mykolaiv',
    address: 'м. Миколаїв',
    lat: 46.9750,
    lng: 31.9500,
    category: 'Шелтер/Прихисток',
    services: 'Тимчасове розміщення (об\'єкт не використовується станом на 2025)',
    phone: '',
    email: '',
    status: 'Inactive',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://www.nikpravda.com.ua/pobudovani-sheltery-dlya-pereselentsiv-vyyavylys-nepotribnymy/'
  },

  // --- KHERSON REGION ---
  {
    id: 'khe_soc_center',
    name: 'Херсонський обласний центр соціальних служб',
    region: 'Kherson',
    address: 'м. Херсон, вул. Потьомкінська',
    lat: 46.6354,
    lng: 32.6169,
    category: 'Державна соціальна служба',
    services: 'Соціальна робота з сім\'ями, дітьми та молоддю',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://ocsssdm.ks.ua/'
  },
  {
    id: 'khe_dept_soc',
    name: 'Департамент соціального розвитку Херсонської ОДА',
    region: 'Kherson',
    address: 'м. Херсон',
    lat: 46.6400,
    lng: 32.6200,
    category: 'Державна соціальна служба',
    services: 'Координація соціальних програм, допомога населенню',
    phone: '+380950926566',
    email: 'dp-soczah@khoda.gov.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://khoda.gov.ua/oda-i-orhany-vlady/strukturni-pidrozdily/departament-sotsialnoho-rozvytku'
  },
  {
    id: 'khe_dms',
    name: 'Управління ДМС у Херсонській області',
    region: 'Kherson',
    address: 'м. Херсон, вул. І. Кулика, 133А, 73008',
    lat: 46.6480,
    lng: 32.6350,
    category: 'Державна соціальна служба',
    services: 'Паспортні послуги, відновлення документів',
    phone: '(066) 641-47-05',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://dmsu.gov.ua/kherson'
  },
  {
    id: 'khe_support',
    name: 'БФ "Сапорт Херсон"',
    region: 'Kherson',
    address: 'м. Херсон',
    lat: 46.6300,
    lng: 32.6100,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога жителям деокупованих територій',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://philanthropyinukraine.org/platform/list/bf-saport-kherson'
  },
  {
    id: 'khe_mayak',
    name: 'БФ "Маяк відродження"',
    region: 'Kherson',
    address: 'м. Херсон',
    lat: 46.6320,
    lng: 32.6150,
    category: 'Благодійна організація',
    services: 'Допомога дітям, евакуація, відновлення житла',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://vgoru.org/istoriyi/vid-zasittia-vikon-do-evakuaciyi-i-organizaciyi-dozvillia-ditei-dopomoga-xersonciam-vid-volonteriv-i-blagodiinikiv'
  },
  {
    id: 'khe_shelters_active',
    name: 'Тимчасові шелтери у Херсоні',
    region: 'Kherson',
    address: 'м. Херсон',
    lat: 46.6380,
    lng: 32.6050,
    category: 'Шелтер/Прихисток',
    services: 'Тимчасовий прихисток для тих, хто втратив житло (4 діючих локації)',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://suspilne.media/kherson/1051811-zitta-u-selteri-ak-ti-hto-vtrativ-zitlo-znajsli-timcasovij-prihistok-u-hersoni/'
  },
  {
    id: 'khe_ostriv',
    name: 'Прихистки для евакуйованих (Острів)',
    region: 'Kherson',
    address: 'м. Херсон, мкрн Острів',
    lat: 46.6150,
    lng: 32.6000,
    category: 'Шелтер/Прихисток',
    services: 'Евакуаційні шелтери для жителів небезпечних районів',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://www.radiosvoboda.org/a/istoriyi-khersontsiv-ostriv-shelter/33555733.html'
  }
];
