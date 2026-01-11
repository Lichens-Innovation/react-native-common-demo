import type { Preview } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
});

export default preview;
