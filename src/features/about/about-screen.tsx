import { useAppTheme, useUpdates } from '@Lichens-Innovation/react-native-common';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper';
import { AppLogo } from '~/components/logos';
import { APP_VERSION_INFO } from '~/constants';
import { AboutDetails } from '~/features/about/about.details';

const { DISPLAY_NAME, DESCRIPTION } = APP_VERSION_INFO;

const AboutScreen: FunctionComponent = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const router = useRouter();
  const { runTypeMessage, isUpdateAvailable, checkForUpdates, isLoading, fetchAndApplyUpdate } = useUpdates();

  useEffect(() => {
    setTimeout(() => checkForUpdates(), 1000);
  }, []);

  const isScreenFocused = useIsFocused();
  if (!isScreenFocused) {
    return null;
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentContainer}>
      <Card contentStyle={styles.card}>
        <Card.Title title={DISPLAY_NAME} subtitle={DESCRIPTION} right={({ size }) => <AppLogo size={size * 3} />} />

        <Card.Content>
          <Text style={styles.description}>{t('app:about.description')}</Text>

          <AboutDetails />

          <Text style={styles.paragraph}>{runTypeMessage}</Text>
        </Card.Content>

        <Card.Actions>
          {isUpdateAvailable && (
            <Button mode="outlined" icon="briefcase-download-outline" loading={isLoading} onPress={fetchAndApplyUpdate}>
              {t('app:about.apply')}
            </Button>
          )}

          <Button mode="outlined" icon="refresh" onPress={checkForUpdates} loading={isLoading}>
            {t('app:about.updates')}
          </Button>
        </Card.Actions>
      </Card>

      <Button
        mode="outlined"
        icon="license"
        style={styles.licensesButton}
        onPress={() => router.push('/about/licenses')}
      >
        {t('app:about.licenses')}
      </Button>
    </ScrollView>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      margin: theme.spacing(2),
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    contentContainer: {
      gap: theme.spacing(4),
    },
    card: {
      padding: theme.spacing(2),
    },
    paragraph: {
      width: '100%',
      textAlign: 'center',
      marginVertical: theme.spacing(2),
    },
    description: {
      marginVertical: theme.spacing(2),
    },
    licensesButton: {
      alignSelf: 'center',
    },
  });
};

export default AboutScreen;
