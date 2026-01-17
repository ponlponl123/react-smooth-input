export type InputType = "text" | "password";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: InputType;
}

export interface InputFontStyle extends React.CSSProperties {
  fontSize: string;
  letterSpacing: string;
  fontFamily: string;
}
