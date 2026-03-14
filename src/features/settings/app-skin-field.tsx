import { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { DropDownSelector } from '@lichens-innovation/react-native-common';
import type { AppSkinId } from '~/store/settings.store';
import { settingsStore } from '~/store/settings.store';
import { getSkinOptions } from './app-skin-field.utils';

export const AppSkinField: FunctionComponent = observer(() => {
  const { t } = useTranslation();
  const options = getSkinOptions();

  const handleSkinChange = (value: string) => {
    settingsStore.setAppSkinId(value as AppSkinId);
  };

  return (
    <DropDownSelector
      label={t('app:settings.skin')}
      value={settingsStore.appSkinId}
      onChange={handleSkinChange}
      options={options}
      placeholder={t('app:settings.skin')}
    />
  );
});
