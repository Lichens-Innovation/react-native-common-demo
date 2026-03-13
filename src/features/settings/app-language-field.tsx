import { FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { LanguageSelector, storeSelectedLanguage, SUPPORTED_LANGUAGES } from '@lichens-innovation/react-native-common';

export const AppLanguageField: FunctionComponent = observer(() => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    storeSelectedLanguage(newLanguage);
  };

  return (
    <LanguageSelector
      label={t('common:language')}
      currentLanguage={i18n.language}
      supportedLanguages={SUPPORTED_LANGUAGES}
      onLanguageChange={handleLanguageChange}
      placeholder={t('common:language')}
      searchPlaceholder={t('common:search')}
    />
  );
});
