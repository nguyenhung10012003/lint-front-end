import 'server-only';
import {defaultLocale} from "@/utils/locale";

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  vi: () => import('@/dictionaries/vi.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
  const lang = locale.split('-')[0] || defaultLocale.lang;
  return dictionaries[lang as keyof typeof dictionaries]();
};