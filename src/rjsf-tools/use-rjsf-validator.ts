import { customizeValidator, type Localizer } from '@rjsf/validator-ajv8';
import localizer from 'ajv-i18n';
import { useTranslation } from 'react-i18next';

const customFormats = {
  'phone-america': /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
};

type AppLanguage = 'en' | 'fr';

const APP_LANGUAGE_TO_LOCALIZER: Record<AppLanguage, Localizer> = {
  en: localizer.en as Localizer,
  fr: localizer.fr as Localizer,
};

export const useRjsfValidator = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split('-')[0] ?? 'en') as AppLanguage;
  const localizerFn = APP_LANGUAGE_TO_LOCALIZER[lang] ?? localizer.en;

  return customizeValidator({ customFormats }, localizerFn);
};
