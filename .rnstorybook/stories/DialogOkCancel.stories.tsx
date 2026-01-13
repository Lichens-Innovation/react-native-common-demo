import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { DialogOkCancel, useAppTheme } from '@lichens-innovation/react-native-common';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const DialogOkCancelDemo = () => {
  const [isVisibleWithIcon, setIsVisibleWithIcon] = useState(false);
  const [isVisibleWithoutIcon, setIsVisibleWithoutIcon] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const theme = useAppTheme();

  const handleOk = (variant: string) => {
    setLastAction(`OK pressed on "${variant}"`);
    setIsVisibleWithIcon(false);
    setIsVisibleWithoutIcon(false);
  };

  const handleCancel = (variant: string) => {
    setLastAction(`Cancel pressed on "${variant}"`);
    setIsVisibleWithIcon(false);
    setIsVisibleWithoutIcon(false);
  };

  return (
    <View style={styles.content}>
      <Button mode="contained" onPress={() => setIsVisibleWithIcon(true)}>
        With Icon
      </Button>

      <Button mode="outlined" onPress={() => setIsVisibleWithoutIcon(true)} style={styles.button}>
        Without Icon
      </Button>

      {lastAction && (
        <Text style={[styles.feedback, { color: theme.colors.primary }]}>
          Last action: {lastAction}
        </Text>
      )}

      <DialogOkCancel
        isVisible={isVisibleWithIcon}
        onOk={() => handleOk('With Icon')}
        onCancel={() => handleCancel('With Icon')}
        icon="alert"
        title="Confirm Action"
        description="Are you sure you want to proceed with this action? This cannot be undone."
      />

      <DialogOkCancel
        isVisible={isVisibleWithoutIcon}
        onOk={() => handleOk('Without Icon')}
        onCancel={() => handleCancel('Without Icon')}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action? This cannot be undone."
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
  feedback: {
    marginTop: 24,
    fontStyle: 'italic',
  },
});

const meta = {
  title: 'Components/DialogOkCancel',
  component: DialogOkCancelDemo,
  tags: ['autodocs'],
  parameters: { notes:`
DialogOkCancel Component
A confirmation dialog component with OK and Cancel buttons.

Props:
- \`icon\`: Optional icon to display at the top of the dialog
- \`title\`: Optional title ReactNode
- \`description\`: Optional description ReactNode
- \`onOk\`: Callback function when the OK button is pressed
- \`onCancel\`: Callback function when the Cancel button is pressed
- \`isVisible\`: Boolean to control dialog visibility

Features:
- Uses React Native Paper's Dialog component
- Automatically styled with consistent width
- Wrapped in a Portal for proper z-index handling
- OK and Cancel buttons are translated via i18n
`},
} satisfies Meta<typeof DialogOkCancelDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DialogOkCancelDemo />,
};
