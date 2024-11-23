import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// import './main.css';
// import PasswordInput from './components/PasswordInput';
// import Form from './components/Form';
// import NumberInput from './components/NumberInput';
// import TextInput from './components/TextInput';
// import FieldType from './utils/enums/enums';
// import EmailInput from './components/EmailInput';
// export { Form, NumberInput, TextInput, FieldType, PasswordInput, EmailInput };
