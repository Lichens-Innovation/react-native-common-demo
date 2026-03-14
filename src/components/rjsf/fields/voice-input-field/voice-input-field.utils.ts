import { isNullish } from '@lichens-innovation/ts-common';
import uuid from 'react-native-uuid';

export interface VoiceInputFormData extends Record<string, unknown> {
  value: string;
  recordingUri?: string;
  updatedAt?: string; // computed (ISO-8601)
  uuid?: string; // computed (UUID v4)
}

const isVoiceInputFormData = (data: unknown): data is VoiceInputFormData => {
  if (isNullish(data)) return false;
  if (typeof data !== 'object') return false;
  if (Array.isArray(data)) return false;
  if (!('value' in data)) return false;

  return true;
};

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

export const buildVoiceInputFormData = (args: VoiceInputFormData): VoiceInputFormData => {
  return {
    value: args.value,
    recordingUri: args.recordingUri,
    updatedAt: new Date().toISOString(),
    uuid: args.uuid ?? uuid.v4(),
  };
};
