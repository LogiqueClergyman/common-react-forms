import React, { useState } from 'react';
import { TextField } from '../utils/types';
import { FieldType } from '../utils/enums';
const TextInput: React.FC<TextField> = ({
  name,
  label,
  type = FieldType.TEXT,
  value,
  required = false,
  style,
  placeholder,
  error,
  onChange,
  minLength,
  maxLength,
  regex,
}) => {
  const [inputError, setInputError] = useState<string | undefined>(error);
  const validate = (newValue: string) => {
    if (required && !value) {
      setInputError('This field is required');
      return;
    }

    if (minLength && newValue.length < minLength) {
      setInputError(`Minimum length is ${minLength} characters`);
      return;
    }

    if (maxLength && newValue.length > maxLength) {
      setInputError(`Maximum length is ${maxLength} characters`);
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

export default TextInput;
