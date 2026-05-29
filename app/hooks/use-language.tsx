import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "tr" | "ru";

const translations = {
  en: {
    // Navigation
    home: "Home",
    blog: "Blog",
    projects: "Projects",
    github: "GitHub",
    linkedin: "LinkedIn",
    telegram: "Telegram",
    toggleTheme: "Toggle theme",
    light: "Light",
    dark: "Dark",
    
    // Home Page
    hi: "Hi, I'm Kemal👋",
    role: "Full-Stack Web Developer",
    heroDesc: "I develop modern web applications and AI solutions.",
    aboutMe: "About Me",
    aboutMeText: "I'm a full-stack developer with experience in web development since 2021, specializing in creating high-performance, user-focused applications. Skilled in frontend and backend technologies, SEO, database management, and API development. I also build machine learning models in Python using PyTorch and TensorFlow for audio recognition and image matching. Passionate about developing innovative, real-world solutions with clean and maintainable code.",
    workExperience: "Work Experience",
    education: "Education",
    skills: "Skills",
    contactMe: "Contact Me",
    telegramContact: "Contact me via Telegram:",
    
    // Education Details
    subuName: "Sakarya University of Applied Sciences",
    subuDegree: "Associate's Degree in Computer Programming",
    highSchoolName: "HACI SEVİM YILDIZ-1 TECHNICAL HIGH SCHOOL",
    highSchoolDegree: "COMPUTER SCIENCE / Web Programming",
    
    // Language Skill Names
    langTurkish: "🇹🇷 Turkish • Native",
    langRussian: "🇷🇺 Russian • Good",
    langEnglish: "🇬🇧 English • Intermediate",

    // Work Details
    present: "Present",
    ewrosRole: "Software Developer",
    ewrosDesc: "Working as a Software Developer since April 2026. Developing e-commerce systems, web applications, SEO solutions, and artificial intelligence projects.",
    sakaryaRole: "Frontend Developer",
    sakaryaDesc: "I worked as a Frontend Developer under the İŞKUR Youth Program, contributing to the development of rekabest.com, the Sakarya Tournament Management System. I built the platform using Node.js and EJS, focusing on creating a user-friendly interface and optimizing overall performance.",
    arisRole: "Full Stack Web Developer",
    arisDesc: "Working as a full-stack developer at a company focused on metaverse and blockchain technologies. Developing Web3 integrations, NFT marketplace, and game backend systems.",
    inegolRole: "Intern Developer",
    inegolDesc: "Interned at İnegöl Municipality IT Department. Developed network monitoring tools and coded the PingATAR application with C#.",
    
    // Projects Page & Modal
    projectsTitle: "Projects",
    projectsDesc: "A collection of my work in web development and artificial intelligence.",
    viewCode: "View Code",
    liveDemo: "Live Demo",
    keyFeatures: "Key Features",
    
    // Blog
    noBlog: "No blog posts yet",
    checkBack: "Check back soon for new content!",
    featured: "Featured",
    backToBlog: "Back to Blog",
    minRead: "min read",
    views: "views",
  },
  tr: {
    // Navigation
    home: "Ana Sayfa",
    blog: "Blog",
    projects: "Projeler",
    github: "GitHub",
    linkedin: "LinkedIn",
    telegram: "Telegram",
    toggleTheme: "Temayı değiştir",
    light: "Açık",
    dark: "Koyu",
    
    // Home Page
    hi: "Merhaba, Ben Kemal👋",
    role: "Full-Stack Web Geliştirici",
    heroDesc: "Modern web uygulamaları ve yapay zeka çözümleri geliştiriyorum.",
    aboutMe: "Hakkımda",
    aboutMeText: "2021 yılından bu yana web geliştirme alanında deneyime sahip, yüksek performanslı ve kullanıcı odaklı uygulamalar oluşturma konusunda uzmanlaşmış bir full-stack geliştiriciyim. Ön yüz (frontend) ve arka yüz (backend) teknolojileri, SEO, veri tabanı yönetimi ve API geliştirme konularında yetkinim. Ayrıca Python kullanarak ses tanıma ve görsel eşleştirme amacıyla PyTorch ve TensorFlow ile makine öğrenimi modelleri eğitiyorum. Temiz ve sürdürülebilir kodlarla yenilikçi, gerçek dünyaya hitap eden çözümler geliştirmeye tutkuluyum.",
    workExperience: "İş Deneyimi",
    education: "Eğitim",
    skills: "Yetenekler",
    contactMe: "İletişim",
    telegramContact: "Bana Telegram üzerinden ulaşın:",
    
    // Education Details
    subuName: "Sakarya Uygulamalı Bilimler Üniversitesi",
    subuDegree: "Bilgisayar Programcılığı Önlisans",
    highSchoolName: "HACI SEVİM YILDIZ-1 MESLEKİ VE TEKNİK ANADOLU LİSESİ",
    highSchoolDegree: "BİLİŞİM TEKNOLOJİLERİ / Web Programcılığı",
    
    // Language Skill Names
    langTurkish: "🇹🇷 Türkçe • Ana Dil",
    langRussian: "🇷🇺 Rusça • İyi",
    langEnglish: "🇬🇧 İngilizce • Orta Seviye",

    // Work Details
    present: "Günümüz",
    ewrosRole: "Yazılım Geliştirici",
    ewrosDesc: "2026 Nisan ayından bu yana Yazılım Geliştirici olarak çalışıyorum. E-ticaret sistemleri, web uygulamaları, SEO çözümleri ve yapay zeka projeleri geliştiriyorum.",
    sakaryaRole: "Frontend Geliştirici",
    sakaryaDesc: "İŞKUR Gençlik Programı kapsamında Frontend Geliştirici olarak çalıştım; Sakarya Turnuva Yönetim Sistemi rekabest.com'un geliştirilmesine katkıda bulundum. Platformu Node.js ve EJS kullanarak, kullanıcı dostu bir arayüz oluşturmaya ve genel performansı optimize etmeye odaklanarak inşa ettim.",
    arisRole: "Full Stack Web Geliştirici",
    arisDesc: "Metaverse ve blokzincir teknolojilerine odaklanan bir şirkette full-stack geliştirici olarak çalıştım. Web3 entegrasyonları, NFT pazaryeri ve oyun arka uç sistemleri geliştirdim.",
    inegolRole: "Stajyer Geliştirici",
    inegolDesc: "İnegöl Belediyesi Bilgi İşlem Müdürlüğü bünyesinde staj yaptım. Ağ izleme araçları geliştirdim ve C# ile PingATAR uygulamasını kodladım.",
    
    // Projects Page & Modal
    projectsTitle: "Projeler",
    projectsDesc: "Web geliştirme ve yapay zeka alanındaki çalışmalarımın bir koleksiyonu.",
    viewCode: "Kodu Gör",
    liveDemo: "Canlı Önizleme",
    keyFeatures: "Temel Özellikler",
    
    // Blog
    noBlog: "Henüz blog yazısı bulunmamaktadır",
    checkBack: "Yeni içerikler için yakında tekrar kontrol edin!",
    featured: "Öne Çıkan",
    backToBlog: "Bloga Geri Dön",
    minRead: "dk okuma",
    views: "görüntüleme",
  },
  ru: {
    // Navigation
    home: "Главная",
    blog: "Блог",
    projects: "Проекты",
    github: "GitHub",
    linkedin: "LinkedIn",
    telegram: "Telegram",
    toggleTheme: "Переключить тему",
    light: "Светлая",
    dark: "Темная",
    
    // Home Page
    hi: "Привет, я Кемаль👋",
    role: "Full-Stack веб-разработчик",
    heroDesc: "Я разрабатываю современные веб-приложения и решения в области искусственного интеллекта.",
    aboutMe: "Обо мне",
    aboutMeText: "Я full-stack разработчик с опытом веб-разработки с 2021 года, специализируюсь на создании высокопроизводительных, ориентированных на пользователя приложений. Обладаю навыками в области frontend и backend технологий, SEO, управления базами данных и разработки API. Также создаю модели машинного обучения на Python с использованием PyTorch и TensorFlow для распознавания аудио и сопоставления изображений. Увлечен разработкой инновационных реальных решений с чистым и поддерживаемым кодом.",
    workExperience: "Опыт работы",
    education: "Образование",
    skills: "Навыки",
    contactMe: "Контакты",
    telegramContact: "Свяжитесь со мной через Telegram:",
    
    // Education Details
    subuName: "Университет прикладных наук Сакарьи",
    subuDegree: "Ассоциированная степень в области компьютерного программирования",
    highSchoolName: "ТЕХНИЧЕСКИЙ ЛИЦЕЙ ХАДЖИ СЕВИМ ЙЫЛДЫЗ-1",
    highSchoolDegree: "КОМПЬЮТЕРНЫЕ НАУКИ / Веб-программирование",
    
    // Language Skill Names
    langTurkish: "🇹🇷 Турецкий • Родной",
    langRussian: "🇷🇺 Русский • Хорошо",
    langEnglish: "🇬🇧 Английский • Средний",

    // Work Details
    present: "По наст. время",
    ewrosRole: "Разработчик ПО",
    ewrosDesc: "Работаю разработчиком программного обеспечения с апреля 2026 года. Разрабатываю системы электронной коммерции, веб-приложения, решения для SEO и проекты в сфере искусственного интеллекта.",
    sakaryaRole: "Frontend-разработчик",
    sakaryaDesc: "Работал в качестве Frontend-разработчика по молодежной программе İŞKUR, внося вклад в разработку rekabest.com — системы управления турнирами Сакарья. Я построил платформу с использованием Node.js и EJS, сосредоточившись на создании удобного интерфейса и оптимизации общей производительности.",
    arisRole: "Full Stack веб-разработчик",
    arisDesc: "Работал full-stack разработчиком в компании, ориентированной на метаверс и блокчейн-технологии. Разрабатывал интеграции Web3, маркетплейс NFT и бэкенд-системы для игр.",
    inegolRole: "Разработчик-стажер",
    inegolDesc: "Стажировался в ИТ-отделе муниципалитета Инегёль. Разрабатывал инструменты мониторинга сети и написал приложение PingATAR на C#.",
    
    // Projects Page & Modal
    projectsTitle: "Проекты",
    projectsDesc: "Коллекция моих работ в области веб-разработки и искусственного интеллекта.",
    viewCode: "Посмотреть код",
    liveDemo: "Демонстрация",
    keyFeatures: "Ключевые особенности",
    
    // Blog
    noBlog: "Пока нет блогов",
    checkBack: "Загляните сюда позже!",
    featured: "Рекомендуемое",
    backToBlog: "Назад в блог",
    minRead: "мин чтения",
    views: "просмотров",
  }
};

export const projectTranslations = {
  en: {
    1: {
      description: "E-commerce website with Shopier API integration for seamless payment processing.",
      fullDescription: "E-commerce website with Shopier API integration for seamless payment processing. Features a modern design and secure checkout.",
      features: ["Shopier Integration", "Product Management", "Secure Payments", "Admin Panel"]
    },
    2: {
      description: "Real-time location tracking and user-friendly interface for Sakarya Metropolitan Municipality bus tracking system.",
      fullDescription: "Real-time location tracking and user-friendly interface for Sakarya Metropolitan Municipality bus tracking system. Provides accurate bus times and route information.",
      features: ["Real-time Tracking", "Socket.io Integration", "Mobile Friendly", "Live Map"]
    },
    3: {
      description: "Vehicle sales listing platform with detailed product pages and Arabam.com API integration.",
      fullDescription: "Vehicle sales listing platform with detailed product pages and Arabam.com API integration. Allows users to browse and filter vehicle listings.",
      features: ["API Integration", "Vehicle Filtering", "Detailed Listings", "Admin Dashboard"]
    },
    4: {
      description: "Full-featured brand-specific e-commerce platform with product management and order tracking.",
      fullDescription: "Full-featured brand-specific e-commerce platform with product management, order tracking, and payment gateway integration.",
      features: ["Product Management", "Order Tracking", "Payment Gateway", "Responsive Design"]
    },
    5: {
      description: "Tournament management platform for Sakarya University of Applied Sciences.",
      fullDescription: "Tournament management platform for Sakarya University of Applied Sciences with user registration, fixture creation, and result tracking.",
      features: ["User Registration", "Automated Fixtures", "Result Tracking", "JWT Authentication"]
    },
    6: {
      description: "Multi-ping and network monitoring software for İnegöl Municipality.",
      fullDescription: "Multi-ping and network monitoring software for İnegöl Municipality. Desktop application for comprehensive network management and troubleshooting.",
      features: ["Multi-ping", "Network Monitoring", "Desktop App", "Real-time Status"]
    },
    7: {
      description: "First place project in 2025 SUBU Robotek competition. Voice recognition and image matching model.",
      fullDescription: "First place project in 2025 SUBU Robotek competition. Voice recognition and image matching model with 100% accuracy. Demonstrates advanced AI capabilities.",
      features: ["Voice Recognition", "Image Matching", "High Accuracy", "Competition Winner"]
    },
    8: {
      description: "AI-powered assistant chatbot with training capabilities using files and websites.",
      fullDescription: "AI-powered assistant chatbot with training capabilities using files and websites. Develop your own AI assistant with company information and easily integrate it into your website.",
      features: ["Custom AI Training", "File & Website Integration", "Easy Embedding", "RAG Technology"]
    },
    9: {
      description: "Personal AI assistant showcasing portfolio and capabilities.",
      fullDescription: "Personal AI assistant showcasing portfolio and capabilities. Interact with the AI to learn more about my projects and skills.",
      features: ["Interactive Chat", "Portfolio Showcase", "AI Integration"]
    },
    10: {
      description: "Modern and elegant website for Psychologist Tuğba Yıldırım.",
      fullDescription: "Modern and elegant website for Psychologist Tuğba Yıldırım. Features a clean design, appointment information, and blog section.",
      features: ["Modern Design", "Blog Section", "Contact Form", "Responsive Layout"]
    },
    11: {
      description: "Freelancer Order Management App",
      fullDescription: "Freelancer Order Management and Tracking App with Next JS",
      features: ["Guided Meditation", "Breathing Exercises", "Relaxing Sounds", "User Progress"]
    },
    12: {
      description: "AI companion for friendly conversations and support.",
      fullDescription: "AI companion for friendly conversations and support. Built to provide a safe and engaging space for users to chat.",
      features: ["Friendly Chat", "Emotional Support", "24/7 Availability"]
    }
  },
  tr: {
    1: {
      description: "Sorunsuz ödeme işlemi için Shopier API entegrasyonuna sahip e-ticaret web sitesi.",
      fullDescription: "Sorunsuz ödeme işlemi için Shopier API entegrasyonuna sahip e-ticaret web sitesi. Modern bir tasarıma ve güvenli ödemeye sahiptir.",
      features: ["Shopier Entegrasyonu", "Ürün Yönetimi", "Güvenli Ödemeler", "Yönetici Paneli"]
    },
    2: {
      description: "Sakarya Büyükşehir Belediyesi otobüs takip sistemi için gerçek zamanlı konum takibi ve kullanıcı dostu arayüz.",
      fullDescription: "Sakarya Büyükşehir Belediyesi otobüs takip sistemi için gerçek zamanlı konum takibi ve kullanıcı dostu arayüz. Doğru otobüs saatleri ve güzergah bilgileri sağlar.",
      features: ["Gerçek Zamanlı Takip", "Socket.io Entegrasyonu", "Mobil Uyumlu", "Canlı Harita"]
    },
    3: {
      description: "Detaylı ürün sayfaları ve Arabam.com API entegrasyonu ile araç satış ilan platformu.",
      fullDescription: "Detaylı ürün sayfaları ve Arabam.com API entegrasyonu ile araç satış ilan platformu. Kullanıcıların araç ilanlarına göz atmasına ve filtrelemesine olanak tanır.",
      features: ["API Entegrasyonu", "Araç Filtreleme", "Detaylı İlanlar", "Yönetici Paneli"]
    },
    4: {
      description: "Ürün yönetimi ve sipariş takibi özelliklerine sahip, markaya özel tam donanımlı e-ticaret platformu.",
      fullDescription: "Ürün yönetimi, sipariş takibi ve ödeme geçidi entegrasyonuna sahip, markaya özel tam donanımlı e-ticaret platformu.",
      features: ["Ürün Yönetimi", "Sipariş Takibi", "Ödeme Geçidi", "Duyarlı Tasarım"]
    },
    5: {
      description: "Sakarya Uygulamalı Bilimler Üniversitesi için turnuva yönetim platformu.",
      fullDescription: "Kullanıcı kaydı, fikstür oluşturma ve sonuç takibi özelliklerine sahip Sakarya Uygulamalı Bilimler Üniversitesi için turnuva yönetim platformu.",
      features: ["Kullanıcı Kaydı", "Otomatik Fikstürler", "Sonuç Takibi", "JWT Kimlik Doğrulama"]
    },
    6: {
      description: "İnegöl Belediyesi için çoklu ping ve ağ izleme yazılımı.",
      fullDescription: "İnegöl Belediyesi için çoklu ping ve ağ izleme yazılımı. Kapsamlı ağ yönetimi ve sorun giderme için masaüstü uygulaması.",
      features: ["Çoklu Ping", "Ağ İzleme", "Masaüstü Uygulaması", "Gerçek Zamanlı Durum"]
    },
    7: {
      description: "2025 SUBU Robotek yarışmasında birincilik ödülü alan proje. Ses tanıma ve görsel eşleştirme modeli.",
      fullDescription: "2025 SUBU Robotek yarışmasında birincilik ödülü alan proje. %100 doğruluk oranına sahip ses tanıma ve görsel eşleştirme modeli. Gelişmiş yapay zeka yeteneklerini göstermektedir.",
      features: ["Ses Tanıma", "Görsel Eşleştirme", "Yüksek Doğruluk", "Yarışma Birincisi"]
    },
    8: {
      description: "Dosyalar ve web siteleri kullanılarak eğitilebilen yapay zeka destekli asistan sohbet botu.",
      fullDescription: "Dosyalar ve web siteleri kullanılarak eğitilebilen yapay zeka destekli asistan sohbet botu. Şirket bilgilerinizle kendi yapay zeka asistanınızı geliştirin ve web sitenize kolayca entegre edin.",
      features: ["Özel Yapay Zeka Eğitimi", "Dosya ve Web Sitesi Entegrasyonu", "Kolay Entegrasyon", "RAG Teknolojisi"]
    },
    9: {
      description: "Portföy ve yetenekleri sergileyen kişisel yapay zeka asistanı.",
      fullDescription: "Portföy ve yetenekleri sergileyen kişisel yapay zeka asistanı. Projelerim ve yeteneklerim hakkında daha fazla bilgi edinmek için yapay zeka ile etkileşime geçin.",
      features: ["Etkileşimli Sohbet", "Portföy Gösterimi", "Yapay Zeka Entegrasyonu"]
    },
    10: {
      description: "Psikolog Tuğba Yıldırım için modern ve zarif web sitesi.",
      fullDescription: "Psikolog Tuğba Yıldırım için modern ve zarif web sitesi. Temiz bir tasarım, randevu bilgileri ve blog bölümü içerir.",
      features: ["Modern Tasarım", "Blog Bölümü", "İletişim Formu", "Duyarlı Düzen"]
    },
    11: {
      description: "Serbest Çalışan (Freelancer) Sipariş Yönetim Uygulaması",
      fullDescription: "Next.js ile oluşturulmuş Serbest Çalışan (Freelancer) Sipariş Yönetim ve Takip Uygulaması",
      features: ["Rehberli Meditasyon", "Nefes Egzersizleri", "Rahatlatıcı Sesler", "Kullanıcı İlerlemesi"]
    },
    12: {
      description: "Dostça sohbetler ve destek için yapay zeka arkadaşı.",
      fullDescription: "Dostça sohbetler ve destek için yapay zeka arkadaşı. Kullanıcıların sohbet etmesi için güvenli ve ilgi çekici bir alan sağlamak üzere tasarlandı.",
      features: ["Dostça Sohbet", "Duygusal Destek", "7/24 Erişilebilirlik"]
    }
  },
  ru: {
    1: {
      description: "Сайт электронной коммерции с интеграцией Shopier API для беспрепятственной обработки платежей.",
      fullDescription: "Сайт электронной коммерции с интеграцией Shopier API для беспрепятственной обработки платежей. Отличается современным дизайном и безопасным оформлением заказа.",
      features: ["Интеграция Shopier", "Управление продуктами", "Безопасные платежи", "Панель администратора"]
    },
    2: {
      description: "Отслеживание местоположения в реальном времени и удобный интерфейс для системы отслеживания автобусов мэрии Сакарьи.",
      fullDescription: "Отслеживание местоположения в реальном времени и удобный интерфейс для системы отслеживания автобусов мэрии Сакарьи. Предоставляет точное время автобусов и информацию о маршрутах.",
      features: ["Отслеживание в реальном времени", "Интеграция Socket.io", "Удобно для мобильных", "Живая карта"]
    },
    3: {
      description: "Платформа объявлений о продаже автомобилей с подробными страницами товаров и интеграцией с API Arabam.com.",
      fullDescription: "Платформа объявлений о продаже автомобилей с подробными страницами товаров и интеграцией с API Arabam.com. Позволяет пользователям просматривать и фильтровать объявления о продаже автомобилей.",
      features: ["Интеграция API", "Фильтрация автомобилей", "Подробные объявления", "Панель администратора"]
    },
    4: {
      description: "Полнофункциональная платформа электронной коммерции под конкретный бренд с управлением продуктами и отслеживанием заказов.",
      fullDescription: "Полнофункциональная платформа электронной коммерции под конкретный бренд с управлением продуктами, отслеживанием заказов и интеграцией платежного шлюза.",
      features: ["Управление продуктами", "Отслеживание заказов", "Платежный шлюз", "Адаптивный дизайн"]
    },
    5: {
      description: "Платформа управления турнирами для Университета прикладных наук Сакарьи.",
      fullDescription: "Платформа управления турнирами для Университета прикладных наук Сакарьи с регистрацией пользователей, созданием турнирной сетки и отслеживанием результатов.",
      features: ["Регистрация пользователей", "Автоматические турнирные сетки", "Отслеживание результатов", "Аутентификация JWT"]
    },
    6: {
      description: "Программа для мультипинга и мониторинга сети для муниципалитета Инегёль.",
      fullDescription: "Программа для мультипинга и мониторинга сети для муниципалитета Инегёль. Десктопное приложение для комплексного управления сетью и устранения неполадок.",
      features: ["Мультипинг", "Мониторинг сети", "Десктопное приложение", "Статус в реальном времени"]
    },
    7: {
      description: "Проект, занявший первое место на конкурсе Robotek SUBU в 2025 году. Модель распознавания голоса и сопоставления изображений.",
      fullDescription: "Проект, занявший первое место на конкурсе Robotek SUBU в 2025 году. Модель распознавания голоса и сопоставления изображений со 100% точностью. Демонстрирует передовые возможности ИИ.",
      features: ["Распознавание голоса", "Сопоставление изображений", "Высокая точность", "Победитель конкурса"]
    },
    8: {
      description: "Чат-бот помощник на базе искусственного интеллекка с возможностью обучения с использованием файлов и веб-сайтов.",
      fullDescription: "Чат-бот помощник на базе искусственного интеллекта с возможностью обучения с использованием файлов и веб-сайтов. Создайте собственного ИИ-помощника с информацией о компании и легко интегрируйте его на свой сайт.",
      features: ["Персонализированное обучение ИИ", "Интеграция файлов и веб-сайтов", "Простая вставка", "Технология RAG"]
    },
    9: {
      description: "Персональный ИИ-помощник, демонстрирующий портфолио и возможности.",
      fullDescription: "Персональный ИИ-помощник, демонстрирующий портфолио и возможности. Взаимодействуйте с ИИ, чтобы узнать больше о моих проектах и навыках.",
      features: ["Интерактивный чат", "Демонстрация портфолио", "Интеграция ИИ"]
    },
    10: {
      description: "Современный и элегантный сайт для психолога Тугбы Йылдырым.",
      fullDescription: "Современный и элегантный сайт для психолога Тугбы Йылдырым. Содержит лаконичный дизайн, информацию о записи на прием и раздел блога.",
      features: ["Современный дизайн", "Раздел блога", "Форма обратной связи", "Адаптивная верстка"]
    },
    11: {
      description: "Приложение для управления заказами фрилансеров",
      fullDescription: "Приложение для управления и отслеживания заказов фрилансеров на Next.js",
      features: ["Медитация с инструктором", "Дыхательные упражнения", "Расслабляющие звуки", "Прогресс пользователя"]
    },
    12: {
      description: "ИИ-компаньон для дружеского общения и поддержки.",
      fullDescription: "ИИ-компаньон для дружеского общения и поддержки. Создан для обеспечения безопасного и увлекательного пространства для общения пользователей.",
      features: ["Дружеский чат", "Эмоциональная поддержка", "Доступность 24/7"]
    }
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"]) => string;
  tProject: (projectId: number, field: "description" | "fullDescription" | "features") => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr"); // Default to Turkish as it is his main page audience, or check localStorage

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "tr" || savedLang === "ru")) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "tr") {
        setLanguageState("tr");
      } else if (browserLang === "ru") {
        setLanguageState("ru");
      } else {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    // Update html lang attribute dynamically
    document.documentElement.setAttribute("lang", lang);
  };

  const t = (key: keyof typeof translations["en"]) => {
    const currentTranslations = translations[language] || translations["en"];
    return currentTranslations[key] || translations["en"][key] || String(key);
  };

  const tProject = (projectId: number, field: "description" | "fullDescription" | "features") => {
    const currentProj = (projectTranslations[language] as any)?.[projectId] || (projectTranslations["en"] as any)?.[projectId];
    return currentProj?.[field] || (projectTranslations["en"] as any)?.[projectId]?.[field];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tProject }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
