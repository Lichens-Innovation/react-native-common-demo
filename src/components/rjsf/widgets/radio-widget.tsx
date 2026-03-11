import { useAppTheme } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import { getRjsfDisplayLabel, mapEnumOptions } from './rjsf-widgets.utils';

export const RadioWidget: FunctionComponent<WidgetProps> = ({
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
}) => {
  const styles = useStyles();
  const displayLabel = getRjsfDisplayLabel({ label, required, hideLabel });
  const enumOptions = mapEnumOptions(options);
  const hasValue = !isNullish(value);
  const strValue = hasValue ? String(value) : '';
  const labelNode =
    displayLabel != null ? (
      <Text variant="bodyLarge" style={styles.radioTitle}>
        {displayLabel}
      </Text>
    ) : null;

  return (
    <View style={styles.widgetBlock}>
      {labelNode}
      <RadioButton.Group
        onValueChange={(v) => {
          onChange(v);
          onBlur(id, v);
        }}
        value={strValue}
      >
        {enumOptions.map((opt) => (
          <RadioButton.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
            disabled={disabled || readonly}
            style={styles.radioItem}
          />
        ))}
      </RadioButton.Group>
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    widgetBlock: {
      marginVertical: theme.spacing(0.5),
    },
    radioTitle: {
      marginBottom: theme.spacing(1),
    },
    radioItem: {
      marginVertical: theme.spacing(0.25),
    },
  });
};
