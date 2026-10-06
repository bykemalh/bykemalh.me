import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import { useEffect, useMemo } from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { useLoaderData } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { BlogListSkeleton, BlogPostSkeleton, ProjectsSkeleton } from "@/components/skeletons";
import { LanguageProvider } from "@/hooks/use-language";

// Configure NProgress
if (typeof document !== "undefined") {
  nProgress.configure({ showSpinner: false });
}

/**
 * SSR sırasında <html lang> için sayfa dilini belirler.
 * URL yolundaki /tr|/en öneki blog sayfalarındaki dili verir; diğer sayfalar
 * site varsayılanı olan Türkçe'de kalır. (UI dili istemci tarafında ayrıca
 * LanguageProvider tarafından ayarlanır.)
 */
export function loader({ request }: Route.LoaderArgs) {
  const pathLocale = new URL(request.url).pathname.split("/")[1];
  const lang = pathLocale === "en" ? "en" : "tr";
  return { lang };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Favicon and app icons
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

];

/**
 * Layout kök route elemanı olarak render edildiği için useLoaderData kullanabilir.
 * Hata durumunda loader verisi bulunamayabilir; bu durumda güvenli biçimde "tr"'ye düşer.
 */
function useHtmlLang(): string {
  try {
    return useLoaderData<typeof loader>()?.lang ?? "tr";
  } catch {
    return "tr";
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const lang = useHtmlLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var localTheme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (localTheme === 'dark' || (!localTheme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  useEffect(() => {
    if (navigation.state === "idle") {
      nProgress.done();
    } else {
      nProgress.start();
    }
  }, [navigation.state]);

  /** Route-specific skeleton matched against the target pathname */
  const skeleton = useMemo(() => {
    if (!isNavigating || !navigation.location) return null;
    const path = navigation.location.pathname;

    if (/^\/(tr|en)\/blog$/.test(path)) return <BlogListSkeleton />;
    if (/^\/(tr|en)\/blog\//.test(path)) return <BlogPostSkeleton />;
    if (path === "/projects") return <ProjectsSkeleton />;

    return null;
  }, [isNavigating, navigation.location]);

  // Show the skeleton for the target route while navigating; otherwise show the outlet
  return (
    <LanguageProvider>
      {skeleton ?? <Outlet />}
    </LanguageProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <p className="font-mono text-sm text-gray-400 dark:text-gray-600 mb-2">{message}</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Something went wrong</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{details}</p>
        <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
          ← Home
        </a>
        {stack && (
          <pre className="w-full p-4 mt-8 overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
