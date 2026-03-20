import type { MetaFormSchema } from '@lichens-innovation/ts-common/rjsf';
import type { FieldProps, RJSFSchema } from '@rjsf/utils';
import type { FunctionComponent } from 'react';

import { CloudDropdownPickerField } from '~/components/rjsf/fields/cloud-dropdown-picker-field/cloud-dropdown-picker-field';
import { VoiceInputField } from '~/components/rjsf/fields/voice-input-field/voice-input-field';

import demoComplex from './schemas/demo-complex.json';
import demoCustomField from './schemas/demo-custom-field.json';
import demoGrid from './schemas/demo-grid.json';
import demoSimple from './schemas/demo-simple.json';

type RjsfDemoField = FunctionComponent<FieldProps<Record<string, unknown>, RJSFSchema>>;

export type FormDemoVariant = 'simple' | 'complex' | 'custom' | 'with-grid';

export type FormDemoRegistryEntry = {
  metaSchema: MetaFormSchema;
  fields?: Record<string, RjsfDemoField>;
};

export const formDemoRegistry: Record<FormDemoVariant, FormDemoRegistryEntry> = {
  simple: {
    metaSchema: demoSimple as unknown as MetaFormSchema,
  },
  complex: {
    metaSchema: demoComplex as unknown as MetaFormSchema,
  },
  custom: {
    metaSchema: demoCustomField as unknown as MetaFormSchema,
    fields: {
      CloudDropdownPickerField,
      VoiceInputField,
    },
  },
  'with-grid': {
    metaSchema: demoGrid as unknown as MetaFormSchema,
  },
};
