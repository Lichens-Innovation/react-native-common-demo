import {
  DARK_THEME as LICHENS_DARK,
  LIGHT_THEME as LICHENS_LIGHT,
  NAVIGATION_DARK as LICHENS_NAV_DARK,
  NAVIGATION_LIGHT as LICHENS_NAV_LIGHT,
} from '@lichens-innovation/react-native-common';
import type { AppSkinId } from '~/store/settings.store';
import { DARK_THEME_RED, LIGHT_THEME_RED, NAVIGATION_DARK_RED, NAVIGATION_LIGHT_RED } from './red/red-theme';
import {
  DARK_THEME_SPOTD,
  LIGHT_THEME_SPOTD,
  NAVIGATION_DARK_SPOTD,
  NAVIGATION_LIGHT_SPOTD,
} from './spotd/spotd-theme';

export type AppThemes = {
  paperLight: typeof LICHENS_LIGHT;
  paperDark: typeof LICHENS_DARK;
  navLight: typeof LICHENS_NAV_LIGHT;
  navDark: typeof LICHENS_NAV_DARK;
};

const LICHENS_THEMES: AppThemes = {
  paperLight: LICHENS_LIGHT,
  paperDark: LICHENS_DARK,
  navLight: LICHENS_NAV_LIGHT,
  navDark: LICHENS_NAV_DARK,
};

const RED_THEMES: AppThemes = {
  paperLight: LIGHT_THEME_RED,
  paperDark: DARK_THEME_RED,
  navLight: NAVIGATION_LIGHT_RED,
  navDark: NAVIGATION_DARK_RED,
};

const SPOTD_THEMES: AppThemes = {
  paperLight: LIGHT_THEME_SPOTD,
  paperDark: DARK_THEME_SPOTD,
  navLight: NAVIGATION_LIGHT_SPOTD,
  navDark: NAVIGATION_DARK_SPOTD,
};

const THEMES_BY_SKIN: Record<AppSkinId, AppThemes> = {
  lichens: LICHENS_THEMES,
  red: RED_THEMES,
  spotd: SPOTD_THEMES,
};

export const getThemes = (skinId: AppSkinId): AppThemes => THEMES_BY_SKIN[skinId];
