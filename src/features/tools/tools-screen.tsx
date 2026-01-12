import * as Sentry from '@sentry/react-native';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { LogBox, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import {
  getSentryDns,
  isSentryActivated,
  logger,
  SnackbarDurationsMs,
  useAppTheme,
  useSnackbar,
} from '@lichens-innovation/react-native-common';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ToolsScreen: FunctionComponent = observer(() => {
  const styles = useStyles();
  const { showSnackbarMessage } = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation();

  const toggleLogBox = () => {
    LogBox.ignoreAllLogs();
    showSnackbarMessage('LogBox.ignoreAllLogs called');
  };

  const displayEnvVars = () => {
    const infos = { isSentryActivated: isSentryActivated(), getSentryDns: getSentryDns() };
    showSnackbarMessage(JSON.stringify(infos, null, 2), SnackbarDurationsMs.LONG);
  };

  const testSentry = () => {
    logger.debug('debug breadcrumb');
    logger.info('info breadcrumb');
    logger.warn('warn breadcrumb');
    logger.error('Test Sentry and logger integration');
    Sentry.captureException(new Error('Test Sentry Capture Exception'));
    showSnackbarMessage('Test error sent to Sentry', SnackbarDurationsMs.MEDIUM);
  };

  const tools: FunctionComponent[] = [
    () => (
      <Button mode="outlined" onPress={() => router.push('/tools/live-event-logs')} icon="view-list">
        {t('app:tools.liveEventLogs')}
      </Button>
    ),
    () => (
      <Button mode="outlined" onPress={() => router.push('/tools/event-logs')} icon="file">
        {t('app:tools.eventLogs')}
      </Button>
    ),
    () => (
      <Button mode="outlined" onPress={() => router.push('/tools/network-logs')} icon="network">
        {t('app:tools.networkLogs')}
      </Button>
    ),
    () => (
      <Button mode="outlined" onPress={displayEnvVars} icon="code-braces">
        {t('app:tools.envVars')}
      </Button>
    ),
    () => (
      <Button mode="text" onPress={toggleLogBox} icon="stop-circle">
        LogBox.ignoreAllLogs
      </Button>
    ),
    () => (
      <Button mode="text" onPress={testSentry} icon="bug">
        Sentry test
      </Button>
    ),
  ];

  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
    tools.push(() => (
      <Button mode="text" onPress={() => router.push('/storybook')} icon="book-open-page-variant">
        Storybook
      </Button>
    ));
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentContainer}>
      {tools.map((Tool, index) => (
        <Animated.View key={index} entering={FadeInDown.delay(index * 100).duration(400)}>
          <Tool />
        </Animated.View>
      ))}
    </ScrollView>
  );
});

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    contentContainer: {
      padding: theme.spacing(2),
      gap: theme.spacing(2),
    },
    description: {
      textAlign: 'center',
    },
  });
};

export default ToolsScreen;
