import type { NextRequest } from "next/server";

export const defaultLocale = { key: "vi-VN", lang: "vi" };

export const locales = [
  { key: "en-US", lang: "en", name: "English" },
  { key: "vi-VN", lang: "vi", name: "Vietnamese" },
];

export const getLocale = (request: NextRequest) => {
  const acceptLanguage = request.headers.get("Accept-Language");
  const locale =
    request.cookies.get("locale")?.value ||
    acceptLanguage
      ?.split(",")
      .find((lang) => locales.map((locale) => locale.key).includes(lang));
  return locale || defaultLocale.key;
};

export const getLanguageFromLocale = (locale: string) => {
  return locales.find((l) => l.key === locale)?.lang || defaultLocale.lang;
};
