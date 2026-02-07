import { supabase } from './supabase';

export const ApiService = {
  
  async getProjects() {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data;
  },

  
  async getServices() {
    const { data, error } = await supabase.from('services').select('*');
    if (error) throw error;
    return data;
  },

  
  async createProject(projectData: any) {
    const { data, error } = await supabase.from('projects').insert([projectData]);
    if (error) throw error;
    return data;
  }
};