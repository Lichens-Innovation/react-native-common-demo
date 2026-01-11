import { commonStore } from '@lichens-innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const NetworkLogsScreen: FunctionComponent = observer(() => {
  const styles = useStyles();
  const { isDarkMode } = commonStore;

  return (
    <View style={styles.root}>
      <NetworkLogger theme={isDarkMode ? 'dark' : 'light'} />
    </View>
  );
});

const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return StyleSheet.create({
    root: {
      flex: 1,
      marginBottom: bottom,
    },
  });
};
