import { DropDownSelector } from '@lichens-innovation/react-native-common';
import type { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// Wrapper component to handle state for interactive stories
const DropDownSelectorWithState = ({
  initialValue,
  options,
  label,
  placeholder,
  disabled,
  isError,
}: {
  initialValue?: string;
  options: Array<{ label: string; value: string; icon?: string }>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
}) => {
  const [value, setValue] = useState<string | undefined>(initialValue);
  return (
    <View style={{ width: 300, padding: 20 }}>
      <DropDownSelector
        label={label}
        value={value}
        onChange={setValue}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        isError={isError}
      />
      {value && (
        <Text variant="bodyMedium" style={{ marginTop: 10, textAlign: 'center' }}>
          Selected: {value}
        </Text>
      )}
    </View>
  );
};

const optionsWithIcons = [
  { label: 'Home', value: 'home', icon: 'home' },
  { label: 'Settings', value: 'settings', icon: 'cog' },
  { label: 'Info', value: 'info', icon: 'information' },
  { label: 'Star', value: 'star', icon: 'star' },
  { label: 'Heart', value: 'heart', icon: 'heart' },
  { label: 'Mail', value: 'mail', icon: 'email' },
];

const meta = {
  title: 'Components/DropDownSelector',
  component: DropDownSelector,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Selected value',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown is disabled',
    },
    isError: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown has an error state',
    },
  },
} satisfies Meta<typeof DropDownSelector>;

export default meta;

export const Default: StoryObj<typeof DropDownSelectorWithState> = {
  render: () => (
    <DropDownSelectorWithState
      initialValue={undefined}
      options={optionsWithIcons}
      label="Choose an option"
      placeholder="Select an option"
    />
  ),
};

export const WithInitialValue: StoryObj<typeof DropDownSelectorWithState> = {
  render: () => (
    <DropDownSelectorWithState
      initialValue="settings"
      options={optionsWithIcons}
      label="Choose an option"
      placeholder="Select an option"
    />
  ),
};

export const Disabled: StoryObj<typeof DropDownSelectorWithState> = {
  render: () => (
    <DropDownSelectorWithState
      initialValue="home"
      options={optionsWithIcons}
      label="Choose an option"
      placeholder="Select an option"
      disabled={true}
    />
  ),
};

export const ErrorState: StoryObj<typeof DropDownSelectorWithState> = {
  render: () => (
    <DropDownSelectorWithState
      initialValue={undefined}
      options={optionsWithIcons}
      label="Choose an option"
      placeholder="Select an option"
      isError={true}
    />
  ),
};
