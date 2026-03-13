import { getRjsfDisplayLabel, hasRjsfErrors, toStringOrUndefined } from '@lichens-innovation/ts-common/rjsf';
import { DropDownSelector, useAppTheme } from '@lichens-innovation/react-native-common';
import type { FieldProps, RJSFSchema } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useCloudDropdownOptions } from './use-cloud-dropdown-options';
import { useTranslation } from 'react-i18next';

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
  const displayLabel = isOptionsLoading
    ? t('common:asyncStatus.loading')
    : getRjsfDisplayLabel({ label, required, hideLabel });

  const placeholder = uiSchema?.['ui:placeholder'];
  const strValue = toStringOrUndefined(formData);
  const baseId = fieldPathId?.$id ?? id ?? 'cloudDropdownPicker';
  const path = fieldPathId?.path ?? [];

  const selectOptions = options.map((o) => ({ label: o.label, value: o.value }));
  const showError = hasError || isOptionsError;
  const errorMessage = isOptionsError && optionsError ? optionsError.message : undefined;

  const handleChange = (code: string | undefined) => {
    const nextValue = code as unknown as Record<string, unknown> | undefined;
    onChange(nextValue, path, undefined, baseId);
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
