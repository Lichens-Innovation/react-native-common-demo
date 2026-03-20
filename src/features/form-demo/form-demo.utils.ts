import type { MetaFormSchema } from '@lichens-innovation/ts-common/rjsf';
import type { FieldProps, RJSFSchema } from '@rjsf/utils';
import type { FunctionComponent } from 'react';

import { CloudDropdownPickerField } from '~/components/rjsf/fields/cloud-dropdown-picker-field/cloud-dropdown-picker-field';
import { VoiceInputField } from '~/components/rjsf/fields/voice-input-field/voice-input-field';

import schema01 from './schemas/schema-01.json';
import schema02 from './schemas/schema-02.json';
import schemaCustom from './schemas/schema-custom.json';
import schemaWithGrid from './schemas/schema-with-grid.json';

type RjsfDemoField = FunctionComponent<FieldProps<Record<string, unknown>, RJSFSchema>>;

export type FormDemoVariant = 'simple' | 'complex' | 'custom' | 'with-grid';

export type FormDemoRegistryEntry = {
  metaSchema: MetaFormSchema;
  fields?: Record<string, RjsfDemoField>;
};

export const formDemoRegistry: Record<FormDemoVariant, FormDemoRegistryEntry> = {
  simple: {
    metaSchema: schema01 as unknown as MetaFormSchema,
  },
  complex: {
    metaSchema: schema02 as unknown as MetaFormSchema,
  },
  custom: {
    metaSchema: schemaCustom as unknown as MetaFormSchema,
    fields: {
      CloudDropdownPickerField,
      VoiceInputField,
    },
  },
  'with-grid': {
    metaSchema: schemaWithGrid as unknown as MetaFormSchema,
  },
};
