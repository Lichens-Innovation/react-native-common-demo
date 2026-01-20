import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useAppTheme, HorizontalResizableSplitView } from '@lichens-innovation/react-native-common';
import { View, StyleSheet } from 'react-native';
import { faker } from '@faker-js/faker';
import { Text } from 'react-native-paper';

const LeftContent = () => {
  const styles = useStyles();

  return (
    <View style={styles.leftContent}>
      <Text>{faker.lorem.paragraph(12)}</Text>
    </View>
  );
};

const RightContent = () => {
  const styles = useStyles();

  return (
    <View style={styles.rightContent}>
      <Text>{faker.lorem.paragraphs(22)}</Text>
    </View>
  );
};

const meta = {
  title: 'Layouts/HorizontalResizableSplitView',
  component: HorizontalResizableSplitView,
  tags: ['autodocs'],
} satisfies Meta<typeof HorizontalResizableSplitView>;

export default meta;

export const Default: StoryObj<typeof HorizontalResizableSplitView> = {
  render: () => (
    <HorizontalResizableSplitView
      leftContent={<LeftContent />}
      rightContent={<RightContent />}
      initialLeftRatio={0.3}
      minLeftRatio={.15}
      maxLeftRatio={.85}
    />
  ),
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    leftContent: {
      flex: 1,
      padding: theme.spacing(2),
      borderRadius: theme.roundness,
      marginRight: theme.spacing(2),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
    },
    rightContent: {
      flex: 1,
      padding: theme.spacing(2),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.outline,
      borderRadius: theme.roundness,
      marginLeft: theme.spacing(2),
    },
  });
};
