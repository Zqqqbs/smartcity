
import React, { useEffect, useState } from 'react';
import { COUNCIL_TASKS } from '../constants';
import { ApiService } from '../services/api';
import { Member } from '../types';

const TaskIcon: React.FC<{ name: string }> = ({ name }) => {
    switch (name) {
        case 'target': return <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'folder': return <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
        case 'ruble': return <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        case 'sync': return <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
        case 'search': return <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
        case 'scales': return <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
        default: return <div className="w-8 h-8 bg-yellow-400 rounded-full" />;
    }
}

export const ManagementCouncilPage: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiService.getManagementStructure().then(data => {
            setMembers(data.council);
            setLoading(false);
        });
    }, []);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-bold text-white mb-10">Состав совета</h2>

            {/* Глава совета */}
            <div className="bg-[#122e41] rounded-none overflow-hidden flex flex-col md:flex-row mb-12 shadow-xl border border-white/5">
                <div className="md:w-[400px] h-[350px] md:h-auto bg-gray-200 shrink-0">
                    <img src="https://i.postimg.cc/Vk3Smcdc/icons8-zcina-60.png" className="w-full h-full object-cover object-top" alt="Максим Афанасьев" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-[#0d2638]">
                    <h3 className="text-2xl font-bold text-white mb-2">Максим Викторович Афанасьев</h3>
                    <p className="text-gray-400 text-sm mb-6 uppercase tracking-wider font-bold">Глава города Тюмень</p>
                    <p className="text-white text-lg leading-relaxed italic border-l-4 border-yellow-400 pl-6">
                        “Цифровые технологии - это не будущее, это настоящее нашего города. Мы активно внедряем инновации, чтобы сделать жизнь горожан комфортнее и доступнее”
                    </p>
                </div>
            </div>

            {/* Сетка членов совета */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
                {loading ? (
                    [1,2,3,4].map(i => <div key={i} className="aspect-square bg-white/5 animate-pulse"></div>)
                ) : (
                    members.map((member) => (
                        <div key={member.id} className="group">
                            <div className="aspect-square bg-gray-300 mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 w-[80%] mx-auto sm:w-full">
                                <img src={member.imageUrl} className="w-full h-full object-cover" alt={member.name} />
                            </div>
                            <h4 className="font-bold text-white text-lg leading-tight mb-2 px-2">{member.name}</h4>
                            <p className="text-gray-400 text-sm leading-tight px-2">{member.role}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Задачи совета */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-10">Задачи совета</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-start">
                    <div className="rounded-2xl overflow-hidden h-[600px] hidden md:block border border-white/5 relative">
                         <img src="https://i.postimg.cc/k4WqJ1r2/tymen-admin.jpg" alt="Building" className="w-full h-full object-cover grayscale opacity-60" />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#063553] via-transparent to-transparent"></div>
                    </div>
                    <div className="flex flex-col gap-8">
                        {COUNCIL_TASKS.map((task, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="shrink-0 mt-1 transform group-hover:scale-110 transition-transform">
                                    <TaskIcon name={task.icon} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-yellow-400 transition-colors">{task.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium">{task.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
