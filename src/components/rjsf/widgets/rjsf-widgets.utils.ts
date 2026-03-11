import { dateToISOLikeButLocal } from '@lichens-innovation/react-native-common';
import { isBlank } from '@lichens-innovation/ts-common';
import type { WidgetProps } from '@rjsf/utils';

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
  return Number.isNaN(d.getTime()) ? null : d;
};

export const dateOnlyToISO = (d: Date): string => d.toISOString().slice(0, 10);

export const dateTimeToISO = (d: Date): string => dateToISOLikeButLocal(d).slice(0, 19);
