import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { getRjsfDisplayLabel } from './rjsf-widgets.utils';

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

  const labelNode =
    displayLabel != null ? (
      <Pressable onPress={handleLabelPress} style={styles.checkboxLabel}>
        <Text variant="bodyLarge">{displayLabel}</Text>
      </Pressable>
    ) : null;

  return (
    <View style={styles.checkboxRow}>
      <Switch value={checked} onValueChange={handleValueChange} disabled={disabled} />

      {labelNode}
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
