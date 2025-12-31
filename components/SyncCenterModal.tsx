
import React, { useState, useEffect } from 'react';
import { X, Github, HardDrive, FolderOpen, RefreshCw, CheckCircle2, AlertCircle, Key, Settings2, Terminal, Info, Link2, ExternalLink, ShieldCheck, Database, FileCode } from 'lucide-react';
import { SyncConfig, SyncStatus } from '../types';
import { SyncService } from '../services/syncService';

interface SyncCenterModalProps {
  onClose: () => void;
  organizations: any[];
}

export const SyncCenterModal: React.FC<SyncCenterModalProps> = ({ onClose, organizations }) => {
  const [config, setConfig] = useState<SyncConfig>(() => {
    const saved = localStorage.getItem('safb_sync_config');
    if (saved) return JSON.parse(saved);
    
    return {
      githubRepo: 'SmileAfterBurn/smileafterburn-s-projects',
      googleDriveFolderId: '1D_AduJzBwGcttbue_CumQqcwPUZOHtPy',
      localPath: 'C:\\Users\\Illia Chernov\\Documents\\GitHub\\SAFB-AI-Charity-Protection-\\інклюзивна-мапа-соціальних-послуг-україни',
      githubToken: ''
    };
  });

  const [status, setStatus] = useState<SyncStatus>({
    github: 'disconnected',
    drive: 'disconnected',
    local: 'disconnected'
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLog, setSyncLog] = useState<string[]>(["Система очікує ініціалізації..."]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('safb_sync_config', JSON.stringify(config));
  }, [config]);

  const addLog = (msg: string) => setSyncLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));

  const runConnectionCheck = async () => {
    setIsSyncing(true);
    addLog("Перевірка вузлів зв'язку...");
    const service = new SyncService(config);
    
    const githubOk = await service.checkGitHub();
    const driveOk = await service.checkDrive();
    
    setStatus({
      github: githubOk ? 'connected' : 'error',
      drive: driveOk ? 'connected' : 'disconnected',
      local: 'connected' // Припускаємо локальний шлях валідним для відображення
    });

    if (!githubOk && !config.githubToken) {
      addLog("УВАГА: GitHub Token не вказано. Доступ обмежений.");
    } else {
      addLog(githubOk ? "GitHub: Авторизовано" : "GitHub: Помилка токена");
    }
    
    addLog(driveOk ? "Drive: Доступно за ID" : "Drive: Перевірте посилання");
    setIsSyncing(false);
  };

  const handleFullSync = async () => {
    if (!config.githubToken) {
      addLog("Помилка: Необхідний GitHub Token для синхронізації даних.");
      return;
    }

    setIsSyncing(true);
    setAiAnalysis(null);
    addLog("Початок повного циклу синхронізації...");
    const service = new SyncService(config);
    
    try {
      addLog("Завантаження organizations.ts з репозиторію...");
      const remoteContent = await service.fetchGitHubFile('інклюзивна-мапа-соціальних-послуг-україни/organizations.ts');
      
      if (!remoteContent) {
        addLog("Помилка: Файл не знайдено в репозиторії.");
        setIsSyncing(false);
        return;
      }

      addLog("Передача даних до Gemini 3 Pro для аналізу розбіжностей...");
      const analysis = await service.compareAndAnalyze(organizations, remoteContent);
      setAiAnalysis(analysis);
      addLog("Синхронізацію та аналіз успішно завершено.");
      setStatus(prev => ({ ...prev, lastSync: Date.now() }));
    } catch (e) {
      addLog("Критична помилка процесу.");
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[8000] bg-slate-900/90 backdrop-blur-2xl flex items-center justify-center p-2 md:p-6">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[95vh] border border-white/20">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 md:p-10 text-white flex justify-between items-center shrink-0 border-b border-white/5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/20">
              <RefreshCw className={`w-9 h-9 ${isSyncing ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">SAFB Sync Control</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest opacity-80">Система синхронізації даних Іллі Чернова</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-white/10 rounded-full transition-all active:scale-90">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar space-y-10">
          
          {/* Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className={`p-6 rounded-[2rem] border-2 transition-all ${status.github === 'connected' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-start mb-6">
                <Github className={status.github === 'connected' ? 'text-emerald-600' : 'text-slate-400'} size={36} />
                <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${status.github === 'connected' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {status.github === 'connected' ? 'Connected' : 'Offline'}
                </div>
              </div>
              <h4 className="font-black text-[10px] uppercase mb-1 text-slate-400">GitHub Repo</h4>
              <p className="text-xs font-bold text-slate-800 truncate mb-6">{config.githubRepo}</p>
              <button onClick={runConnectionCheck} className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase hover:bg-slate-100 transition shadow-sm active:scale-95">Re-check</button>
            </div>

            <div className={`p-6 rounded-[2rem] border-2 transition-all ${status.drive === 'connected' ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-start mb-6">
                <HardDrive className={status.drive === 'connected' ? 'text-blue-600' : 'text-slate-400'} size={36} />
                <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${status.drive === 'connected' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {status.drive === 'connected' ? 'Active' : 'Standby'}
                </div>
              </div>
              <h4 className="font-black text-[10px] uppercase mb-1 text-slate-400">Google Drive</h4>
              <p className="text-xs font-bold text-slate-800 truncate mb-6">ID: {config.googleDriveFolderId}</p>
              <button onClick={() => window.open(`https://drive.google.com/drive/folders/${config.googleDriveFolderId}`, '_blank')} className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase hover:bg-slate-100 transition shadow-sm active:scale-95">View Cloud</button>
            </div>

            <div className={`p-6 rounded-[2rem] border-2 transition-all ${status.local === 'connected' ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex justify-between items-start mb-6">
                <FolderOpen className={status.local === 'connected' ? 'text-amber-600' : 'text-slate-400'} size={36} />
                <div className="px-2 py-1 rounded-md text-[8px] font-black uppercase bg-amber-500 text-white">Local</div>
              </div>
              <h4 className="font-black text-[10px] uppercase mb-1 text-slate-400">Local Environment</h4>
              <p className="text-xs font-bold text-slate-800 truncate mb-6">...{config.localPath.slice(-25)}</p>
              <div className="w-full py-2.5 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase text-center">SAFB Path Set</div>
            </div>
          </div>

          {/* Authentication & Settings */}
          <section className="bg-slate-50 rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-inner">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                <Key size={20} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-800">Автентифікація та Шляхи</h3>
                <p className="text-[10px] text-slate-500 font-medium">Дані для сталого зв'язку з репозиторієм</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">GitHub Personal Access Token (PAT)</label>
                  <div className="relative group">
                    <Key className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${!config.githubToken ? 'text-rose-400' : 'text-slate-300'}`} size={16} />
                    <input 
                      type="password" 
                      placeholder="Вставте ваш ghp_ токен тут..."
                      value={config.githubToken || ''}
                      onChange={(e) => setConfig({ ...config, githubToken: e.target.value })}
                      className={`w-full pl-12 pr-4 py-4 bg-white border rounded-[1.25rem] text-sm outline-none transition-all ${!config.githubToken ? 'border-rose-200 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-teal-500/10 focus:border-teal-500'}`}
                    />
                  </div>
                  {!config.githubToken && <p className="text-[9px] text-rose-500 mt-2 font-bold uppercase ml-1">Токен необхідний для порівняння файлів!</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">GitHub Repository Link</label>
                  <input 
                    type="text" 
                    value={config.githubRepo}
                    onChange={(e) => setConfig({ ...config, githubRepo: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-sm outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Local Project Storage (ReadOnly Meta)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly
                      value={config.localPath}
                      className="flex-1 px-5 py-4 bg-slate-100 border border-slate-200 rounded-[1.25rem] text-xs outline-none text-slate-500 font-mono"
                    />
                    <button className="px-4 bg-white border border-slate-200 rounded-[1.25rem] hover:bg-slate-50 transition active:scale-95"><FolderOpen size={18} className="text-slate-400" /></button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Google Drive Folder ID</label>
                  <input 
                    type="text" 
                    value={config.googleDriveFolderId}
                    onChange={(e) => setConfig({ ...config, googleDriveFolderId: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-[1.25rem] text-sm outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Action Area */}
          <div className="flex flex-col md:flex-row gap-6">
             <button 
              onClick={handleFullSync}
              disabled={isSyncing || !config.githubToken}
              className={`flex-1 py-6 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:grayscale ${isSyncing ? 'bg-slate-200 text-slate-500' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-500/30'}`}
             >
               {isSyncing ? <RefreshCw className="animate-spin" size={24} /> : <ShieldCheck size={24} />}
               {isSyncing ? 'Синхронізація...' : 'Запустити інтелектуальний аналіз'}
             </button>
          </div>

          {/* AI Output Container */}
          {aiAnalysis && (
            <div className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-12 animate-in slide-in-from-bottom-8 duration-500 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Database size={150} />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/40">
                  <FileCode size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Звіт про розбіжності (Gemini 3 Pro)</h3>
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest">Проаналізовано: organizations.ts vs App State</p>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 text-sm md:text-base leading-relaxed font-medium whitespace-pre-wrap font-sans">
                  {aiAnalysis}
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-4">
                 <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-50 transition active:scale-95">Скопіювати План</button>
                 <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-700 transition active:scale-95">Створити Pull Request</button>
              </div>
            </div>
          )}

          {/* System Terminal */}
          <div className="bg-black rounded-[2rem] p-6 font-mono text-[11px] text-emerald-400/80 shadow-2xl border border-white/10">
             <div className="flex items-center justify-between mb-4 border-b border-emerald-400/20 pb-3">
               <div className="flex items-center gap-2">
                 <Terminal size={16} />
                 <span className="uppercase font-black tracking-widest">System Log / SAFB Node</span>
               </div>
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
               </div>
             </div>
             <div className="space-y-1.5 min-h-[100px]">
               {syncLog.map((log, i) => (
                 <div key={i} className="flex gap-3">
                   <span className="opacity-40 shrink-0 select-none">[{i}]</span>
                   <span className={log.includes('Помилка') ? 'text-rose-400' : log.includes('УВАГА') ? 'text-amber-400' : ''}>{log}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 border-t border-slate-100 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed max-w-2xl">
            <Info className="text-teal-600 shrink-0" size={20} />
            <p>
              Цей інструмент призначений для автоматизації роботи з базою даних. 
              Всі зміни аналізуються штучним інтелектом для запобігання дублікатів та помилок у координатах.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition active:scale-95">Закрити</button>
          </div>
        </div>
      </div>
    </div>
  );
};
