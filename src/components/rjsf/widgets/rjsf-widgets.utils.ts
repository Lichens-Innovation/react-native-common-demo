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

export type EnumOptionDisplay = { label: string; value: string };

const toEnumOptionDisplay = (o: EnumOption): EnumOptionDisplay => ({
  label: o?.label ?? String(o?.value ?? ''),
  value: String(o?.value ?? ''),
});

export const mapEnumOptions = (options: WidgetProps['options']): EnumOptionDisplay[] => {
  const enumOptions = options?.enumOptions as EnumOption[] | undefined;
  if (!Array.isArray(enumOptions)) return [];
  return enumOptions.map(toEnumOptionDisplay);
};

export const parseDateOrNull = (value?: string): Date | null => {
  if (isBlank(value)) return null;

  const date = new Date(value);
  const isValid = !Number.isNaN(date.getTime());
  return isValid ? date : null;
};

/** Returns YYYY-MM-DD for JSON Schema "date" format (form storage). */
export const dateToDateOnlyString = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/** Parses a date-only or full ISO string into a Date at local midnight (for date picker display). */
export const parseDateOnlyToLocalDate = (value?: string): Date | null => {
  if (isBlank(value)) return null;

  const trimmed = String(value).trim();
  const dateOnly = trimmed.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) return null;

  const [y, m, d] = dateOnly.split('-').map(Number);
  return new Date(y, m - 1, d);
};

/** Extracts date-only YYYY-MM-DD for display from a full ISO or date-only string. */
export const formatDateOnlyForDisplay = (value?: string): string => {
  if (isBlank(value)) return '';
  const trimmed = String(value).trim();
  const dateOnly = trimmed.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(dateOnly) ? dateOnly : '';
};

/** Formats a full ISO or date string for date-time display (locale string). */
export const formatDateTimeForDisplay = (value?: string): string => {
  const date = parseDateOrNull(value);
  return date ? date.toLocaleString() : '';
};
