import { NO_OP } from '@lichens-innovation/ts-common';
import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useRef } from 'react';
import { View, type ViewProps } from 'react-native';

export type SubmitHandler = (event?: unknown) => void;

export const FormSubmitContext = createContext<SubmitHandler>(NO_OP);

interface FormWrapperProps extends ViewProps {
  onSubmit?: SubmitHandler;
}

/** Wraps RJSF form content in a View and provides submit handler via context for Paper SubmitButton. */
export const RjsfPaperFormWrapper: React.ComponentType<PropsWithChildren<FormWrapperProps>> = ({
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
