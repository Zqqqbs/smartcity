
import React from 'react';

const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
      </div>
      <label className="text-white font-bold">{title}</label>
    </div>
    {children}
  </div>
);

export const ProjectSearchForm: React.FC = () => {
    const categoryTags = ["Мероприятие", "Транспорт", "Экология", "Безопасность", "ЖКХ", "Здравоохранение", "Образование"];
    const techTags = ["AI", "IoT", "React", "Python", "VR", "OpenCV", "Drones", "Big Data", "Blockchain"];

    return (
        <div className="bg-[#122e41] rounded-[32px] p-8 md:p-12 border border-white/5 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                <FilterSection title="Поиск по названию">
                    <input type="text" placeholder="Введите название проекта..." className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" />
                </FilterSection>
                <FilterSection title="Поиск по руководителю">
                    <input type="text" placeholder="Введите ФИО руководителя..." className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" />
                </FilterSection>
                <FilterSection title="Поиск по участнику">
                    <input type="text" placeholder="Введите ФИО участника..." className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" />
                </FilterSection>
            </div>
            
            <div className="mt-4">
                <FilterSection title="Поиск по категориям">
                    <div className="flex flex-wrap gap-3">
                        {categoryTags.map(tag => (
                            <button key={tag} className="bg-black/40 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-black/60 hover:text-white transition-colors">{tag}</button>
                        ))}
                    </div>
                </FilterSection>
            </div>

            <div className="mt-4">
                <FilterSection title="Поиск по технологиям">
                     <div className="flex flex-wrap gap-3">
                        {techTags.map(tag => (
                            <button key={tag} className="bg-black/40 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-black/60 hover:text-white transition-colors">{tag}</button>
                        ))}
                    </div>
                </FilterSection>
            </div>

            <div className="flex justify-end items-center gap-4 mt-12 border-t border-white/10 pt-8">
                <button className="bg-white/10 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    Сбросить
                </button>
                <button className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2.5 5.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5z" /><path fill-rule="evenodd" d="M20 6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2H2a2 2 0 0 0-2 2v1.5a.5.5 0 0 0 .5.5h23a.5.5 0 0 0 .5-.5V6a2 2 0 0 0-2-2zM4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" clip-rule="evenodd" /></svg>
                    Поиск
                </button>
            </div>
        </div>
    )
};
