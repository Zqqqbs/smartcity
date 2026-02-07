import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("Все");
  const [categories, setCategories] = useState<string[]>(["Все"]);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        if (data) {
          setServices(data);
          // Автоматически вытягиваем уникальные категории из базы
          const uniqueCats = ["Все", ...new Set(data.map((s: any) => s.category))];
          setCategories(uniqueCats);
        }
      } catch (err) {
        console.error("Ошибка загрузки сервисов:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filtered = activeCat === "Все" 
    ? services 
    : services.filter(s => s.category === activeCat);

  return (
    <main className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Цифровые сервисы Тюмени</h1>
          <p className="text-gray-400 font-medium">Готовые государственные и муниципальные инструменты для жизни в городе</p>
        </div>
        <div className="text-right hidden md:block">
            <span className="text-yellow-400 font-black text-3xl">{services.length}</span>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Активных сервисов</p>
        </div>
      </div>
      
      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all border ${
              activeCat === cat 
                ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' 
                : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка сервисов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          // Скелетон при загрузке
          [1, 2, 3, 4].map(i => (
            <div key={i} className="bg-[#122e41] h-80 rounded-[32px] animate-pulse border border-white/5"></div>
          ))
        ) : (
          filtered.map(service => (
            <div 
              key={service.id} 
              className="bg-[#122e41] rounded-[32px] border border-white/5 hover:border-yellow-400/30 transition-all group cursor-pointer overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Превью картинка */}
              <div className="h-44 relative overflow-hidden">
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122e41] to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-white/10">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Контент */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors leading-tight">
                    {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {service.description}
                </p>
                <button className="w-full bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-black py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-yellow-400/20">
                  {service.button_text || 'Подробнее'}
                </button>
              </div>
            </div>
          ))
        )}

        {!loading && filtered.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
            <p className="text-gray-500 font-bold uppercase tracking-widest">В этой категории пока нет сервисов</p>
          </div>
        )}
      </div>
    </main>
  );
};