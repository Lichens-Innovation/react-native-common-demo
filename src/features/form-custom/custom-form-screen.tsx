import { logger, useAppTheme } from '@lichens-innovation/react-native-common';
import { RjsfPaperRendererDebug } from '@lichens-innovation/react-native-common/rjsf';
import type { MetaFormSchema } from '@lichens-innovation/ts-common/rjsf';
import { useLocalizedForm } from '@lichens-innovation/ts-common/rjsf';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CloudDropdownPickerField } from '~/components/rjsf/fields/cloud-dropdown-picker-field/cloud-dropdown-picker-field';
import { VoiceInputField } from '~/components/rjsf/fields/voice-input-field/voice-input-field';

import schemaCustom from './schema-custom.json';

const customMetaSchema = schemaCustom as unknown as MetaFormSchema;

export const CustomFormScreen: FunctionComponent = () => {
  const { schema, uiSchema } = useLocalizedForm(customMetaSchema);
  const styles = useStyles();
  const { i18n } = useTranslation();

  const handleSubmit = (data: { formData?: Record<string, unknown> }) => {
    logger.info('Custom form submitted', { formData: data.formData });
  };

  const handleError = (errors: unknown) => {
    logger.warn('Custom form errors', { errors });
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <RjsfPaperRendererDebug
          i18n={i18n}
          schema={schema}
          uiSchema={uiSchema}
          fields={{
            CloudDropdownPickerField,
            VoiceInputField,
          }}
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
