/**
 * Barrel file: re-exports all RJSF Paper widgets from widgets/ for backward compatibility.
 * The theme and other consumers can import from here or from ~/components/rjsf/widgets.
 */
export {
  CheckboxWidget,
  CheckboxesWidget,
  DateWidget,
  DateTimeWidget,
  HiddenWidget,
  NumberWidget,
  PasswordWidget,
  RadioWidget,
  RangeWidget,
  SelectWidget,
  TextWidget,
  TextareaWidget,
} from './widgets';
