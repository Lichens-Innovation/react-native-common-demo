import { useAppTheme } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { mapEnumOptions } from './rjsf-widgets.utils';

export const CheckboxesWidget: FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  label,
  hideLabel,
  required,
  options,
  schema,
}) => {
  const styles = useStyles();
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);
  const enumOptions = mapEnumOptions(options);
  const currentSet = Array.isArray(value) ? value : [];
  const maxItems = typeof schema?.maxItems === 'number' ? schema.maxItems : undefined;

  const toggle = (optValue: string) => {
    if (disabled || readonly) return;
    const next = currentSet.includes(optValue)
      ? currentSet.filter((v) => v !== optValue)
      : [...currentSet, optValue];
    if (!isNullish(maxItems) && next.length > maxItems) return;
    const unique = Array.from(new Set(next));
    onChange(unique);
    onBlur(id, unique);
  };

  return (
    <View style={styles.widgetBlock}>
      {displayLabel ? <Text variant="bodyLarge" style={styles.checkboxesTitle}>{displayLabel}</Text> : null}
      {enumOptions.map((opt) => (
        <View key={opt.value} style={styles.checkboxRow}>
          <Checkbox
            status={currentSet.includes(opt.value) ? 'checked' : 'unchecked'}
            onPress={() => toggle(opt.value)}
            disabled={disabled || readonly}
          />
          <Pressable
            onPress={() => !disabled && !readonly && toggle(opt.value)}
            style={styles.checkboxLabel}
          >
            <Text variant="bodyLarge">{opt.label}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    widgetBlock: {
      marginVertical: theme.spacing(0.5),
    },
    checkboxesTitle: {
      marginBottom: theme.spacing(1),
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1),
      marginVertical: theme.spacing(0.5),
    },
    checkboxLabel: {
      flex: 1,
    },
  });
};
