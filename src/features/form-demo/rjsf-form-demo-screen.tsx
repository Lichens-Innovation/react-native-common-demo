import { logger, useAppTheme } from '@lichens-innovation/react-native-common';
import { RjsfPaperRendererDebug } from '@lichens-innovation/react-native-common/rjsf';
import { useLocalizedForm } from '@lichens-innovation/ts-common/rjsf';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

import type { FormDemoVariant } from './form-demo.utils';
import { formDemoRegistry } from './form-demo.utils';

export type RjsfFormDemoScreenProps = {
  variant: FormDemoVariant;
};

export const RjsfFormDemoScreen: FunctionComponent<RjsfFormDemoScreenProps> = ({ variant }) => {
  const { metaSchema, fields } = formDemoRegistry[variant];
  const { i18n } = useTranslation();
  const { schema, uiSchema } = useLocalizedForm(metaSchema);
  const styles = useStyles();

  const handleSubmit = (data: { formData?: Record<string, unknown> }) => {
    logger.info('Form demo submitted', { variant, formData: data.formData });
  };

  const handleError = (errors: unknown) => {
    logger.warn('Form demo validation errors', { variant, errors });
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <RjsfPaperRendererDebug
          i18n={i18n}
          schema={schema}
          uiSchema={uiSchema}
          {...(fields ? { fields } : {})}
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
