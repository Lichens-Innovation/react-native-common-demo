import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { DialogSingleTextInput, useAppTheme } from '@lichens-innovation/react-native-common';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const DialogSingleTextInputDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);
  const theme = useAppTheme();

  const handleOk = () => {
    setLastAction(`OK pressed with value: "${value}"`);
    setIsVisible(false);
  };

  const handleCancel = () => {
    setLastAction('Cancel pressed');
    setIsVisible(false);
  };

  const validateEmail = (email: string): string | undefined => {
    if (email.trim().length === 0) {
      return undefined;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const errorMessage = validateEmail(value);

  return (
    <View style={styles.content}>
      <Button mode="contained" onPress={() => setIsVisible(true)}>
        Open Dialog
      </Button>

      {lastAction && (
        <Text style={[styles.feedback, { color: theme.colors.primary }]}>
          Last action: {lastAction}
        </Text>
      )}

      <DialogSingleTextInput
        isVisible={isVisible}
        title="Enter Email"
        description="Please provide your email address."
        value={value}
        onChange={setValue}
        errorMessage={errorMessage}
        placeholder="example@email.com"
        onOk={handleOk}
        onCancel={handleCancel}
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
  title: 'Dialogs/DialogSingleTextInput',
  component: DialogSingleTextInputDemo,
  tags: ['autodocs'],
  parameters: { notes:`
DialogSingleTextInput Component
A dialog component with a single text input field, OK and Cancel buttons.

Props:
- \`title\`: Required title ReactNode
- \`description\`: Optional description ReactNode
- \`value\`: Required string value of the text input
- \`onChange\`: Required callback function when the text input value changes
- \`errorMessage\`: Optional error message to display below the input
- \`placeholder\`: Optional placeholder text for the input
- \`onOk\`: Required callback function when the OK button is pressed
- \`onCancel\`: Required callback function when the Cancel button is pressed
- \`isVisible\`: Required boolean to control dialog visibility

Features:
- Uses React Native Paper's Dialog and TextInput components
- Automatically styled with consistent width
- Wrapped in a Portal for proper z-index handling
- OK button is disabled when input is empty or has an error
- OK and Cancel buttons are translated via i18n
- Text input has autoFocus enabled
- Error message is displayed below the input when provided
`},
} satisfies Meta<typeof DialogSingleTextInputDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DialogSingleTextInputDemo />,
};
