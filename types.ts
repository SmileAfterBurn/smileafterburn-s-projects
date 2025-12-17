
export type RegionName = 'All' | 'Odesa' | 'Mykolaiv' | 'Kherson' | 'Dnipro' | 'Zaporizhzhia' | 'Kyiv' | 'Lviv' | 'Kharkiv' | 'Volyn' | 'Zhytomyr' | 'IvanoFrankivsk' | 'Kirovohrad' | 'Rivne' | 'Sumy' | 'Ternopil' | 'Chernivtsi' | 'Khmelnytskyi' | 'Chernihiv' | 'Poltava';

export interface Organization {
  id: string;
  name: string; // Відповідає колонці "Актори"
  address: string;
  lat: number;
  lng: number;
  category: string;
  services: string; // Відповідає колонці "Послуги"
  phone: string;    // Нове поле
  email: string;    // Нове поле
  status: 'Active' | 'Inactive' | 'Pending';
  driveFolderUrl: string;
  budget: number;
  region: RegionName; // Нове поле для фільтрації по регіонах
  
  // New detailed fields
  workingHours?: string;
  additionalPhones?: string[];
  establishedDate?: string; // Year or full date string
  website?: string;
  notes?: string; // Важливі примітки (безпека, умови прийому)
}

export interface RemoteSupportActor {
  id: string;
  name: string;
  category: string; // e.g. "Психологічна допомога", "Юридична допомога", "Гарячі лінії"
  phones: string[];
  description: string;
  website?: string; // Optional field for online resources
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum ViewMode {
  Grid = 'grid',
  Map = 'map',
  Split = 'split'
}
