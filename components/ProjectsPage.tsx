
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { ProjectData } from '../types';
import { ProjectSearchForm } from './ProjectSearchForm';
import { ProjectCreateForm } from './ProjectCreateForm';
import { ProjectTeamCreateForm } from './ProjectTeamCreateForm';
import { ProjectDetailView } from './ProjectDetailView';

type FilterType = 'all' | 'city' | 'commercial';
const portfolioTabs = ["Портфолио проектов", "Поиск проектов", "Создание проектов", "Создание проектной команды"];

const ProjectPortfolioView: React.FC<{ onProjectSelect: (project: ProjectData) => void }> = ({ onProjectSelect }) => {
    const [allProjects, setAllProjects] = useState<ProjectData[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    useEffect(() => {
        ApiService.getProjects().then(data => {
            setAllProjects(data);
            setFilteredProjects(data);
            setLoading(false);
        });
    }, []);

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
        if (filter === 'all') {
            setFilteredProjects(allProjects);
        } else {
            setFilteredProjects(allProjects.filter(p => p.projectType === filter));
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-white mb-10">Портфолио проектов в городе</h2>

            <div className="flex justify-center flex-wrap gap-4 mb-10">
                <button 
                    onClick={() => handleFilterChange('all')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeFilter === 'all' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                    Все проекты
                </button>
                <button 
                    onClick={() => handleFilterChange('city')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeFilter === 'city' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                    Городские
                </button>
                <button 
                    onClick={() => handleFilterChange('commercial')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${activeFilter === 'commercial' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                    Коммерческие
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {loading ? [1,2,3,4,5,6].map(i => <div key={i} className="h-[500px] bg-white/5 animate-pulse rounded-[30px]"></div>) :
                filteredProjects.map(p => (
                    <button key={p.id} onClick={() => onProjectSelect(p)} className="text-left bg-[#122e41] rounded-[30px] overflow-hidden border border-white/5 hover:border-yellow-400/30 transition-all group flex flex-col shadow-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <div className="h-56 relative overflow-hidden">
                            <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                            <div className="absolute top-4 right-4">
                                <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest ${p.statusColor}`}>
                                    {p.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{p.title}</h3>
                                    <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest">{p.category}</span>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center text-yellow-400 font-bold">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        {p.rating}
                                    </div>
                                    <div className="text-[10px] text-gray-500 font-bold">★ {p.votes}</div>
                                </div>
                            </div>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{p.desc}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {p.tags.map(t => (
                                    <span key={t} className="bg-black/40 text-gray-300 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                                    {p.team}
                                </div>
                                <div>{p.participants} участников</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { val: "83", label: "Всего проектов", icon: "✔️" },
                    { val: "28", label: "В работе", icon: "💼" },
                    { val: "420", label: "Участников", icon: "👥" },
                    { val: "+25%", label: "Средний рейтинг", icon: "📈" }
                ].map((s, i) => (
                    <div key={i} className="bg-[#122e41]/60 backdrop-blur-md p-8 rounded-[24px] border border-white/5 text-center flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-400 text-xl mb-4 border border-yellow-400/20">{s.icon}</div>
                        <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export const ProjectsPage: React.FC = () => {
    const [activePortfolioTab, setActivePortfolioTab] = useState("Портфолио проектов");
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    const handleProjectSelect = (project: ProjectData) => {
        setSelectedProject(project);
    };

    const handleBackToPortfolio = () => {
        setSelectedProject(null);
    };

    const renderTabs = () => (
        <div className="flex flex-wrap gap-4 mb-10 mt-6">
            {portfolioTabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => {
                        setActivePortfolioTab(tab);
                        setSelectedProject(null); // Сбрасываем выбранный проект при смене вкладки
                    }}
                    className={`px-8 py-3 rounded-xl font-bold transition-all text-base ${
                        activePortfolioTab === tab 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-[#1e3a4c] text-white hover:bg-[#2a4a61]'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );

    const renderContent = () => {
        if (selectedProject) {
            return <ProjectDetailView project={selectedProject} onBack={handleBackToPortfolio} />;
        }

        switch (activePortfolioTab) {
            case "Портфолио проектов":
                return <ProjectPortfolioView onProjectSelect={handleProjectSelect} />;
            case "Поиск проектов":
                return <ProjectSearchForm />;
            case "Создание проектов":
                return <ProjectCreateForm />;
            case "Создание проектной команды":
                return <ProjectTeamCreateForm />;
            default:
                return <ProjectPortfolioView onProjectSelect={handleProjectSelect} />;
        }
    };

    return (
        <div className="animate-in fade-in duration-700 pb-20">
            {/* Рендерим табы только если не выбран проект */}
            {!selectedProject && renderTabs()}
            {renderContent()}
        </div>
    );
};
