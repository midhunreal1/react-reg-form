import './App.css';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  return (
    <div className='App'>
      <Row style={{ justifyContent: 'center' }}>
        <Col xs={8} className='mt-5'>
          <Card className='custom-card p-4'>
            <h1 className='mb-4'>Sign up</h1>
            <RegistrationForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

function RegistrationForm() {
  const { values, handleInput, reset, validate, errors } = useForm();

  const submitForm = (event) => {
    event.preventDefault();
    if (validate()) {
      alert('Form submitted');
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <InputField
        label='Full name : '
        type='text'
        name='fullname'
        placeholder='Enter your full name'
        value={values.fullname}
        onChange={handleInput}
        error={errors.fullname}
      />
      <InputField
        label='Email Address : '
        type='email'
        name='email'
        placeholder='Enter your mail'
        value={values.email}
        onChange={handleInput}
        error={errors.email}
      />
      <InputField
        label='Password : '
        type='password'
        name='password'
        placeholder='Enter password'
        value={values.password}
        onChange={handleInput}
        error={errors.password}
      />
      <InputField
        label='Confirm Password : '
        type='password'
        name='confirmPassword'
        placeholder='Retype password'
        value={values.confirmPassword}
        onChange={handleInput}
        error={errors.confirmPassword}
      />
      <div className='mt-3'>
        <Button type='submit'>Register</Button>{' '}
        <Button className='outline-secondary' onClick={reset}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

const InputField = ({ label, error, ...props }) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...props} className={error ? 'is-invalid' : ''} />
      {error && <div className='text-danger'>{error}</div>}
    </Form.Group>
  );
};

const useForm = () => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const reset = () => {
    setValues({
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (values.fullname.length < 3) {
      newErrors.fullname = 'Too short';
    }
    if (!values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, handleInput, reset, validate, errors };
};
