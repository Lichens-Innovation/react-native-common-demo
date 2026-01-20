import { OnOffToggle } from '@lichens-innovation/react-native-common';
import type { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

// Wrapper component to handle state for interactive stories
const OnOffToggleWithState = ({ initialValue = false }: { initialValue?: boolean }) => {
  const [isOn, setIsOn] = useState(initialValue);
  return (
    <View style={{ width: 200 }}>
      <OnOffToggle isOn={isOn} onValueChange={setIsOn} />

      <Text variant="bodyMedium" style={{ textAlign: 'center' }}>{isOn ? 'ON' : 'OFF'}</Text>
    </View>
  );
};

const meta = {
  title: 'Components/OnOffToggle',
  component: OnOffToggle,
  tags: ['autodocs'],
  argTypes: {
    isOn: {
      control: { type: 'boolean' },
      description: 'Whether the toggle is in the "on" state',
    },
  },
} satisfies Meta<typeof OnOffToggle>;

export default meta;

export const Interactive: StoryObj<typeof OnOffToggleWithState> = {
  render: () => <OnOffToggleWithState initialValue={false} />,
};

export const InteractiveOn: StoryObj<typeof OnOffToggleWithState> = {
  render: () => <OnOffToggleWithState initialValue={true} />,
};
