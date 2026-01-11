import { LogsViewer } from '@Lichens-Innovation/react-native-common';
import { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const EvensLogsScreen: FunctionComponent = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <LogsViewer />
    </View>
  );
};

const useStyles = () => {
  const { bottom, left, right } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    },
  });
};
