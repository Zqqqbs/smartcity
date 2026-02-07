
import React from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; active?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, children, active, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-base md:text-lg font-bold py-2 transition-colors hover:text-yellow-400 whitespace-nowrap ${
        active ? 'text-yellow-400' : 'text-white'
      }`}
    >
      {children}
    </a>
  );
};

interface HeroProps {
    onNavigate: (page: string) => void;
    currentPage: string;
    backgroundImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, currentPage, backgroundImage }) => {
  const bgImage = backgroundImage || 'https://i.postimg.cc/gj7pRF8F/Frame-498.png';

  return (
    <div className="mb-0">
      <section className="relative h-[80vh] overflow-hidden flex flex-col justify-end">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url('${bgImage}')` }}
        >
          {/* Градиент */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#063553]/90"></div>
        </div>
        
        <div className="relative z-10 px-0 pb-6 text-left md:text-right flex flex-col items-start md:items-end">
           {/* Пустой контейнер для сохранения отступов, если необходимо */}
        </div>
      </section>

      <nav className="bg-transparent pt-3 pb-0">
        <div className="flex justify-between items-center w-full overflow-x-auto gap-8 no-scrollbar">
          <NavLink href="#" active={currentPage === 'home'} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Главная</NavLink>
          <NavLink href="#" active={currentPage === 'management'} onClick={(e) => { e.preventDefault(); onNavigate('management'); }}>Умный город</NavLink>
          <NavLink href="#" active={currentPage === 'services'} onClick={(e) => { e.preventDefault(); onNavigate('services'); }}>Сервисы</NavLink>
          <NavLink href="#" active={currentPage === 'projects'} onClick={(e) => { e.preventDefault(); onNavigate('projects'); }}>Проекты</NavLink>
          <NavLink href="#" active={currentPage === 'campus'} onClick={(e) => { e.preventDefault(); onNavigate('campus'); }}>Студентам</NavLink>
        </div>
      </nav>
    </div>
  );
};
