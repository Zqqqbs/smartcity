import * as CONSTANTS from '../constants';
import { NewsArticle, ProjectData, StudentStory, CampusTeam, CampusEvent, Member, Resource } from '../types';

const networkDelay = () => new Promise(res => setTimeout(res, 300));

// Вспомогательная функция для работы с локальным хранилищем
const db = {
  get: (key: string, defaultValue: any) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }
};

export const ApiService = {
  /**
   * ЗАГРУЗКА НОВОСТЕЙ ИЗ JSON ФАЙЛОВ (Результат работы парсеров)
   */
  async getNews(): Promise<NewsArticle[]> {
    try {
      // Определяем базовый путь (важно для работы на GitHub Pages и локально)
      const baseUrl = import.meta.env.BASE_URL || '/';
      const cleanPath = (path: string) => (baseUrl + path).replace(/\/+/g, '/');

      console.log('Загрузка новостей из:', cleanPath('news_data.json'));

      // Загружаем сразу оба файла: городские новости и ИТ новости
      const [cityRes, itRes] = await Promise.all([
        fetch(cleanPath('news_data.json')).then(res => res.ok ? res.json() : []),
        fetch(cleanPath('it_news_data.json')).then(res => res.ok ? res.json() : [])
      ]);

      const combinedNews = [...cityRes, ...itRes];

      if (combinedNews.length > 0) {
        // Исправляем пути к картинкам, если они локальные (начинаются с /news_images)
        return combinedNews.map((item: any) => ({
            ...item,
            imageUrl: item.imageUrl && item.imageUrl.startsWith('/') 
                ? cleanPath(item.imageUrl.substring(1)) 
                : item.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800"
        }));
      }

      // Если файлы пустые или не найдены, возвращаем статику из констант
      return CONSTANTS.NEWS_ARTICLES;
    } catch (error) {
      console.error("Ошибка при чтении JSON новостей:", error);
      return CONSTANTS.NEWS_ARTICLES;
    }
  },

  async getProjects(): Promise<ProjectData[]> {
    await networkDelay();
    return db.get('projects_full', CONSTANTS.PROJECTS_LIST);
  },

  // Добавлено для новой страницы Сервисов
  async getServices() {
    await networkDelay();
    return (CONSTANTS as any).SERVICES_LIST || [];
  },

  async getCampusData() {
    await networkDelay();
    return {
      stories: db.get('student_stories', CONSTANTS.STUDENT_STORIES) as StudentStory[],
      teams: db.get('campus_teams', CONSTANTS.CAMPUS_TEAMS) as CampusTeam[],
      events: db.get('campus_events', CONSTANTS.CAMPUS_EVENTS) as CampusEvent[],
      resources: db.get('campus_resources', CONSTANTS.STUDENT_RESOURCES) as Resource[]
    };
  },

  async getManagementStructure() {
    await networkDelay();
    return {
      council: db.get('council_members', CONSTANTS.COUNCIL_MEMBERS) as Member[],
      committee: db.get('committee_members', CONSTANTS.COMMITTEE_MEMBERS) as Member[],
      monitoring: db.get('monitoring_members', CONSTANTS.MONITORING_MEMBERS) as Member[]
    };
  },

  async getUserProfile() {
    await networkDelay();
    return db.get('user_profile', CONSTANTS.USER_PROFILE);
  }
};