
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';

export const CampusPage: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        ApiService.getCampusData().then(setData);
    }, []);

    if (!data) return <div className="p-20 text-center animate-pulse text-gray-500 uppercase font-black">Загрузка кампуса...</div>;

    return (
        <div className="animate-in fade-in duration-700 pb-20">
            {/* News Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 mt-12">
                <div className="relative h-[300px] rounded-[32px] overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-white font-bold text-xl mb-2">Команда ТИУ победила в международном хакатоне Smart Cities</h3>
                        <p className="text-gray-400 text-xs">Студенты разработали революционную систему управления городским освещением...</p>
                    </div>
                </div>
                <div className="relative h-[300px] rounded-[32px] overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-white font-bold text-xl mb-2">Запуск нового проекта: Цифровизация общественного транспорта</h3>
                        <p className="text-gray-400 text-xs">Администрация города и ТИУ подписали соглашение о совместной разработке системы...</p>
                    </div>
                </div>
            </div>

            {/* Testing & Ads Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="bg-[#122e41] p-8 rounded-[32px] border border-white/5">
                    <h3 className="text-xl font-bold mb-6">Тестирование</h3>
                    <div className="space-y-6 mb-8">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400">📊</div>
                            <div>
                                <h4 className="text-sm font-bold">Суть тестирования</h4>
                                <p className="text-xs text-gray-500 leading-snug">Оценка технических навыков, soft skills и соответствия требованиям проектов Smart City</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-black text-sm uppercase">Пройти тестирование</button>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold">Объявления</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { type: "Учебное", title: "Открыта регистрация на защиту коллективных ВКР", date: "до 5 декабря 2025" },
                            { type: "Административное", title: "График работы лабораторий в зимний период", date: "с 25 декабря по 10 января" },
                            { type: "Срочное", title: "Изменение сроков сдачи промежуточных отчетов", date: "до 20 декабря 2025" },
                            { type: "Учебное", title: "Семинар по работе с Git и CI/CD", date: "5 декабря в 15:00" }
                        ].map((ad, i) => (
                            <div key={i} className="bg-[#122e41]/40 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2 inline-block">{ad.type}</span>
                                <h4 className="text-white font-bold text-sm mb-2">{ad.title}</h4>
                                <p className="text-gray-500 text-[10px] font-bold">{ad.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stories */}
            <h2 className="text-3xl font-bold text-white mb-10">Истории студентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {data.stories.map((s: any) => (
                    <div key={s.id} className="bg-[#122e41] rounded-[32px] overflow-hidden border border-white/5 flex flex-col h-full">
                        <div className="aspect-[4/3] bg-gray-300">
                            <img src={s.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt={s.name} />
                        </div>
                        <div className="p-8">
                            <h4 className="text-lg font-bold mb-1">{s.name}</h4>
                            <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-4">{s.role}</p>
                            <p className="text-gray-400 text-sm italic mb-6 leading-relaxed">{s.text}</p>
                            <div className="space-y-2">
                                {s.awards.map((a: string) => (
                                    <div key={a} className="flex items-center text-[10px] font-bold text-white/70 uppercase tracking-widest">
                                        <span className="text-yellow-400 mr-2">★</span> {a}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Opportunities (Business, Initiatives, etc) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {[
                    { title: "Заказы бизнеса", icon: "💼", btn: "Подать заявку" },
                    { title: "Инициативы", icon: "💡", btn: "Подать заявку" },
                    { title: "Продолжение", icon: "📈", btn: "Подать заявку" }
                ].map((op, i) => (
                    <div key={i} className="bg-[#122e41] p-10 rounded-[40px] border border-white/5 text-center flex flex-col items-center group">
                        <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{op.icon}</div>
                        <h3 className="text-2xl font-bold mb-4">{op.title}</h3>
                        <p className="text-gray-500 text-xs mb-8">Описание возможностей для студентов и молодых специалистов по работе в проектах</p>
                        <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
                            {op.btn}
                        </button>
                    </div>
                ))}
            </div>

            {/* Teams Section */}
            <h2 className="text-3xl font-bold text-white mb-10">Существующие команды</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {data.teams.map((t: any) => (
                    <div key={t.id} className="bg-[#122e41] p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-2xl font-bold">{t.title}</h4>
                            <span className="flex items-center text-yellow-400 text-sm font-bold">👤 {t.members}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed">{t.desc}</p>
                        <div className="flex flex-wrap gap-2 mb-10">
                            {t.tags.map((tag: string) => (
                                <span key={tag} className="bg-black/30 text-gray-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5">{tag}</span>
                            ))}
                        </div>
                        <div className="flex justify-between items-center border-t border-white/5 pt-8">
                            <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                                Ищем: <span className="text-white">{t.stack}</span>
                            </div>
                            <button className="bg-yellow-400 text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition-all">Присоединиться</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Events Calendar */}
            <h2 className="text-3xl font-bold text-white mb-10">Календарь событий</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {data.events.map((e: any) => (
                    <div key={e.id} className={`${e.bgColor} p-8 rounded-[32px] border border-white/5 flex flex-col justify-between group cursor-pointer hover:border-yellow-400/50 transition-all`}>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4 inline-block">{e.type}</span>
                            <h4 className="text-xl font-bold mb-6 group-hover:text-yellow-400 transition-colors">{e.title}</h4>
                            <div className="space-y-2 text-xs text-white/70">
                                <div className="flex items-center">📅 {e.date}</div>
                                {e.time && <div className="flex items-center">🕒 {e.time}</div>}
                                <div className="flex items-center">📍 {e.location}</div>
                            </div>
                        </div>
                        <button className="w-full bg-white/10 hover:bg-yellow-400 hover:text-black mt-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
                            {e.buttonText}
                        </button>
                    </div>
                ))}
            </div>

            {/* Visual Timeline Section */}
            <div className="bg-[#0b2234] rounded-[50px] p-16 mb-20 relative overflow-hidden border border-white/5">
                <h2 className="text-4xl font-bold mb-20 text-center">Таймлайн</h2>
                {/* stylized visual path simplified for rendering */}
                <div className="relative border-l-4 border-yellow-400/30 ml-8 md:ml-20 space-y-24">
                   {[
                       { date: "25.01.2024", title: "Школа лидера", desc: "Старт весенней волны" },
                       { date: "05.02.2024", title: "Встречи команд", desc: "Консультации с менторами" },
                       { date: "12.02.2024", title: "MVP готов", desc: "Первая итерация проекта" }
                   ].map((t, i) => (
                       <div key={i} className="relative pl-12">
                           <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-yellow-400 border-4 border-[#0b2234]"></div>
                           <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 inline-block">{t.date}</span>
                           <h4 className="text-2xl font-bold mb-1">{t.title}</h4>
                           <p className="text-gray-500 font-bold">{t.desc}</p>
                       </div>
                   ))}
                </div>
            </div>

            {/* Useful Resources */}
            <h2 className="text-3xl font-bold text-white mb-10">Полезные ресурсы</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                {data.resources.map((r: any) => (
                    <div key={r.id} className="bg-[#122e41] p-8 rounded-[32px] border border-white/5 hover:bg-[#1a3a4d] transition-all cursor-pointer flex flex-col items-center text-center">
                        <div className="text-4xl mb-6">{r.icon}</div>
                        <h4 className="text-sm font-bold mb-2 leading-tight h-10">{r.name}</h4>
                        <div className="flex justify-between w-full mt-4 text-[10px] uppercase font-black tracking-widest text-gray-500">
                            <span>{r.format}</span>
                            <span>{r.size}</span>
                        </div>
                        <button className="mt-6 text-yellow-400 text-[10px] font-black uppercase tracking-widest hover:underline">Скачать ↓</button>
                    </div>
                ))}
            </div>

            {/* Campus Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { val: "12", label: "Команд", icon: "🛡️" },
                    { val: "450+", label: "Студентов", icon: "👤" },
                    { val: "15", label: "Проектов", icon: "⚙️" },
                    { val: "+45%", label: "Рост за год", icon: "📈" }
                ].map((s, i) => (
                    <div key={i} className="bg-[#122e41]/60 backdrop-blur-md p-8 rounded-[24px] border border-white/5 text-center flex flex-col items-center">
                        <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
