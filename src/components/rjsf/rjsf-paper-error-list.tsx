import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { ErrorListProps } from '@rjsf/utils';
import { TranslatableString } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

export const RjsfPaperErrorList: FunctionComponent<ErrorListProps> = ({ errors, registry }) => {
  const { translateString } = registry;
  const styles = useStyles();

  if (!errors || errors.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text variant="titleSmall" style={styles.title}>
        {translateString(TranslatableString.ErrorsLabel)}
      </Text>

      <List.Section>
        {errors.map((error) => (
          <List.Item
            key={`${error.property}-${error.stack}`}
            title={error.stack}
            left={(props) => <List.Icon {...props} icon="alert-circle" />}
            titleNumberOfLines={3}
          />
        ))}
      </List.Section>
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      marginVertical: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(1),
    },
  });
};
