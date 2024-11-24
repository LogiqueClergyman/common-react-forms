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
  style,
  error,
  required,
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
    <div className={`basic-optionComponent-container ${style?.container}`}>
      {label && (
        <div
          className={`basic-label-options-container  ${style?.labelContainer}`}
        >
          <label className={`basic-label ${style?.label}`} htmlFor={name}>
            {label}
          </label>
        </div>
      )}
      {inputType === 'dropdown' ? (
        <div className={`basic-options-container ${style?.inputContainer}`}>
          <select
            name={name}
            id={name}
            value={selectedValue}
            onChange={(e) => handleChange(e.target.value)}
            className={`basic-dropdown ${style?.input}`}
            required={required}
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={String(option.value)}
                className={`basic-options-label ${style?.optionsLabel}`}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        options.map((option, index) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { label, value } = option;

          if (inputType === 'radio') {
            return (
              <div
                key={index}
                className={`basic-options-container ${style?.inputContainer}`}
              >
                <input
                  type="radio"
                  id={`${name}-${value}`}
                  name={name}
                  value={value}
                  checked={selectedValue === value}
                  onChange={() => handleChange(value)}
                  className={`basic-radio ${style?.input}`}
                  required={required}
                />
                <label
                  htmlFor={`${name}-${value}`}
                  className={`basic-options-label ${style?.optionsLabel}`}
                >
                  {label}
                </label>
              </div>
            );
          }

          if (inputType === 'checkbox') {
            return (
              <div
                key={index}
                className={`basic-options-container ${style?.inputContainer}`}
              >
                <input
                  type="checkbox"
                  id={`${name}-${value}`}
                  name={name}
                  value={String(option.value)}
                  checked={selectedValue.includes(value)}
                  onChange={() => handleChange(value)}
                  // required={required}
                  className={`basic-checkbox ${style?.input}`}
                />
                <label
                  htmlFor={`${name}-${value}`}
                  className={`basic-options-label ${style?.optionsLabel}`}
                >
                  {label}
                </label>
              </div>
            );
          }
        })
      )}

      {error && (
        <div className={`${style?.errorContainer}`}>
          <p className={`basic-error ${style?.error}`}>{error}</p>
        </div>
      )}
      {value && !error && (
        <div className={`${style?.validContainer}`}>
          <p className={`basic-valid ${style?.valid}`}>Looks good!</p>
        </div>
      )}
    </div>
  );
};

export default Options;
