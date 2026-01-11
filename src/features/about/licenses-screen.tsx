import { LegendList } from '@legendapp/list';
import * as WebBrowser from 'expo-web-browser';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { LicenceDetail, parseLicenceData, useAppTheme } from '@lichens-innovation/react-native-common';

import licenseEntries from '@assets/licenses.json';
import { useTranslation } from 'react-i18next';

export const LicensesScreen: FunctionComponent = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const data = parseLicenceData(licenseEntries);

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.paragraph}>
        {t('app:about.appDependencies')}
      </Text>

      <LegendList
        data={data}
        keyExtractor={(item) => item.title}
        style={styles.list}
        renderItem={({ item }: { item: LicenceDetail }) => (
          <List.Item
            title={item.title}
            description={`${item.version} [${item.licenceType} licence]`}
            onPress={() => WebBrowser.openBrowserAsync(item.repository)}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
        estimatedItemSize={80}
      />
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: theme.spacing(1),
      paddingHorizontal: theme.spacing(2),
      gap: theme.spacing(2),
    },
    paragraph: {
      width: '100%',
      textAlign: 'center',
    },
    list: {
      flex: 1,
    },
  });
};
