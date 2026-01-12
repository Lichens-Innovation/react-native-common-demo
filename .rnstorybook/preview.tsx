import type { Preview } from '@storybook/react-native';
import { commonStore, useAppTheme } from '@lichens-innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

const StoryLayout = observer(({ children }: { children: React.ReactNode }) => {
  const theme = useAppTheme();

  return (
    <>
      <Pressable style={styles.themeRow} onPress={() => commonStore.toggleDarkMode()}>
        <Text variant="bodySmall">Dark Mode</Text>
        <Switch value={commonStore.isDarkMode} onValueChange={() => commonStore.toggleDarkMode()} />
      </Pressable>
      <View style={styles.storyContainer}>{children}</View>
    </>
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
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 16,
  },
  storyContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default preview;
