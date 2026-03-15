import { logger, useAppTheme } from '@lichens-innovation/react-native-common';
import { RjsfPaperRendererDebug } from '@lichens-innovation/react-native-common/rjsf';
import type { MetaFormSchema } from '@lichens-innovation/ts-common/rjsf';
import { useLocalizedForm } from '@lichens-innovation/ts-common/rjsf';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

import schema01 from './schema-01.json';

const simpleMetaSchema = schema01 as unknown as MetaFormSchema;

export const SimpleFormScreen: FunctionComponent = () => {
  const { schema, uiSchema } = useLocalizedForm(simpleMetaSchema);
  const styles = useStyles();
  const { i18n } = useTranslation();

  const handleSubmit = (data: { formData?: Record<string, unknown> }) => {
    logger.info('Simple form submitted', { formData: data.formData });
  };

  const handleError = (errors: unknown) => {
    logger.warn('Simple form errors', { errors });
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <RjsfPaperRendererDebug
          i18n={i18n}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          onError={handleError}
        />
      </View>
    </ScrollView>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    scroll: {
      flex: 1,
    },
    content: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(4),
    },
    form: {
      gap: theme.spacing(2),
    },
  });
};
