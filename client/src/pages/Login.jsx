
import { FormRow, SubmitBtn, NavBar } from '../components/Index.js';
import { Link, Form, redirect, Outlet, } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';


export const action =
  (queryClient) =>
  async ({ request }) => {
    //Grab the data from the form
    const formData = await request.formData();
    //Convert data to object
    const data = Object.fromEntries(formData);
    try {
      //Login route using data from form
      await customFetch.post('/auth/login', data);

      // queryClient.invalidateQueries();
      toast.success('Login successful');
      return redirect('/');
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data);
      return error;
    }
  };

const Login = () => {
  

  return (
    <Wrapper>
      <div className='grid-item'>
        <NavBar />
      </div>
      <div className='grid-item'>
        <Form method='post' className='form'>
          <h4>Login</h4>
          <FormRow type='email' name='email' />
          <FormRow type='password' name='password' />
          <SubmitBtn />
          <p>
            Not a member yet?
            <Link to='/register' className='member-btn'>
              Register
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
background: linear-gradient(#3c4c5a, #0a1924);
min-height: 100vh;
display: grid;
align-items: center;
grid-template-rows: 20% 80%;
.logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
}
.form {
    display:grid;
    align-items: center;
    margin-bottom: 175px;
    max-width: 400px;
    border-top: 5px solid var(--primary-500);

}

.grid-item{
  display: grid;
}
h4 {
    text-align: center;
    margin-bottom: 1.38rem;
}
p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
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
export default Login