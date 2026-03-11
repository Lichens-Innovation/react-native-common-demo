import { useAppTheme } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export const NumberWidget: FunctionComponent<WidgetProps> = ({
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
  schema,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);

  const strValue = !isNullish(value) ? String(value) : '';
  const handleChangeText = (text: string) => {
    if (text === '') {
      onChange(options?.emptyValue);
      return;
    }
    const num = schema?.type === 'integer' ? parseInt(text, 10) : parseFloat(text);
    if (!Number.isNaN(num)) onChange(num);
  };

  return (
    <TextInput
      mode="outlined"
      label={displayLabel}
      value={strValue}
      placeholder={placeholder}
      disabled={disabled}
      editable={!readonly}
      keyboardType="decimal-pad"
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
