import { NO_OP } from '@lichens-innovation/ts-common';
import { createContext, useCallback, useRef } from 'react';
import { View, type ViewProps } from 'react-native';

export type SubmitHandler = (event?: unknown) => void;

export const FormSubmitContext = createContext<SubmitHandler>(NO_OP);

type FormWrapperProps = ViewProps & {
  onSubmit?: SubmitHandler;
  children?: React.ReactNode;
};

/** Wraps RJSF form content in a View and provides submit handler via context for Paper SubmitButton. */
export const RjsfPaperFormWrapper: React.ComponentType<FormWrapperProps> = ({
  onSubmit,
  children,
  ...viewProps
}) => {
  const submitRef = useRef(onSubmit);
  submitRef.current = onSubmit;

  const handleSubmit = useCallback<SubmitHandler>((event) => {
    submitRef.current?.(event);
  }, []);

  return (
    <FormSubmitContext.Provider value={handleSubmit}>
      <View {...viewProps}>{children}</View>
    </FormSubmitContext.Provider>
  );
};
