import type { Preview } from '@storybook/react-native';
import { useAppTheme } from '@lichens-innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PreviewToolbar } from './preview-toolbar';

const StoryLayout = observer(({ children }: { children: React.ReactNode }) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <PreviewToolbar />
      <View style={styles.storyContainer}>{children}</View>
    </View>
  );
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <StoryLayout>
        <Story />
      </StoryLayout>
    ),
  ],
};

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

export default preview;
