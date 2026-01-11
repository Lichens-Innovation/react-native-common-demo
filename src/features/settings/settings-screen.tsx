import { FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

import { commonStore, useAppTheme } from '@Lichens-Innovation/react-native-common';
import { useTranslation } from 'react-i18next';
import { useKeyboardState } from 'react-native-keyboard-controller';
import { AppLanguageField } from './app-language-field';

const SettingsScreen: FunctionComponent = observer(() => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { height: keyboardHeight } = useKeyboardState();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentContainer}>
      <Pressable onPress={() => commonStore.toggleDarkMode()}>
        <View style={styles.row}>
          <Text variant="bodyLarge">{t('app:settings.toggleDarkMode')}</Text>
          <Switch value={commonStore.isDarkMode} onValueChange={() => commonStore.toggleDarkMode()} />
        </View>
      </Pressable>

      <AppLanguageField />

      <View style={{ height: keyboardHeight }} />
    </ScrollView>
  );
});

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      margin: theme.spacing(2),
    },
    contentContainer: {
      gap: theme.spacing(2),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};

export default SettingsScreen;
