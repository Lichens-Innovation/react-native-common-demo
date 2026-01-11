import Constants from 'expo-constants';
import { format } from 'date-fns';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

import { getDeviceType } from '@Lichens-Innovation/react-native-common';
import { APP_VERSION_INFO } from '~/constants';

const { AUTHOR, VERSION_DATE_ISO, VERSION, RELEASE_NOTES } = APP_VERSION_INFO;

export const AboutDetails: FunctionComponent = () => {
  const { t } = useTranslation();
  const formattedDate = format(new Date(VERSION_DATE_ISO), 'yyyy-MM-dd HH:mm:ss');

  return (
    <DataTable>
      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>{t('app:about.author')}:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{AUTHOR}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>Expo SDK:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{Constants.expoConfig?.sdkVersion || '-'}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>{t('app:about.version')}:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{VERSION}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>{t('app:about.releaseNotes')}:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{RELEASE_NOTES}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>{t('app:about.updated')}:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{formattedDate}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.tableRow}>
        <DataTable.Cell>{t('app:about.deviceType')}:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{getDeviceType()}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

const styles = StyleSheet.create({
  tableValueCell: {
    flex: 2,
  },
  tableRow: {
    height: 24,
    minHeight: 24,
    paddingHorizontal: 0,
  },
});
