export const blogLocales = ["tr", "en"] as const;

export type BlogLocale = (typeof blogLocales)[number];

export function isBlogLocale(value: string | undefined): value is BlogLocale {
  return value === "tr" || value === "en";
}

export function blogPath(locale: BlogLocale, slug?: string) {
  return slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`;
}

export function localeLabel(locale: BlogLocale) {
  return locale === "tr" ? "Türkçe" : "English";
}
