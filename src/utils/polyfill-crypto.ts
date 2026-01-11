import 'react-native-get-random-values';
import { logger } from '@lichens-innovation/react-native-common';

export const polyfillCrypto = () => {
  if (!crypto?.getRandomValues) {
    const message = 'react-native-get-random-values is not installed';
    logger.error(message);
    throw new Error(message);
  }

  logger.info('react-native-get-random-values is defined.');
};
