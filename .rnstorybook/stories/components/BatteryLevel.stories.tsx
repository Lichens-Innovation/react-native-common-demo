import type { Meta, StoryObj } from '@storybook/react-native';
import { BatteryLevel } from '@lichens-innovation/react-native-common';

const meta = {
  title: 'Components/BatteryLevel',
  component: BatteryLevel,
  tags: ['autodocs'],
  argTypes: {
    batteryLevel: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Battery level percentage (0-100)',
    },
    size: {
      control: { type: 'number' },
      description: 'Size of the battery icon',
    },
  },
} satisfies Meta<typeof BatteryLevel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    batteryLevel: 100,
    size: 64,
  },
};

export const High: Story = {
  args: {
    batteryLevel: 75,
    size: 64,
  },
};

export const Medium: Story = {
  args: {
    batteryLevel: 50,
    size: 64,
  },
};

export const Low: Story = {
  args: {
    batteryLevel: 25,
    size: 64,
  },
};

export const Critical: Story = {
  args: {
    batteryLevel: 10,
    size: 64,
  },
};

export const Empty: Story = {
  args: {
    batteryLevel: 0,
    size: 64,
  },
};

export const Unknown: Story = {
  args: {
    batteryLevel: null,
    size: 64,
  },
};

export const LargeIcon: Story = {
  args: {
    batteryLevel: 80,
    size: 128,
  },
};

export const SmallIcon: Story = {
  args: {
    batteryLevel: 80,
    size: 32,
  },
};
