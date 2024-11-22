type ValidatePasswordProps = {
  value: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  regex?: RegExp;
};

export const validatePassword = ({
  value,
  minLength,
  maxLength,
  required,
  regex,
}: ValidatePasswordProps): string | undefined => {
  if (required && !value) {
    return 'This field is required';
  }
  if (minLength && value.length < minLength) {
    return `Minimum length is ${minLength} characters`;
  }
  if (maxLength && value.length > maxLength) {
    return `Maximum length is ${maxLength} characters`;
  }
  if (regex && !regex.test(value)) {
    return 'Invalid format';
  }
  return undefined;
};
