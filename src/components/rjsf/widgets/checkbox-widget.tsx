import { useAppTheme } from '@lichens-innovation/react-native-common';
import { isBlank } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import type { StyleProp, ViewStyle } from 'react-native';
import { getRjsfDisplayLabel } from './rjsf-widgets.utils';

interface CheckboxWidgetLabelProps {
  displayLabel?: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const CheckboxWidgetLabel = ({ displayLabel, onPress, style }: CheckboxWidgetLabelProps) => {
  if (isBlank(displayLabel)) return null;
  return (
    <Pressable onPress={onPress} style={style}>
      <Text variant="bodyLarge">{displayLabel}</Text>
    </Pressable>
  );
};

export const CheckboxWidget: FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  label,
  hideLabel,
  required,
}) => {
  const styles = useStyles();
  const displayLabel = getRjsfDisplayLabel({ label, required, hideLabel });
  const checked = value === true;

  const handleValueChange = (newValue: boolean) => {
    onChange(newValue);
    onBlur(id, newValue);
  };

  const handleLabelPress = () => {
    if (disabled || readonly) return;
    handleValueChange(!checked);
  };

  return (
    <View style={styles.checkboxRow}>
      <Switch value={checked} onValueChange={handleValueChange} disabled={disabled} />

      <CheckboxWidgetLabel displayLabel={displayLabel} onPress={handleLabelPress} style={styles.checkboxLabel} />
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
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
