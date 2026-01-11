import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';

const ToolsLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="live-event-logs" />
      <Stack.Screen name="network-logs" />
      <Stack.Screen name="event-logs" />
    </Stack>
  );
};

export default ToolsLayout;
