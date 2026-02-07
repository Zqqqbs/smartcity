import { supabase } from './supabase';

export const ApiService = {
  // Получаем проекты
  async getProjects() {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data;
  },

  // Получаем сервисы
  async getServices() {
    const { data, error } = await supabase.from('services').select('*');
    if (error) throw error;
    return data;
  },

  // Создаем проект (для формы создания)
  async createProject(projectData: any) {
    const { data, error } = await supabase.from('projects').insert([projectData]);
    if (error) throw error;
    return data;
  }
};