import { initCommonI18N } from '@lichens-innovation/react-native-common';
import { addResourceBundleForRjsf } from '@lichens-innovation/ts-common/rjsf';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '~/i18n/en/app.json';
import fr from '~/i18n/fr/app.json';

export const initI18N = () => {
  const i18n = initCommonI18N({ initReactI18next, instance: i18next });
  addResourceBundleForRjsf(i18n);

  i18n.addResourceBundle('fr', 'app', fr);
  i18n.addResourceBundle('en', 'app', en);
};
