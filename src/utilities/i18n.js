import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import { isDebug } from './dev';

import enCommon from '../locales/en/common.json';
import zhCommon from '../locales/zh/common.json';

const options = {
  fallbackLng: 'en',
  debug: isDebug(),
  defaultNS: 'common',
  ns: 'common',
  resources: {
    en: {
      common: enCommon,
    },
    zh: {
      common: zhCommon,
    },
  },
  interpolation: {
    escapeValue: false,
  },
};

export const detectBestMatchLocale = () =>
  new LanguageDetector(
    {
      languageUtils: {
        getBestMatchFromCodes: false,
      },
    },
    {}
  ).detect();

if (!i18n.isInitialized) i18n.use(initReactI18next).init(options);

export default i18n;
