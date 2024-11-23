import React, { useState, useEffect } from 'react';
import { OptionsField } from '../utils/types/types';

const Options: React.FC<OptionsField> = ({
  name,
  label,
  value,
  options,
  dataType,
  inputType,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<any>(
    inputType === 'checkbox' ? [] : value,
  );

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (option: string | number) => {
    let updatedValue = option;
    if (dataType === 'number') {
      updatedValue = Number(option);
    }
    let newSelectedValue;
    if (inputType === 'checkbox') {
      if (selectedValue.includes(updatedValue)) {
        newSelectedValue = selectedValue.filter(
          (val: any) => val !== updatedValue,
        );
      } else {
        newSelectedValue = [...selectedValue, updatedValue];
      }
    } else {
      newSelectedValue = updatedValue;
    }
    if (newSelectedValue !== selectedValue) {
      setSelectedValue(newSelectedValue);

      if (onChange) {
        onChange(newSelectedValue);
      }
    }
  };

  return (
    <div className="relative m-2 pt-2 border-t-2 rounded-lg border-gray-300">
      {label && (
        <label className="input-label !-top-3 !left-2.5" htmlFor={name}>
          {label}
        </label>
      )}
      <div>
        {inputType === 'dropdown' ? (
          <select
            name={name}
            id={name}
            value={selectedValue}
            onChange={(e) => handleChange(e.target.value)}
            className="basic-dropdown"
          >
            {options.map((option, index) => (
              <option key={index} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          options.map((option, index) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { label, value } = option;

            if (inputType === 'radio') {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${name}-${value}`}
                    name={name}
                    value={value}
                    checked={selectedValue === value}
                    onChange={() => handleChange(value)}
                    className="basic-radio"
                  />
                  <label
                    htmlFor={`${name}-${value}`}
                    className="basic-options-label"
                  >
                    {label}
                  </label>
                </div>
              );
            }

            if (inputType === 'checkbox') {
              return (
                <div key={index} className="">
                  <input
                    type="checkbox"
                    id={`${name}-${value}`}
                    name={name}
                    value={String(option.value)}
                    checked={selectedValue.includes(value)}
                    onChange={() => handleChange(value)}
                    className="basic-checkbox"
                  />
                  <label
                    htmlFor={`${name}-${value}`}
                    className="basic-checkbox-label"
                  >
                    {label}
                  </label>
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Options;
