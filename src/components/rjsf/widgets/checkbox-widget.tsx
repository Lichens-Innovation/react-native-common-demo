import { useAppTheme } from '@lichens-innovation/react-native-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

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
  const displayLabel = hideLabel ? undefined : (label ? `${label}${required ? ' *' : ''}` : undefined);
  const checked = value === true;

  const handleValueChange = (newValue: boolean) => {
    onChange(newValue);
    onBlur(id, newValue);
  };

  return (
    <View style={styles.checkboxRow}>
      <Switch
        value={checked}
        onValueChange={handleValueChange}
        disabled={disabled}
      />
      {displayLabel ? (
        <Pressable
          onPress={() => !disabled && !readonly && handleValueChange(!checked)}
          style={styles.checkboxLabel}
        >
          <Text variant="bodyLarge">{displayLabel}</Text>
        </Pressable>
      ) : null}
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
