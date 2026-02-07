// App.tsx
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NewsSection } from './components/NewsSection';
import { ManagementSection } from './components/ManagementSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InitiativeBanner } from './components/InitiativeBanner';
import { DevelopmentDecisionBanner } from './components/DevelopmentDecisionBanner';
import { Footer } from './components/Footer';
import { CampusPage } from './components/CampusPage';
import { ServicesPage } from './components/ServicesPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ProfilePage } from './components/ProfilePage';
import { SmartCityLayout } from './components/SmartCityLayout';
import { AIChat } from './components/AIChat'; 

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false); 

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'campus':
        return (
          <>
            <Hero onNavigate={navigate} currentPage={currentPage} />
            <CampusPage />
          </>
        );
      case 'services':
        return (
          <>
            <Hero onNavigate={navigate} currentPage={currentPage} />
            <ServicesPage />
          </>
        );
      case 'projects':
        return (
          <>
            <Hero onNavigate={navigate} currentPage={currentPage} />
            <ProjectsPage />
          </>
        );
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      case 'newPage':
        return <ProfilePage onNavigate={navigate} />;  
 
	  case 'management':
        return (
          <>
            <Hero onNavigate={navigate} currentPage={currentPage} />
            <SmartCityLayout />
          </>
        );
      // НОВЫЙ КЕЙС: Страница всех новостей
      case 'all-news':
        return (
          <>
            <Hero onNavigate={navigate} currentPage="home" /> {/* Оставляем активным home или добавляем new */}
            <main>
              {/* Передаем isFullPage={true} чтобы показать фильтры и все новости */}
              <NewsSection isFullPage={true} onNavigate={navigate} />
            </main>
          </>
        );
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigate} currentPage={currentPage} />
            <main>
              {/* На главной ограничиваем до 4 штук и скрываем фильтры */}
              <NewsSection isFullPage={false} limit={4} onNavigate={navigate} />
              
              <DevelopmentDecisionBanner />
              <ManagementSection />
              <ProjectsSection />
              <InitiativeBanner />
            </main>
          </>
        );
    }
  };

  return (
    <div className="bg-[#063553] text-white min-h-screen selection:bg-yellow-400 selection:text-black">
      <div className="w-[81.25%] mx-auto">
        <Header 
          onNavigate={navigate} 
          onOpenChat={() => setIsChatOpen(true)} 
        />
        
        {renderContent()}

        <AIChat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
      </div>

      <div className="w-full mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default App;