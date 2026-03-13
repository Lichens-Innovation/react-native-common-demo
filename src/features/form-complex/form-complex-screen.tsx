import { logger, useAppTheme } from '@lichens-innovation/react-native-common';
import type { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { RjsfPaperRenderer } from '@lichens-innovation/react-native-common/rjsf';
import type { MetaFormSchema } from '@lichens-innovation/ts-common/rjsf';
import { useLocalizedForm } from '@lichens-innovation/ts-common/rjsf';

import { useTranslation } from 'react-i18next';
import schema02 from './schema-02.json';

const complexMetaSchema = schema02 as unknown as MetaFormSchema;

export const FormComplexScreen: FunctionComponent = () => {
  const { i18n } = useTranslation();
  const { schema, uiSchema } = useLocalizedForm(complexMetaSchema);
  const styles = useStyles();

  const handleSubmit = (data: { formData?: Record<string, unknown> }) => {
    logger.info('Complex form submitted', { formData: data.formData });
  };

  const handleError = (errors: unknown) => {
    logger.warn('Complex form errors', { errors });
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <RjsfPaperRenderer
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
