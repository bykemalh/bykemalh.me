import { useState, useEffect } from "react";
import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { Badge } from "@/components/ui/badge";
import { generateSEO, generateBreadcrumbSchema, generateJsonLd, generateProjectsSchema } from "@/lib/seo";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Route } from "./+types/projects";
import { useLanguage } from "@/hooks/use-language";
import { projects } from "@/data/projects";

export function headers() {
  return {
    // Projects page is static - CDN caches for 1 hour
    "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  };
}

export function meta({ }: Route.MetaArgs) {
  return generateSEO({
    title: "Projects",
    description: "Web development and AI projects by Kemal Hafızoğlu: Sakus real-time bus tracking, FytureAI chatbot with RAG, Robotek 2025 AI competition winner, e-commerce platforms and network tools. React, Node.js, Python, PyTorch, Flutter.",
    keywords: [
      "Kemal Hafızoğlu Projects",
      "Web Development Projects",
      "AI Projects",
      "Portfolio",
      "E-commerce Development",
      "Real-time Tracking",
      "AI Chatbot",
      "RAG Technology",
      "React",
      "Node.js",
      "Python",
      "PyTorch",
    ],
    url: "/projects",
  });
}


export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, tProject } = useLanguage();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);
  const projectsSchema = generateProjectsSchema();

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
      <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(projectsSchema)} />
      <FloatingDock />
      <PageTransition>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">{t("projectsTitle")}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("projectsDesc")}
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
                    {tProject(project.id, "description")}
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
                    {tProject(selectedProject.id, "fullDescription")}
                  </p>

                  <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{t("keyFeatures")}</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                    {(tProject(selectedProject.id, "features") || []).map((feature: string, idx: number) => (
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
                      {t("viewCode")}
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
                      {t("liveDemo")}
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
