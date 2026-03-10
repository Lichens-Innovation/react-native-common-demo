import { useAppTheme } from '@lichens-innovation/react-native-common';
import { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

export const HomeScreen: FunctionComponent = () => {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Icon source="home" size={64} color={theme.colors.primary} />
    </View>
  );
};

const useStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(4),
    },
  });
