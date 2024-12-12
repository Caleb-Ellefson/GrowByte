import { Form, redirect, Link } from 'react-router-dom';
import { FormRow, NavBar, SubmitBtn } from '../components/Index.js';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
        <NavBar />
      <Form method='post' className='form'>
        <h2>Register</h2>
        <FormRow type='text' name='name' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};


const Wrapper = styled.section`
min-height: 100vh;
display: grid;
align-items: center;
.logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
}
.form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
    margin-bottom: 175px;
}
h2 {
    text-align: center;
    margin-bottom: 1.38rem;
    color: black;
    font-family: 'Lora', serif; 
}
p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
    color: black;
}
.btn {
    margin-top: 1rem;
}
.member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
}
`;


export default Register;