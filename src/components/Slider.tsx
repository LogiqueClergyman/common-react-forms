import React, { useState } from 'react';
import { NumberField } from '../utils/types/types';

const Slider: React.FC<NumberField> = ({
  name,
  label,
  value = 50,
  required = false,
  placeholder,
  onChange,
  min = 0,
  max = 100,
  step,
  style,
}) => {
  const [newValue, setNewValue] = useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewValue(Number(val));
    onChange(Number(val));
  };
  return (
    <div className={`basic-slder-container ${style?.container}`}>
      <div
        className={`basic-label-slider-container -mt-0 ${style?.labelContainer}`}
      >
        <label className={`basic-label ${style?.label}`}>{label}</label>
        <p className="text-black text-lg">{newValue}</p>
      </div>

      <div className={`${style?.inputContainer}`}>
        <input
          type="range"
          name={name}
          value={newValue}
          onChange={(e) => handleChange(e)}
          className={`w-full h-1 appearance-none cursor-pointer ${style?.input}`}
          style={{
            background: `linear-gradient(to right, #3b82f6 ${((newValue - min) / (max - min)) * 100}%, #d1d5db ${((newValue - min) / (max - min)) * 100}%)`,
          }}
          required={required}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

export default Slider;
