import { FloatingDock } from "@/components/floating-dock";
import { PageTransition } from "@/components/page-transition";
import { useLanguage } from "@/hooks/use-language";
import { data, isRouteErrorResponse, useRouteError } from "react-router";
import { Link } from "react-router";
import type { Route } from "./+types/$";

export function headers() {
  return { "X-Robots-Tag": "noindex, nofollow" };
}

// Eşleşmeyen tüm yollar gerçek bir 404 yanıtı alır (soft-404 değil).
export function loader() {
  throw data("Not Found", { status: 404, headers: { "X-Robots-Tag": "noindex, nofollow" } });
}

export function meta(_: Route.MetaArgs) {
  return [
    { title: "404 | Kemal Hafızoğlu" },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const { language } = useLanguage();

  const isNotFound = status === 404;
  const title = !isNotFound
    ? language === "tr" ? "Bir şeyler ters gitti" : language === "ru" ? "Что-то пошло не так" : "Something went wrong"
    : "404";
  const description = isNotFound
    ? language === "tr"
      ? "Aradığınız sayfa bulunamadı. Aşağıdaki bağlantılardan devam edebilirsiniz."
      : language === "ru"
        ? "Запрашиваемая страница не найдена. Вы можете продолжить по ссылкам ниже."
        : "The page you are looking for could not be found. Continue from the links below."
    : language === "tr"
      ? "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      : "An unexpected error occurred. Please try again later.";

  return (
    <>
      <FloatingDock />
      <PageTransition>
        <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-24 sm:py-32 flex flex-col items-start">
          <p className="font-mono text-sm text-gray-400 dark:text-gray-600 mb-2">{status}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-10">{description}</p>
          <nav className="flex flex-wrap gap-3" aria-label="404 navigation">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-gray-900 dark:text-white"
            >
              {language === "tr" ? "Ana Sayfa" : language === "ru" ? "Главная" : "Home"}
            </Link>
            <Link
              to="/projects"
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-gray-900 dark:text-white"
            >
              {language === "tr" ? "Projeler" : language === "ru" ? "Проекты" : "Projects"}
            </Link>
            <Link
              to="/tr/blog"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium text-white"
            >
              {language === "tr" ? "Blog" : language === "ru" ? "Блог" : "Blog"}
            </Link>
          </nav>
        </main>
      </PageTransition>
    </>
  );
}
