import { TargetAndTransition, Transition, VariantLabels } from "motion/react";

export interface MarkupInputClassNames {
  base?: string;
  container?: string;
  placeholder?: {
    wrapper?: string;
    text?: string;
  };
  content?: {
    wrapper?: string;
    value?: {
      wrapper?: string;
      text?: string;
    };
  };
  cursor?: {
    wrapper?: {
      isTextSelected?: string;
      notSelected?: string;
    };
    base?: {
      isTextSelected?: string;
      notSelected?: string;
    };
  };
}

export interface InputClassNames {
  container?: string;
  label?: string;
  base?: string;
  inputWrapper?: string;
  markupInput?: MarkupInputClassNames;
  legacyInput?: string;
  input?: string;
}

export type InputType = "text" | "password";

export interface InputComponentProps extends InputProps {
  fontStyle?: InputFontStyle;
  classNames?: InputClassNames;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export type MotionVariant = VariantLabels | TargetAndTransition;

export interface InputMotionConfig {
  initial?: boolean | MotionVariant | undefined;
  animate?: boolean | MotionVariant | undefined;
  exit?: MotionVariant | undefined;
  transition?: Transition<any> | undefined;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  customMotion?: {
    char?: InputMotionConfig;
  };
  placeholder?: string;
  type: InputType;
}

export interface InputFontStyle extends React.CSSProperties {
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
}
