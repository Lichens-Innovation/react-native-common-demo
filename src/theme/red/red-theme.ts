import { DarkTheme as DarkNavigationTheme, DefaultTheme as LightNavigationTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { RED_DARK_COLORS } from './colors-dark';
import { RED_LIGHT_COLORS } from './colors-light';

const DEFAULT_SPACING = 8;
const spacing = (units = 1): number => units * DEFAULT_SPACING;
const roundness = 4;

export const LIGHT_THEME_RED = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...RED_LIGHT_COLORS,
  },
  spacing,
  roundness,
};

export const DARK_THEME_RED = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...RED_DARK_COLORS,
  },
  spacing,
  roundness,
};

const navigationAdaptedThemes = adaptNavigationTheme({
  reactNavigationLight: LightNavigationTheme,
  reactNavigationDark: DarkNavigationTheme,
  materialLight: LIGHT_THEME_RED,
  materialDark: DARK_THEME_RED,
});

const { DarkTheme, LightTheme } = navigationAdaptedThemes;
export const NAVIGATION_LIGHT_RED = {
  ...LightTheme,
  fonts: { ...LightNavigationTheme.fonts },
};
export const NAVIGATION_DARK_RED = {
  ...DarkTheme,
  fonts: { ...DarkNavigationTheme.fonts },
};
