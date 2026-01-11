import { makeAutoObservable } from 'mobx';
import uuid from 'react-native-uuid';
import { DEFAULT_SYSTEM_MESSAGE, IChatConversation, IChatMessage, IMessageRole, MESSAGE_ROLE } from './rag.types';

export class ChatMessage implements IChatMessage {
  id: string;
  role: IMessageRole;
  updatedAt: number;
  content: string;

  constructor(role: IMessageRole, content: string) {
    this.id = uuid.v4();
    this.role = role;
    this.updatedAt = Date.now();
    this.content = content;

    makeAutoObservable(this);
  }
}

const DEFAULT_ASSISTANT_WELCOME = 'Bonjour, je suis votre assistant YvanMobile. Comment puis-je vous aider ?';

export class ChatConversation implements IChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;

  constructor(title = '', messages: ChatMessage[] = []) {
    const now = Date.now();

    this.id = uuid.v4();
    this.title = title;
    this.createdAt = now;
    this.updatedAt = now;

    this.messages = [...messages];

    if (!messages.length) {
      // start new conversation with system message which is global instructions to the assistant
      this.messages.push(new ChatMessage(MESSAGE_ROLE.SYSTEM, DEFAULT_SYSTEM_MESSAGE));
      this.messages.push(new ChatMessage(MESSAGE_ROLE.ASSISTANT, DEFAULT_ASSISTANT_WELCOME));
    }

    makeAutoObservable(this);
  }

  get latestMessage(): ChatMessage {
    return this.messages[this.messages.length - 1];
  }

  addOrUpdateAssistantMessage(content?: string | null) {
    if (!content) {
      return;
    }

    const latestMessage = this.latestMessage;

    if (latestMessage?.role === MESSAGE_ROLE.ASSISTANT) {
      latestMessage.content = content;
      latestMessage.updatedAt = Date.now();
    } else {
      const message = new ChatMessage(MESSAGE_ROLE.ASSISTANT, content);
      this.messages.push(message);
    }

    this.updatedAt = Date.now();
  }

  addUserMessage(content: string) {
    const message = new ChatMessage(MESSAGE_ROLE.USER, content);
    this.messages.push(message);

    this.updatedAt = Date.now();
  }
}

export class ChatStore {
  conversations: ChatConversation[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  startNewConversation() {
    this.conversations.push(new ChatConversation());
  }

  get latestConversation(): ChatConversation | undefined {
    return this.conversations[this.conversations.length - 1];
  }

  get hasConversations(): boolean {
    return this.conversations.length > 0;
  }
}

export const chatStore = new ChatStore();
