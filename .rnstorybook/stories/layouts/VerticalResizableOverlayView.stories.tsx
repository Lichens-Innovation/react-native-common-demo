import { faker } from '@faker-js/faker';
import { ResizableOverlayView, useAppTheme } from '@lichens-innovation/react-native-common';
import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons, Text } from 'react-native-paper';

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

  return <View style={styles.bottomContent} />;
};

const meta = {
  title: 'Layouts/VerticalResizableOverlayView',
  component: ResizableOverlayView,
  tags: ['autodocs'],
} satisfies Meta<typeof ResizableOverlayView>;

export default meta;

export const Default: StoryObj<typeof ResizableOverlayView> = {
  render: () => {
    const [anchorType, setAnchorType] = React.useState<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'>(
      'topRight'
    );

    const styles = useStyles();

    return (
      <View style={styles.screen}>
        <View style={styles.controls}>
          <SegmentedButtons
            value={anchorType}
            onValueChange={(value) => setAnchorType(value as typeof anchorType)}
            buttons={[
              { value: 'topLeft', label: 'T. Left' },
              { value: 'topRight', label: 'T. Right' },
              { value: 'bottomLeft', label: 'B. Left' },
              { value: 'bottomRight', label: 'B. Right' },
            ]}
          />
        </View>

        <View style={styles.preview}>
          <ResizableOverlayView
            anchorType={anchorType}
            foregroundContent={<TopContent />}
            backgroundContent={<BottomContent />}
            foregroundContentAspectRatio={1}
            initialForegroundRatio={0.3}
            minForegroundRatio={0.15}
            maxForegroundRatio={0.85}
          />
        </View>
      </View>
    );
  },
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    controls: {
      padding: theme.spacing(2),
      backgroundColor: theme.colors.background,
    },
    preview: {
      flex: 1,
    },
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
      minWidth: '100%',
      backgroundColor: 'orange',
    },
  });
};
