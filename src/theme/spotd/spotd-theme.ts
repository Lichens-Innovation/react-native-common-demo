import { DarkTheme as DarkNavigationTheme, DefaultTheme as LightNavigationTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { SPOTD_DARK_COLORS } from './colors-dark';
import { SPOTD_LIGHT_COLORS } from './colors-light';

const DEFAULT_SPACING = 8;
const spacing = (units = 1): number => units * DEFAULT_SPACING;
const roundness = 4;

export const LIGHT_THEME_SPOTD = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...SPOTD_LIGHT_COLORS,
  },
  spacing,
  roundness,
};

export const DARK_THEME_SPOTD = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...SPOTD_DARK_COLORS,
  },
  spacing,
  roundness,
};

const navigationAdaptedThemes = adaptNavigationTheme({
  reactNavigationLight: LightNavigationTheme,
  reactNavigationDark: DarkNavigationTheme,
  materialLight: LIGHT_THEME_SPOTD,
  materialDark: DARK_THEME_SPOTD,
});

const { DarkTheme, LightTheme } = navigationAdaptedThemes;
export const NAVIGATION_LIGHT_SPOTD = {
  ...LightTheme,
  fonts: { ...LightNavigationTheme.fonts },
};
export const NAVIGATION_DARK_SPOTD = {
  ...DarkTheme,
  fonts: { ...DarkNavigationTheme.fonts },
};
