import { useAppTheme } from '@lichens-innovation/react-native-common';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const FormComplexPlaceholder: FunctionComponent = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{t('app:formDemo.tabs.complex')}</Text>

      <Text variant="bodyMedium" style={styles.message}>
        Coming soon
      </Text>
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
      gap: theme.spacing(2),
    },
    message: {
      opacity: 0.8,
    },
  });
};

export default FormComplexPlaceholder;
