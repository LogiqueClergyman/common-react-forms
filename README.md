<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">common-react-forms</h3>

---

<p align="center"> Dynamic form generator and easy to use form components for React.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Uhhhh🥱 Another UI library💤 ...right? Nope. Its a powerpakced tool to quickly spinup an extensive form with super-easy state management, all throguh just a SINGLE React component. That's right!!! Just one. Never write a single line of HTML form code again. Simply pass a JSON of your choice and _voila!_ You have your form ready.

Form components can be used individually but this is targeted towards catering to automation tools to easily create and manage forms.

A collection of easy-to-use, readymade form components for React that can be customized with a variety of options. Styled using Tailwind and customizable.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running.

### Prerequisites

```
NodeJS
Typescript
React
TailwindCSS
```

### Installing

Install the package using npm.

```
npm i common-react-forms
```

## 🎈 Usage <a name="usage"></a>

Import any component using into your React application

```
import { ComponentName } from "common-react-forms";
```

Make sure to import the styles into your entrypoint component, usually App.tsx.

```
import "common-react-forms/dist/index.css";
```

The upcoming versions may introduce some breaking changes in the way components are used, by importing and using Enums while calling them.

```
import { FieldName } from "common-react-forms";
```

### Example: EmailInput

```
import { EmailInput, FieldType } from "common-react-forms";
import "common-react-forms/dist/index.css";
function App() {
  return (
    <div>
      <EmailInput
        label="Email"
        name="email"
        type={FieldType.EMAIL}
        placeholder="Enter your email"
        domain="gmassil.com"
        onChange={(e) => console.log(e)}
      />
    </div>
  );
}

export default App;

```

### Example: Form

```
import { Form, FieldType } from "common-react-forms";
import "common-react-forms/dist/index.css";
const App = () => {
  const fields = {
    firstName: {
      name: 'firstName',
      label: 'First Name',
      type: FieldType.TEXT,
      value: '',
      required: true,
      domain: 'example.com',
      style: {
        label: 'text-red-500',
        labelContainer: '',
      },
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
    maxAge: {
      name: 'maxAge',
      label: 'Max Age',
      type: FieldType.RANGE,
      value: 50,
      min: 0,
      max: 100,
      step: 10,
    },
    vegetable: {
      options: [
        { label: 'Tomato', value: 1 },
        { label: 'Potato', value: 2 },
      ],
      type: FieldType.OPTIONS,
      inputType: 'radio' as 'radio',
      dataType: 'number' as 'number',
      label: 'Vegetable',
      name: 'vegetable',
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
```

## Prop Details

Props are the core pillars on which the components operate. Here is a detailed list of all of them available in the current version. Expect more soon😎.

Here are the props common to all the components.
| Prop Name | Optional/Compulsory | Description |
|-----------|---------------------|-------------|
| name | Compulsory | The name of the field used for form submission. |
| label | Optional | The label displayed next to the input field. |
| type | Compulsory | Specifies the type of the input field. |
| value | Optional | Provide the default value to the field. |
| required | Optional | Indicates whether the field is required for submission. |
| placeholder | Optional | A short hint displayed inside the input field to help the user. |
| onChange | Compulsory | Catch the value of the component using this callback function. |
| style | Optional | Custom styles for different parts of the field (e.g., container, label, input, error message, etc.). |

Component specific props:

### TextInput

| Prop Name | Optional/Compulsory | Description                        |
| --------- | ------------------- | ---------------------------------- |
| type      | Compulsory          | FieldType.TEXT                     |
| minLength | Optional            | Minimum length of the input value. |
| maxLength | Optional            | Maximum length of the input value. |
| regex     | Optional            | Provide regex for validation.      |

### EmailInput

| Prop Name | Optional/Compulsory | Description                   |
| --------- | ------------------- | ----------------------------- |
| type      | Compulsory          | FieldType.EMAIL               |
| domain    | Optional            | Domain for email validation.  |
| regex     | Optional            | Provide regex for validation. |

### PasswordInput

| Prop Name | Optional/Compulsory | Description                        |
| --------- | ------------------- | ---------------------------------- |
| type      | Compulsory          | FieldType.PASSWORD                 |
| minLength | Optional            | Minimum length of the input value. |
| maxLength | Optional            | Maximum length of the input value. |
| regex     | Optional            | Provide regex for validation.      |

### NumberInput OR Slider

| Prop Name | Optional/Compulsory | Description                         |
| --------- | ------------------- | ----------------------------------- |
| type      | Optional            | FieldType.NUMBER                    |
| min       | Optional            | Minimum value.                      |
| max       | Optional            | Maximum value.                      |
| step      | Optional            | Step value for increment/decrement. |

### Options (Radio/Checkboxes/Dropdown)

| Prop Name | Optional/Compulsory | Description                                  | Possible Values                                                                                          |
| --------- | ------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| type      | Compulsory          | FieldType.OPTIONS                            |
| options   | Compulsory          | Array of options with label and value.       | Accepts an array of type: { label: string; value: string OR number }[] Ex: [{label: 'Tomato', value: 1}] |
| dataType  | Compulsory          | Data type of the options (string or number). | 'string' / 'number'                                                                                      |
| inputType | Compulsory          | Type of input (radio, checkbox, dropdown).   | 'radio' / 'checkbox' / 'dropdown'                                                                        |

### Style Prop

The style prop can accept tailwind styles in string. Each does exactly what it sounds like.
| Name | Description |
|----------------|--------------------------------------------------|
| container | Outermost container div. |
| label | The label text element. |
| labelContainer | Contains the label element |
| input | Directly affects the input element. |
| inputContainer | Contains the input element. |
| optionsLabel | Directly affects the options for dropdown/radio/checkboxes. |
| error | Custom styles for the error text message element. |
| errorContainer | Contains the error element. |
| valid | Custom styles for the valid text message element. |
| validContainer | Contains the valid element. |

## ⛏️ Built Using <a name = "built_using"></a>

- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Rollup](https://rollupjs.org/)
- [NodeJs](https://nodejs.org/en/)

## ✍️ Authors <a name = "authors"></a>

- [@LogiqueClergyman](https://github.com/LogiqueClergyman) - Idea & Initial work
