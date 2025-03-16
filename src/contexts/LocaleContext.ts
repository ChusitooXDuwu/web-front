import esMessages from "../locales/es";
import enMessages from "../locales/en";
import { createContext } from "react";

const localesMessages = {
  en: enMessages,
  es: esMessages,
};

const supportedLocales = ["en", "es"] as const;
type SupportedLocale = "en" | "es";

const getDefaultLocale = (): "en" | "es" => {
  const navLang = navigator.language.split("-")[0];
  const fallbackLocale = "en";
  let defaultLocale = supportedLocales.includes(navLang as SupportedLocale)
    ? (navLang as SupportedLocale)
    : fallbackLocale;
  return defaultLocale;
};

const defaultLocale = getDefaultLocale();

const getMessages = (locale: SupportedLocale) => {
  return localesMessages[locale];
};

const LocaleContext = createContext({
  locale: defaultLocale,
  changeLocale: (_: SupportedLocale) => {},
});

export { LocaleContext, getMessages, defaultLocale, SupportedLocale};
