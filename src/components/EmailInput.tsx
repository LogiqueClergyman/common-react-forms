import React, { useState } from 'react';
import { EmailField } from '../utils/types/types';
import FieldType from '../utils/enums/enums';
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
    <div className={`input-container ${style?.container}`}>
      {label && (
        <div className={`basic-label-container ${style?.labelContainer}`}>
          <label className={`basic-label ${style?.label}`}>{label}</label>
        </div>
      )}
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
      {inputError && (
        <div className={`${style?.errorContainer}`}>
          <p className={`basic-error ${style?.error}`}>{inputError}</p>
        </div>
      )}
      {value && !inputError && (
        <div className={`${style?.validContainer}`}>
          <p className={`basic-valid ${style?.valid}`}>Looks good!</p>
        </div>
      )}
    </div>
  );
};

export default EmailInput;
