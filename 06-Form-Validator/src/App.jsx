import { useState } from 'react';
import './styles/App.css'
import FormInput from './components/FormInput';

const App = () => {

  const [values, setValues] = useState({
    username: "",
    emailAddress: "",
    birthday: "",
    password: "",
    repeatPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username*",
      label: "Username*",
      errorMessage: "Please enter a username between 3-16 characters with no spaces or special characters",
      required: true,
      pattern: "^[a-zA-Z0-9]{3,16}$"
    },
    {
      id: 2,
      name: "emailAddress",
      type: "text",
      placeholder: "Email Address*",
      label: "Email Address*",
      errorMessage: "Please enter an email address in a valid format",
      required: true,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      errorMessage: "Please select a birth date"
    },
    {
      id: 4,
      name: "password",
      type: "text",
      placeholder: "Password*",
      label: "Password*",
      errorMessage: "Please enter a password between 8 - 64 characters in length, with at least 1 uppercase, 1 lowercase, 1 number and a special symbol (e.g. */£!)",
      required: true,
      pattern: "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/"
    },
    {
      id: 5,
      name: "repeatPassword",
      type: "text",
      placeholder: "Repeat Password*",
      label: "Repeat Password*",
      errorMessage: "Please make sure the password entered matches the password above",
      required: true,
      pattern: values.password
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>React Form Validation</h1>

      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>SUBMIT</button>
      </form>

      <span className='warning-message'>THIS FORM IS FOR FRONT-END DEMONSTRATION PURPOSES ONLY. PLEASE DO NOT ENTER IN VALID, IDENTIFIABLE DATA AS ANY INFORMATION ENTERED IS NOT ENCRYPTED</span>
    </>

  )
}

export default App;
