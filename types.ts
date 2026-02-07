
import React from 'react';

export interface NewsArticle {
  id: number;
  imageUrl: string;
  date: string;
  title?: string;        // Добавлено (название новости)
  description: string;   // Краткое описание
  full_text?: string;    // Добавлено (полный текст)
  tag?: string;
  link?: string;         // Добавлено (ссылка на источник)
}

export interface ProjectData {
  id: number;
  title: string;
  status: string;
  statusColor: string;
  category: string;
  rating: number;
  votes: number;
  desc: string;
  tags: string[];
  team: string;
  participants: number;
  imageUrl: string;
  projectType: 'city' | 'commercial'; 
}

export interface StudentStory {
  id: number;
  name: string;
  role: string;
  text: string;
  awards: string[];
  imageUrl: string;
}

export interface CampusTeam {
  id: number;
  title: string;
  desc: string;
  members: number;
  tags: string[];
  stack: string;
  date: string;
  status: string;
}

export interface CampusEvent {
  id: number;
  type: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  participants: string;
  buttonText: string;
  bgColor: string;
}

export interface Member {
  id: number;
  name: string;
  role: string;
  imageUrl?: string;
}

export interface Resource {
  id: number;
  name: string;
  icon: string | React.ReactNode;
  format?: string;
  size?: string;
  imageUrl?: string;
}

export interface EventItem {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  bgColor: string;
  textColor: string;
  colSpan?: number;
  rowSpan?: number;
}
export interface ProjectData {
  id: number;
  title: string;
  status: string;
  statusColor: string;
  category: string;
  rating: number;
  votes: number;
  desc: string;
  tags: string[];
  team: string;
  participants: number;
  imageUrl: string;
  projectType: 'city' | 'commercial'; // НОВОЕ ПОЛЕ
}

// НОВЫЙ ИНТЕРФЕЙС
export interface ServiceItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  imageUrl: string;
  buttonText: string;
}
export interface ManagementStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  stat1_val: string;
  stat1_desc: string;
  stat2_val: string;
  stat2_desc: string;
  buttonText: string;
  buttonColor: string;
}
