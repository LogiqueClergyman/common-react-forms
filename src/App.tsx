import React from 'react';
import Form from './components/Form';
import { FieldType } from './utils/enums/enums';

const App = () => {
  const fields = {
    email: {
      name: 'email',
      label: 'Email',
      type: FieldType.EMAIL,
      value: '',
      domain: 'example.com',
    },
    password: {
      name: 'password',
      label: 'Password',
      type: FieldType.PASSWORD,
      value: '',
    },
  };

  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
  };

  return <Form fields={fields} onSubmit={handleSubmit} />;
};
export default App;
