import React from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenChat }) => {
  return (
    <header className="py-6 flex justify-between items-center text-white">
      {/* Левая часть: Логотип */}
      <div 
        className="flex items-center space-x-5 cursor-pointer group" 
        onClick={() => onNavigate('home')}
      >
        <img 
          src="https://i.postimg.cc/GtNNrpMg/3-26.png" 
          alt="City Logo" 
          className="h-12 w-12 object-contain transition-transform group-hover:scale-105" 
        />
        <div className="flex flex-col justify-center">
          <span className="font-refined-serif text-xl leading-none font-medium">Город, где</span>
          <span className="font-refined-serif text-xl leading-tight font-medium">технологии начинают путь</span>
        </div>
      </div>

      {/* Правая часть: Инструменты */}
      <div className="flex items-center space-x-6 text-sm">
        <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors font-bold uppercase tracking-widest text-[12px]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20z"/></svg>
          <span>RU</span>
        </button>

        <button className="hover:text-yellow-400 transition-colors p-1 transform hover:scale-110 transition-transform">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>

        {/* ИИ-Помощник */}
        <button 
          onClick={onOpenChat}
          className="relative group p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5 hover:border-yellow-400/50"
        >
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
          <svg className="w-5 h-5 text-white/80 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>

        {/* Иконка профиля */}
        <button 
          onClick={() => onNavigate('newPage')} 
          className="hover:text-yellow-400 transition-colors p-1 transform hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </header>
  );
};