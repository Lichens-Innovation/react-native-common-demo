import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useAppTheme, VerticalResizableSplitView } from '@lichens-innovation/react-native-common';
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
  title: 'Layouts/VerticalResizableSplitView',
  component: VerticalResizableSplitView,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalResizableSplitView>;

export default meta;

export const Default: StoryObj<typeof VerticalResizableSplitView> = {
  render: () => (
    <VerticalResizableSplitView
      topContent={<TopContent />}
      bottomContent={<BottomContent />}
      initialTopRatio={0.3}
      minTopRatio={.15}
      maxTopRatio={.85}
    />
  ),
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    topContent: {
      flex: 1,
      padding: theme.spacing(2),
      borderRadius: theme.roundness,
      marginBottom: theme.spacing(2),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
    },
    bottomContent: {
      flex: 1,
      padding: theme.spacing(2),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
      borderRadius: theme.roundness,
      marginTop: theme.spacing(2),
    },
  });
};
