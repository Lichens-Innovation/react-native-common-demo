import { getErrorMessage, logger, useAppTheme, useSnackbar } from '@Lichens-Innovation/react-native-common';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { FunctionComponent, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Pdf from 'react-native-pdf';

export type PdfViewerRouteParams = {
  fileUri: string;
  headerTitle: string;
  page: string;
};

const PdfViewerScreen: FunctionComponent = () => {
  const styles = useStyles();

  const navigation = useNavigation();
  const { fileUri, headerTitle, page } = useLocalSearchParams<PdfViewerRouteParams>();
  const initialPage = Number(page || 1);

  const [isLoading, setIsLoading] = useState(true);
  const { showSnackbarMessage } = useSnackbar();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: true, headerTitle });
  }, [headerTitle, navigation]);

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: fileUri }}
        page={initialPage}
        onLoadComplete={(numberOfPages) => {
          setIsLoading(false);
          logger.log('[PdfViewerScreen] PDF loaded', { numberOfPages });
        }}
        onPageChanged={(page, numberOfPages) => {
          logger.log('[PdfViewerScreen] Page changed', { page, numberOfPages });
        }}
        onError={(error) => {
          logger.error('[PdfViewerScreen] error', error);
          setIsLoading(false);
          showSnackbarMessage(getErrorMessage(error));
        }}
        style={styles.pdf}
        enablePaging={true}
        enableAnnotationRendering={true}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    pdf: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.surface,
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default PdfViewerScreen;
