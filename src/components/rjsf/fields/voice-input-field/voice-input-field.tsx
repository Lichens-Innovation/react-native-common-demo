import {
  type RecordingTextInputArgs,
  useAppTheme,
  VoiceRecognitionTextInput,
} from '@lichens-innovation/react-native-common';
import { isNotBlank } from '@lichens-innovation/ts-common';
import { getRjsfDisplayLabel, hasRjsfErrors } from '@lichens-innovation/ts-common/rjsf';
import type { FieldProps, RJSFSchema } from '@rjsf/utils';
import { format } from 'date-fns';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  buildVoiceInputFormData,
  getVoiceInputRecordingUri,
  getVoiceInputUpdatedAt,
  getVoiceInputValue,
} from './voice-input-field.utils';

export const VoiceInputField: FunctionComponent<FieldProps<Record<string, unknown>, RJSFSchema>> = ({
  formData,
  onChange,
  onBlur,
  schema,
  uiSchema,
  fieldPathId,
  disabled,
  readonly,
  required,
  rawErrors,
  id,
}) => {
  const styles = useStyles();
  const theme = useAppTheme();
  const hasError = hasRjsfErrors(rawErrors);
  const label = schema.title ?? '';
  const hideLabel = uiSchema?.['ui:options']?.label === false;
  const updatedAtRaw = getVoiceInputUpdatedAt(formData);
  const timestamp = isNotBlank(updatedAtRaw) ? format(new Date(updatedAtRaw), 'yyyy-MM-dd HH:mm:ss') : '';
  const baseDisplayLabel = getRjsfDisplayLabel({ label, required, hideLabel });
  const displayLabel = isNotBlank(timestamp) ? `${baseDisplayLabel} (${timestamp})` : baseDisplayLabel;

  const placeholder = uiSchema?.['ui:placeholder'];
  const value = getVoiceInputValue(formData) ?? '';
  const recordingUri = getVoiceInputRecordingUri(formData);
  const baseId = fieldPathId?.$id ?? id ?? 'voiceInputField';
  const path = fieldPathId?.path ?? [];

  const handleValueChange = (args: RecordingTextInputArgs) => {
    const nextFormData = buildVoiceInputFormData(args);
    onChange(nextFormData, path, undefined, baseId);
    onBlur(baseId, args.value);
  };

  return (
    <View style={styles.widgetBlock}>
      <VoiceRecognitionTextInput
        mode="outlined"
        label={displayLabel}
        value={value}
        recordingUri={recordingUri ?? null}
        onValueChange={handleValueChange}
        placeholder={placeholder}
        disabled={(disabled ?? false) || (readonly ?? false)}
        editable={!readonly}
        error={hasError}
        showPlayback={true}
        outlineColor={theme.colors.outline}
      />

      {hasError && rawErrors?.length ? (
        <Text variant="bodySmall" style={styles.helpError}>
          {rawErrors.join(', ')}
        </Text>
      ) : null}
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    widgetBlock: {
      marginVertical: theme.spacing(0.5),
    },
    helpError: {
      color: theme.colors?.error,
      marginTop: theme.spacing(0.5),
    },
  });
};
