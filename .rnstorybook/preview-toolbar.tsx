import { commonStore } from '@lichens-innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';

export const PreviewToolbar = observer(() => {
  return (
    <Pressable style={styles.themeRow} onPress={() => commonStore.toggleDarkMode()}>
      <Text variant="bodySmall">Dark Mode</Text>
      <Switch value={commonStore.isDarkMode} onValueChange={() => commonStore.toggleDarkMode()} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 16,
  },
});
