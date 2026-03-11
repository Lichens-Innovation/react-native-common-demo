import { dateToISOLikeButLocal } from '@lichens-innovation/react-native-common';
import { isBlank } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';

export interface GetRjsfDisplayLabelArgs {
  label?: string;
  required?: boolean;
  hideLabel?: boolean;
}

/**
 * Returns the label to display for an RJSF widget, with optional required asterisk and
 * hideLabel support.
 *
 * @param label - The label to display for the widget.
 * @param required - Whether the field is required.
 * @param hideLabel - Whether to hide the label.
 *
 * @returns The label to display for the widget.
 */
export const getRjsfDisplayLabel = ({ label, required, hideLabel }: GetRjsfDisplayLabelArgs): string | undefined => {
  if (hideLabel) return undefined;
  if (isBlank(label)) return undefined;

  const requiredSuffix = required ? ' *' : '';
  return `${label}${requiredSuffix}`;
};

interface EnumOption {
  value: string;
  label: string;
}

export const mapEnumOptions = (options: WidgetProps['options']): { label: string; value: string }[] => {
  const enumOptions = options?.enumOptions as EnumOption[] | undefined;
  if (!Array.isArray(enumOptions)) return [];
  return enumOptions.map((o) => ({ label: o?.label ?? String(o?.value ?? ''), value: String(o?.value ?? '') }));
};

export const parseDateOrNull = (s: string | undefined): Date | null => {
  if (isBlank(s)) return null;
  const d = new Date(s);
  const isValid = !Number.isNaN(d.getTime());
  return isValid ? d : null;
};

export const dateOnlyToISO = (d: Date): string => d.toISOString().slice(0, 10);

export const dateTimeToISO = (d: Date): string => dateToISOLikeButLocal(d).slice(0, 19);
