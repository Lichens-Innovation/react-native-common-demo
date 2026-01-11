import { MaterialIcons } from '@expo/vector-icons';
import { ErrorBoundary, HeaderBackButton, HeaderButton } from '@Lichens-Innovation/react-native-common';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-paper';

import { ScreenIconProps } from '~/types/native-screens';

const DrawerLayout: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Drawer initialRouteName="(home)">
      <Drawer.Screen
        name="(home)"
        options={{
          headerTitle: () => '',
          drawerLabel: t('app:home.menuLabel'),
          drawerIcon: (props: ScreenIconProps) => <MaterialIcons name="home" {...props} />,
          headerRight: () => <HeaderButton iconName="cog" onPress={() => router.push('/settings')} />,
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: t('app:settings.title'),
          drawerLabel: t('app:settings.menuLabel'),
          drawerIcon: ({ size, color }) => <Icon source="cog" size={size} color={color} />,
          headerLeft: () => <HeaderBackButton />,
        }}
      />

      <Drawer.Screen
        name="tools"
        options={{
          headerTitle: t('app:tools.title'),
          drawerLabel: t('app:tools.menuLabel'),
          drawerIcon: (props: ScreenIconProps) => <MaterialIcons name="engineering" {...props} />,
          headerLeft: () => <HeaderBackButton />,
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          headerTitle: t('app:about.title'),
          drawerLabel: t('app:about.menuLabel'),
          drawerIcon: (props: ScreenIconProps) => <MaterialIcons name="info" {...props} />,
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </Drawer>
  );
};

export { ErrorBoundary };

export default DrawerLayout;
