import uuid from 'react-native-uuid';

export const MESSAGE_ROLE = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

export type IMessageRole = (typeof MESSAGE_ROLE)[keyof typeof MESSAGE_ROLE];

export interface IChatMessage {
  id: string;
  updatedAt: number;
  role: IMessageRole;
  content: string;
}

export interface IChatConversation {
  id: string;
  title: string;
  messages: IChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export const DEFAULT_SYSTEM_MESSAGE = 'You are a helpful assistant. You are offline and can only answer questions based on the information provided to you.';
