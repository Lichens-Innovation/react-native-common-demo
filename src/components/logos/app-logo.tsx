import { useAppTheme } from '@Lichens-Innovation/react-native-common';
import { FunctionComponent } from 'react';
import { SvgXml } from 'react-native-svg';
import { LOGO } from './logo.constants';

export interface AppLogoProps {
  size?: number;
}

export const AppLogo: FunctionComponent<AppLogoProps> = ({ size = 100 }) => {
  const theme = useAppTheme();

  return <SvgXml xml={LOGO} width={size} height={size} color={theme.colors.primary} />;
};
