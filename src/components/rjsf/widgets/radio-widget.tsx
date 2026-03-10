import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import { mapEnumOptions } from './rjsf-widgets.utils';

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
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);
  const enumOptions = mapEnumOptions(options);

  return (
    <View style={styles.widgetBlock}>
      {displayLabel ? <Text variant="bodyLarge" style={styles.radioTitle}>{displayLabel}</Text> : null}
      <RadioButton.Group
        onValueChange={(v) => {
          onChange(v);
          onBlur(id, v);
        }}
        value={value != null ? String(value) : ''}
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
