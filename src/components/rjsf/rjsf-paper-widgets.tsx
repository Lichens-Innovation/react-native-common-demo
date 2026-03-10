import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export const TextWidget: FunctionComponent<WidgetProps> = ({
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
  rawErrors,
  options,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;

  return (
    <TextInput
      mode="outlined"
      label={hideLabel ? undefined : label}
      value={value ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      editable={!readonly}
      onChangeText={(text) => onChange(text === '' ? options?.emptyValue : text)}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      error={hasError}
      style={styles.input}
      outlineColor={theme.colors.outline}
    />
  );
};

export const TextareaWidget: FunctionComponent<WidgetProps> = ({
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
  rawErrors,
  options,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;

  return (
    <TextInput
      mode="outlined"
      label={hideLabel ? undefined : label}
      value={value ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      editable={!readonly}
      multiline
      numberOfLines={4}
      onChangeText={(text) => onChange(text === '' ? options?.emptyValue : text)}
      onBlur={() => onBlur(id, value)}
      onFocus={() => onFocus(id, value)}
      error={hasError}
      style={[styles.input, styles.textarea]}
      outlineColor={theme.colors.outline}
    />
  );
};

export const HiddenWidget: FunctionComponent<WidgetProps> = () => {
  const styles = useStyles();
  return <View style={styles.hidden} />;
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    input: {
      marginVertical: theme.spacing(1),
    },
    textarea: {
      minHeight: 100,
    },
    hidden: {
      display: 'none',
      height: 0,
      overflow: 'hidden',
    },
  });
};
