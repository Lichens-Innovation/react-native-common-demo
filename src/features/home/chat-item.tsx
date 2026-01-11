import { useAppTheme } from '@Lichens-Innovation/react-native-common';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { Card } from 'react-native-paper';
import { ChatMessage } from '~/store/rag.store';
import { MESSAGE_ROLE } from '~/store/rag.types';

interface ChatItemProps {
  message: ChatMessage;
}

export const ChatItem: FunctionComponent<ChatItemProps> = observer(({ message }) => {
  const styles = useStyles();
  const theme = useAppTheme();
  const isUser = message.role === MESSAGE_ROLE.USER;

  return (
    <View style={isUser ? styles.userContainer : styles.assistantContainer}>
      <Card
        style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}
        contentStyle={styles.messageContent}
      >
        <Markdown
          style={{
            text: { color: isUser ? theme.colors.onPrimary: theme.colors.primary },
          }}
        >
          {message.content}
        </Markdown>
      </Card>
    </View>
  );
});

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    userContainer: {
      alignItems: 'flex-end',
    },
    assistantContainer: {
      alignItems: 'flex-start',
    },
    messageBubble: {
      maxWidth: '80%',
      elevation: 2,
    },
    userBubble: {
      backgroundColor: theme.colors.primary,
    },
    assistantBubble: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    messageContent: {
      paddingHorizontal: theme.spacing(1),
    },
  });
};
