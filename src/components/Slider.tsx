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
}) => {
  const [newValue, setNewValue] = useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewValue(Number(val));
    onChange(Number(val));
  };
  return (
    <div>
      <div className="basic-slder-container">
        <div className="basic-slider-inner">
          <div className="basic-slider-label-container">
            <label className="basic-label">{label}</label>
            <p className="text-black text-lg">{newValue}</p>
          </div>
          <input
            type="range"
            name={name}
            value={newValue}
            onChange={(e) => handleChange(e)}
            className="w-full h-1 appearance-none cursor-pointer"
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
    </div>
  );
};

export default Slider;
