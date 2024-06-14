import type {NextRequest} from "next/server";

export const defaultLocale = {key: 'vi-VN', lang: 'vi'};

export const locales = [
  {key: 'en-US', lang: 'en'},
  {key: 'vi-VN', lang: 'vi'}
];

export const getLocale = (request: NextRequest) => {
  const acceptLanguage = request.headers.get('Accept-Language')
  const locale = acceptLanguage?.split(',')
    .find((lang) => locales.map((locale) => locale.key).includes(lang));
  return locale || defaultLocale.key;
}

export const getLanguageFromLocale = async (locale: string) => {
  return locales.find((l) => l.key === locale)?.lang || defaultLocale.lang;
}