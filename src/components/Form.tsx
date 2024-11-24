import React, { useState, useEffect } from 'react';
import { validateNumber } from '../utils/validators/validateNumber';
import { validateEmail } from '../utils/validators/validateEmail';
import { validatePassword } from '../utils/validators/validatePassword';
import NumberInput from './NumberInput';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
import FieldType from '../utils/enums/enums';
import { InputFieldConfig, FormProps, CommonProps } from '../utils/types/types';
import Slider from './Slider';
import Options from './Options';

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [values, setValues] = useState(
    Object.keys(fields).reduce(
      (acc, fieldName) => {
        acc[fieldName] = fields[fieldName].value;
        return acc;
      },
      {} as Record<string, any>,
    ),
  );

  const [errors, setErrors] = useState(
    Object.keys(fields).reduce(
      (acc, fieldName) => {
        acc[fieldName] = undefined;
        return acc;
      },
      {} as Record<string, string | undefined>,
    ),
  );

  const handleChange = (name: string, newValue: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const validateFields = () => {
    const newErrors: Record<string, string | undefined> = {};

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const fieldValue = values[fieldName];

      let error: string | undefined = undefined;
      if (!error) {
        switch (field.type) {
          case FieldType.NUMBER:
            error = validateNumber({
              value: fieldValue,
              min: field.min,
              max: field.max,
              step: field.step,
              required: field.required,
            });
            break;
          case FieldType.EMAIL:
            error = validateEmail({
              value: fieldValue,
              required: field.required,
              domain: field.domain,
              regex: field.regex,
            });
            break;
          case FieldType.PASSWORD:
            error = validatePassword({
              value: fieldValue,
              minLength: field.minLength,
              maxLength: field.maxLength,
              required: field.required,
              regex: field.regex,
            });
            break;
          case FieldType.OPTIONS:
            if (field.inputType === 'checkbox' && Array.isArray(fieldValue)) {
              if (field.required && fieldValue.length === 0) {
                error = `At least one option has to be selected.`;
              }
            } else if (
              field.inputType === 'radio' &&
              (fieldValue === undefined || fieldValue === null)
            ) {
              error = `${field.label || fieldName} requires an option to be selected.`;
            } else if (
              field.inputType === 'dropdown' &&
              (fieldValue === undefined || fieldValue === null)
            ) {
              error = `${field.label || fieldName} requires a selection.`;
            }
            break;
        }
      }

      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  useEffect(() => {
    validateFields();
  }, [values]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateFields();
    const hasErrors = Object.values(newErrors).some(
      (error) => error !== undefined,
    );

    if (!hasErrors) {
      onSubmit(values);
    }
  };

  const renderInput = (field: InputFieldConfig) => {
    const commonProps: CommonProps = {
      onChange: (value: any) => handleChange(field.name, value),
      error: errors[field.name],
      ...field,
      name: field.name,
      value: values[field.name],
    };
    const inputComponents: Record<FieldType, React.ElementType> = {
      [FieldType.NUMBER]: NumberInput,
      [FieldType.EMAIL]: EmailInput,
      [FieldType.PASSWORD]: PasswordInput,
      [FieldType.TEXT]: TextInput,
      [FieldType.BOOLEAN]: 'symbol',
      [FieldType.RANGE]: Slider,
      [FieldType.OPTIONS]: Options,
    };

    const InputComponent = inputComponents[field.type];
    return <InputComponent {...commonProps} />;
  };

  return (
    <form onSubmit={handleSubmit} className="basic-grid">
      {Object.keys(fields).map((fieldName) => {
        const field = fields[fieldName];
        return (
          <div className="input-container" key={field.name}>
            {/* <label className="input-label">{field.label}</label> */}
            {renderInput(field)}
          </div>
        );
      })}
      <button type="submit" className="basic-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
