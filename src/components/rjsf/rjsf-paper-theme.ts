import type { ThemeProps } from '@rjsf/core';
import { RjsfPaperFormWrapper } from './form-submit-context';
import { HiddenWidget, TextWidget, TextareaWidget } from './rjsf-paper-widgets';

export const RJSF_PAPER_THEME: ThemeProps = {
  widgets: {
    TextWidget,
    TextareaWidget,
    HiddenWidget,
  },
  // Form passes onSubmit, children, className, etc. Our wrapper accepts View props + onSubmit.
  _internalFormWrapper: RjsfPaperFormWrapper as ThemeProps['_internalFormWrapper'],
};
