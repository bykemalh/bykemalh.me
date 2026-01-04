import { useState, useEffect } from "react";
import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { Badge } from "@/components/ui/badge";
import { generateSEO } from "@/lib/seo";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return generateSEO({
    title: "Projects",
    description: "Explore my portfolio of full-stack web development and AI projects including FytureAI AI Chatbot, Sakus Real-time Bus Tracking, Robotek Competition Winner, E-commerce platforms, Network Tools, and more. Technologies: React, Next.js, Node.js, Python, PyTorch, TensorFlow, Flutter.",
    keywords: [
      "Projects",
      "Portfolio",
      "Web Development",
      "AI Projects",
      "React",
      "Next.js",
      "Node.js",
      // Project Names
      "Hempy E-commerce",
      "Sakus Bus Tracking",
      "ArzAuto Vehicle Platform",
      "Seyfi E-commerce",
      "SUBU Turnuva Tournament",
      "PingATAR Network Tool",
      "Robotek AI Competition",
      "FytureAI Chatbot",
      "AI Assistant",
      "ColdDown App",
      "FriendlyAI",
      // Technologies
      "Shopier API",
      "Socket.io Real-time",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Python Flask",
      "C# WinForms",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "Flutter",
      "Firebase",
      "OpenAI API",
      "RAG Technology",
      "Vercel AI SDK",
      // Features
      "Payment Integration",
      "Real-time Tracking",
      "Voice Recognition",
      "Image Recognition",
      "Custom AI Training",
      "Network Monitoring",
      "Tournament Management",
      "E-commerce Solutions",
    ],
    url: "/projects",
  });
}

const projects = [
  {
    id: 1,
    title: "Hempy",
    description: "E-commerce website with Shopier API integration for seamless payment processing.",
    fullDescription: "E-commerce website with Shopier API integration for seamless payment processing. Features a modern design and secure checkout.",
    image: "/img/projects/1/home.png",
    images: ["/img/projects/1/home.png"],
    tags: ["Node.js", "EJS", "Prisma", "PostgreSQL"],
    demoUrl: "https://hempy.com.tr",
    repoUrl: "#",
    features: ["Shopier Integration", "Product Management", "Secure Payments", "Admin Panel"]
  },
  {
    id: 2,
    title: "Sakus",
    description: "Real-time location tracking and user-friendly interface for Sakarya Metropolitan Municipality bus tracking system.",
    fullDescription: "Real-time location tracking and user-friendly interface for Sakarya Metropolitan Municipality bus tracking system. Provides accurate bus times and route information.",
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
    features: ["Real-time Tracking", "Socket.io Integration", "Mobile Friendly", "Live Map"]
  },
  {
    id: 3,
    title: "ArzAuto",
    description: "Vehicle sales listing platform with detailed product pages and Arabam.com API integration.",
    fullDescription: "Vehicle sales listing platform with detailed product pages and Arabam.com API integration. Allows users to browse and filter vehicle listings.",
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
    features: ["API Integration", "Vehicle Filtering", "Detailed Listings", "Admin Dashboard"]
  },
  {
    id: 4,
    title: "Seyfi",
    description: "Full-featured brand-specific e-commerce platform with product management and order tracking.",
    fullDescription: "Full-featured brand-specific e-commerce platform with product management, order tracking, and payment gateway integration.",
    image: "/img/projects/4/seyfi.webp",
    images: ["/img/projects/4/seyfi.webp"],
    tags: ["PHP", "MySQL", "Bootstrap", "Payment Gateway"],
    demoUrl: "#",
    repoUrl: "#",
    features: ["Product Management", "Order Tracking", "Payment Gateway", "Responsive Design"]
  },
  {
    id: 5,
    title: "SUBU Turnuva",
    description: "Tournament management platform for Sakarya University of Applied Sciences.",
    fullDescription: "Tournament management platform for Sakarya University of Applied Sciences with user registration, fixture creation, and result tracking.",
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
    features: ["User Registration", "Automated Fixtures", "Result Tracking", "JWT Authentication"]
  },
  {
    id: 6,
    title: "PingATAR",
    description: "Multi-ping and network monitoring software for İnegöl Municipality.",
    fullDescription: "Multi-ping and network monitoring software for İnegöl Municipality. Desktop application for comprehensive network management and troubleshooting.",
    image: "/img/projects/6/pingatar.webp",
    images: ["/img/projects/6/pingatar.webp"],
    tags: ["C# WinForms", "Network Programming"],
    demoUrl: "#",
    repoUrl: "https://github.com/bykemalh/pingatar",
    features: ["Multi-ping", "Network Monitoring", "Desktop App", "Real-time Status"]
  },
  {
    id: 7,
    title: "Robotek",
    description: "First place project in 2025 SUBU Robotek competition. Voice recognition and image matching model.",
    fullDescription: "First place project in 2025 SUBU Robotek competition. Voice recognition and image matching model with 100% accuracy. Demonstrates advanced AI capabilities.",
    image: "/img/projects/7/robotek1.webp",
    images: [
      "/img/projects/7/robotek1.webp",
      "/img/projects/7/robotek2.webp"
    ],
    tags: ["PyTorch", "TensorFlow", "OpenCV"],
    demoUrl: "#",
    repoUrl: "https://github.com/bykemalh/strongai_robotek",
    features: ["Voice Recognition", "Image Matching", "High Accuracy", "Competition Winner"]
  },
  {
    id: 8,
    title: "FytureAI",
    description: "AI-powered assistant chatbot with training capabilities using files and websites.",
    fullDescription: "AI-powered assistant chatbot with training capabilities using files and websites. Develop your own AI assistant with company information and easily integrate it into your website.",
    image: "/img/projects/8/image.png",
    images: ["/img/projects/8/image.png"],
    tags: ["Next.js", "Prisma", "PostgreSQL", "RAG Tuning", "OpenAI", "Flask"],
    demoUrl: "https://fyture.io",
    repoUrl: "#",
    features: ["Custom AI Training", "File & Website Integration", "Easy Embedding", "RAG Technology"]
  },
  {
    id: 9,
    title: "AI bykemalh.me",
    description: "Personal AI assistant showcasing portfolio and capabilities.",
    fullDescription: "Personal AI assistant showcasing portfolio and capabilities. Interact with the AI to learn more about my projects and skills.",
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
    features: ["Interactive Chat", "Portfolio Showcase", "AI Integration"]
  },
  {
    id: 10,
    title: "Psikolog Tugba Yıldırım",
    description: "Modern and elegant website for Psychologist Tuğba Yıldırım.",
    fullDescription: "Modern and elegant website for Psychologist Tuğba Yıldırım. Features a clean design, appointment information, and blog section.",
    image: "/img/projects/10/image.png",
    images: ["/img/projects/10/image.png"],
    tags: ["Node.js", "EJS"],
    demoUrl: "https://psikologtugbayildirim.com/",
    repoUrl: "#",
    features: ["Modern Design", "Blog Section", "Contact Form", "Responsive Layout"]
  },
  {
    id: 11,
    title: "ColdDown",
    description: "Freelancer Order Management App",
    fullDescription: "Freelancer Order Management and Tracking App with Next JS",
    image: "/img/projects/11/image.png",
    images: ["/img/projects/11/image.png"],
    tags: ["Flutter", "Dart", "Firebase"],
    demoUrl: "",
    repoUrl: "https://github.com/bykemalh/colddown",
    features: ["Guided Meditation", "Breathing Exercises", "Relaxing Sounds", "User Progress"]
  },
  {
    id: 12,
    title: "FriendlyAI",
    description: "AI companion for friendly conversations and support.",
    fullDescription: "AI companion for friendly conversations and support. Built to provide a safe and engaging space for users to chat.",
    image: "/img/projects/12/home.png",
    images: ["/img/projects/12/home.png"],
    tags: ["Next.js", "OpenAI", "Tailwind CSS"],
    demoUrl: "https://metcen.bykemalh.me",
    repoUrl: "#",
    features: ["Friendly Chat", "Emotional Support", "24/7 Availability"]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0);
    }
  }, [selectedProject]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prev) => 
      prev === selectedProject.images!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedProject?.images) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.images!.length - 1 : prev - 1
    );
  };

  return (
    <>
      <FloatingDock />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">Projects</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A collection of my work in web development and artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {projects.map((project) => (
              <motion.div
                layoutId={`card-${project.id}`}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
              >
                <motion.div layoutId={`image-${project.id}`} className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
                
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <motion.h3 layoutId={`title-${project.id}`} className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-1">
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 h-4 sm:h-5">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] sm:text-[10px] text-gray-500 self-center">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div layoutId={`image-${selectedProject.id}`} className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 shrink-0 group/slider">
                {selectedProject.images && selectedProject.images.length > 1 ? (
                  <>
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                      className="object-contain w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                        <button onClick={prevImage} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={nextImage} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                  </>
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="object-cover w-full h-full"
                  />
                )}
              </motion.div>

              <div className="p-6 overflow-y-auto">
                <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </motion.h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedProject.fullDescription}
                  </p>
                  
                  <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Key Features</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {selectedProject.repoUrl && selectedProject.repoUrl !== "#" && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                  {selectedProject.demoUrl && selectedProject.demoUrl !== "#" && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium ml-auto"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
