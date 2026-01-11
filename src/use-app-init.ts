import { commonStore, startNetworkStateLogging } from '@Lichens-Innovation/react-native-common';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { startNetworkLogging, stopNetworkLogging } from 'react-native-network-logger';

import { initI18N } from './i18n/i18n';
import { logEnvironmentInfo } from './utils/env.utils';
import { polyfillCrypto } from './utils/polyfill-crypto';

polyfillCrypto();
initI18N();
logEnvironmentInfo();

export const useAppInit = () => {
  useEffect(() => {
    const unsubscribeStateLogging = startNetworkStateLogging();
    startNetworkLogging();
    SplashScreen.setOptions({ duration: 3000, fade: true });

    return () => {
      stopNetworkLogging();
      unsubscribeStateLogging();
      commonStore.dispose();
    };
  }, []);
};
