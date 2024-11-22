import React, { useState } from 'react';
import { TextField } from '../utils/types/types';
import { FieldType } from '../utils/enums/enums';
import { validatePassword } from '../utils/validators/validatePassword';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setInputError(
      validatePassword({
        value: newValue,
        required,
        minLength,
        maxLength,
        regex,
      }),
    );
  };
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        name={name}
        value={value as string}
        onChange={handleChange}
        style={style}
        required={required}
        placeholder={placeholder}
        className="input-box"
      />
      {inputError && <p className="error-message">{inputError}</p>}
    </div>
  );
};

export default TextInput;
