import { useAppTheme } from '@lichens-innovation/react-native-common';
import { isBlank } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import { getRjsfDisplayLabel, mapEnumOptions, toStringOrEmpty } from '~/rjsf-tools/rjsf-widgets.utils';

interface RadioWidgetLabelProps {
  displayLabel?: string;
  style: StyleProp<TextStyle>;
}

const RadioWidgetLabel = ({ displayLabel, style }: RadioWidgetLabelProps) => {
  if (isBlank(displayLabel)) return null;
  return (
    <Text variant="bodyLarge" style={style}>
      {displayLabel}
    </Text>
  );
};

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
  const strValue = toStringOrEmpty(value);

  return (
    <View style={styles.widgetBlock}>
      <RadioWidgetLabel displayLabel={displayLabel} style={styles.radioTitle} />
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
