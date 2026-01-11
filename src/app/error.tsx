import { FunctionComponent } from 'react';
import { ErrorBoundaryScreen, SafeContainer } from '@Lichens-Innovation/react-native-common';

const Error: FunctionComponent = () => {
  return (
    <SafeContainer>
      <ErrorBoundaryScreen />
    </SafeContainer>
  );
};

export default Error;
