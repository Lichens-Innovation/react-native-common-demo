import { commonStore, startNetworkStateLogging } from '@lichens-innovation/react-native-common';
import { initRjsf } from '@lichens-innovation/ts-common/rjsf';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { startNetworkLogging, stopNetworkLogging } from 'react-native-network-logger';

import { initI18N } from './i18n/i18n';
import { logEnvironmentInfo } from './utils/env.utils';
import { polyfillCrypto } from './utils/polyfill-crypto';

polyfillCrypto();
initI18N();
initRjsf();
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
