import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';

const SettingsLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SettingsLayout;
