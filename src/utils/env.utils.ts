import { getSentryDns, isDevelopment, logger } from '@Lichens-Innovation/react-native-common';
import * as Updates from 'expo-updates';
import { LogBox } from 'react-native';

export const logEnvironmentInfo = () => {
  logger.info(`[logEnvironmentInfo] isDevelopment(): ${isDevelopment()}`);
  logger.info(`[logEnvironmentInfo] Updates.channel: ${Updates.channel}`);
  logger.info(`[logEnvironmentInfo] react-native-common getSentryDns(): ${getSentryDns()}`);
  logger.info('[logEnvironmentInfo] app process.env.EXPO_PUBLIC_SENTRY_DNS', process.env.EXPO_PUBLIC_SENTRY_DNS);

  logger.info(`[logEnvironmentInfo] app process.env.EXPO_PUBLIC_ENABLE_LOGBOX: ${process.env.EXPO_PUBLIC_ENABLE_LOGBOX}`);
  if (process.env.EXPO_PUBLIC_ENABLE_LOGBOX === 'false') {
    logger.info('[logEnvironmentInfo] ignoring all logs');
    LogBox.ignoreAllLogs();
  }
};
