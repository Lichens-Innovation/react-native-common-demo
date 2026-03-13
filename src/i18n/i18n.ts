import { initCommonI18N } from '@lichens-innovation/react-native-common';
import { addResourceBundleForRjsf } from '@lichens-innovation/ts-common/rjsf';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '~/i18n/en/app.json';
import fr from '~/i18n/fr/app.json';

/**
 * Initializes i18next with common bundles (common, rjsf) and app bundles (en/fr).
 * After init, use `t('namespace:key')` or `t('namespace:key.nested')`.
 *
 * @example Key levels available with `t()`
 * // Simple key in a namespace (common, rjsf, etc.)
 * t('common:add')
 * t('rjsf:errors')
 *
 * // Nested key (object in the JSON)
 * t('app:about.title')
 */
export const initI18N = () => {
  const i18n = initCommonI18N({ initReactI18next, instance: i18next });
  addResourceBundleForRjsf(i18n);

  i18n.addResourceBundle('fr', 'app', fr);
  i18n.addResourceBundle('en', 'app', en);
};
