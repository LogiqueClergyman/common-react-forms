import React, { useState } from 'react';
import { TextField } from '../utils/types/types';
import FieldType from '../utils/enums/enums';
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
    <div className={`input-container ${style?.container}`}>
      {label && (
        <div className={`basic-label-container ${style?.labelContainer}`}>
          <label className={`basic-label ${style?.label}`}>{label}</label>
        </div>
      )}
      <div>
        <input
          type={type}
          name={name}
          value={value as string}
          onChange={handleChange}
          style={style}
          required={required}
          placeholder={placeholder}
          className={`input-box ${style?.input}`}
        />
      </div>
      {inputError && (
        <div>
          <p className={`basic-error ${style?.error}`}>{inputError}</p>
        </div>
      )}
      {value && !inputError && (
        <div>
          <p className={`basic-valid ${style?.valid}`}>Looks good!</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
