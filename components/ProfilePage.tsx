
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';

export const ProfilePage: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => {
  const [profile, setProfile] = useState<any>(null);
  const [initiatives, setInitiatives] = useState<any[]>([]);

  useEffect(() => {
    ApiService.getUserProfile().then(setProfile);
    const data = JSON.parse(localStorage.getItem('initiatives') || '[]');
    setInitiatives(data);
  }, []);

  if (!profile) return <div className="p-20 text-center">Загрузка профиля...</div>;

  return (
    <main className="py-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Личный кабинет</h1>
        <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white">Выйти</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#122e41] p-8 rounded-[32px] border border-white/5 text-center">
            <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-black font-black">
              {profile.name.split(' ').map((n:any) => n[0]).join('')}
            </div>
            <h3 className="text-2xl font-bold">{profile.name}</h3>
            <p className="text-gray-400 mb-6">Уровень {profile.level} (Инноватор)</p>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Баллы</p>
                  <p className="text-2xl font-black text-yellow-400">{profile.points}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Команды</p>
                  <p className="text-2xl font-black text-sky-400">{profile.joinedTeams.length}</p>
                </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Ваша активность в системе</h2>
          <div className="space-y-6">
            {initiatives.map((item, i) => (
                <div key={i} className="bg-[#122e41] p-8 rounded-[32px] border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-yellow-500/20">
                        {item.status === 'UNDER_REVIEW' ? 'На рассмотрении ИИ' : 'Одобрено'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{item.description}</p>
                  <div className="flex items-center space-x-6 text-xs font-bold text-gray-500">
                      <span>AI SCORE: <span className="text-yellow-400">{item.aiScore}/10</span></span>
                      <span>БЮДЖЕТ: <span className="text-white">{item.budget}</span></span>
                  </div>
                </div>
            ))}
            {initiatives.length === 0 && (
                <div className="bg-white/5 p-12 rounded-[32px] border border-dashed border-white/10 text-center text-gray-500">
                    Здесь появится история ваших предложенных проектов
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
