import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import {
  useBottomSheetToggler,
  DefaultBackdrop,
  DefaultSheetBackground,
  DEFAULT_SHEET_SNAP_POINTS,
  useAppTheme,
} from '@lichens-innovation/react-native-common';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';

const notes = `
## useBottomSheetToggler Hook

A hook that provides utilities for controlling a BottomSheetModal.

### Returns
- \`bottomSheetModalRef\`: Ref to attach to the BottomSheetModal
- \`showBottomSheet\`: Function to open the bottom sheet
- \`hideBottomSheet\`: Function to close the bottom sheet
- \`isBottomSheetOpen\`: Boolean indicating if the sheet is open

### Features
- Handles Android back button automatically
- Provides state tracking for the sheet visibility
`.trim();

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
            {notes}
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
  parameters: { notes },
} satisfies Meta<typeof BottomSheetTogglerDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BottomSheetTogglerDemo />,
};
