import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useAppTheme, VerticalResizableOverlayView } from '@lichens-innovation/react-native-common';
import { View, StyleSheet } from 'react-native';
import { faker } from '@faker-js/faker';
import { Text } from 'react-native-paper';

const TopContent = () => {
  const styles = useStyles();

  return (
    <View style={styles.topContent}>
      <Text>{faker.lorem.paragraph(12)}</Text>
    </View>
  );
};

const BottomContent = () => {
  const styles = useStyles();

  return (
    <View style={styles.bottomContent}>
      <Text>{faker.lorem.paragraphs(22)}</Text>
    </View>
  );
};

const meta = {
  title: 'Components/VerticalResizableOverlayView',
  component: VerticalResizableOverlayView,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalResizableOverlayView>;

export default meta;

export const Default: StoryObj<typeof VerticalResizableOverlayView> = {
  render: () => (
    <VerticalResizableOverlayView
      foregroundContent={<TopContent />}
      backgroundContent={<BottomContent />}
      foregroundContentAspectRatio={1}
      initialForegroundRatio={0.3}
      minForegroundRatio={0.15}
      maxForegroundRatio={0.85}
    />
  ),
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    topContent: {
      flex: 1,
      padding: theme.spacing(2),
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.roundness,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
    },
    bottomContent: {
      flex: 1,
      width: '100%',
      padding: theme.spacing(2),
      backgroundColor: theme.colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
      borderRadius: theme.roundness,
    },
  });
};
