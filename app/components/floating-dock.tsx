import { useState, useEffect } from "react";
import { Home, BookOpen, FolderGit2, Moon, Sun, Github, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router";
import { SiTelegram } from "react-icons/si";
import { useTheme } from "@/hooks/use-theme";

export function FloatingDock() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // Küçük bir gecikme ile state'i güncelle
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const dockItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      isActive: pathname === "/"
    },
    {
      icon: BookOpen,
      label: "Blog",
      href: "/blog",
      isActive: pathname.startsWith("/blog")
    },
    {
      icon: FolderGit2,
      label: "Projects",
      href: "/projects",
      isActive: pathname.startsWith("/projects")
    },
  ];

  const socialItems = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/bykemalh",
      external: true
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/kemal-hfz",
      external: true
    },
    {
      icon: SiTelegram,
      label: "Telegram",
      href: "https://t.me/bykemalh",
      external: true
    },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        {/* Navigation Items */}
        {dockItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 hover:scale-110 ${item.isActive
                ? "bg-gray-900 dark:bg-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            aria-label={item.label}
          >
            <item.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.isActive
                ? "text-white dark:text-black"
                : "text-gray-600 dark:text-gray-400"
              }`} />
            <span className="absolute -top-8 px-2 py-0.5 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </Link>
        ))}

        {/* Divider */}
        <div className="w-px h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 mx-0.5" />

        {/* Social Items */}
        {socialItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
            aria-label={item.label}
          >
            <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-8 px-2 py-0.5 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </a>
        ))}

        {/* Divider */}
        <div className="w-px h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 mx-0.5" />

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="group relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
          )}
          <span className="absolute -top-8 px-2 py-0.5 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {mounted && theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </div>
  );
}
