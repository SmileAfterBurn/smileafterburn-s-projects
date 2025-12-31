
export type RegionName = 'All' | 'Odesa' | 'Mykolaiv' | 'Kherson' | 'Dnipro' | 'Zaporizhzhia' | 'Kyiv' | 'Lviv' | 'Kharkiv' | 'Volyn' | 'Zhytomyr' | 'IvanoFrankivsk' | 'Kirovohrad' | 'Rivne' | 'Sumy' | 'Ternopil' | 'Chernivtsi' | 'Khmelnytskyi' | 'Chernihiv' | 'Poltava' | 'Vinnytsia' | 'Cherkasy';

export interface Organization {
  id: string;
  name: string; // Відповідає колонці "Актори"
  address: string;
  lat: number;
  lng: number;
  category: string;
  services: string; // Відповідає колонці "Послуги"
  phone: string;    // Обов'язкове поле для зв'язку
  email: string;    
  status: 'Active' | 'Inactive' | 'Pending' | 'In Development';
  driveFolderUrl: string;
  budget: number;
  region: RegionName; 
  
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

// Sync Integration Types
export interface SyncConfig {
  githubToken?: string;
  githubRepo: string;
  googleDriveFolderId: string;
  localPath: string;
}

export interface SyncStatus {
  github: 'connected' | 'disconnected' | 'error';
  drive: 'connected' | 'disconnected' | 'error';
  local: 'connected' | 'disconnected' | 'error';
  lastSync?: number;
}
