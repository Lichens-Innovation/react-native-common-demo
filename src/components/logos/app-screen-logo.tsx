import { useAppTheme } from '@Lichens-Innovation/react-native-common';
import { FunctionComponent } from 'react';
import { useWindowDimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LOGO } from './logo.constants';

export interface AppLogoSvgProps {
  screenPercentage?: number;
}

export const AppScreenLogo: FunctionComponent<AppLogoSvgProps> = ({ screenPercentage = 0.7 }) => {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const computedSize = width * screenPercentage;

  return <SvgXml xml={LOGO} width={computedSize} height={computedSize} color={theme.colors.primary} />;
};
