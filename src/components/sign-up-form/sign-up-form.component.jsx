import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';
import { UserContext } from '../../contexts/user.context';

const { useState, useContext } = require('react');
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

  const { setCurrentUser } = useContext(UserContext);

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
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);

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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput label="Display Name" type="text" required onChange={ handleChange } name="displayName" value={ displayName } />

        <FormInput label="Email" type="email" required onChange={ handleChange } name="email" value={ email } />

        <FormInput label="Password" type="password" required onChange={ handleChange } name="password" value={ password } />

        <FormInput label="Confirm Password" type="password" required onChange={ handleChange } name="confirmPassword" value={ confirmPassword } />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
