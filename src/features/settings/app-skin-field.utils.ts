import i18next from 'i18next';
import { APP_SKIN_IDS, type AppSkinId } from '~/store/settings.store';

export type SkinOption = { label: string; value: AppSkinId };

export const getSkinOptions = (): SkinOption[] =>
  (Object.keys(APP_SKIN_IDS) as AppSkinId[]).map((value) => ({
    label: i18next.t(`app:settings.skinOption_${value}`),
    value,
  }));
