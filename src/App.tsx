import React from 'react';
import Form from './components/Form';
import { FieldType } from './utils/enums/enums';
import TextInput from './components/TextInput';
import './main.css';
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

  return (
    <div>
      <Form fields={fields} onSubmit={handleSubmit} />
      <TextInput
        name="username"
        label="Username"
        onChange={(value) => console.log(value)}
      />
    </div>
  );
};
export default App;
