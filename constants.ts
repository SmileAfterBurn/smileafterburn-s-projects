import { RegionName, RemoteSupportActor } from './types';
import { INITIAL_ORGANIZATIONS } from './organizations';
export const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1ev98ifed1h8xc16KcWaOmvaky8I9StuE0-6w7UPG4K4/edit?gid=1212063265#gid=1212063265';
// РџСЂСЏРјРµ РїРѕСЃРёР»Р°РЅРЅСЏ РЅР° РїР°РїРєСѓ Google Drive РґР»СЏ РґРѕРєСѓРјРµРЅС‚С–РІ С‚Р° СЂРµРіР»Р°РјРµРЅС‚С–РІ
export const DRIVE_URL = 'https://drive.google.com/drive/folders/1ndkLzFOLEOGIZOwh0Ya2cZuGUMpElwn_?usp=sharing';
export const REFERRAL_DRIVE_URL = 'https://drive.google.com/drive/folders/1ndkLzFOLEOGIZOwh0Ya2cZuGUMpElwn_?usp=sharing';

export { INITIAL_ORGANIZATIONS };

// Config for regions with Icons, Gradients and Slogans matching the screenshot design
export const REGION_CONFIG: Record<RegionName, { center: [number, number], zoom: number, label: string, icon: string, gradient: string, description: string, customImage?: string }> = {
  'All': {
    center: [48.3794, 31.1656],
    zoom: 6,
    label: 'Р’СЃСЏ РЈРєСЂР°С—РЅР°',
    icon: 'Tryzub', 
    gradient: 'from-slate-700 to-slate-900',
    description: 'Р„Р”РРќРђ РљР РђР‡РќРђ'
  },
  'Odesa': {
    center: [46.4825, 30.7233],
    zoom: 12,
    label: 'РћРґРµСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Anchor',
    gradient: 'from-sky-400 to-cyan-500',
    description: 'РџР•Р Р›РРќРђ Р‘Р†Р›РЇ РњРћР РЇ'
  },
  'Mykolaiv': {
    center: [46.9750, 31.9946],
    zoom: 12,
    label: 'РњРёРєРѕР»Р°С—РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Ship',
    gradient: 'from-indigo-400 to-violet-500',
    description: 'РњР†РЎРўРћ РќРђ РҐР’РР›Р†'
  },
  'Kherson': {
    center: [46.6354, 32.6169],
    zoom: 12,
    label: 'РҐРµСЂСЃРѕРЅСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Sun',
    gradient: 'from-lime-400 to-green-500',
    description: 'РЎРћРќРЇР§РќРР™ РљР РђР™'
  },
  'Dnipro': {
    center: [48.4647, 35.0462],
    zoom: 11,
    label: 'Р”РЅС–РїСЂРѕРїРµС‚СЂРѕРІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Building2',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'РЎР•Р Р¦Р• Р†РќР”РЈРЎРўР Р†Р‡'
  },
  'Zaporizhzhia': {
    center: [47.8388, 35.1396],
    zoom: 11,
    label: 'Р—Р°РїРѕСЂС–Р·СЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Zap',
    gradient: 'from-orange-500 to-red-500',
    description: 'РљРћР—РђР¦Р¬РљРђ РЎРР›Рђ'
  },
  'Kyiv': {
    center: [50.4501, 30.5234],
    zoom: 11,
    label: 'РљРёС—РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Church',
    gradient: 'from-emerald-500 to-teal-700',
    description: 'РЎР•Р Р¦Р• РЈРљР РђР‡РќР'
  },
  'Lviv': {
    center: [49.8397, 24.0297],
    zoom: 12,
    label: 'Р›СЊРІС–РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Coffee',
    gradient: 'from-amber-700 to-orange-800',
    description: 'РњР†РЎРўРћ Р›Р•Р’Рђ'
  },
  'Kharkiv': {
    center: [49.9935, 36.2304],
    zoom: 11,
    label: 'РҐР°СЂРєС–РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'GraduationCap',
    gradient: 'from-green-500 to-emerald-700',
    description: 'РњР†РЎРўРћ РњРћР›РћР”Р†'
  },
  'Vinnytsia': {
    center: [49.2331, 28.4682],
    zoom: 12,
    label: 'Р’С–РЅРЅРёС†СЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Waves',
    gradient: 'from-indigo-500 to-purple-600',
    description: 'РњР†РЎРўРћ Р¤РћРќРўРђРќР†Р’'
  },
  'Cherkasy': {
    center: [49.4444, 32.0598],
    zoom: 12,
    label: 'Р§РµСЂРєР°СЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Wheat',
    gradient: 'from-amber-500 to-yellow-600',
    description: 'РЎР•Р Р¦Р• РЈРљР РђР‡РќР'
  },
  'Volyn': {
    center: [50.7472, 25.3254],
    zoom: 12,
    label: 'Р’РѕР»РёРЅСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Trees',
    gradient: 'from-emerald-400 to-green-600',
    description: 'РљР РђР™ Р›Р†РЎР†Р’'
  },
  'Zhytomyr': {
    center: [50.2547, 28.6587],
    zoom: 12,
    label: 'Р–РёС‚РѕРјРёСЂСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Trees',
    gradient: 'from-green-600 to-emerald-800',
    description: 'РџРћР›Р†РЎР¬РљРР™ РљР РђР™'
  },
  'Rivne': {
    center: [50.6199, 26.2516],
    zoom: 12,
    label: 'Р С–РІРЅРµРЅСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Gem', 
    gradient: 'from-amber-400 to-yellow-600',
    description: 'Р‘РЈР РЁРўРРќРћР’РР™ РљР РђР™'
  },
  'Sumy': {
    center: [50.9077, 34.7981],
    zoom: 12,
    label: 'РЎСѓРјСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Wheat',
    gradient: 'from-yellow-400 to-lime-600',
    description: 'РљРћР—РђР¦Р¬РљРђ РљР РђР™'
  },
  'Ternopil': {
    center: [49.5535, 25.5948],
    zoom: 12,
    label: 'РўРµСЂРЅРѕРїС–Р»СЊСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Castle',
    gradient: 'from-teal-400 to-cyan-600',
    description: 'Р¤РђР™РќР• РњР†РЎРўРћ'
  },
  'Chernivtsi': {
    center: [48.2921, 25.9352],
    zoom: 12,
    label: 'Р§РµСЂРЅС–РІРµС†СЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Landmark',
    gradient: 'from-red-600 to-rose-700',
    description: 'РЈРљР РђР‡РќРЎР¬РљРР™ РџРђР РР–'
  },
  'Khmelnytskyi': {
    center: [49.4230, 26.9871],
    zoom: 12,
    label: 'РҐРјРµР»СЊРЅРёС†СЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Shield',
    gradient: 'from-indigo-500 to-blue-600',
    description: 'РџР РћРЎРўР†Р  РњРћР–Р›РР’РћРЎРўР•Р™'
  },
  'Chernihiv': {
    center: [51.4982, 31.2893],
    zoom: 12,
    label: 'Р§РµСЂРЅС–РіС–РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Church',
    gradient: 'from-slate-500 to-gray-700',
    description: 'РњР†РЎРўРћ Р›Р•Р“Р•РќР”'
  },
  'Poltava': {
    center: [49.5883, 34.5514],
    zoom: 11,
    label: 'РџРѕР»С‚Р°РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Flower2',
    gradient: 'from-yellow-300 to-orange-500',
    description: 'Р”РЈРҐРћР’РќРђ РЎРўРћР›РР¦РЇ'
  },
  'IvanoFrankivsk': {
    center: [48.9226, 24.7111],
    zoom: 12,
    label: 'Р†РІР°РЅРѕ-Р¤СЂР°РЅРєС–РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Mountain',
    gradient: 'from-cyan-500 to-blue-700',
    description: 'Р’РћР РћРўРђ РљРђР РџРђРў'
  },
  'Kirovohrad': {
    center: [48.5079, 32.2623],
    zoom: 12,
    label: 'РљС–СЂРѕРІРѕРіСЂР°РґСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ',
    icon: 'Wheat',
    gradient: 'from-yellow-500 to-amber-600',
    description: 'РЎР•Р Р¦Р• РЎРўР•РџРЈ'
  }
};

// --- Р”Р°РЅС– РґР»СЏ Р”РёСЃС‚Р°РЅС†С–Р№РЅРѕС— РїС–РґС‚СЂРёРјРєРё ---
export const REMOTE_SUPPORT_ACTORS: RemoteSupportActor[] = [
  {
    id: 'r1',
    name: 'РЈСЂСЏРґРѕРІР° РіР°СЂСЏС‡Р° Р»С–РЅС–СЏ',
    category: 'Р”РµСЂР¶Р°РІРЅС– РіР°СЂСЏС‡С– Р»С–РЅС–С—',
    phones: ['1545'],
    description: 'Р¦С–Р»РѕРґРѕР±РѕРІР° СѓСЂСЏРґРѕРІР° РіР°СЂСЏС‡Р° Р»С–РЅС–СЏ Р· СѓСЃС–С… РїРёС‚Р°РЅСЊ.',
    website: 'https://ukc.gov.ua/'
  },
  {
    id: 'r_dv_1',
    name: 'Р“Р°СЂСЏС‡Р° Р»С–РЅС–СЏ РїСЂРѕС‚РёРґС–С— РЅР°СЃРёР»СЊСЃС‚РІСѓ',
    category: 'РЎРѕС†С–Р°Р»СЊРЅРёР№ Р·Р°С…РёСЃС‚',
    phones: ['1547'],
    description: 'Р“Р°СЂСЏС‡Р° Р»С–РЅС–СЏ Р· РїРёС‚Р°РЅСЊ РїСЂРѕС‚РёРґС–С— С‚РѕСЂРіС–РІР»С– Р»СЋРґСЊРјРё, Р·Р°РїРѕР±С–РіР°РЅРЅСЏ С‚Р° РїСЂРѕС‚РёРґС–С— РґРѕРјР°С€РЅСЊРѕРјСѓ РЅР°СЃРёР»СЊСЃС‚РІСѓ. Р‘РµР·РєРѕС€С‚РѕРІРЅРѕ, Р°РЅРѕРЅС–РјРЅРѕ.',
    website: 'https://1547.ukc.gov.ua'
  },
  {
    id: 'r_dv_2',
    name: 'РћРЅР»Р°Р№РЅ-РїР»Р°С‚С„РѕСЂРјР° В«РђРІСЂРѕСЂР°В»',
    category: 'РџСЃРёС…РѕР»РѕРіС–С‡РЅР° РїС–РґС‚СЂРёРјРєР°',
    phones: [],
    description: 'РЎРїРµС†С–Р°Р»С–Р·РѕРІР°РЅР° РїСЃРёС…РѕС‚РµСЂР°РїРµРІС‚РёС‡РЅР° РїС–РґС‚СЂРёРјРєР° РѕСЃРѕР±Р°Рј, СЏРєС– Р·Р°Р·РЅР°Р»Рё РЅР°СЃРёР»СЊСЃС‚РІР°, РїРѕРІвЂ™СЏР·Р°РЅРѕРіРѕ Р· РІС–Р№РЅРѕСЋ (Р·РѕРєСЂРµРјР°, СЃРµРєСЃСѓР°Р»СЊРЅРѕРіРѕ).',
    website: 'https://avrora-help.org.ua'
  },
  {
    id: 'r_health_1',
    name: 'Р›С–РЅС–СЏ Р·РґРѕСЂРѕРІвЂ™СЏ Р¶С–РЅРєРё',
    category: 'РћС…РѕСЂРѕРЅР° Р·РґРѕСЂРѕРІ\'СЏ',
    phones: ['3033'],
    description: 'Р›С–РЅС–СЏ СЃРµРєСЃСѓР°Р»СЊРЅРѕ-СЂРµРїСЂРѕРґСѓРєС‚РёРІРЅРѕРіРѕ Р·РґРѕСЂРѕРІвЂ™СЏ. РџРµСЂРІРёРЅРЅС– РєРѕРЅСЃСѓР»СЊС‚Р°С†С–С— РїСЂРѕС„С–Р»СЊРЅРѕРіРѕ С„Р°С…С–РІС†СЏ. Р©РѕРґРЅСЏ 9:00-18:00.',
  },
  {
    id: 'r2',
    name: 'Р“Р°СЂСЏС‡Р° Р»С–РЅС–СЏ РњС–РЅСЂРµС–РЅС‚РµРіСЂР°С†С–С—',
    category: 'Р”РµСЂР¶Р°РІРЅС– РіР°СЂСЏС‡С– Р»С–РЅС–С—',
    phones: ['1548', '+380960788433'],
    description: 'РџРёС‚Р°РЅРЅСЏ Р’РџРћ, РµРІР°РєСѓР°С†С–С— С‚Р° РіСѓРјР°РЅС–С‚Р°СЂРЅРѕС— РґРѕРїРѕРјРѕРіРё.',
    website: 'https://minre.gov.ua/'
  },
  {
    id: 'r3',
    name: 'Р‘РµР·РѕРїР»Р°С‚РЅР° РїСЂР°РІРѕРІР° РґРѕРїРѕРјРѕРіР°',
    category: 'Р®СЂРёРґРёС‡РЅР° РґРѕРїРѕРјРѕРіР°',
    phones: ['0 800 213 103'],
    description: 'РљРѕРЅСЃСѓР»СЊС‚Р°С†С–С— СЋСЂРёСЃС‚С–РІ, РґРѕРїРѕРјРѕРіР° РІ РѕС„РѕСЂРјР»РµРЅРЅС– РґРѕРєСѓРјРµРЅС‚С–РІ.',
    website: 'https://legalaid.gov.ua/'
  },
  {
    id: 'r4',
    name: 'РќР°С†С–РѕРЅР°Р»СЊРЅР° Р»С–РЅС–СЏ РїСЃРёС…РѕР»РѕРіС–С‡РЅРѕС— РїС–РґС‚СЂРёРјРєРё',
    category: 'РџСЃРёС…РѕР»РѕРіС–С‡РЅР° РїС–РґС‚СЂРёРјРєР°',
    phones: ['0 800 100 102'],
    description: 'Р‘РµР·РєРѕС€С‚РѕРІРЅР° С‚Р° Р°РЅРѕРЅС–РјРЅР° РїСЃРёС…РѕР»РѕРіС–С‡РЅР° РґРѕРїРѕРјРѕРіР°.'
  },
  {
    id: 'r5',
    name: 'Р“Р°СЂСЏС‡Р° Р»С–РЅС–СЏ Р·Р°РїРѕР±С–РіР°РЅРЅСЏ РґРѕРјР°С€РЅСЊРѕРјСѓ РЅР°СЃРёР»СЊСЃС‚РІСѓ',
    category: 'РЎРѕС†С–Р°Р»СЊРЅРёР№ Р·Р°С…РёСЃС‚',
    phones: ['116 123', '0 800 500 335'],
    description: 'Р¦С–Р»РѕРґРѕР±РѕРІР° РїС–РґС‚СЂРёРјРєР° РїРѕСЃС‚СЂР°Р¶РґР°Р»РёС… РІС–Рґ РЅР°СЃРёР»СЊСЃС‚РІР° (La Strada).'
  },
  {
    id: 'r6',
    name: 'Р®СЂРёРґРёС‡РЅРёР№ РїРѕСЂР°РґРЅРёРє РґР»СЏ Р’РџРћ',
    category: 'Р®СЂРёРґРёС‡РЅР° РґРѕРїРѕРјРѕРіР°',
    phones: [], 
    description: 'Р§Р°С‚-Р±РѕС‚ С‚Р° РѕРЅР»Р°Р№РЅ СЂРµСЃСѓСЂСЃРё РґР»СЏ РїРµСЂРµСЃРµР»РµРЅС†С–РІ (Viber, Telegram, Facebook).',
    website: 'https://chatbot.r2p.org.ua/'
  },
  {
    id: 'r7',
    name: 'Р›С–РЅС–СЏ РїС–РґС‚СЂРёРјРєРё РґС–С‚РµР№ С‚Р° РјРѕР»РѕРґС– (La Strada)',
    category: 'РџСЃРёС…РѕР»РѕРіС–С‡РЅР° РїС–РґС‚СЂРёРјРєР°',
    phones: ['116 111', '0 800 500 225'],
    description: 'РљРѕРЅСЃСѓР»СЊС‚Р°С†С–С— РґР»СЏ РґС–С‚РµР№, РїС–РґР»С–С‚РєС–РІ С‚Р° Р±Р°С‚СЊРєС–РІ. РђРЅРѕРЅС–РјРЅРѕ.',
    website: 'https://la-strada.org.ua/'
  },
  {
    id: 'r8',
    name: 'РќР°С†С–РѕРЅР°Р»СЊРЅР° РіР°СЂСЏС‡Р° Р»С–РЅС–СЏ Р· РїРёС‚Р°РЅСЊ Р’Р†Р›/РЎРќР†Р”',
    category: 'РћС…РѕСЂРѕРЅР° Р·РґРѕСЂРѕРІ\'СЏ',
    phones: ['0 800 500 451'],
    description: 'Р¦С–Р»РѕРґРѕР±РѕРІР°, Р±РµР·РєРѕС€С‚РѕРІРЅР° С‚Р° Р°РЅРѕРЅС–РјРЅР° С–РЅС„РѕСЂРјР°С†С–Р№РЅР° РїС–РґС‚СЂРёРјРєР°.'
  },
  {
    id: 'r9',
    name: 'Lifeline Ukraine',
    category: 'РџСЃРёС…РѕР»РѕРіС–С‡РЅР° РїС–РґС‚СЂРёРјРєР°',
    phones: ['7333'],
    description: 'РќР°С†С–РѕРЅР°Р»СЊРЅР° Р»С–РЅС–СЏ Р· РїРёС‚Р°РЅСЊ РїСЂРѕС„С–Р»Р°РєС‚РёРєРё СЃР°РјРѕРіСѓР±СЃС‚РІ С‚Р° РїС–РґС‚СЂРёРјРєРё РїСЃРёС…С–С‡РЅРѕРіРѕ Р·РґРѕСЂРѕРІвЂ™СЏ.',
    website: 'https://lifelineukraine.com/get-help'
  },
  {
    id: 'r10',
    name: 'РћС„С–СЃ РћРјР±СѓРґСЃРјР°РЅР° РЈРєСЂР°С—РЅРё',
    category: 'РџСЂР°РІР° Р»СЋРґРёРЅРё',
    phones: ['0 800 50 17 20', '044 299 74 08'],
    description: 'Р“Р°СЂСЏС‡Р° Р»С–РЅС–СЏ РЈРїРѕРІРЅРѕРІР°Р¶РµРЅРѕРіРѕ Р’Р РЈ Р· РїСЂР°РІ Р»СЋРґРёРЅРё. Р РѕР·С€СѓРє Р·РЅРёРєР»РёС…, РїСЂР°РІР° РґС–С‚РµР№, РѕР±РјС–РЅ РїРѕР»РѕРЅРµРЅРёРјРё.',
    website: 'https://ombudsman.gov.ua/'
  },
  {
    id: 'r11',
    name: 'РЈРєСЂР°С—РЅСЃСЊРєРёР№ РІРµС‚РµСЂР°РЅСЃСЊРєРёР№ С„РѕРЅРґ',
    category: 'РџСЃРёС…РѕР»РѕРіС–С‡РЅР° РїС–РґС‚СЂРёРјРєР°',
    phones: ['0 800 33 20 29'],
    description: 'Р“Р°СЂСЏС‡Р° Р»С–РЅС–СЏ РєСЂРёР·РѕРІРѕС— РїС–РґС‚СЂРёРјРєРё РґР»СЏ РІРµС‚РµСЂР°РЅС–РІ С‚Р° their families (С†С–Р»РѕРґРѕР±РѕРІРѕ).',
    website: 'https://veteranfund.com.ua/'
  },
  {
    id: 'r12',
    name: 'Р”РѕРЅР±Р°СЃ SOS',
    category: 'Р”РѕРїРѕРјРѕРіР° Р’РџРћ',
    phones: ['0 800 309 110'],
    description: 'Р†РЅС„РѕСЂРјР°С†С–Р№РЅР° РїС–РґС‚СЂРёРјРєР° Р’РџРћ, СЋСЂРёРґРёС‡РЅС– РїРёС‚Р°РЅРЅСЏ, РїРµСЂРµС‚РёРЅ Р»С–РЅС–С— СЂРѕР·РјРµР¶СѓРІР°РЅРЅСЏ.',
    website: 'https://www.donbasssos.org/'
  },
  {
    id: 'r13',
    name: 'Helping to Leave',
    category: 'Р•РІР°РєСѓР°С†С–СЏ',
    phones: ['(093) 177 64 58'],
    description: 'Р”РѕРїРѕРјРѕРіР° Р· РµРІР°РєСѓР°С†С–С”СЋ Р· Р·РѕРЅ Р±РѕР№РѕРІРёС… РґС–Р№ С‚Р° РѕРєСѓРїРѕРІР°РЅРёС… С‚РµСЂРёС‚РѕСЂС–Р№.',
    website: 'https://helpingtoleave.org/ua'
  },
];
