import { FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  LanguageSelector,
  storeSelectedLanguage,
  SUPPORTED_LANGUAGES
} from '@lichens-innovation/react-native-common';

export const AppLanguageField: FunctionComponent = observer(() => {
  const { t } = useTranslation();

  const handleLanguageChange = (newLanguage: string) => {
    i18next.changeLanguage(newLanguage);
    storeSelectedLanguage(newLanguage);
  };

  return (
    <LanguageSelector
      label={t('common:language')}
      currentLanguage={i18next.language}
      supportedLanguages={SUPPORTED_LANGUAGES}
      onLanguageChange={handleLanguageChange}
      placeholder={t('common:language')}
      searchPlaceholder={t('common:search')}
    />
  );
});
