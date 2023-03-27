import FormInput from '../form-input/form-input.component';

const { useState } = require('react');
const { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } = require('../../utils/firebase.utils');

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match');
      return false;
    }

    try {
      const { user } = createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('User creation encountered an error', error);
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={ handleSubmit }>
        <FormInput label="Display Name" type="text" required onChange={ handleChange } name="displayName" value={ displayName } />

        <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />

        <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />

        <FormInput label="Confirm Password" type="password" required onChange={ handleChange } name="confirmPassword" value={ confirmPassword } />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
