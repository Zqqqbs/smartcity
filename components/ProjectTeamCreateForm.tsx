
import React, { useState } from 'react';

const FormSection: React.FC<{ title: string; children: React.ReactNode; required?: boolean }> = ({ title, children, required = false }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
      </div>
      <label className="text-white font-bold">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
    {children}
  </div>
);

export const ProjectTeamCreateForm: React.FC = () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const allSkills = ["Frontend Dev", "Backend Dev", "UI/UX Designer", "Data Scientist", "Project Manager", "QA Engineer", "DevOps"];

    const handleSkillClick = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    return (
        <div className="bg-[#122e41] rounded-[32px] p-8 md:p-12 border border-white/5 animate-in fade-in duration-500">
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <FormSection title="Название команды" required>
                        <input type="text" placeholder="Например: 'EcoWarriors'" className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" />
                    </FormSection>

                    <FormSection title="Проект для команды" required>
                         <input type="text" placeholder="Начните вводить название проекта..." className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" />
                    </FormSection>
                </div>

                <FormSection title="Миссия и цели команды">
                    <textarea
                        rows={4}
                        placeholder="Кратко опишите, над чем будет работать команда и какие цели преследует..."
                        className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all resize-none"
                    />
                </FormSection>

                <FormSection title="Требуемые роли и навыки">
                    <div className="flex flex-wrap gap-3">
                        {allSkills.map(skill => (
                            <button
                                key={skill}
                                type="button"
                                onClick={() => handleSkillClick(skill)}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                    selectedSkills.includes(skill)
                                        ? 'bg-yellow-500 text-black font-bold'
                                        : 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-white'
                                }`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                     <p className="text-xs text-gray-500 mt-2">Выберите ключевые компетенции, необходимые для проекта.</p>
                </FormSection>
                
                <FormSection title="Кого мы ищем?">
                    <input type="text" placeholder="Например: 'Ищем 2 frontend-разработчиков с опытом React'" className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" />
                     <p className="text-xs text-gray-500 mt-2">Опишите, сколько и каких специалистов вы хотите пригласить.</p>
                </FormSection>


                <div className="flex justify-end items-center gap-4 mt-12 border-t border-white/10 pt-8">
                    <button type="button" className="bg-white/10 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        Сохранить черновик
                    </button>
                    <button type="submit" className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2">
                         <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 15a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"></path></svg>
                        Создать команду
                    </button>
                </div>
            </form>
        </div>
    );
};
