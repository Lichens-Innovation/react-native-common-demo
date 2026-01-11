import { TabBarIcon, useAppTheme } from '@Lichens-Innovation/react-native-common';
import { Tabs } from 'expo-router';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenIconProps } from '~/types/native-screens';

const TabLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: t('app:rag.title'),
          tabBarIcon: ({ color }: ScreenIconProps) => <TabBarIcon name="robot-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarLabel: t('app:about.title'),
          tabBarIcon: ({ color }: ScreenIconProps) => <TabBarIcon name="information-outline" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
