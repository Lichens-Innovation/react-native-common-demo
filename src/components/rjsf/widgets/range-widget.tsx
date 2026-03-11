import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Text } from 'react-native-paper';

export const RangeWidget: FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  label,
  hideLabel,
  required,
  rawErrors,
  schema,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);
  const min = typeof schema?.minimum === 'number' ? schema.minimum : 0;
  const max = typeof schema?.maximum === 'number' ? schema.maximum : 100;
  const numValue = typeof value === 'number' && !Number.isNaN(value) ? value : min;
  const displayValue = Math.round(numValue);

  const handleSlidingComplete = (v: number) => {
    const intValue = Math.round(v);
    onChange(intValue);
    onBlur(id, intValue);
  };

  return (
    <View style={styles.widgetBlock}>
      {displayLabel ? <Text variant="bodyLarge" style={styles.rangeLabel}>{displayLabel}</Text> : null}

      <View style={styles.rangeRow}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={numValue}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.outline}
          disabled={disabled || readonly}
        />
        <Text variant="bodyMedium" style={styles.rangeValue}>{displayValue}</Text>
      </View>
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    widgetBlock: {
      marginVertical: theme.spacing(0.5),
    },
    rangeLabel: {
      marginBottom: theme.spacing(0.5),
    },
    rangeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    slider: {
      flex: 1,
      height: 40,
    },
    rangeValue: {
      minWidth: 36,
    },
  });
};
