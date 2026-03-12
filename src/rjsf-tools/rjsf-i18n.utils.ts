import { isBlank } from '@lichens-innovation/ts-common';
import { replaceStringParameters } from '@rjsf/utils';
import i18next from 'i18next';

/** Maps RJSF TranslatableString values to our i18n keys (app.rjsf). */
export const RJSF_STRING_TO_I18N_KEY: Record<string, string> = {
  'Add Item': 'app:rjsf.addItem',
  Add: 'app:rjsf.add',
  Copy: 'app:rjsf.copy',
  'Move down': 'app:rjsf.moveDown',
  'Move up': 'app:rjsf.moveUp',
  Remove: 'app:rjsf.remove',
  'clear input': 'app:rjsf.clear',
  '%1 Key': 'app:rjsf.keyLabel',
  Yes: 'app:rjsf.yes',
  No: 'app:rjsf.no',
  Errors: 'app:rjsf.errors',
};

interface TranslateStringArgs {
  stringToTranslate: string;
  params?: string[];
}

export const translateRjsfString = ({ stringToTranslate, params }: TranslateStringArgs): string => {
  const i18nKey = RJSF_STRING_TO_I18N_KEY[stringToTranslate];
  if (isBlank(i18nKey)) {
    // eslint-disable-next-line no-console
    console.warn(`[translateRjsfString] RJSF i18n: missing key: "${stringToTranslate}"`);
  }

  const translated = i18nKey ? i18next.t(i18nKey) : stringToTranslate;
  return replaceStringParameters(translated, params);
};
