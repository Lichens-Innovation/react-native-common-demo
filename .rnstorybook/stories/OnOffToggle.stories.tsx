import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { OnOffToggle } from '@lichens-innovation/react-native-common';
import { View } from 'react-native';

// Wrapper component to handle state for interactive stories
const OnOffToggleWithState = ({ initialValue = false }: { initialValue?: boolean }) => {
  const [isOn, setIsOn] = useState(initialValue);
  return (
    <View style={{ margin: 16, width: 200 }}>
      <OnOffToggle isOn={isOn} onValueChange={setIsOn} />
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
