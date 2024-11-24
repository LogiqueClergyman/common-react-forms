import FieldType from '../enums/enums';
export interface BaseField<T = string | boolean | number> {
  name?: string;
  label?: string;
  type?: FieldType;
  value?: T;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onChange: (value: any) => void;
  style?: Style;
}

export interface Style {
  container?: string;
  label?: string;
  labelContainer?: string;
  input?: string;
  inputContainer?: string;
  error?: string;
  errorContainer?: string;
  valid?: string;
  validContainer?: string;
  optionsLabel?: string;
}
export interface TextField extends BaseField<string> {
  type?: FieldType.TEXT;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}

export interface EmailField extends BaseField<string> {
  type?: FieldType.EMAIL;
  domain?: string;
  regex?: RegExp;
}

export interface PasswordField extends BaseField<string> {
  type?: FieldType.PASSWORD;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
}

export interface OptionsField extends BaseField<string> {
  type?: FieldType.OPTIONS;
  options: { label: string; value: string | number }[];
  dataType: 'string' | 'number';
  inputType: 'radio' | 'checkbox' | 'dropdown';
}
export interface NumberField extends BaseField<number> {
  type?: FieldType.NUMBER;
  min?: number;
  max?: number;
  step?: number;
}

export interface RadioField extends BaseField<string> {
  type: FieldType.BOOLEAN;
  component: 'radio';
  options: { label: string; value: string }[];
}

export type FormField =
  | TextField
  | OptionsField
  | RadioField
  | EmailField
  | PasswordField
  | NumberField;

export type InputFieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  value?: any;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  domain?: string;
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
  options?: { label: string; value: string | number }[];
  dataType?: 'string' | 'number';
  inputType?: 'radio' | 'checkbox' | 'dropdown';
};

export type CommonProps = {
  name: string;
  value: any;
  label?: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  domain?: string;
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
  onChange: (value: any) => void;
  error: string | undefined;
  options?: { label: string; value: string | number }[];
  dataType?: 'string' | 'number';
  inputType?: 'radio' | 'checkbox' | 'dropdown';
};
export type FormProps = {
  fields: Record<string, InputFieldConfig>;
  onSubmit: (values: any) => void;
};
