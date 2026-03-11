import { DropDownSelector, useAppTheme } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';
import type { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { getRjsfDisplayLabel, mapEnumOptions } from './rjsf-widgets.utils';

export const SelectWidget: FunctionComponent<WidgetProps> = ({
  id,
  value,
  disabled,
  placeholder,
  onChange,
  onBlur,
  label,
  hideLabel,
  required,
  rawErrors,
  options,
}) => {
  const styles = useStyles();
  const hasError = Array.isArray(rawErrors) && rawErrors.length > 0;
  const displayLabel = getRjsfDisplayLabel({ label, required, hideLabel });
  const selectOptions = mapEnumOptions(options);
  const hasValue = !isNullish(value);
  const strValue = hasValue ? String(value) : undefined;

  const handleChange = (code: string) => {
    onChange(code);
    onBlur(id, code);
  };

  return (
    <View style={styles.widgetBlock}>
      <DropDownSelector
        label={displayLabel}
        value={strValue}
        onChange={handleChange}
        options={selectOptions}
        placeholder={placeholder}
        disabled={disabled}
        isError={hasError}
      />
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    widgetBlock: {
      marginVertical: theme.spacing(0.5),
    },
  });
};
