import { isBlank } from '@lichens-innovation/ts-common';
import { logger } from '@lichens-innovation/react-native-common';
import { replaceStringParameters } from '@rjsf/utils';
import i18next from 'i18next';

/** Maps RJSF TranslatableString values to our i18n keys (rjsf namespace). */
export const RJSF_STRING_TO_I18N_KEY: Record<string, string> = {
  'Add Item': 'rjsf:addItem',
  Add: 'rjsf:add',
  Copy: 'rjsf:copy',
  'Move down': 'rjsf:moveDown',
  'Move up': 'rjsf:moveUp',
  Remove: 'rjsf:remove',
  'clear input': 'rjsf:clear',
  '%1 Key': 'rjsf:keyLabel',
  Yes: 'rjsf:yes',
  No: 'rjsf:no',
  Errors: 'rjsf:errors',
};

interface TranslateStringArgs {
  stringToTranslate: string;
  params?: string[];
}

export const translateRjsfString = ({ stringToTranslate, params }: TranslateStringArgs): string => {
  const i18nKey = RJSF_STRING_TO_I18N_KEY[stringToTranslate];
  if (isBlank(i18nKey)) {
    logger.warn(`[translateString] RJSF i18n: clé non mappée: "${stringToTranslate}"`);
  }

  const translated = i18nKey ? i18next.t(i18nKey) : stringToTranslate;
  return replaceStringParameters(translated, params);
};
