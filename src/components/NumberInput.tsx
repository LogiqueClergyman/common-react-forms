import React, { useState } from 'react';
import FieldType from '../utils/enums/enums';
import { NumberField } from '../utils/types/types';
import { validateNumber } from '../utils/validators/validateNumber';
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(Number(newValue));
    setInputError(
      validateNumber({ required, value: Number(newValue), step, min, max }),
    );
  };
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
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
        className="input-box"
      />
      {inputError && <p className="basic-error">{inputError}</p>}
      {value && !inputError && <p className="basic-valid">Looks good!</p>}
    </div>
  );
};

export default NumberInput;
