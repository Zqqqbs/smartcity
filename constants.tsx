import React from 'react';
import { 
  ProjectData, 
  StudentStory, 
  CampusTeam, 
  CampusEvent, 
  Resource, 
  NewsArticle, 
  EventItem, 
  ManagementStep, 
  Member, 
  ServiceItem 
} from './types';

export const PROJECTS_LIST: ProjectData[] = [
  { id: 1, title: "SmartTraffic AI", status: "В работе", statusColor: "bg-blue-600", category: "Транспорт", rating: 4.7, votes: 345, desc: "Система адаптивного управления светофорами на базе компьютерного зрения для борьбы с пробками", tags: ["AI", "Traffic", "Транспорт"], team: "RoadMasters", participants: 5, imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600", projectType: 'city' },
  { id: 2, title: "EcoBin Sensors", status: "Тестирование", statusColor: "bg-yellow-500 text-black", category: "Экология", rating: 3.9, votes: 54, desc: "IoT-датчики наполняемости мусорных контейнеров для оптимизации маршрутов мусоровозов", tags: ["IoT", "Hardware", "Green"], team: "CleanCity", participants: 3, imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600", projectType: 'city' },
  { id: 3, title: "SolarBench", status: "Завершено", statusColor: "bg-green-500", category: "Урбанистика", rating: 4.5, votes: 32, desc: "Умные городские скамейки с солнечными панелями, подогревом и зарядками для телефонов", tags: ["Solar", "Design", "Public"], team: "SunRise", participants: 4, imageUrl: "https://images.unsplash.com/photo-1557310717-d6bea9f36682?q=80&w=600", projectType: 'commercial' },
  { id: 4, title: "HelpHand App", status: "В работе", statusColor: "bg-blue-600", category: "Социальное", rating: 4.1, votes: 2132, desc: "Агрегатор волонтерских заданий города с системой рейтинга и поощрений для активистов", tags: ["Mobile", "Social", "App"], team: "GoodHearts", participants: 6, imageUrl: "https://images.unsplash.com/photo-1559027615-cd91459a397e?q=80&w=600", projectType: 'city' },
  { id: 5, title: "SkyPatrol", status: "Приостановлено", statusColor: "bg-orange-600", category: "Безопасность", rating: 3.9, votes: 687, desc: "Система мониторинга лесных пожаров в пригороде с помощью автономных дронов", tags: ["Drones", "CV", "Safety"], team: "AeroGuard", participants: 3, imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600", projectType: 'city' },
  { id: 6, title: "EduVR History", status: "Тестирование", statusColor: "bg-yellow-500 text-black", category: "Образование", rating: 5.0, votes: 1257, desc: "Виртуальные экскурсии по исторической Тюмени 19 века для школьных уроков истории", tags: ["VR", "History", "EdTech"], team: "TimeTravel", participants: 4, imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=600", projectType: 'commercial' }
];

export const SERVICES_LIST: ServiceItem[] = [
  { id: 1, title: "Оплата ЖКХ", category: "ЖКХ", desc: "Передача показаний счетчиков, оплата единой квитанции без комиссии и архив начислений.", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600", buttonText: "Подробнее" },
  { id: 2, title: "Транспортная карта", category: "Транспорт", desc: "Проверка баланса карты ТТС, пополнение счета онлайн и управление льготными проездными.", imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c18692c?q=80&w=600", buttonText: "Подробнее" },
  { id: 3, title: "Моя школа", category: "Образование", desc: "Электронный дневник, расписание уроков, домашние задания и контроль питания ребенка.", imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600", buttonText: "Подробнее" },
  { id: 4, title: "Запись к врачу", category: "Здоровье", desc: "Онлайн-регистратура поликлиник: запись на прием, вызов врача на дом и доступ к медкарте.", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600", buttonText: "Записаться" },
  { id: 5, title: "Городской Wi-Fi", category: "ЖКХ", desc: "Карта точек бесплатного доступа к интернету в парках, скверах и общественном транспорте.", imageUrl: "https://images.unsplash.com/photo-1517426332561-c428f52f4675?q=80&w=600", buttonText: "Поиск" },
  { id: 6, title: "Тюмень - наш дом", category: "ЖКХ", desc: "Сообщайте о городских проблемах: от ям на дорогах до неработающих фонарей.", imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=600", buttonText: "Сообщить" },
  { id: 7, title: "Запись в секции", category: "Спорт", desc: "Находите и записывайте детей в спортивные школы и кружки онлайн.", imageUrl: "https://images.unsplash.com/photo-1517649763942-7e3c76277c66?q=80&w=600", buttonText: "Найти секцию" },
  { id: 8, title: "Умный паркинг", category: "Транспорт", desc: "Карта городских парковок с информацией о свободных местах в реальном времени.", imageUrl: "https://images.unsplash.com/photo-1543465077-50a23e4421b5?q=80&w=600", buttonText: "Найти место" },
];

export const STUDENT_STORIES: StudentStory[] = [
  { id: 1, name: "Волков Дмитрий Валерьевич", role: "iOS Разработчик", text: "«Я пришел на городской хакатон с идеей, а ушел с инвестором. Мое приложение 'Тюмень Помнит' теперь помогает тысячам жителей находить свободные места в парке»", awards: ["Победитель хакатона 2024", "Грант 500 000 Р на развитие"], imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" },
  { id: 2, name: "Соколов Антон Павлович", role: "Data Scientist / ML инженер", text: "«Мы с командой внедрили нейросеть для контроля работы коммунальных служб. Теперь камеры сами определяют проблемные зоны на дорогах, и автоматика отправляет заявки»", awards: ["Резидент Тюменского Технопарка", "Автор патента на ПО"], imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" },
  { id: 3, name: "Смирнова Анна Сергеевна", role: "Архитектор-урбанист", text: "«Умный город — это не только код, но и комфортная среда. Я спроектировала 'цифровой сквер' с умными скамейками и эко-датчиками, который администрация уже взяла в работу»", awards: ["Стажировка в Департаменте архитектуры", "Лучший дипломный проект ТИУ"], imageUrl: "https://i.postimg.cc/52Dkd9q3/a22eed23-8a3f-4908-b72a-9bd411f54d1e.png" }
];

export const CAMPUS_TEAMS: CampusTeam[] = [
  { id: 1, title: "EcoMonitors", desc: "Мониторинг воздуха. IoT система сбора и анализа данных о качестве воздуха в городе с визуализацией на интерактивной карте.", members: 3, tags: ["React Native", "Node.js", "InfluxDB"], stack: "Backend Dev, Data Analyst", date: "29 ноября 2025", status: "В разработке" },
  { id: 2, title: "SmartParking", desc: "Городская мобильность. Система поиска свободных парковочных мест в центре города с помощью компьютерного зрения и уличных камер.", members: 5, tags: ["Python", "OpenCV", "Swift"], stack: "ML Engineer, iOS Dev", date: "13 ноября 2025", status: "В разработке" }
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  { id: 1, type: "Конференция", title: "Конференция 'Цифровой город'", date: "15 декабря 2025", time: "10:00 - 18:00", location: "ТИУ, Мельникайте 70", participants: "300+ участников", buttonText: "Зарегистрироваться", bgColor: "bg-[#1e3a4c]" },
  { id: 2, type: "Саммит", title: "Саммит Smart Cities Russia", date: "20 января 2026", time: "09:00 - 17:00", location: "Экспоцентр", participants: "500+ участников", buttonText: "Зарегистрироваться", bgColor: "bg-[#1e3a4c]" },
  { id: 3, type: "Хакатон", title: "Хакатон Smart Transport", date: "10-12 февраля 2026", location: "Технопарк", participants: "150+ участников", buttonText: "Зарегистрироваться", bgColor: "bg-[#1e3a4c]" }
];

export const STUDENT_RESOURCES: Resource[] = [
  { id: 1, name: "Шаблон презентации проекта", format: "PPTX", size: "2.4 MB", icon: "📄" },
  { id: 2, name: "Шаблон технической документации", format: "DOCX", size: "156 KB", icon: "📄" },
  { id: 3, name: "Руководство по Git workflow", format: "PDF", size: "892 KB", icon: "📄" },
  { id: 4, name: "UI/UX Kit Smart City", format: "Figma", size: "Online", icon: "🎨" }
];

export const FOOTER_LINKS = {
  'О проекте': ['Команда', 'Новости', 'Партнеры'],
  'Участникам': ['Как создать проект', 'FAQ', 'Поддержка'],
  'SmartCity': ['Портал "Я решаю"', 'Правительство РФ', 'Правительство Тюменской области', 'Администрация города Тюмень', 'Портал услуг города Тюмень', 'Тюменская городская Дума'],
  'Наши сервисы': ['Портал цифровых сервисов', 'Моя школа', 'Тюмень наш дом', 'Мой терапевт 72', 'Транспорт 72', 'Телемед 72']
};

export const NEWS_CATEGORIES = ["Все", "Технологии", "Город", "События", "Инновации"];

export const NEWS_ARTICLES: NewsArticle[] = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800", date: "29 ноября 2025", description: "В Тюмени запустили первый беспилотный маршрут в тестовом режиме", tag: "Технологии" },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800", date: "28 ноября 2025", description: "Более 500 студентов приняли участие в городском ИТ-форуме", tag: "События" },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800", date: "27 ноября 2025", description: "Новая система умного освещения сэкономила городу 15% бюджета за месяц", tag: "Инновации" },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800", date: "26 ноября 2025", description: "Тюмень вошла в топ-3 цифровых городов России", tag: "Город" }
];

export const EVENT_CATEGORIES = ["Все", "Конференции и саммиты", "Хакатоны", "Воркшопы"];

export const EVENTS: EventItem[] = [
  { id: 1, title: "Smart City Tyumen 2025", description: "Ежегодная конференция по развитию городской среды", bgColor: "bg-blue-600", textColor: "text-white", colSpan: 2, rowSpan: 2, imageUrl: "https://images.unsplash.com/photo-1540575861501-7ad05823c93b?q=80&w=800" },
  { id: 2, title: "AI & Big Data Summit", description: "Саммит экспертов по данным", bgColor: "bg-[#1e3a4c]", textColor: "text-white" },
  { id: 3, title: "HackTheCity", description: "48-часовой хакатон для разработчиков", bgColor: "bg-yellow-500", textColor: "text-black" },
  { id: 4, title: "Urban Lab", description: "Практический воркшоп по урбанистике", bgColor: "bg-[#1e3a4c]", textColor: "text-white" }
];

export const MANAGEMENT_STEPS: ManagementStep[] = [
  { 
    id: 1, 
    icon: <div className="text-4xl mb-6">💡</div>,
    title: "Инициативы граждан", 
    description: "Предлагайте идеи по улучшению городской среды и голосуйте за проекты других жителей.",
    stat1_val: "1.2K", stat1_desc: "Предложений", stat2_val: "45", stat2_desc: "Реализовано",
    buttonText: "Предложить идею", buttonColor: "bg-yellow-500 text-black hover:bg-yellow-600"
  },
  { 
    id: 2, 
    icon: <div className="text-4xl mb-6">📊</div>,
    title: "Мониторинг", 
    description: "Отслеживайте состояние городских систем в реальном времени через открытые данные.",
    stat1_val: "98%", stat1_desc: "Точность данных", stat2_val: "24/7", stat2_desc: "Режим работы",
    buttonText: "Смотреть карту", buttonColor: "bg-sky-500 text-white hover:bg-sky-600"
  },
  { 
    id: 3, 
    icon: <div className="text-4xl mb-6">🛡️</div>,
    title: "Безопасность", 
    description: "Современные системы видеонаблюдения и аналитики для вашей безопасности.",
    stat1_val: "5K+", stat1_desc: "Умных камер", stat2_val: "-30%", stat2_desc: "Уровень преступности",
    buttonText: "Узнать больше", buttonColor: "bg-blue-700 text-white hover:bg-blue-800"
  }
];

export const PROJECT_CATEGORIES = ["Все", "Транспорт", "Экология", "Безопасность", "ЖКХ", "Здравоохранение", "Образование", "Управление"];

export const RESOURCES: Resource[] = [
  { id: 1, name: "Открытые данные Тюмени", icon: "🌐" },
  { id: 2, name: "Нормативные документы", icon: "📄" },
  { id: 3, name: "ГИС Интеграция", icon: "🗺️" },
  { id: 4, name: "API Сервисы", icon: "🔌" }
];

export const COUNCIL_TASKS = [
  { icon: 'target', title: 'Определение стратегии', subtitle: 'Разработка приоритетных направлений развития' },
  { icon: 'folder', title: 'Управление портфелем', subtitle: 'Координация ключевых городских проектов' },
  { icon: 'ruble', title: 'Бюджетирование', subtitle: 'Распределение средств на инновации' },
  { icon: 'sync', title: 'Взаимодействие', subtitle: 'Связь между бизнесом, властью и наукой' },
  { icon: 'search', title: 'Экспертиза', subtitle: 'Оценка эффективности внедряемых решений' },
  { icon: 'scales', title: 'Нормотворчество', subtitle: 'Подготовка правовой базы для цифры' }
];

export const COUNCIL_MEMBERS: Member[] = [
  { id: 1, name: "Афанасьев Максим Викторович", role: "Глава города Тюмень, Председатель совета", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" },
  { id: 2, name: "Кухарук Руслан Николаевич", role: "Заместитель председателя совета", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" },
  { id: 3, name: "Иванов Иван Иванович", role: "Директор департамента ИТ", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" },
  { id: 4, name: "Петров Петр Петрович", role: "Ректор ТИУ", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" }
];

export const COMMITTEE_MEMBERS: Member[] = [
  { id: 1, name: "Сидоров Сидор", role: "Технический директор", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" },
  { id: 2, name: "Козлова Анна", role: "Ведущий аналитик", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" }
];

export const MONITORING_MEMBERS: Member[] = [
  { id: 1, name: "Смирнов Олег", role: "Руководитель группы", imageUrl: "https://i.postimg.cc/VNS0xmLz/105ba0ae5ed326f2f20975ea2095c809-297224.jpg" }
];

export const USER_PROFILE = {
  name: "Александр Иванов",
  level: 5,
  points: 1250,
  joinedTeams: [1, 2]
};