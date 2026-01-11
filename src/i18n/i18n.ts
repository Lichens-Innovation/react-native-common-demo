import i18next from 'i18next';

import en from '~/i18n/en/app.json';
import fr from '~/i18n/fr/app.json';

export const initI18N = () => {
  i18next.addResourceBundle('fr', 'app', fr);
  i18next.addResourceBundle('en', 'app', en);
};
