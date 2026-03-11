import { useAppTheme } from '@lichens-innovation/react-native-common';
import type {
  ObjectFieldTemplateProps,
  FieldTemplateProps,
  ArrayFieldTemplateProps,
  FieldErrorProps,
  FieldHelpProps,
  ErrorListProps,
} from '@rjsf/utils';
import { getDefaultRegistry } from '@rjsf/core';
import type { ComponentType } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  AddButton,
  ClearButton,
  CopyButton,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
  SubmitButton,
} from './rjsf-paper-buttons';

const defaultTemplates = getDefaultRegistry().templates;

/** No-op error list: we omit the top "Erreurs" block; field-level errors still show per field. */
const NoopErrorList = () => null;

const PaperObjectFieldTemplate = ({ title, description, properties }: ObjectFieldTemplateProps) => {
  const styles = useStyles();

  return (
    <View style={styles.fieldSet}>
      {title ? (
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
      ) : null}

      {description ? (
        <Text variant="bodySmall" style={styles.description}>
          {typeof description === 'string' ? description : null}
        </Text>
      ) : null}

      {properties.map((prop) => {
        if (prop.hidden) return null;
        return <View key={prop.name}>{prop.content}</View>;
      })}
    </View>
  );
};

const PaperFieldTemplate = ({ children, errors }: FieldTemplateProps) => {
  const styles = useStyles();

  return (
    <View style={styles.field}>
      {children}

      {errors}
    </View>
  );
};

const PaperFieldErrorTemplate = ({ errors }: FieldErrorProps) => {
  const styles = useStyles();

  if (!errors || errors.length === 0) return null;

  return (
    <View style={styles.errorList}>
      {(errors as string[]).map((msg, index) => (
        <Text key={`error-${index}-${msg}`} variant="bodySmall" style={styles.fieldError}>
          {msg}
        </Text>
      ))}
    </View>
  );
};

const PaperFieldHelpTemplate = ({ help }: FieldHelpProps) => {
  const styles = useStyles();

  if (!help) return null;

  return (
    <Text variant="bodySmall" style={styles.help}>
      {typeof help === 'string' ? help : null}
    </Text>
  );
};

const PaperArrayFieldTemplate = ({
  title,
  items,
  canAdd,
  onAddClick,
  registry,
  uiSchema,
}: ArrayFieldTemplateProps) => {
  const styles = useStyles();

  return (
    <View style={styles.fieldSet}>
      {title ? (
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
      ) : null}

      {items.map((item, index) => (
        <View key={'key' in item ? String(item.key) : index} style={styles.arrayItem}>
          {item}
        </View>
      ))}

      {canAdd ? (
        <AddButton
          onClick={onAddClick}
          registry={registry}
          uiSchema={uiSchema as Record<string, unknown>}
        />
      ) : null}
    </View>
  );
};

export const PAPER_TEMPLATES = {
  ...defaultTemplates,
  ObjectFieldTemplate: PaperObjectFieldTemplate as ComponentType<ObjectFieldTemplateProps>,
  FieldTemplate: PaperFieldTemplate as ComponentType<FieldTemplateProps>,
  FieldErrorTemplate: PaperFieldErrorTemplate as ComponentType<FieldErrorProps>,
  FieldHelpTemplate: PaperFieldHelpTemplate as ComponentType<FieldHelpProps>,
  ArrayFieldTemplate: PaperArrayFieldTemplate as ComponentType<ArrayFieldTemplateProps>,
  ErrorListTemplate: NoopErrorList as ComponentType<ErrorListProps>,
  ButtonTemplates: {
    ...defaultTemplates.ButtonTemplates,
    AddButton,
    ClearButton,
    CopyButton,
    MoveDownButton,
    MoveUpButton,
    RemoveButton,
    SubmitButton,
  },
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    fieldSet: {
      marginVertical: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(1),
    },
    description: {
      marginBottom: theme.spacing(2),
      opacity: 0.8,
    },
    field: {
      marginVertical: theme.spacing(0.5),
    },
    errorList: {
      marginTop: theme.spacing(1),
      gap: theme.spacing(0.5),
    },
    fieldError: {
      color: theme.colors.error,
    },
    help: {
      marginTop: theme.spacing(1),
      opacity: 0.8,
    },
    arrayItem: {
      marginVertical: theme.spacing(1),
    },
  });
};
