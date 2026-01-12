import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { DialogCloseOnly, useAppTheme } from '@lichens-innovation/react-native-common';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';

const notes = `
## DialogCloseOnly Component

A simple dialog component with only a close button.

### Props
- \`icon\`: Optional icon to display at the top of the dialog
- \`title\`: Optional title ReactNode
- \`content\`: Optional content ReactNode
- \`onClose\`: Callback function when the dialog is closed
- \`isVisible\`: Boolean to control dialog visibility

### Features
- Uses React Native Paper's Dialog component
- Automatically styled with consistent width
- Wrapped in a Portal for proper z-index handling
- Close button is translated via i18n
`.trim();

const DialogCloseOnlyDemo = () => {
  const [isVisibleWithIcon, setIsVisibleWithIcon] = useState(false);
  const [isVisibleWithoutIcon, setIsVisibleWithoutIcon] = useState(false);
  const theme = useAppTheme();

  return (
    <View style={styles.content}>
      <Button mode="contained" onPress={() => setIsVisibleWithIcon(true)}>
        With Icon
      </Button>

      <Button mode="outlined" onPress={() => setIsVisibleWithoutIcon(true)} style={styles.button}>
        Without Icon
      </Button>

      <DialogCloseOnly
        isVisible={isVisibleWithIcon}
        onClose={() => setIsVisibleWithIcon(false)}
        icon="information"
        title="Information"
        content={
          <Markdown style={{ text: { color: theme.colors.primary } }}>
            {notes}
          </Markdown>
        }
      />

      <DialogCloseOnly
        isVisible={isVisibleWithoutIcon}
        onClose={() => setIsVisibleWithoutIcon(false)}
        title="Information"
        content={
          <Markdown style={{ text: { color: theme.colors.primary } }}>
            {notes}
          </Markdown>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
  },
  button: {
    marginTop: 12,
  },
});

const meta = {
  title: 'Components/DialogCloseOnly',
  component: DialogCloseOnlyDemo,
  tags: ['autodocs'],
  parameters: { notes },
} satisfies Meta<typeof DialogCloseOnlyDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DialogCloseOnlyDemo />,
};
