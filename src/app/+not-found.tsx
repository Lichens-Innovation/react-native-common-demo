import { useRoute } from '@react-navigation/native';
import { Redirect } from 'expo-router';
import { FunctionComponent, useEffect } from 'react';
import { logger } from '@lichens-innovation/react-native-common';

const NotFoundScreen: FunctionComponent = () => {
  const wrongRoute = useRoute();
  logger.error('NotFoundScreen called. Redirecting to home screen.', { wrongRoute });

  return <Redirect href="/" />;
};

export default NotFoundScreen;
