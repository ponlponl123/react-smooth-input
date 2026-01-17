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
  inputWrapper?: string;
  markupInput?: MarkupInputClassNames;
  legacyInput?: string;
  input?: string;
}

export type InputType = "text" | "password";

export interface InputComponentProps extends InputProps {
  fontStyle?: InputFontStyle;
  classNames?: InputClassNames;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type: InputType;
}

export interface InputFontStyle extends React.CSSProperties {
  fontSize: string;
  letterSpacing: string;
  fontFamily: string;
}
