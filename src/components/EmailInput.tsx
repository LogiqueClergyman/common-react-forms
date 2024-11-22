import React, { useState } from 'react';
import { EmailField } from '../utils/types/types';
import { FieldType } from '../utils/enums/enums';
import { validateEmail } from '../utils/validators/validateEmail';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setInputError(validateEmail({ value: newValue, required, domain, regex }));
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
      {inputError && (
        <p className="text-red-600 font-sans italic p-0 m-0">{inputError}</p>
      )}
    </div>
  );
};

export default EmailInput;
