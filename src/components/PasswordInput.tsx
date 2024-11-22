import React, { useState } from 'react';
import { PasswordField } from '../utils/types/types';
import { FieldType } from '../utils/enums/enums';
import { validatePassword } from '../utils/validators/validatePassword';
const PasswordInput: React.FC<PasswordField> = ({
  name,
  label,
  type = FieldType.PASSWORD,
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

export default PasswordInput;
