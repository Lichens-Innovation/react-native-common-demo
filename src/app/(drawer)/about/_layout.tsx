import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';

const AboutLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="licenses" />
    </Stack>
  );
};

export default AboutLayout;
