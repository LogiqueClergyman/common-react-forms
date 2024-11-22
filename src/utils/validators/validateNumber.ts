type ValidateNumberProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
};

export const validateNumber = ({
  value,
  min,
  max,
  required,
}: ValidateNumberProps): string | undefined => {
  if (required && (value === null || value === undefined)) {
    return 'This field is required';
  }
  if (min !== undefined && value < min) {
    return `Value must be at least ${min}`;
  }
  if (max !== undefined && value > max) {
    return `Value must be less than ${max}`;
  }
  return undefined;
};
