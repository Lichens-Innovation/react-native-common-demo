import { useAppTheme, useIsDarkMode } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';

import { dateOnlyToISO, parseDateOrNull } from './rjsf-widgets.utils';

export const DateWidget: FunctionComponent<WidgetProps> = ({
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
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);
  const date = parseDateOrNull(value as string) ?? new Date();

  const handlePick = (_: unknown, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (!isNullish(selectedDate)) {
      const iso = dateOnlyToISO(selectedDate);
      onChange(iso);
      onBlur(id, iso);
    }
  };

  return (
    <View style={styles.widgetBlock}>
      <TextInput
        mode="outlined"
        label={displayLabel}
        value={!isNullish(value) ? String(value) : ''}
        placeholder={placeholder}
        disabled={disabled}
        editable={false}
        error={hasError}
        style={styles.input}
        outlineColor={theme.colors.outline}
        right={<TextInput.Icon icon="calendar" onPress={() => !disabled && !readonly && setShowPicker((prev) => !prev)} />}
        onFocus={() => onFocus(id, value)}
      />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handlePick}
          onTouchCancel={() => setShowPicker(false)}
          themeVariant={isDarkMode ? 'dark' : 'light'}
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
