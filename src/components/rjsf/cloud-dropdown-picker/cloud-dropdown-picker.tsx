import { format, isValid, parseISO } from 'date-fns';
import { isNotBlank } from '@lichens-innovation/ts-common';
import { getRjsfDisplayLabel, hasRjsfErrors } from '@lichens-innovation/ts-common/rjsf';
import { DropDownSelector, useAppTheme } from '@lichens-innovation/react-native-common';
import type { FieldProps, RJSFSchema } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import {
  buildCloudDropdownFormData,
  getCloudDropdownUpdatedAt,
  getCloudDropdownValue,
} from './cloud-dropdown-picker.utils';
import { useCloudDropdownOptions } from './use-cloud-dropdown-options';

export const CloudDropdownPicker: FunctionComponent<FieldProps<Record<string, unknown>, RJSFSchema>> = ({
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
  const { t } = useTranslation();
  const { options, isOptionsLoading, isOptionsError, optionsError } = useCloudDropdownOptions();
  const hasError = hasRjsfErrors(rawErrors);
  const label = schema.title ?? '';
  const hideLabel = uiSchema?.['ui:options']?.label === false;
  const baseDisplayLabel = isOptionsLoading
    ? t('common:asyncStatus.loading')
    : getRjsfDisplayLabel({ label, required, hideLabel });
  const updatedAtRaw = getCloudDropdownUpdatedAt(formData);
  const formattedUpdatedAt = isNotBlank(updatedAtRaw)
    ? format(new Date(updatedAtRaw), 'yyyy-MM-dd HH:mm:ss')
    : undefined;
  const displayLabel =
    formattedUpdatedAt !== undefined ? `${baseDisplayLabel} (${formattedUpdatedAt})` : baseDisplayLabel;

  const placeholder = uiSchema?.['ui:placeholder'];
  const strValue = getCloudDropdownValue(formData);
  const baseId = fieldPathId?.$id ?? id ?? 'cloudDropdownPicker';
  const path = fieldPathId?.path ?? [];

  const selectOptions = options.map((o) => ({ label: o.label, value: o.value }));
  const showError = hasError || isOptionsError;
  const errorMessage = isOptionsError && optionsError ? optionsError.message : undefined;

  const handleChange = (code: string | undefined) => {
    const nextFormData = buildCloudDropdownFormData(code);
    onChange(nextFormData, path, undefined, baseId);
    onBlur(baseId, code ?? '');
  };

  return (
    <View style={styles.widgetBlock}>
      <DropDownSelector
        label={displayLabel}
        value={strValue}
        onChange={handleChange}
        options={selectOptions}
        placeholder={placeholder}
        disabled={(disabled ?? false) || (readonly ?? false) || isOptionsLoading}
        isError={showError}
      />
      {errorMessage ? (
        <Text variant="bodySmall" style={styles.helpError}>
          {errorMessage}
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
      color: theme.colors?.error ?? '#b00020',
      marginTop: theme.spacing(0.5),
    },
  });
};
