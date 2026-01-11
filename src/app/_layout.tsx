import '~/utils/env-vars'; // before anything else (since it is used by our common logger)

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  commonStore,
  DARK_THEME,
  HeaderBackButton,
  isDevelopment,
  LIGHT_THEME,
  NAVIGATION_DARK,
  NAVIGATION_LIGHT,
  SnackbarProvider,
  TanstackQueryProvider,
} from '@Lichens-Innovation/react-native-common';
import { ThemeProvider } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import 'expo-dev-client';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppInit } from '~/use-app-init';

const RootLayout: FunctionComponent = observer(() => {
  const { isDarkMode } = commonStore;
  useAppInit();

  const navigationTheme = isDarkMode ? NAVIGATION_DARK : NAVIGATION_LIGHT;
  const paperTheme = isDarkMode ? DARK_THEME : LIGHT_THEME;
  const statusBarStyle = isDarkMode ? 'light' : 'dark';
  const statusBarBackgroundColor = isDarkMode ? 'black' : 'white';

  return (
    <SafeAreaProvider>
      <TanstackQueryProvider>
        <KeyboardProvider>
          <PaperProvider theme={paperTheme}>
            <StatusBar style={statusBarStyle} backgroundColor={statusBarBackgroundColor} />
            <ThemeProvider value={navigationTheme}>
              <SnackbarProvider>
                <GestureHandlerRootView style={styles.container}>
                  <BottomSheetModalProvider>
                    <Stack>
                      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                      <Stack.Screen name="error" options={{ headerShown: false }} />
                      <Stack.Screen
                        name="pdf-viewer"
                        options={{ presentation: 'modal', headerLeft: () => <HeaderBackButton /> }}
                      />
                    </Stack>
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </SnackbarProvider>
            </ThemeProvider>
          </PaperProvider>
        </KeyboardProvider>
      </TanstackQueryProvider>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const withSentry: boolean = !isDevelopment();
export default withSentry ? Sentry.wrap(RootLayout) : RootLayout;
