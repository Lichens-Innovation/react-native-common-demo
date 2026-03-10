import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';

import { dateTimeToISO, parseDateOrNull } from './rjsf-widgets.utils';

export const DateTimeWidget: FunctionComponent<WidgetProps> = ({
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
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  const [showPicker, setShowPicker] = useState(false);
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);
  const date = parseDateOrNull(value as string) ?? new Date();

  const handlePick = (_: unknown, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate != null) {
      const iso = dateTimeToISO(selectedDate);
      onChange(iso);
      onBlur(id, iso);
    }
  };

  return (
    <View style={styles.widgetBlock}>
      <TextInput
        mode="outlined"
        label={displayLabel}
        value={value != null ? String(value) : ''}
        placeholder={placeholder}
        disabled={disabled}
        editable={false}
        error={hasError}
        style={styles.input}
        outlineColor={theme.colors.outline}
        right={<TextInput.Icon icon="clock-outline" onPress={() => !disabled && !readonly && setShowPicker(true)} />}
        onFocus={() => onFocus(id, value)}
      />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handlePick}
          onTouchCancel={() => setShowPicker(false)}
        />
      )}
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    widgetBlock: {
      marginVertical: theme.spacing(0.5),
    },
    input: {
      marginVertical: theme.spacing(0.5),
    },
  });
};
