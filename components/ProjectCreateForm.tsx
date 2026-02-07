import React, { useState } from 'react';
import { supabase } from '../services/supabase'; // Импорт клиента

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

export const ProjectCreateForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [keywords, setKeywords] = useState('');
    const [initiatedBy, setInitiatedBy] = useState('');

    const allCategories = ["Мероприятие", "Транспорт", "Экология", "Безопасность", "ЖКХ", "Здравоохранение", "Образование", "Урбанистика"];

    const handleCategoryClick = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) return alert("Заполните обязательные поля!");
        
        setLoading(true);
        try {
            const { error } = await supabase
                .from('projects')
                .insert([{
                    title: title,
                    description: description,
                    category: selectedCategories.join(', '),
                    team_name: initiatedBy || 'Частная инициатива',
                    status: 'В работе',
                    // Для красоты добавим случайную картинку из города
                    image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800'
                }]);

            if (error) throw error;
            
            alert('✅ Проект успешно создан и сохранен в базе Тюмени!');
            // Очистка формы
            setTitle('');
            setDescription('');
            setSelectedCategories([]);
            setKeywords('');
            setInitiatedBy('');
        } catch (err: any) {
            alert('Ошибка при создании: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#122e41] rounded-[32px] p-8 md:p-12 border border-white/5 animate-in fade-in duration-500">
            <form onSubmit={handleSubmit}>
                <FormSection title="Название проекта" required>
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        placeholder="Введите название проекта..." 
                        className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" 
                    />
                </FormSection>

                <FormSection title="Описание проекта" required>
                    <textarea 
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Опишите суть, цели и задачи вашего проекта..." 
                        className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all resize-none" 
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Минимум 100 символов. Текущее количество: {description.length}
                    </p>
                </FormSection>

                <FormSection title="Область проекта">
                    <div className="flex flex-wrap gap-3">
                        {allCategories.map(tag => (
                            <button 
                                key={tag} 
                                type="button"
                                onClick={() => handleCategoryClick(tag)}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                    selectedCategories.includes(tag) 
                                        ? 'bg-yellow-500 text-black font-bold' 
                                        : 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-white'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </FormSection>

                <FormSection title="Ключевые слова">
                    <input 
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        type="text" 
                        placeholder="Например: AI, Big Data, экология, дети..." 
                        className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" 
                    />
                </FormSection>

                <FormSection title="Инициатор проекта">
                    <input 
                        value={initiatedBy}
                        onChange={(e) => setInitiatedBy(e.target.value)}
                        type="text" 
                        placeholder="Название вашей команды или ФИО..." 
                        className="w-full bg-[#0b2234] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 outline-none transition-all" 
                    />
                </FormSection>

                <div className="flex justify-end items-center gap-4 mt-12 border-t border-white/10 pt-8">
                    <button 
                        disabled={loading}
                        type="submit" 
                        className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                         {loading ? "Создание..." : (
                            <>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" /></svg>
                                Создать проект
                            </>
                         )}
                    </button>
                </div>
            </form>
        </div>
    );
};