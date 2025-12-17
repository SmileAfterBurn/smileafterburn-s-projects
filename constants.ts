
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
  // --- ZAPORIZHZHIA REGION (Core Partner: Posmishka UA) ---
  {
    id: 'zap_posmishka',
    name: 'БФ «Посмішка ЮА» (Запоріжжя)',
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
    notes: 'Генеральний партнер проекту'
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
    budget: 0
  },
  {
    id: 'zap_redcross',
    name: 'Червоний Хрест Запоріжжя',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, вул. Поштова, 4',
    lat: 47.8300,
    lng: 35.1400,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, евакуація',
    phone: '0612123456',
    email: 'redcross.zp@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zap_soc_dept',
    name: 'Департамент соцзахисту населення ЗОДА',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, вул. Олександрівська, 48',
    lat: 47.8250,
    lng: 35.1700,
    category: 'Державна соціальна служба',
    services: 'Державні виплати, допомога ВПО',
    phone: '(061) 764-41-45',
    email: 'soczah.zp@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zap_city_council',
    name: 'Запорізька міська рада',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, пр. Соборний, 206',
    lat: 47.8500,
    lng: 35.1100,
    category: 'Державна соціальна служба',
    services: 'Адміністративні послуги, соціальні програми міста',
    phone: '0800503508',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://zp.gov.ua/'
  },
  {
    id: 'zap_veteran_center',
    name: 'Центр допомоги ветеранам АТО',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, вул. Перемоги, 13',
    lat: 47.8150,
    lng: 35.1550,
    category: 'Соціальний захист',
    services: 'Психологічна підтримка, реабілітація, юридичні консультації для ветеранів',
    phone: '0671234567',
    email: 'veteran.zp@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zap_volunteer_hq',
    name: 'Запорізький волонтерський штаб',
    region: 'Zaporizhzhia',
    address: 'м. Запоріжжя, вул. Незалежної України, 55А',
    lat: 47.8220,
    lng: 35.1320,
    category: 'Волонтерська організація',
    services: 'Збір та видача гуманітарної допомоги, координація волонтерів',
    phone: '0509876543',
    email: 'vol.zp@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- DNIPRO REGION (Core Partner: Posmishka UA) ---
  {
    id: 'dnipro_posmishka',
    name: 'БФ «Посмішка ЮА» (Дніпро)',
    region: 'Dnipro',
    address: 'м. Дніпро, вул. Набережна Перемоги, 26Б',
    lat: 48.4500,
    lng: 35.0600,
    category: 'Благодійна організація',
    services: 'Психосоціальна підтримка, гуманітарна допомога ВПО',
    phone: '+380 50 460 22 40',
    email: 'dnipro@posmishka.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'dnipro_angely',
    name: 'БФ «Янголи Спасіння»',
    region: 'Dnipro',
    address: 'м. Дніпро, вул. Павла Нірінберга, 10',
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
    address: 'м. Дніпро, вул. Івана Акінфієва, 15',
    lat: 48.4700,
    lng: 35.0200,
    category: 'Благодійна організація',
    services: 'Соціальний гуртожиток, допомога жінкам з дітьми',
    phone: '0971234567',
    email: 'martin.club@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'dnipro_caritas',
    name: 'Карітас Донецьк у Дніпрі',
    region: 'Dnipro',
    address: 'м. Дніпро, вул. Гостомельська, 5',
    lat: 48.4800,
    lng: 35.0300,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, соціальний супровід',
    phone: '0679876543',
    email: 'caritas.don@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'dnipro_soc_center',
    name: 'Дніпровський міський центр соціальних служб',
    region: 'Dnipro',
    address: 'м. Дніпро, вул. Троїцька, 21',
    lat: 48.4650,
    lng: 35.0550,
    category: 'Державна соціальна служба',
    services: 'Соціальний супровід сімей, психологічні консультації',
    phone: '0567409063',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'dnipro_vpo_center',
    name: 'Центр допомоги ВПО «ЯМаріуполь»',
    region: 'Dnipro',
    address: 'м. Дніпро, вул. Андрія Фабра, 10',
    lat: 48.4680,
    lng: 35.0380,
    category: 'Допомога ВПО',
    services: 'Комплексна допомога маріупольцям (житло, працевлаштування, мед. допомога)',
    phone: '0981234567',
    email: 'yamariupol.dp@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'dnipro_veteran_hub',
    name: 'ВетеранХаб Дніпро',
    region: 'Dnipro',
    address: 'м. Дніпро, вул. Дмитра Яворницького, 16',
    lat: 48.4660,
    lng: 35.0440,
    category: 'Соціальний захист',
    services: 'Підтримка ветеранів та їх родин, реінтеграція',
    phone: '0951112233',
    email: 'veteranhub.dp@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- ZHYTOMYR REGION (Partner: Posmishka UA) ---
  {
    id: 'zhy_posmishka',
    name: 'БФ «Посмішка ЮА» (Житомир)',
    region: 'Zhytomyr',
    address: 'м. Житомир, вул. Київська, 85',
    lat: 50.2547,
    lng: 28.6587,
    category: 'Благодійна організація',
    services: 'Дитячі простори, психологічна допомога',
    phone: '+380 50 460 22 40',
    email: 'zhytomyr@posmishka.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zhy_caritas',
    name: 'Карітас-Житомир',
    region: 'Zhytomyr',
    address: 'м. Житомир, вул. Бердичівська, 61',
    lat: 50.2450,
    lng: 28.6700,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, робота з дітьми',
    phone: '0961122334',
    email: 'caritas.zhy@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zhy_soc',
    name: 'Департамент соцзахисту Житомирської ОДА',
    region: 'Zhytomyr',
    address: 'м. Житомир, майдан Корольова, 1',
    lat: 50.2520,
    lng: 28.6600,
    category: 'Dержавна соціальна служба',
    services: 'Державні виплати, субсидії',
    phone: '(0412) 47-47-47',
    email: 'soczah.zhy@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zhy_veteran_space',
    name: 'Житомирський ветеранський простір',
    region: 'Zhytomyr',
    address: 'м. Житомир, вул. Перемоги, 2',
    lat: 50.2600,
    lng: 28.6500,
    category: 'Соціальний захист',
    services: 'Юридична, психологічна, соціальна допомога ветеранам',
    phone: '0677890123',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'zhy_children_center',
    name: 'Центр соціально-психологічної реабілітації дітей',
    region: 'Zhytomyr',
    address: 'м. Житомир, вул. Покровська, 96',
    lat: 50.2650,
    lng: 28.6800,
    category: 'Dержавна соціальна служба',
    services: 'Реабілітація дітей, які опинились у складних життєвих обставинах',
    phone: '0412123456',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- MYKOLAIV REGION (From CSV) ---
  {
    id: 'myk_dms',
    name: 'Управління ДМС у Миколаївській області',
    region: 'Mykolaiv',
    address: 'вул. Космонавтів, 144, м. Миколаїв, 54031',
    lat: 46.9531,
    lng: 32.0298,
    category: 'Dержавна соціальна служба',
    services: 'Оформлення паспортів, довідок, питань громадянства та міграції',
    phone: '(0512) 37-40-07',
    email: 'mykolaiv@dmsu.gov.ua',
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
    category: 'Dержавна соціальна служба',
    services: 'Реалізація державної політики у сфері соціального захисту, захист прав дітей',
    phone: '0512500000',
    email: 'nssu.myk@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://nssu.gov.ua/domashnye-nasilstvo/specializovani-sluzhbi-pidtrimki/mikolayivska-oblast'
  },
  {
    id: 'myk_dept_soc',
    name: 'Департамент соціального захисту населення Миколаївської ОВА',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, вул. Фалєєвська, 7',
    lat: 46.9700,
    lng: 32.0000,
    category: 'Dержавна соціальна служба',
    services: 'Соціальний захист населення, допомога ВПО, пільги, субсидії',
    phone: '0512760100',
    email: 'soczah.myk@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://ukrainian.city/oblast/mykolayivska'
  },
  {
    id: 'myk_vol_ua',
    name: 'Міжнародний благодійний фонд «Volunteer ua»',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, вул. Московська, 16',
    lat: 46.9800,
    lng: 31.9900,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, підтримка постраждалих від війни, волонтерські ініціативи',
    phone: '0991234567',
    email: 'contact@volunteer.mk.ua',
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
    email: 'info@300mykolayiv.org',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://www.300mykolayiv.org/'
  },
  {
    id: 'myk_phoenix',
    name: 'ГО «Фенікс» (допомога бездомним тваринам)',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, вул. Садова, 12',
    lat: 46.9600,
    lng: 31.9800,
    category: 'Благодійна організація',
    services: 'Порятунок, лікування та прилаштування безпритульних тварин',
    phone: '0671112233',
    email: 'fenix.myk@example.com',
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
    phone: '0800111222',
    email: 'info@eleos.com.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://map.eleos.com.ua/'
  },
  {
    id: 'myk_shelter_inactive',
    name: 'Тимчасові шелтери для переселенців (Архів)',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, пр. Центральний, 1',
    lat: 46.9750,
    lng: 31.9500,
    category: 'Шелтер/Прихисток',
    services: 'Тимчасове розміщення (об\'єкт не використовується станом на 2025)',
    phone: '0512998877',
    email: '',
    status: 'Inactive',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://www.nikpravda.com.ua/pobudovani-sheltery-dlya-pereselentsiv-vyyavylys-nepotribnymy/'
  },
  {
    id: 'myk_legal_aid',
    name: 'Миколаївський центр безоплатної правової допомоги',
    region: 'Mykolaiv',
    address: 'м. Миколаїв, вул. Декабристів, 41/12',
    lat: 46.9730,
    lng: 32.0050,
    category: 'Юридична допомога',
    services: 'Безоплатна правова допомога, консультації, представництво в суді',
    phone: '0800213103',
    email: 'mykolaiv.legal@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://legalaid.gov.ua/'
  },

  // --- KHERSON REGION (From CSV) ---
  {
    id: 'khe_soc_center',
    name: 'Херсонський обласний центр соціальних служб',
    region: 'Kherson',
    address: 'м. Херсон, вул. Потьомкінська, 33',
    lat: 46.6354,
    lng: 32.6169,
    category: 'Dержавна соціальна служба',
    services: 'Соціальна робота з сім\'ями, дітьми та молоддю',
    phone: '0552490101',
    email: 'ocsssdm.ks@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://ocsssdm.ks.ua/'
  },
  {
    id: 'khe_dept_soc',
    name: 'Департамент соціального розвитку Херсонської ОДА',
    region: 'Kherson',
    address: 'м. Херсон, вул. Перекопська, 22',
    lat: 46.6400,
    lng: 32.6200,
    category: 'Dержавна соціальна служба',
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
    category: 'Dержавна соціальна служба',
    services: 'Паспортні послуги, відновлення документів',
    phone: '(066) 641-47-05',
    email: 'kherson@dmsu.gov.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://dmsu.gov.ua/kherson'
  },
  {
    id: 'khe_support',
    name: 'БФ "Сапорт Херсон"',
    region: 'Kherson',
    address: 'м. Херсон, вул. Суворова, 1',
    lat: 46.6300,
    lng: 32.6100,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога жителям деокупованих територій',
    phone: '0971234567',
    email: 'support.kherson@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://philanthropyinukraine.org/platform/list/bf-saport-kherson'
  },
  {
    id: 'khe_mayak',
    name: 'БФ "Маяк відродження"',
    region: 'Kherson',
    address: 'м. Херсон, вул. Ушакова, 35',
    lat: 46.6320,
    lng: 32.6150,
    category: 'Благодійна організація',
    services: 'Допомога дітям, евакуація, відновлення житла',
    phone: '0669876543',
    email: 'mayak.kherson@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://vgoru.org/istoriyi/vid-zasittia-vikon-do-evakuaciyi-i-organizaciyi-dozvillia-ditei-dopomoga-xersonciam-vid-volonteriv-i-blagodiinikiv'
  },
  {
    id: 'khe_shelters_active',
    name: 'Тимчасові шелтери у Херсоні',
    region: 'Kherson',
    address: 'м. Херсон, вул. Залаегерсег, 12 (одна з локацій)',
    lat: 46.6380,
    lng: 32.6050,
    category: 'Шелтер/Прихисток',
    services: 'Тимчасовий прихисток для тих, хто втратив житло (4 діючих локації)',
    phone: '0552123456',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://suspilne.media/kherson/1051811-zitta-u-selteri-ak-ti-hto-vtrativ-zitlo-znajsli-timcasovij-prihistok-u-hersoni/'
  },
  {
    id: 'khe_ostriv',
    name: 'Прихистки для евакуйованих (мкрн Острів)',
    region: 'Kherson',
    address: 'м. Херсон, мкрн Острів, вул. Дорофєєва, 1',
    lat: 46.6150,
    lng: 32.6000,
    category: 'Шелтер/Прихисток',
    services: 'Евакуаційні шелтери для жителів небезпечних районів',
    phone: '0552654321',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://www.radiosvoboda.org/a/istoriyi-khersontsiv-ostriv-shelter/33555733.html'
  },
  {
    id: 'khe_volunteer_center',
    name: 'Херсонський волонтерський центр',
    region: 'Kherson',
    address: 'м. Херсон, пл. Свободи, 1',
    lat: 46.6430,
    lng: 32.6000,
    category: 'Волонтерська організація',
    services: 'Розподіл гуманітарної допомоги, координація евакуації',
    phone: '0961234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'khe_psych_support',
    name: 'Центр психологічної допомоги "Разом"',
    region: 'Kherson',
    address: 'м. Херсон, вул. Гімназична, 24',
    lat: 46.6370,
    lng: 32.6250,
    category: 'Психологічна підтримка',
    services: 'Індивідуальні та групові психологічні консультації',
    phone: '0501112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- KYIV REGION ---
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
    category: 'Dержавна соціальна служба',
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
  {
    id: 'kyiv_caritas',
    name: 'Карітас Київ',
    region: 'Kyiv',
    address: 'м. Київ, вул. Микитенка, 7Б',
    lat: 50.4850,
    lng: 30.6000,
    category: 'Благодійна організація',
    services: 'Соціальні центри, гуманітарна допомога, робота з дітьми',
    phone: '0671112233',
    email: 'caritas.kyiv@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kyiv_veteran_hub',
    name: 'ВетеранХаб Київ',
    region: 'Kyiv',
    address: 'м. Київ, вул. Басейна, 12',
    lat: 50.4430,
    lng: 30.5250,
    category: 'Соціальний захист',
    services: 'Підтримка ветеранів та їхніх родин, психологічна допомога',
    phone: '0991234567',
    email: 'veteranhub.kyiv@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kyiv_vpo_center',
    name: 'Київський центр допомоги ВПО',
    region: 'Kyiv',
    address: 'м. Київ, вул. Шолуденка, 33/19',
    lat: 50.4580,
    lng: 30.4850,
    category: 'Допомога ВПО',
    services: 'Консультації, житло, інтеграція для переселенців',
    phone: '0441112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kyiv_doctors_without_borders',
    name: 'Лікарі без кордонів (Київ)',
    region: 'Kyiv',
    address: 'м. Київ, вул. Саксаганського, 100',
    lat: 50.4400,
    lng: 30.5000,
    category: 'Медична допомога',
    services: 'Медична допомога у надзвичайних ситуаціях, психологічна підтримка',
    phone: '',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- LVIV REGION ---
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
    email: 'unbroken@example.com',
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
  {
    id: 'lviv_malta',
    name: 'Мальтійська служба допомоги',
    region: 'Lviv',
    address: 'м. Львів, вул. Богомольця, 8',
    lat: 49.8370,
    lng: 24.0350,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, польова кухня, медичний супровід',
    phone: '0322403232',
    email: 'malta.lviv@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'lviv_city_council_soc',
    name: 'Департамент соціальної політики ЛМР',
    region: 'Lviv',
    address: 'м. Львів, пр. Свободи, 6',
    lat: 49.8400,
    lng: 24.0300,
    category: 'Dержавна соціальна служба',
    services: 'Соціальні виплати, програми для вразливих груп',
    phone: '0322975880',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'lviv_vpo_center',
    name: 'Центр підтримки ВПО (Львів)',
    region: 'Lviv',
    address: 'м. Львів, вул. Костюшка, 8',
    lat: 49.8380,
    lng: 24.0200,
    category: 'Допомога ВПО',
    services: 'Інформаційна підтримка, юридичні консультації, допомога з поселенням',
    phone: '0671234567',
    email: 'vpo.lviv@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'lviv_right_to_protection',
    name: 'БФ «Право на захист» (Львів)',
    region: 'Lviv',
    address: 'м. Львів, вул. Ковжуна, 11',
    lat: 49.8410,
    lng: 24.0150,
    category: 'Благодійна організація',
    services: 'Юридична допомога, захист прав ВПО',
    phone: '0681112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- KHARKIV REGION ---
  {
    id: 'kharkiv_soc_protection',
    name: 'Управління соціального захисту населення (Шевченківський район)',
    region: 'Kharkiv',
    address: 'м. Харків, вул. Тобольська, 42',
    lat: 50.0300,
    lng: 36.2200,
    category: 'Dержавна соціальна служба',
    services: 'Державна допомога, реєстрація ВПО, субсидії',
    phone: '0577252500',
    email: 'soczah.kh@example.com',
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
    phone: '0671234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kharkiv_caritas',
    name: 'Карітас Харків',
    region: 'Kharkiv',
    address: 'м. Харків, вул. Молочна, 3',
    lat: 49.9800,
    lng: 36.2500,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, кризова підтримка',
    phone: '0577660990',
    email: 'caritas.kh@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kharkiv_vpo_center',
    name: 'Центр допомоги ВПО «Саме тут»',
    region: 'Kharkiv',
    address: 'м. Харків, вул. Пушкінська, 22',
    lat: 49.9950,
    lng: 36.2350,
    category: 'Допомога ВПО',
    services: 'Юридичні консультації, психологічна допомога, гуманітарні набори',
    phone: '0931234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kharkiv_redcross',
    name: 'Червоний Хрест Харків',
    region: 'Kharkiv',
    address: 'м. Харків, вул. Трінклера, 6',
    lat: 50.0000,
    lng: 36.2300,
    category: 'Благодійна організація',
    services: 'Перша допомога, психосоціальна підтримка, навчання населення',
    phone: '0577000000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'kharkiv_gromada',
    name: 'ГО «Громада Харків»',
    region: 'Kharkiv',
    address: 'м. Харків, пл. Конституції, 1',
    lat: 49.9930,
    lng: 36.2290,
    category: 'Громадська організація',
    services: 'Адвокація, розвиток громади, правовий захист',
    phone: '0971112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- ODESA REGION ---
  {
    id: 'odesa_monsters',
    name: 'БФ «Корпорація Монстрів»',
    region: 'Odesa',
    address: 'м. Одеса, пров. Онілової, 16',
    lat: 46.4800,
    lng: 30.7300,
    category: 'Благодійна організація',
    services: 'Медична допомога, гуманітарна підтримка, допомога військовим та лікарням',
    phone: '0487771234',
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
  {
    id: 'odesa_tenth_april',
    name: 'ГО «Десяте квітня»',
    region: 'Odesa',
    address: 'м. Одеса, вул. Героїв Крут, 15',
    lat: 46.4500,
    lng: 30.7200,
    category: 'Благодійна організація',
    services: 'Юридична допомога біженцям та ВПО, соціальний захист',
    phone: '0 800 33 28 58',
    email: 'info@tenthapril.org.ua',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://tenthapril.org.ua'
  },
  {
    id: 'odesa_city_soc',
    name: 'Департамент праці та соцполітики ОМР',
    region: 'Odesa',
    address: 'м. Одеса, вул. Косовська, 2Д',
    lat: 46.4600,
    lng: 30.7400,
    category: 'Dержавна соціальна служба',
    services: 'Соціальні виплати, допомога ВПО, пільги',
    phone: '0487059300',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'odesa_veteran_space',
    name: 'Одеський простір для ветеранів',
    region: 'Odesa',
    address: 'м. Одеса, вул. Канатна, 83',
    lat: 46.4750,
    lng: 30.7450,
    category: 'Соціальний захист',
    services: 'Психологічна допомога, юридичні консультації, соціальна адаптація',
    phone: '0979998877',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'odesa_redcross',
    name: 'Червоний Хрест Одеса',
    region: 'Odesa',
    address: 'м. Одеса, пров. Мукачівський, 6/1',
    lat: 46.4780,
    lng: 30.7280,
    category: 'Благодійна організація',
    services: 'Пункти обігріву, видача гуманітарної допомоги, перша допомога',
    phone: '0487228787',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- IVANO-FRANKIVSK REGION ---
  {
    id: 'if_warm_city',
    name: 'Тепле Місто',
    region: 'IvanoFrankivsk',
    address: 'м. Івано-Франківськ, вул. Тринітарська, 11',
    lat: 48.9200,
    lng: 24.7100,
    category: 'Благодійна організація',
    services: 'Координація волонтерів, підтримка переселенців, соціальні ініціативи',
    phone: '0671234567',
    email: 'info@warm.city',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'if_caritas',
    name: 'Карітас Івано-Франківськ',
    region: 'IvanoFrankivsk',
    address: 'м. Івано-Франківськ, вул. Крихівецька, 102',
    lat: 48.9000,
    lng: 24.6800,
    category: 'Благодійна організація',
    services: 'Догляд вдома, гуманітарна допомога, притулок для вразливих груп',
    phone: '0342721010',
    email: 'caritas.if@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'if_soc_center',
    name: 'Івано-Франківський міський центр соц. служб',
    region: 'IvanoFrankivsk',
    address: 'м. Івано-Франківськ, вул. Бельведерська, 32',
    lat: 48.9250,
    lng: 24.7050,
    category: 'Dержавна соціальна служба',
    services: 'Соціальний супровід сімей, допомога дітям та молоді',
    phone: '0342750100',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'if_vpo_hub',
    name: 'Гуманітарний штаб для ВПО (Івано-Франківськ)',
    region: 'IvanoFrankivsk',
    address: 'м. Івано-Франківськ, вул. Галицька, 21',
    lat: 48.9210,
    lng: 24.7080,
    category: 'Допомога ВПО',
    services: 'Видача продуктових наборів, одягу, психологічна підтримка',
    phone: '0661112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- VOLYN REGION ---
  {
    id: 'volyn_caritas',
    name: 'Карітас-Волинь',
    region: 'Volyn',
    address: 'м. Луцьк, вул. Карпенка-Карого, 14А',
    lat: 50.7500,
    lng: 25.3300,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, соціальна їдальня',
    phone: '0332720000',
    email: 'caritas.volyn@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'lutsk_soc',
    name: 'Департамент соцполітики Луцької міськради',
    region: 'Volyn',
    address: 'м. Луцьк, пр. Волі, 4А',
    lat: 50.7470,
    lng: 25.3250,
    category: 'Dержавна соціальна служба',
    services: 'Соціальні виплати, допомога ВПО',
    phone: '0332777777',
    email: 'socpol.lutsk@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'volyn_redcross',
    name: 'Червоний Хрест Волинь',
    region: 'Volyn',
    address: 'м. Луцьк, вул. Словацького, 12',
    lat: 50.7450,
    lng: 25.3350,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, навчання першій допомозі',
    phone: '0332720000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'volyn_veteran_support',
    name: 'Волинський фонд підтримки ветеранів',
    region: 'Volyn',
    address: 'м. Луцьк, вул. Винниченка, 14',
    lat: 50.7480,
    lng: 25.3200,
    category: 'Соціальний захист',
    services: 'Правова допомога, психологічна реабілітація ветеранів',
    phone: '0681112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- RIVNE REGION ---
  {
    id: 'rivne_rokada',
    name: 'БФ «Рокада» (Рівне)',
    region: 'Rivne',
    address: 'м. Рівне, вул. Соборна, 32',
    lat: 50.6200,
    lng: 26.2500,
    category: 'Благодійна організація',
    services: 'Соціальна адаптація ВПО, психологічна допомога',
    phone: '0671234567',
    email: 'rokada.rivne@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'rivne_soc',
    name: 'Управління праці та соцзахисту населення Рівного',
    region: 'Rivne',
    address: 'м. Рівне, вул. Соборна, 12',
    lat: 50.6190,
    lng: 26.2510,
    category: 'Dержавна соціальна служба',
    services: 'Державні допомоги, субсидії',
    phone: '0362266000',
    email: 'soczah.rivne@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'rivne_caritas',
    name: 'Карітас Рівне',
    region: 'Rivne',
    address: 'м. Рівне, вул. С. Бандери, 66',
    lat: 50.6250,
    lng: 26.2600,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, допомога дітям та молоді',
    phone: '0362400000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'rivne_vpo_support',
    name: 'Рівненський обласний центр допомоги ВПО',
    region: 'Rivne',
    address: 'м. Рівне, вул. Степана Бандери, 77',
    lat: 50.6180,
    lng: 26.2450,
    category: 'Допомога ВПО',
    services: 'Реєстрація ВПО, консультації, пошук житла',
    phone: '0961112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- SUMY REGION ---
  {
    id: 'sumy_proliska',
    name: 'Гуманітарна місія «Проліска» (Суми)',
    region: 'Sumy',
    address: 'м. Суми, вул. Петропавлівська, 50',
    lat: 50.9070,
    lng: 34.8000,
    category: 'Благодійна організація',
    services: 'Евакуація, матеріальна допомога, будівельні матеріали',
    phone: '0671234567',
    email: 'proliska.sumy@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'sumy_center',
    name: 'Сумський міський центр соціальних служб',
    region: 'Sumy',
    address: 'м. Суми, вул. Харківська, 42',
    lat: 50.9100,
    lng: 34.8200,
    category: 'Dержавна соціальна служба',
    services: 'Робота з сім\'ями у СЖО, психологічна підтримка',
    phone: '0542777777',
    email: 'soc.sumy@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'sumy_redcross',
    name: 'Червоний Хрест Суми',
    region: 'Sumy',
    address: 'м. Суми, вул. Іллінська, 4',
    lat: 50.9050,
    lng: 34.7950,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, пункти незламності',
    phone: '0542600000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'sumy_veteran_support',
    name: 'Сумська обласна спілка ветеранів',
    region: 'Sumy',
    address: 'м. Суми, вул. Соборна, 30',
    lat: 50.9080,
    lng: 34.7900,
    category: 'Соціальний захист',
    services: 'Соціальна підтримка ветеранів та інвалідів війни',
    phone: '0542112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- TERNOPIL REGION ---
  {
    id: 'tern_caritas',
    name: 'Карітас Тернопіль',
    region: 'Ternopil',
    address: 'м. Тернопіль, вул. Замонастирська, 1',
    lat: 49.5500,
    lng: 25.6000,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, благодійна їдальня, домашня опіка',
    phone: '0352520000',
    email: 'caritas.ternopil@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'tern_soc_center',
    name: 'Тернопільський міський центр соціальних служб',
    region: 'Ternopil',
    address: 'м. Тернопіль, вул. Коперника, 1',
    lat: 49.5550,
    lng: 25.5900,
    category: 'Dержавна соціальна служба',
    services: 'Соціальні послуги для сімей, дітей та молоді',
    phone: '0352220000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'tern_volunteer_hub',
    name: 'Волонтерський штаб Тернополя',
    region: 'Ternopil',
    address: 'м. Тернопіль, вул. Грушевського, 1',
    lat: 49.5480,
    lng: 25.5950,
    category: 'Волонтерська організація',
    services: 'Збір та розподіл гуманітарної допомоги',
    phone: '0981112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- CHERNIVTSI REGION ---
  {
    id: 'chern_redcross',
    name: 'Червоний Хрест Чернівці',
    region: 'Chernivtsi',
    address: 'м. Чернівці, вул. Г. Майдану, 31',
    lat: 48.2900,
    lng: 25.9300,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, навчання першій допомозі',
    phone: '0372580000',
    email: 'redcross.chern@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'chern_rokada',
    name: 'БФ «Рокада» (Чернівці)',
    region: 'Chernivtsi',
    address: 'м. Чернівці, вул. Головна, 222',
    lat: 48.2950,
    lng: 25.9400,
    category: 'Благодійна організація',
    services: 'Психологічна підтримка, інтеграція ВПО',
    phone: '0951112233',
    email: 'rokada.chern@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'chern_soc_dept',
    name: 'Департамент соціальної політики Чернівецької ОДА',
    region: 'Chernivtsi',
    address: 'м. Чернівці, вул. Грушевського, 1',
    lat: 48.2920,
    lng: 25.9350,
    category: 'Dержавна соціальна служба',
    services: 'Державні допомоги, субсидії, програми соцзахисту',
    phone: '0372550000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'chern_vpo_center',
    name: 'Центр допомоги ВПО (Чернівці)',
    region: 'Chernivtsi',
    address: 'м. Чернівці, вул. Небесної Сотні, 1',
    lat: 48.2880,
    lng: 25.9280,
    category: 'Допомога ВПО',
    services: 'Юридичні консультації, допомога з адаптацією',
    phone: '0671234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- KHMELNYTSKYI REGION ---
  {
    id: 'khm_caritas',
    name: 'Карітас Хмельницький',
    region: 'Khmelnytskyi',
    address: 'м. Хмельницький, вул. Зарічанська, 10/3',
    lat: 49.4300,
    lng: 27.0000,
    category: 'Благодійна організація',
    services: 'Центр для дітей та молоді, гуманітарна допомога',
    phone: '0382700000',
    email: 'caritas.khm@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'khm_soc',
    name: 'Управління праці та соцзахисту Хмельницької міськради',
    region: 'Khmelnytskyi',
    address: 'м. Хмельницький, вул. Проскурівського підпілля, 32',
    lat: 49.4200,
    lng: 26.9800,
    category: 'Dержавна соціальна служба',
    services: 'Соціальні виплати, допомога малозабезпеченим',
    phone: '0382790000',
    email: 'soczah.khm@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'khm_veteran_hub',
    name: 'Хмельницький ветеранський хаб',
    region: 'Khmelnytskyi',
    address: 'м. Хмельницький, вул. Свободи, 4',
    lat: 49.4250,
    lng: 26.9850,
    category: 'Соціальний захист',
    services: 'Комплексна підтримка ветеранів війни',
    phone: '0971112233',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'khm_vpo_center',
    name: 'Центр допомоги ВПО (Хмельницький)',
    region: 'Khmelnytskyi',
    address: 'м. Хмельницький, вул. Кам\'янецька, 2',
    lat: 49.4180,
    lng: 26.9820,
    category: 'Допомога ВПО',
    services: 'Інформаційні послуги, юридична підтримка, гуманітарна допомога',
    phone: '0681234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- CHERNIHIV REGION ---
  {
    id: 'che_redcross',
    name: 'Червоний Хрест Чернігів',
    region: 'Chernihiv',
    address: 'м. Чернігів, пр-т Миру, 44',
    lat: 51.4900,
    lng: 31.2900,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, відновлення житла',
    phone: '0462678900',
    email: 'redcross.che@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'che_rokada',
    name: 'БФ «Рокада» (Чернігів)',
    region: 'Chernihiv',
    address: 'м. Чернігів, вул. Київська, 14',
    lat: 51.5000,
    lng: 31.3000,
    category: 'Благодійна організація',
    services: 'Соціальний супровід, психологічна допомога',
    phone: '0961112233',
    email: 'rokada.che@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'che_soc_dept',
    name: 'Департамент соціальної політики Чернігівської ОДА',
    region: 'Chernihiv',
    address: 'м. Чернігів, пр-т Миру, 14',
    lat: 51.4950,
    lng: 31.2950,
    category: 'Dержавна соціальна служба',
    services: 'Державні виплати, допомога ВПО, пенсійні питання',
    phone: '0462677777',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'che_vpo_support',
    name: 'Чернігівський обласний центр допомоги ВПО',
    region: 'Chernihiv',
    address: 'м. Чернігів, вул. Мстиславська, 18',
    lat: 51.4880,
    lng: 31.2920,
    category: 'Допомога ВПО',
    services: 'Консультації з питань ВПО, гуманітарна допомога',
    phone: '0671234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- POLTAVA REGION ---
  {
    id: 'polt_caritas',
    name: 'Карітас Полтава',
    region: 'Poltava',
    address: 'м. Полтава, вул. Пилипа Орлика, 20/1',
    lat: 49.5800,
    lng: 34.5500,
    category: 'Благодійна організація',
    services: 'Гуманітарна допомога, кризовий центр',
    phone: '0532610000',
    email: 'caritas.poltava@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'polt_light_of_hope',
    name: 'БО «Світло надії»',
    region: 'Poltava',
    address: 'м. Полтава, вул. С. Петлюри, 28',
    lat: 49.5900,
    lng: 34.5600,
    category: 'Благодійна організація',
    services: 'Притулок для жінок, протидія домашньому насильству, допомога ВПО',
    phone: '0532112233',
    email: 'info@svitlonadiyi.org',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'polt_soc_dept',
    name: 'Департамент соціального захисту населення Полтавської ОДА',
    region: 'Poltava',
    address: 'м. Полтава, вул. Соборності, 45',
    lat: 49.5850,
    lng: 34.5450,
    category: 'Dержавна соціальна служба',
    services: 'Державні допомоги, субсидії, соціальний захист дітей',
    phone: '0532560000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'polt_vpo_hub',
    name: 'Регіональний координаційний центр ВПО (Полтава)',
    region: 'Poltava',
    address: 'м. Полтава, вул. Стрітенська, 22',
    lat: 49.5820,
    lng: 34.5580,
    category: 'Допомога ВПО',
    services: 'Координація допомоги, психологічна підтримка, житлові питання',
    phone: '0661234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- KIROVOHRAD REGION ---
  {
    id: 'krop_tenth_april',
    name: 'ГО «Десяте квітня» (Кропивницький)',
    region: 'Kirovohrad',
    address: 'м. Кропивницький, вул. Єгорова, 40',
    lat: 48.5100,
    lng: 32.2600,
    category: 'Благодійна організація',
    services: 'Юридична та гуманітарна допомога ВПО',
    phone: '0671234567',
    email: 'tenthapril.krop@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'krop_redcross',
    name: 'Червоний Хрест Кіровоградщини',
    region: 'Kirovohrad',
    address: 'м. Кропивницький, вул. Гоголя, 98',
    lat: 48.5050,
    lng: 32.2700,
    category: 'Благодійна організація',
    services: 'Видача гуманітарної допомоги, навчання населення',
    phone: '0522330000',
    email: 'redcross.krop@example.com',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'krop_soc_dept',
    name: 'Департамент соціальної політики Кропивницької міськради',
    region: 'Kirovohrad',
    address: 'м. Кропивницький, вул. Преображенська, 2',
    lat: 48.5080,
    lng: 32.2650,
    category: 'Dержавна соціальна служба',
    services: 'Соціальні послуги, субсидії, допомога сім\'ям',
    phone: '0522320000',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },
  {
    id: 'krop_vpo_support',
    name: 'Координаційний центр допомоги ВПО (Кропивницький)',
    region: 'Kirovohrad',
    address: 'м. Кропивницький, вул. Велика Перспективна, 41',
    lat: 48.5070,
    lng: 32.2580,
    category: 'Допомога ВПО',
    services: 'Реєстрація ВПО, юридичні консультації, психологічна допомога',
    phone: '0681234567',
    email: '',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0
  },

  // --- LUHANSK REGION (Example only, likely remote support) ---
  {
    id: 'luh_proliska',
    name: 'Гуманітарна місія «Проліска» (Луганщина - дистанційно)',
    region: 'All', // Marked as 'All' as primary support is remote/across regions for this context
    address: 'Дистанційна підтримка для Луганської області',
    lat: 48.9000,
    lng: 38.4500,
    category: 'Благодійна організація',
    services: 'Евакуація, матеріальна допомога, психосоціальна підтримка',
    phone: '0 800 334 620',
    email: 'info@proliska.org',
    status: 'Active',
    driveFolderUrl: '',
    budget: 0,
    website: 'https://proliska.org/'
  },
  {
    id: 'luh_vpo_online',
    name: 'Онлайн-центр для ВПО Луганщини',
    region: 'All',
    address: 'Онлайн-платформа',
    lat: 48.9000,
    lng: 38.5000, // Added missing lng
    category: 'Допомога ВПО', // Added missing category
    services: 'Юридичні консультації, психологічна допомога, пошук житла онлайн', // Added missing services
    phone: '',    // Added missing phone
    email: '',    // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0, // Added missing budget
    website: 'https://lg.gov.ua/online-centre'
  },

  // --- DONETSK REGION (Example only, likely remote support) ---
  {
    id: 'don_caritas',
    name: 'Карітас Маріуполь (дистанційно)',
    region: 'All', // Marked as 'All' as primary support is remote/across regions for this context
    address: 'Дистанційна підтримка для Донецької області',
    lat: 47.1000,
    lng: 37.5000, // Added missing lng
    category: 'Благодійна організація', // Added missing category
    services: 'Гуманітарна допомога, психологічна підтримка, догляд вдома', // Added missing services
    phone: '0671234567', // Added missing phone
    email: 'caritas.mariupol@example.com', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },
  {
    id: 'don_vpo_center',
    name: 'Донецький обласний центр підтримки ВПО',
    region: 'All',
    address: 'Онлайн / Гаряча лінія',
    lat: 47.0500,
    lng: 37.4500, // Added missing lng
    category: 'Допомога ВПО', // Added missing category
    services: 'Консультації з питань ВПО, реєстрація, соціальний супровід', // Added missing services
    phone: '0951112233', // Added missing phone
    email: '', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },

  // --- CHERKASY REGION ---
  {
    id: 'cherk_caritas',
    name: 'Карітас Черкаси',
    region: 'All',
    address: 'м. Черкаси, вул. Надпільна, 222',
    lat: 49.4440,
    lng: 32.0590, // Added missing lng
    category: 'Благодійна організація', // Added missing category
    services: 'Гуманітарна допомога, дитячі простори, соціальні програми', // Added missing services
    phone: '0472777777', // Added missing phone
    email: 'caritas.cherkasy@example.com', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },
  {
    id: 'cherk_soc_dept',
    name: 'Департамент соціальної політики Черкаської ОДА',
    region: 'All',
    address: 'м. Черкаси, б-р Шевченка, 185',
    lat: 49.4450,
    lng: 32.0600, // Added missing lng
    category: 'Dержавна соціальна служба', // Added missing category
    services: 'Державні виплати, субсидії, соціальні послуги для населення', // Added missing services
    phone: '0472333333', // Added missing phone
    email: '', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },

  // --- VINNYTSIA REGION ---
  {
    id: 'vin_caritas',
    name: 'Карітас Вінниця',
    region: 'All',
    address: 'м. Вінниця, вул. Соборна, 22',
    lat: 49.2320,
    lng: 28.4680, // Added missing lng
    category: 'Благодійна організація', // Added missing category
    services: 'Гуманітарна допомога, допомога багатодітним сім\'ям, людям похилого віку', // Added missing services
    phone: '0432678900', // Added missing phone
    email: 'caritas.vin@example.com', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },
  {
    id: 'vin_vpo_center',
    name: 'Вінницький обласний центр підтримки ВПО',
    region: 'All',
    address: 'м. Вінниця, вул. Стрілецька, 57',
    lat: 49.2300,
    lng: 28.4700, // Added missing lng
    category: 'Допомога ВПО', // Added missing category
    services: 'Реєстрація, консультації, допомога з житлом та працевлаштуванням', // Added missing services
    phone: '0432500000', // Added missing phone
    email: '', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },

  // --- ZAKARPATTIA REGION ---
  {
    id: 'zak_caritas',
    name: 'Карітас Закарпаття',
    region: 'All',
    address: 'м. Ужгород, пл. Поштова, 3',
    lat: 48.6250,
    lng: 22.2950, // Added missing lng
    category: 'Благодійна організація', // Added missing category
    services: 'Гуманітарна допомога, допомога дітям, людям з інвалідністю', // Added missing services
    phone: '0312678900', // Added missing phone
    email: 'caritas.zak@example.com', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },
  {
    id: 'zak_vpo_hub',
    name: 'Закарпатський хаб для ВПО',
    region: 'All',
    address: 'м. Ужгород, пл. Народна, 4',
    lat: 48.627,
    lng: 22.3000, // Added missing lng
    category: 'Допомога ВПО', // Added missing category
    services: 'Консультації, житло, інтеграція для переселенців', // Added missing services
    phone: '0312610000', // Added missing phone
    email: '', // Added missing email
    status: 'Active', // Added missing status
    driveFolderUrl: '', // Added missing driveFolderUrl
    budget: 0 // Added missing budget
  },
];
