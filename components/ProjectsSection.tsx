import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { PROJECT_CATEGORIES } from '../constants';
import { InfoModal } from './InfoModal';

export const ProjectsSection: React.FC = () => {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      // Запрашиваем ВСЕ проекты из базы без ограничений
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('votes', { ascending: false }); // Сортируем по количеству голосов (популярности)

      if (data) {
        setAllProjects(data);
        setFilteredProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "Все") {
      setFilteredProjects(allProjects);
    } else {
      // Регистронезависимая фильтрация для надежности
      setFilteredProjects(allProjects.filter(p => 
        p.category?.toLowerCase().includes(category.toLowerCase())
      ));
    }
  };

  return (
    <section className="py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Цифровые проекты города</h2>
          <p className="text-gray-500 mt-2">Инновационные разработки тюменских команд в реальном времени</p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        {/* ФИЛЬТРЫ */}
        <div className="col-span-12 md:col-span-2">
          <ul className="space-y-4 flex md:block overflow-x-auto md:overflow-visible gap-6 pb-4 md:pb-0 scrollbar-hide">
            {PROJECT_CATEGORIES.map((cat) => (
              <li key={cat} className="shrink-0">
                <button
                  onClick={() => handleFilter(cat)}
                  className={`text-left w-full text-base transition-all font-medium ${
                    activeCategory === cat ? 'text-yellow-400 font-bold border-b-2 border-yellow-400 md:border-none' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* СЕТКА (Отображаем всё, что есть в базе) */}
        <div className="col-span-12 md:col-span-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="bg-white/5 h-72 rounded-[30px] animate-pulse"></div>)
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="bg-[#1e3a4c]/40 rounded-[30px] overflow-hidden group flex flex-col border border-white/5 hover:border-yellow-400/30 transition-all cursor-pointer shadow-xl relative"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={project.image_url} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt="" 
                    />
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black text-[9px] font-black uppercase px-2 py-1 rounded shadow-lg z-10">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-white font-bold text-lg mb-2 leading-tight line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] mb-4 line-clamp-3 leading-relaxed flex-grow">
                        {project.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{project.status}</span>
                        <span className="text-yellow-500 text-[10px] font-black uppercase tracking-widest">⭐ {project.votes}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] text-gray-500 font-bold uppercase tracking-widest text-xs">
                Проекты в категории "{activeCategory}" не найдены
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedProject && (
        <InfoModal 
          data={{
            title: selectedProject.title,
            desc: selectedProject.description,
            category: selectedProject.category,
            image: selectedProject.image_url,
            status: selectedProject.status,
            isService: false,
            buttonText: 'Подать заявку'
          }}
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};