import React, { useState } from 'react';
import { EmailField } from '../utils/types';
import { FieldType } from '../utils/enums';

const EmailInput: React.FC<EmailField> = ({
  name,
  label,
  type = FieldType.EMAIL,
  value,
  required = false,
  style,
  placeholder,
  error,
  onChange,
  domain,
  regex,
}) => {
  const [inputError, setInputError] = useState<string | undefined>(error);
  const validate = (newValue: string) => {
    if (required && !newValue) {
      setInputError('This field is required');
      return;
    }

    if (domain && !newValue.endsWith(domain)) {
      setInputError(`Only emails with ${domain} are allowed`);
      return;
    }

    if (regex && !regex.test(newValue)) {
      setInputError('Invalid format');
      return;
    }
    setInputError(undefined);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validate(newValue);
  };
  return (
    <div>
      <label>
        {label}
        <input
          type={type}
          name={name}
          value={value as string}
          onChange={handleChange}
          style={style}
          required={required}
          placeholder={placeholder}
        />
        {inputError && <p className="error-message">{inputError}</p>}
      </label>
    </div>
  );
};

export default EmailInput;
