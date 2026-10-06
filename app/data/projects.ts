/**
 * Tek proje veri kaynağı.
 * Yeni proje eklemek için bu dosyaya yeni bir obje ekleyin (id'ler benzersiz olmalı)
 * ve görselleri public/img/projects/<id>/ altına yerleştirin.
 * Çeviriler proje objesinin içinde tutulur; eksik dil otomatik olarak İngilizceye düşer.
 */

export type ProjectLanguage = "en" | "tr" | "ru";

export interface ProjectContent {
  description: string;
  fullDescription: string;
  features: string[];
}

export interface Project {
  id: number;
  title: string;
  image: string;
  images: string[];
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  content: Record<ProjectLanguage, ProjectContent>;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Hempy",
    image: "/img/projects/1/home.png",
    images: ["/img/projects/1/home.png"],
    tags: ["Node.js", "EJS", "Prisma", "PostgreSQL"],
    demoUrl: "https://hempy.com.tr",
    repoUrl: "#",
    content: {
      en: {
        description: "E-commerce website with Shopier API integration for seamless payment processing.",
        fullDescription: "E-commerce website with Shopier API integration for seamless payment processing. Features a modern design and secure checkout.",
        features: ["Shopier Integration", "Product Management", "Secure Payments", "Admin Panel"]
      },
      tr: {
        description: "Sorunsuz ödeme işlemi için Shopier API entegrasyonuna sahip e-ticaret web sitesi.",
        fullDescription: "Sorunsuz ödeme işlemi için Shopier API entegrasyonuna sahip e-ticaret web sitesi. Modern bir tasarıma ve güvenli ödemeye sahiptir.",
        features: ["Shopier Entegrasyonu", "Ürün Yönetimi", "Güvenli Ödemeler", "Yönetici Paneli"]
      },
      ru: {
        description: "Сайт электронной коммерции с интеграцией Shopier API для беспрепятственной обработки платежей.",
        fullDescription: "Сайт электронной коммерции с интеграцией Shopier API для беспрепятственной обработки платежей. Отличается современным дизайном и безопасным оформлением заказа.",
        features: ["Интеграция Shopier", "Управление продуктами", "Безопасные платежи", "Панель администратора"]
      }
    }
  },
  {
    id: 2,
    title: "Sakus",
    image: "/img/projects/2/sakus1.webp",
    images: [
      "/img/projects/2/sakus1.webp",
      "/img/projects/2/sakus2.webp",
      "/img/projects/2/sakus3.webp",
      "/img/projects/2/sakus4.webp",
      "/img/projects/2/sakus5.webp",
      "/img/projects/2/sakus6.webp"
    ],
    tags: ["Node.js", "Express.js", "MongoDB", "Socket.io"],
    demoUrl: "https://sakus.sakarya.bel.tr",
    repoUrl: "#",
    content: {
      en: {
        description: "Real-time location tracking and user-friendly interface for Sakarya Metropolitan Municipality bus tracking system.",
        fullDescription: "Real-time location tracking and user-friendly interface for Sakarya Metropolitan Municipality bus tracking system. Provides accurate bus times and route information.",
        features: ["Real-time Tracking", "Socket.io Integration", "Mobile Friendly", "Live Map"]
      },
      tr: {
        description: "Sakarya Büyükşehir Belediyesi otobüs takip sistemi için gerçek zamanlı konum takibi ve kullanıcı dostu arayüz.",
        fullDescription: "Sakarya Büyükşehir Belediyesi otobüs takip sistemi için gerçek zamanlı konum takibi ve kullanıcı dostu arayüz. Doğru otobüs saatleri ve güzergah bilgileri sağlar.",
        features: ["Gerçek Zamanlı Takip", "Socket.io Entegrasyonu", "Mobil Uyumlu", "Canlı Harita"]
      },
      ru: {
        description: "Отслеживание местоположения в реальном времени и удобный интерфейс для системы отслеживания автобусов мэрии Сакарьи.",
        fullDescription: "Отслеживание местоположения в реальном времени и удобный интерфейс для системы отслеживания автобусов мэрии Сакарьи. Предоставляет точное время автобусов и информацию о маршрутах.",
        features: ["Отслеживание в реальном времени", "Интеграция Socket.io", "Удобно для мобильных", "Живая карта"]
      }
    }
  },
  {
    id: 3,
    title: "ArzAuto",
    image: "/img/projects/3/arzauto1.webp",
    images: [
      "/img/projects/3/arzauto1.webp",
      "/img/projects/3/arzauto2.webp",
      "/img/projects/3/arzauto3.webp",
      "/img/projects/3/arzauto4.webp"
    ],
    tags: ["Python Flask", "PostgreSQL"],
    demoUrl: "https://arzautogarage.com/",
    repoUrl: "#",
    content: {
      en: {
        description: "Vehicle sales listing platform with detailed product pages and Arabam.com API integration.",
        fullDescription: "Vehicle sales listing platform with detailed product pages and Arabam.com API integration. Allows users to browse and filter vehicle listings.",
        features: ["API Integration", "Vehicle Filtering", "Detailed Listings", "Admin Dashboard"]
      },
      tr: {
        description: "Detaylı ürün sayfaları ve Arabam.com API entegrasyonu ile araç satış ilan platformu.",
        fullDescription: "Detaylı ürün sayfaları ve Arabam.com API entegrasyonu ile araç satış ilan platformu. Kullanıcıların araç ilanlarına göz atmasına ve filtrelemesine olanak tanır.",
        features: ["API Entegrasyonu", "Araç Filtreleme", "Detaylı İlanlar", "Yönetici Paneli"]
      },
      ru: {
        description: "Платформа объявлений о продаже автомобилей с подробными страницами товаров и интеграцией с API Arabam.com.",
        fullDescription: "Платформа объявлений о продаже автомобилей с подробными страницами товаров и интеграцией с API Arabam.com. Позволяет пользователям просматривать и фильтровать объявления о продаже автомобилей.",
        features: ["Интеграция API", "Фильтрация автомобилей", "Подробные объявления", "Панель администратора"]
      }
    }
  },
  {
    id: 4,
    title: "Seyfi",
    image: "/img/projects/4/seyfi.webp",
    images: ["/img/projects/4/seyfi.webp"],
    tags: ["PHP", "MySQL", "Bootstrap", "Payment Gateway"],
    demoUrl: "#",
    repoUrl: "#",
    content: {
      en: {
        description: "Full-featured brand-specific e-commerce platform with product management and order tracking.",
        fullDescription: "Full-featured brand-specific e-commerce platform with product management, order tracking, and payment gateway integration.",
        features: ["Product Management", "Order Tracking", "Payment Gateway", "Responsive Design"]
      },
      tr: {
        description: "Ürün yönetimi ve sipariş takibi özelliklerine sahip, markaya özel tam donanımlı e-ticaret platformu.",
        fullDescription: "Ürün yönetimi, sipariş takibi ve ödeme geçidi entegrasyonuna sahip, markaya özel tam donanımlı e-ticaret platformu.",
        features: ["Ürün Yönetimi", "Sipariş Takibi", "Ödeme Geçidi", "Duyarlı Tasarım"]
      },
      ru: {
        description: "Полнофункциональная платформа электронной коммерции под конкретный бренд с управлением продуктами и отслеживанием заказов.",
        fullDescription: "Полнофункциональная платформа электронной коммерции под конкретный бренд с управлением продуктами, отслеживанием заказов и интеграцией платежного шлюза.",
        features: ["Управление продуктами", "Отслеживание заказов", "Платежный шлюз", "Адаптивный дизайн"]
      }
    }
  },
  {
    id: 5,
    title: "SUBU Turnuva",
    image: "/img/projects/5/subu1.webp",
    images: [
      "/img/projects/5/subu1.webp",
      "/img/projects/5/subu2.webp",
      "/img/projects/5/subu3.webp",
      "/img/projects/5/subu4.webp",
      "/img/projects/5/subu5.webp"
    ],
    tags: ["Node.js", "Express.js", "MongoDB", "JWT Auth"],
    demoUrl: "https://rekabest.com",
    repoUrl: "#",
    content: {
      en: {
        description: "Tournament management platform for Sakarya University of Applied Sciences.",
        fullDescription: "Tournament management platform for Sakarya University of Applied Sciences with user registration, fixture creation, and result tracking.",
        features: ["User Registration", "Automated Fixtures", "Result Tracking", "JWT Authentication"]
      },
      tr: {
        description: "Sakarya Uygulamalı Bilimler Üniversitesi için turnuva yönetim platformu.",
        fullDescription: "Kullanıcı kaydı, fikstür oluşturma ve sonuç takibi özelliklerine sahip Sakarya Uygulamalı Bilimler Üniversitesi için turnuva yönetim platformu.",
        features: ["Kullanıcı Kaydı", "Otomatik Fikstürler", "Sonuç Takibi", "JWT Kimlik Doğrulama"]
      },
      ru: {
        description: "Платформа управления турнирами для Университета прикладных наук Сакарьи.",
        fullDescription: "Платформа управления турнирами для Университета прикладных наук Сакарьи с регистрацией пользователей, созданием турнирной сетки и отслеживанием результатов.",
        features: ["Регистрация пользователей", "Автоматические турнирные сетки", "Отслеживание результатов", "Аутентификация JWT"]
      }
    }
  },
  {
    id: 6,
    title: "PingATAR",
    image: "/img/projects/6/pingatar.webp",
    images: ["/img/projects/6/pingatar.webp"],
    tags: ["C# WinForms", "Network Programming"],
    demoUrl: "#",
    repoUrl: "https://github.com/bykemalh/pingatar",
    content: {
      en: {
        description: "Multi-ping and network monitoring software for İnegöl Municipality.",
        fullDescription: "Multi-ping and network monitoring software for İnegöl Municipality. Desktop application for comprehensive network management and troubleshooting.",
        features: ["Multi-ping", "Network Monitoring", "Desktop App", "Real-time Status"]
      },
      tr: {
        description: "İnegöl Belediyesi için çoklu ping ve ağ izleme yazılımı.",
        fullDescription: "İnegöl Belediyesi için çoklu ping ve ağ izleme yazılımı. Kapsamlı ağ yönetimi ve sorun giderme için masaüstü uygulaması.",
        features: ["Çoklu Ping", "Ağ İzleme", "Masaüstü Uygulaması", "Gerçek Zamanlı Durum"]
      },
      ru: {
        description: "Программа для мультипинга и мониторинга сети для муниципалитета Инегёль.",
        fullDescription: "Программа для мультипинга и мониторинга сети для муниципалитета Инегёль. Десктопное приложение для комплексного управления сетью и устранения неполадок.",
        features: ["Мультипинг", "Мониторинг сети", "Десктопное приложение", "Статус в реальном времени"]
      }
    }
  },
  {
    id: 7,
    title: "Robotek",
    image: "/img/projects/7/robotek1.webp",
    images: [
      "/img/projects/7/robotek1.webp",
      "/img/projects/7/robotek2.webp"
    ],
    tags: ["PyTorch", "TensorFlow", "OpenCV"],
    demoUrl: "#",
    repoUrl: "https://github.com/bykemalh/strongai_robotek",
    content: {
      en: {
        description: "First place project in 2025 SUBU Robotek competition. Voice recognition and image matching model.",
        fullDescription: "First place project in 2025 SUBU Robotek competition. Voice recognition and image matching model with 100% accuracy. Demonstrates advanced AI capabilities.",
        features: ["Voice Recognition", "Image Matching", "High Accuracy", "Competition Winner"]
      },
      tr: {
        description: "2025 SUBU Robotek yarışmasında birincilik ödülü alan proje. Ses tanıma ve görsel eşleştirme modeli.",
        fullDescription: "2025 SUBU Robotek yarışmasında birincilik ödülü alan proje. %100 doğruluk oranına sahip ses tanıma ve görsel eşleştirme modeli. Gelişmiş yapay zeka yeteneklerini göstermektedir.",
        features: ["Ses Tanıma", "Görsel Eşleştirme", "Yüksek Doğruluk", "Yarışma Birincisi"]
      },
      ru: {
        description: "Проект, занявший первое место на конкурсе Robotek SUBU в 2025 году. Модель распознавания голоса и сопоставления изображений.",
        fullDescription: "Проект, занявший первое место на конкурсе Robotek SUBU в 2025 году. Модель распознавания голоса и сопоставления изображений со 100% точностью. Демонстрирует передовые возможности ИИ.",
        features: ["Распознавание голоса", "Сопоставление изображений", "Высокая точность", "Победитель конкурса"]
      }
    }
  },
  {
    id: 8,
    title: "FytureAI",
    image: "/img/projects/8/image.png",
    images: ["/img/projects/8/image.png"],
    tags: ["Next.js", "Prisma", "PostgreSQL", "RAG Tuning", "OpenAI", "Flask"],
    demoUrl: "https://fyture.io",
    repoUrl: "#",
    content: {
      en: {
        description: "AI-powered assistant chatbot with training capabilities using files and websites.",
        fullDescription: "AI-powered assistant chatbot with training capabilities using files and websites. Develop your own AI assistant with company information and easily integrate it into your website.",
        features: ["Custom AI Training", "File & Website Integration", "Easy Embedding", "RAG Technology"]
      },
      tr: {
        description: "Dosyalar ve web siteleri kullanılarak eğitilebilen yapay zeka destekli asistan sohbet botu.",
        fullDescription: "Dosyalar ve web siteleri kullanılarak eğitilebilen yapay zeka destekli asistan sohbet botu. Şirket bilgilerinizle kendi yapay zeka asistanınızı geliştirin ve web sitenize kolayca entegre edin.",
        features: ["Özel Yapay Zeka Eğitimi", "Dosya ve Web Sitesi Entegrasyonu", "Kolay Entegrasyon", "RAG Teknolojisi"]
      },
      ru: {
        description: "Чат-бот помощник на базе искусственного интеллекта с возможностью обучения с использованием файлов и веб-сайтов.",
        fullDescription: "Чат-бот помощник на базе искусственного интеллекта с возможностью обучения с использованием файлов и веб-сайтов. Создайте собственного ИИ-помощника с информацией о компании и легко интегрируйте его на свой сайт.",
        features: ["Персонализированное обучение ИИ", "Интеграция файлов и веб-сайтов", "Простая вставка", "Технология RAG"]
      }
    }
  },
  {
    id: 9,
    title: "AI bykemalh.me",
    image: "/img/projects/9/homescreen.png",
    images: [
      "/img/projects/9/homescreen.png",
      "/img/projects/9/apidocs.png",
      "/img/projects/9/asistantsscreen.png",
      "/img/projects/9/chatscreen.png"
    ],
    tags: ["AI", "React", "Vercel AI SDK"],
    demoUrl: "https://ai.bykemalh.me",
    repoUrl: "#",
    content: {
      en: {
        description: "Personal AI assistant showcasing portfolio and capabilities.",
        fullDescription: "Personal AI assistant showcasing portfolio and capabilities. Interact with the AI to learn more about my projects and skills.",
        features: ["Interactive Chat", "Portfolio Showcase", "AI Integration"]
      },
      tr: {
        description: "Portföy ve yetenekleri sergileyen kişisel yapay zeka asistanı.",
        fullDescription: "Portföy ve yetenekleri sergileyen kişisel yapay zeka asistanı. Projelerim ve yeteneklerim hakkında daha fazla bilgi edinmek için yapay zeka ile etkileşime geçin.",
        features: ["Etkileşimli Sohbet", "Portföy Gösterimi", "Yapay Zeka Entegrasyonu"]
      },
      ru: {
        description: "Персональный ИИ-помощник, демонстрирующий портфолио и возможности.",
        fullDescription: "Персональный ИИ-помощник, демонстрирующий портфолио и возможности. Взаимодействуйте с ИИ, чтобы узнать больше о моих проектах и навыках.",
        features: ["Интерактивный чат", "Демонстрация портфолио", "Интеграция ИИ"]
      }
    }
  },
  {
    id: 10,
    title: "Psikolog Tugba Yıldırım",
    image: "/img/projects/10/image.png",
    images: ["/img/projects/10/image.png"],
    tags: ["Node.js", "EJS"],
    demoUrl: "https://psikologtugbayildirim.com/",
    repoUrl: "#",
    content: {
      en: {
        description: "Modern and elegant website for Psychologist Tuğba Yıldırım.",
        fullDescription: "Modern and elegant website for Psychologist Tuğba Yıldırım. Features a clean design, appointment information, and blog section.",
        features: ["Modern Design", "Blog Section", "Contact Form", "Responsive Layout"]
      },
      tr: {
        description: "Psikolog Tuğba Yıldırım için modern ve zarif web sitesi.",
        fullDescription: "Psikolog Tuğba Yıldırım için modern ve zarif web sitesi. Temiz bir tasarım, randevu bilgileri ve blog bölümü içerir.",
        features: ["Modern Tasarım", "Blog Bölümü", "İletişim Formu", "Duyarlı Düzen"]
      },
      ru: {
        description: "Современный и элегантный сайт для психолога Тугбы Йылдырым.",
        fullDescription: "Современный и элегантный сайт для психолога Тугбы Йылдырым. Содержит лаконичный дизайн, информацию о записи на прием и раздел блога.",
        features: ["Современный дизайн", "Раздел блога", "Форма обратной связи", "Адаптивная верстка"]
      }
    }
  },
  {
    id: 11,
    title: "ColdDown",
    image: "/img/projects/11/image.png",
    images: ["/img/projects/11/image.png"],
    tags: ["Next.js", "React", "Firebase"],
    demoUrl: "",
    repoUrl: "https://github.com/bykemalh/colddown",
    content: {
      en: {
        description: "Order management and tracking app for freelancers.",
        fullDescription: "Order management and tracking app built with Next.js, helping freelancers organize client work, track order status and manage deadlines in one place.",
        features: ["Order Management", "Order Tracking", "Client Management", "Freelancer Dashboard"]
      },
      tr: {
        description: "Serbest çalışanlar için sipariş yönetim ve takip uygulaması.",
        fullDescription: "Next.js ile geliştirilen sipariş yönetim ve takip uygulaması; freelancer'ların müşteri işlerini organize etmesine, sipariş durumunu takip etmesine ve teslim tarihlerini tek yerden yönetmesine yardımcı olur.",
        features: ["Sipariş Yönetimi", "Sipariş Takibi", "Müşteri Yönetimi", "Yönetim Paneli"]
      },
      ru: {
        description: "Приложение для управления заказами и их отслеживания для фрилансеров.",
        fullDescription: "Приложение для управления и отслеживания заказов, созданное на Next.js; помогает фрилансерам организовать работу с клиентами, отслеживать статус заказов и управлять сроками сдачи в одном месте.",
        features: ["Управление заказами", "Отслеживание заказов", "Управление клиентами", "Панель управления"]
      }
    }
  },
  {
    id: 12,
    title: "FriendlyAI",
    image: "/img/projects/12/home.png",
    images: ["/img/projects/12/home.png"],
    tags: ["Next.js", "OpenAI", "Tailwind CSS"],
    demoUrl: "https://metcen.bykemalh.me",
    repoUrl: "#",
    content: {
      en: {
        description: "AI companion for friendly conversations and support.",
        fullDescription: "AI companion for friendly conversations and support. Built to provide a safe and engaging space for users to chat.",
        features: ["Friendly Chat", "Emotional Support", "24/7 Availability"]
      },
      tr: {
        description: "Dostça sohbetler ve destek için yapay zeka arkadaşı.",
        fullDescription: "Dostça sohbetler ve destek için yapay zeka arkadaşı. Kullanıcıların sohbet etmesi için güvenli ve ilgi çekici bir alan sağlamak üzere tasarlandı.",
        features: ["Dostça Sohbet", "Duygusal Destek", "7/24 Erişilebilirlik"]
      },
      ru: {
        description: "ИИ-компаньон для дружеского общения и поддержки.",
        fullDescription: "ИИ-компаньон для дружеского общения и поддержки. Создан для обеспечения безопасного и увлекательного пространства для общения пользователей.",
        features: ["Дружеский чат", "Эмоциональная поддержка", "Доступность 24/7"]
      }
    }
  }
];

/** İstenen dildeki içerik; eksikse İngilizceye düşer. */
export function getProjectContent(project: Project, language: ProjectLanguage) {
  return project.content[language] ?? project.content.en;
}

export function getProjectById(id: number) {
  return projects.find((project) => project.id === id);
}
