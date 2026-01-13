import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  DEFAULT_SHEET_SNAP_POINTS,
  DefaultBackdrop,
  DefaultSheetBackground,
  useAppTheme,
  useBottomSheetToggler,
} from '@lichens-innovation/react-native-common';
import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Button } from 'react-native-paper';

const BottomSheetTogglerDemo = () => {
  const { bottomSheetModalRef, showBottomSheet } = useBottomSheetToggler();
  const theme = useAppTheme();

  return (
    <View style={styles.content}>
      <Button mode="contained" onPress={showBottomSheet}>
        Open Bottom Sheet
      </Button>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={DEFAULT_SHEET_SNAP_POINTS}
        index={DEFAULT_SHEET_SNAP_POINTS.length - 1}
        backdropComponent={DefaultBackdrop}
        backgroundComponent={DefaultSheetBackground}
      >
        <BottomSheetScrollView style={styles.sheetContent}>
          <Markdown
            style={{
              text: { color: theme.colors.primary },
            }}
          >
            {meta.parameters?.notes}
          </Markdown>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 24,
  },
  sheetContent: {
    padding: 24,
  },
});

const meta = {
  title: 'Hooks/useBottomSheetToggler',
  component: BottomSheetTogglerDemo,
  tags: ['autodocs'],
  parameters: {
    notes: `
useBottomSheetToggler Hook

A hook that provides utilities for controlling a BottomSheetModal.

Returns:
- \`bottomSheetModalRef\`: Ref to attach to the BottomSheetModal
- \`showBottomSheet\`: Function to open the bottom sheet
- \`hideBottomSheet\`: Function to close the bottom sheet
- \`isBottomSheetOpen\`: Boolean indicating if the sheet is open

Features:
- Handles Android back button automatically
- Provides state tracking for the sheet visibility
`,
  },
} satisfies Meta<typeof BottomSheetTogglerDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BottomSheetTogglerDemo />,
};
