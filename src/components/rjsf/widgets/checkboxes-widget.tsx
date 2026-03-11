import { useAppTheme } from '@lichens-innovation/react-native-common';
import { isBlank, isNullish } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { getRjsfDisplayLabel, mapEnumOptions } from './rjsf-widgets.utils';

interface CheckboxesWidgetLabelProps {
  displayLabel?: string;
  style: StyleProp<TextStyle>;
}

const CheckboxesWidgetLabel = ({ displayLabel, style }: CheckboxesWidgetLabelProps) => {
  if (isBlank(displayLabel)) return null;
  return (
    <Text variant="bodyLarge" style={style}>
      {displayLabel}
    </Text>
  );
};

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
  const displayLabel = getRjsfDisplayLabel({ label, required, hideLabel });
  const enumOptions = mapEnumOptions(options);
  const isArrayValue = Array.isArray(value);
  const currentSet = isArrayValue ? value : [];
  const hasMaxItems = typeof schema?.maxItems === 'number';
  const maxItems = hasMaxItems ? schema.maxItems : undefined;

  const toggle = (optValue: string) => {
    if (disabled || readonly) return;

    const isChecked = currentSet.includes(optValue);
    const next = isChecked ? currentSet.filter((v) => v !== optValue) : [...currentSet, optValue];
    if (!isNullish(maxItems) && next.length > maxItems) return;

    const unique = Array.from(new Set(next));
    onChange(unique);
    onBlur(id, unique);
  };

  return (
    <View style={styles.widgetBlock}>
      <CheckboxesWidgetLabel displayLabel={displayLabel} style={styles.checkboxesTitle} />

      {enumOptions.map((opt) => {
        const isOptionChecked = currentSet.includes(opt.value);
        const checkboxStatus = isOptionChecked ? 'checked' : 'unchecked';
        return (
          <View key={opt.value} style={styles.checkboxRow}>
            <Checkbox status={checkboxStatus} onPress={() => toggle(opt.value)} disabled={disabled || readonly} />
            <Pressable onPress={() => toggle(opt.value)} style={styles.checkboxLabel}>
              <Text variant="bodyLarge">{opt.label}</Text>
            </Pressable>
          </View>
        );
      })}
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
