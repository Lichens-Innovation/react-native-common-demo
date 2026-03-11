import { useAppTheme, useIsDarkMode } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { dateTimeToISO, getRjsfDisplayLabel, parseDateOrNull } from './rjsf-widgets.utils';

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
  const isDarkMode = useIsDarkMode();
  const styles = useStyles();
  const [showPicker, setShowPicker] = useState(false);
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;
  const displayLabel = getRjsfDisplayLabel({ label, required, hideLabel });
  const date = parseDateOrNull(value as string) ?? new Date();
  const hasValue = !isNullish(value);
  const strValue = hasValue ? String(value) : '';
  const pickerDisplay = Platform.OS === 'ios' ? 'spinner' : 'default';
  const themeVariant = isDarkMode ? 'dark' : 'light';

  const handlePick = (_: unknown, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (!isNullish(selectedDate)) {
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
        value={strValue}
        placeholder={placeholder}
        disabled={disabled}
        editable={false}
        error={hasError}
        style={styles.input}
        outlineColor={theme.colors.outline}
        right={<TextInput.Icon icon="clock-outline" onPress={() => !disabled && !readonly && setShowPicker(v => !v)} />}
        onFocus={() => onFocus(id, value)}
      />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display={pickerDisplay}
          onChange={handlePick}
          onTouchCancel={() => setShowPicker(false)}
          themeVariant={themeVariant}
          {...(Platform.OS === 'ios' && { textColor: theme.colors.onSurface })}
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
