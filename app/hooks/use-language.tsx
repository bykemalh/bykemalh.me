import { createContext, useContext, useState, useEffect } from "react";
import { getProjectById, getProjectContent } from "@/data/projects";

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
    aboutSummary: "Kemal Hafızoğlu is a full-stack developer and AI engineer from Sakarya, Turkey. Since 2021 he has shipped e-commerce platforms, real-time tracking systems and award-winning AI projects for municipalities, universities and startups, working mainly with TypeScript, React, Node.js, Python and PyTorch.",
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
    ewrosRole: "Software Developer",
    ewrosDesc: "Worked as a Software Developer from April to September 2026. Developed e-commerce systems, web applications, SEO solutions, and artificial intelligence projects.",
    sakaryaRole: "Frontend Developer",
    sakaryaDesc: "I worked as a Frontend Developer under the İŞKUR Youth Program, contributing to the development of rekabest.com, the Sakarya Tournament Management System. I built the platform using Node.js and EJS, focusing on creating a user-friendly interface and optimizing overall performance.",
    arisRole: "Full Stack Web Developer",
    arisDesc: "Worked as a full-stack developer at a company focused on metaverse and blockchain technologies. Developed Web3 integrations, an NFT marketplace, and game backend systems.",
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
    aboutSummary: "Kemal Hafızoğlu, Sakaryalı bir full-stack geliştirici ve yapay zeka mühendisidir. 2021'den bu yana belediyeler, üniversiteler ve girişimler için e-ticaret platformları, gerçek zamanlı takip sistemleri ve ödüllü yapay zeka projeleri geliştirdi; ağırlıklı olarak TypeScript, React, Node.js, Python ve PyTorch ile çalışır.",
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
    ewrosRole: "Yazılım Geliştirici",
    ewrosDesc: "Nisan 2026 – Eylül 2026 arasında Yazılım Geliştirici olarak çalıştım. E-ticaret sistemleri, web uygulamaları, SEO çözümleri ve yapay zeka projeleri geliştirdim.",
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
    aboutSummary: "Кемал Хафызоглы — full-stack разработчик и инженер ИИ из Сакарьи (Турция). С 2021 года он создаёт e-commerce платформы, системы отслеживания в реальном времени и отмеченные наградами проекты ИИ для муниципалитетов, университетов и стартапов; работает в основном с TypeScript, React, Node.js, Python и PyTorch.",
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
    ewrosRole: "Разработчик ПО",
    ewrosDesc: "Работал разработчиком программного обеспечения с апреля по сентябрь 2026 года. Разрабатывал системы электронной коммерции, веб-приложения, решения для SEO и проекты в сфере искусственного интеллекта.",
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
    const project = getProjectById(projectId);
    if (!project) return undefined;
    return getProjectContent(project, language)[field];
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
