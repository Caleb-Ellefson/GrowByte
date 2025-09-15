import { FormRow, SubmitBtn, NavBar } from '../components/Index.js';
import { Link, Form, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Grab the redirect param from the URL
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirect") || "/";

    try {
      await customFetch.post('/auth/login', data);
      toast.success('Login successful');

      // Redirect back to original page
      return redirect(redirectTo);
    } catch (error) {
      toast.error(error?.response?.data);
      return error;
    }
  };

const Login = () => {
  return (
    <Wrapper>
      <div className="grid-item">
        <NavBar />
      </div>
      <div className="grid-item">
        <Form method="post" className="form">
          <h4>Login</h4>
          <FormRow type="email" name="email" />
          <FormRow type="password" name="password" />
          <SubmitBtn />
          <p>
            Not a member yet?
            <Link to="/register" className="member-btn">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */

  .form {
    display: grid;
    align-items: center;
    margin: 0 auto;
    max-width: 400px;
    padding: 2rem;
    border-radius: 10px; /* Rounded corners */
    box-shadow: var(--shadow-3); /* Add shadow for depth */
    border-top: 5px solid var(--primary-500); /* Accent border */
    background-color: white;
  }

  h4 {
    text-align: center;
    font-family: 'Lora', serif; /* Consistent font */
    font-size: 1.8rem; /* Slightly larger heading */
    color: black; /* Brown text color */
    margin-bottom: 1.5rem;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
    font-family: 'Lora', serif; /* Match font style */
    color: black; /* Text color for p */
  }

  .btn {
    margin-top: 1rem;
    background-color: var(--primary-500); /* Primary button color */
    color: var(--cream); /* Button text color */
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px; /* Rounded button */
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .btn:hover {
    background-color: var(--beige); /* Slightly lighter hover effect */
    transform: translateY(-2px); /* Subtle lift */
  }

  .member-btn {
    color: var(--brown); /* Link color */
    letter-spacing: var(--letterSpacing);
    margin-left: 0.25rem;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }

  .member-btn:hover {
    color: var(--beige); /* Lighter hover effect for link */
  }

  .grid-item {
    display: grid;
  }
`;


export default Login;
