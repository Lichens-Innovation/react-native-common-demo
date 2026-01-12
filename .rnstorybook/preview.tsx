import type { Preview } from '@storybook/react-native';
import React from 'react';
import { StoryLayout } from './preview-layout';

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

export default preview;
