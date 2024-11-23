import React from 'react';
import Form from './components/Form';
import FieldType from './utils/enums/enums';
import './main.css';
const App = () => {
  const fields = {
    firstName: {
      name: 'firstName',
      label: 'First Name',
      type: FieldType.TEXT,
      value: '',
      required: true,
      domain: 'example.com',
    },
    lastName: {
      name: 'lastName',
      label: 'Last Name',
      type: FieldType.TEXT,
      value: '',
    },
    email: {
      name: 'email',
      label: 'Email',
      type: FieldType.EMAIL,
      value: '',
      required: true,
      domain: 'example.com',
    },
    password: {
      name: 'password',
      label: 'Password',
      type: FieldType.PASSWORD,
      value: '',
      required: true,
    },
  };

  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Form fields={fields} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
export default App;
