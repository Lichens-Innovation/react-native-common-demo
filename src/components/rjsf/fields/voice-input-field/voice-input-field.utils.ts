import type { RecordingTextInputArgs } from '@lichens-innovation/react-native-common';
import { isNullish } from '@lichens-innovation/ts-common';

export interface VoiceInputFormData extends Record<string, unknown> {
  value: string;
  recordingUri?: string;
  updatedAt?: string; // computed (ISO-8601)
}

const isVoiceInputFormData = (data: unknown): data is VoiceInputFormData =>
  typeof data === 'object' && !isNullish(data) && !Array.isArray(data) && 'value' in data;

export const getVoiceInputValue = (formData: unknown): string | undefined => {
  if (isNullish(formData)) return undefined;
  if (isVoiceInputFormData(formData)) return formData.value;
  if (typeof formData === 'string') return formData;
  return undefined;
};

export const getVoiceInputRecordingUri = (formData: unknown): string | undefined => {
  if (!isVoiceInputFormData(formData)) return undefined;
  return typeof formData.recordingUri === 'string' ? formData.recordingUri : undefined;
};

export const getVoiceInputUpdatedAt = (formData: unknown): string | undefined => {
  if (!isVoiceInputFormData(formData)) return undefined;
  return typeof formData.updatedAt === 'string' ? formData.updatedAt : undefined;
};

export const buildVoiceInputFormData = (args: RecordingTextInputArgs): VoiceInputFormData => ({
  value: args.value,
  recordingUri: args.recordingUri,
  updatedAt: new Date().toISOString(),
});
