import React, { useState } from 'react';
import { FieldType } from '../utils/enums';
import { NumberField } from '../utils/types';
const NumberInput: React.FC<NumberField> = ({
  name,
  label,
  type = FieldType.NUMBER,
  value,
  required = false,
  style,
  placeholder,
  error,
  onChange,
  min,
  max,
  step,
}) => {
  const [inputError, setInputError] = useState<string | undefined>(error);
  const validate = (newValue: number) => {
    if (min && newValue < min) {
      setInputError(`Value must be at least ${min}`);
      return;
    }

    if (max && newValue > max) {
      setInputError(`Value must be less than ${max}`);
      return;
    }
    setInputError(undefined);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(Number(newValue));
    validate(Number(newValue));
  };
  return (
    <div>
      <label>
        {label}
        <input
          type={type}
          name={name}
          value={value as number}
          onChange={handleChange}
          style={style}
          required={required}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
        />
        {inputError && <p className="error-message">{inputError}</p>}
      </label>
    </div>
  );
};

export default NumberInput;
