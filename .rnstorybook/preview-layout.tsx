import { useAppTheme } from '@lichens-innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { PreviewToolbar } from './preview-toolbar';

export const StoryLayout: FunctionComponent<PropsWithChildren> = observer(({ children }) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <PreviewToolbar />
      <View style={styles.storyContainer}>{children}</View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  storyContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
