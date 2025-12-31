
import { GoogleGenAI } from "@google/genai";
import { SyncConfig, Organization } from "../types";

export class SyncService {
  private config: SyncConfig;
  private ai: GoogleGenAI;

  constructor(config: SyncConfig) {
    this.config = config;
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Отримує вміст файлу з GitHub репозиторію
   */
  async fetchGitHubFile(path: string): Promise<string | null> {
    try {
      const repoPath = this.config.githubRepo.replace('https://github.com/', '');
      const response = await fetch(`https://api.github.com/repos/${repoPath}/contents/${path}`, {
        headers: this.config.githubToken ? { 
          'Authorization': `token ${this.config.githubToken}`,
          'Accept': 'application/vnd.github.v3.raw'
        } : {}
      });
      
      if (!response.ok) return null;
      return await response.text();
    } catch (e) {
      console.error("GitHub Fetch Error:", e);
      return null;
    }
  }

  /**
   * Порівнює локальні дані з даними репозиторію за допомогою AI
   */
  async compareAndAnalyze(localData: Organization[], remoteDataRaw: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Ти — архітектор синхронізації проекту "Інклюзивна мапа". 
        Твоє завдання: провести глибокий аналіз розбіжностей між локальною базою даних та даними з репозиторію.
        
        ЛОКАЛЬНИЙ ШЛЯХ: ${this.config.localPath}
        ГІТХАБ: ${this.config.githubRepo}
        ДРАЙВ: ${this.config.googleDriveFolderId}

        ЛОКАЛЬНІ ДАНІ (Поточний стан додатку):
        ${JSON.stringify(localData.slice(0, 10), null, 2)}

        ОТРИМАНІ ДАНІ З РЕПОЗИТОРІЮ:
        ${remoteDataRaw.slice(0, 5000)}

        ВИМОГИ:
        1. Вияви нові організації, яких немає в локальній базі.
        2. Знайди розбіжності в телефонах або адресах.
        3. Сформуй чіткий список рекомендацій для розробника (Іллі Чернова) щодо оновлення файлу organizations.ts.
        4. Відповідай українською мовою у професійному технічному стилі.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text || "Аналіз не вдався. Перевірте з'єднання.";
  }

  /**
   * Перевірка статусу GitHub
   */
  async checkGitHub(): Promise<boolean> {
    try {
      const repoPath = this.config.githubRepo.replace('https://github.com/', '');
      const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: this.config.githubToken ? { 'Authorization': `token ${this.config.githubToken}` } : {}
      });
      return response.ok;
    } catch (e) {
      return false;
    }
  }

  /**
   * Перевірка доступності папки Drive
   */
  async checkDrive(): Promise<boolean> {
    // В браузерному середовищі ми перевіряємо валідність ID
    return this.config.googleDriveFolderId.length > 20;
  }
}
