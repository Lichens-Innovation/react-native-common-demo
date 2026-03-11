import { useAppTheme, PasswordInput } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';

import { getRjsfDisplayLabel } from './rjsf-widgets.utils';

export const PasswordWidget: FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  readonly,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  label,
  hideLabel,
  required,
  rawErrors,
  options,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;
  const displayLabel = getRjsfDisplayLabel({ label, required, hideLabel });

  const handleChangeText = (text: string) => {
    const isEmpty = text === '';
    const valueToSet = isEmpty ? options?.emptyValue : text;
    onChange(valueToSet);
  };

  return (
    <PasswordInput
      mode="outlined"
      label={displayLabel}
      value={value ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      editable={!readonly}
      onChangeText={handleChangeText}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      error={hasError}
      style={styles.input}
      outlineColor={theme.colors.outline}
    />
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    input: {
      marginVertical: theme.spacing(0.5),
    },
  });
};
