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

export type InputComponentProps =
  | InputProps
  | (InputProps & {
      type: "password";
      isPasswordShowable?: boolean;
      fontStyle?: InputFontStyle;
      classNames?: InputClassNames;
      startContent?: React.ReactNode;
      endContent?: never;
    })
  | (InputProps & {
      type: "password";
      isPasswordShowable: true;
      isShowingPassword?: boolean;
      fontStyle?: InputFontStyle;
      classNames?: InputClassNames;
      startContent?: React.ReactNode;
      endContent?: never;
    });

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type: InputType;
  fontStyle?: InputFontStyle;
  classNames?: InputClassNames;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export interface InputFontStyle extends React.CSSProperties {
  fontSize: string;
  letterSpacing: string;
  fontFamily: string;
}
