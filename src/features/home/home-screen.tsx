import { ActivityProgressBar, useAppTheme } from '@lichens-innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useLLM } from 'react-native-executorch';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_CHAT_MODEL } from '~/models/models-specs';
import { chatStore } from '~/store/rag.store';
import { MESSAGE_ROLE } from '~/store/rag.types';
import { ChatItem } from './chat-item';

export const HomeScreen: FunctionComponent = observer(() => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const { top, bottom } = useSafeAreaInsets();
  const styles = useStyles();
  const listRef = useRef<ScrollView>(null);

  const [message, setMessage] = useState(t('app:chat.questionExample'));
  const { name, totalSizeInBytes, model } = DEFAULT_CHAT_MODEL;
  const llm = useLLM({ model });

  useEffect(() => {
    if (llm.isReady) chatStore.startNewConversation();
  }, [llm.isReady]);

  const onSend = (message: string) => {
    const latestConversation = chatStore.latestConversation;
    if (!latestConversation) return;

    latestConversation.addUserMessage(message);
    llm.generate(latestConversation.messages).catch(console.error);
    setMessage('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (llm.response) {
      chatStore.latestConversation?.addOrUpdateAssistantMessage(llm.response);
    }
  }, [llm.response]);

  if (!llm.isReady || !chatStore.hasConversations) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityProgressBar
          title={t('app:chat.downloadModelTitle', { name })}
          description={t('app:chat.downloadModelDescription')}
          progress={{ loaded: llm.downloadProgress * totalSizeInBytes, total: totalSizeInBytes }}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={top + (Platform.OS === 'android' ? theme.spacing(2) : 0)}
    >
      <ScrollView
        ref={listRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
        keyboardShouldPersistTaps="handled"
      >
        {chatStore.latestConversation?.messages
          .filter((message) => message.role !== MESSAGE_ROLE.SYSTEM)
          .map((message) => (
            <ChatItem key={message.id} message={message} />
          ))}

        {llm.isGenerating && !llm.response && <ActivityIndicator />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          label="Message"
          value={message}
          onChangeText={setMessage}
          multiline
          right={
            <TextInput.Icon
              icon="send"
              onPress={() => {
                if (message.trim()) {
                  onSend(message);
                }
              }}
              disabled={!llm.isReady || !message.trim()}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
});

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      margin: theme.spacing(4),
      justifyContent: 'center',
    },
    scrollView: {
      flex: 1,
      padding: theme.spacing(1),
    },
    scrollContent: {
      paddingVertical: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      gap: theme.spacing(2),
    },
    inputContainer: {
      paddingTop: theme.spacing(1),
    },
  });
};
