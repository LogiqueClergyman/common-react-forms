import React, { useState } from 'react';
import { PasswordField } from '../utils/types/types';
import { validatePassword } from '../utils/validators/validatePassword';
const PasswordInput: React.FC<PasswordField> = ({
  name,
  label,
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
  const [showPass, setShowPass] = useState(false);
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
    <div className={`input-container ${style?.container}`}>
      {label && (
        <div className={`basic-label-container ${style?.labelContainer}`}>
          <label className={`basic-label ${style?.label}`}>{label}</label>
        </div>
      )}
      <input
        type={showPass ? 'text' : 'password'}
        name={name}
        value={value as string}
        onChange={handleChange}
        style={style}
        required={required}
        placeholder={placeholder}
        className={`input-box ${style?.input}`}
      />
      <button type="button" onClick={() => setShowPass(!showPass)}>
        {!showPass ? '👁' : '🕶'}
      </button>
      {inputError && (
        <p className={`basic-error ${style?.error}`}>{inputError}</p>
      )}
      {value && !inputError && (
        <p className={`basic-valid ${style?.valid}`}>Looks good!</p>
      )}
    </div>
  );
};

export default PasswordInput;
