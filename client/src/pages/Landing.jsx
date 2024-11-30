import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Nav';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import image1 from "../assets/plant.svg";
import image2 from "../assets/flowers.svg";

import { Link } from 'react-router-dom';

const Landing = () => {
  const [state, setState] = useState({
    isUserLoggedIn: false,
    userAdmin: false,
    userName: '',
  });

  const logoutUser = async () => {
    try {
      await customFetch.get('/auth/logout');
      setState({ isUserLoggedIn: false, userAdmin: false, userName: '' });
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await customFetch.get('/api/v1/users/current-user');
      const { user } = response.data;

      if (user) {
        setState({
          isUserLoggedIn: true,
          userAdmin: user.role === 'admin',
          userName: user.name,
        });
      } else {
        setState({
          isUserLoggedIn: false,
          userAdmin: false,
          userName: '',
        });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      setState({
        isUserLoggedIn: false,
        userAdmin: false,
        userName: '',
      });
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Wrapper>
      <nav>
        <Navbar
          isUserLoggedIn={state.isUserLoggedIn}
          userAdmin={state.userAdmin}
          logoutUser={logoutUser}
        />
      </nav>
      <div className="container page">
        <div className="info">
          {state.isUserLoggedIn ? (
            <>
              <h1>
                Welcome back, <span>{state.userName}</span>!
              </h1>
              {state.userAdmin && <p>You have admin access. Use it wisely!</p>}
              <button
                className="btn"
                onClick={() => (window.location.href = '/dashboard')}
              >
                Go to Dashboard
              </button>
            </>
          ) : (
            <>
              <p className='heading_1'>Learn what it takes to have your plants thrive</p>
              <h1>
                GrowByte <span>Tracking</span> App
              </h1>
              <p>
                Monitor and maintain your plants effortlessly with real-time hydration tracking and smart alerts.
              </p>
              <Link to="/register" className="btn register-link">
                Get Started
              </Link>
            </>
          )}
        </div>
        <img src={image1} alt="Plants monitoring" className="main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* Add new font-family */
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');

  nav {
    width: 100vw; /* Equivalent to var(--fluid-width) */
    margin: 0 auto;
    height: 4rem; /* Equivalent to var(--nav-height) */
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - 6rem); /* Adjust for navbar height */
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-family: 'Lora', serif; /* New font-family */
    font-weight: 700;
    font-size: 3rem; /* Increase size for better emphasis */
    color: #FFFFFF; /* Ensure h1 uses consistent text color */
    span {
      color: #57B894; /* Your primary color */
    }
    margin-bottom: .5rem;
  }
  p {
    font-family: 'Lora', serif; /* Consistent font-family */
    font-weight: 400;
    line-height: 1.8; /* Adjust line-height for better readability */
    font-size: 1.5rem; /* Increased size for better legibility */
    color: #FFFFFF; /* Secondary text color */
    margin-bottom: 1rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    font-family: 'Lora', serif; /* Consistent font-family */
    font-size: 1.2rem; /* Slightly larger font for buttons */
    padding: 0.75rem 1.5rem; /* Adjust padding for proportional button size */
    border: none;
    border-radius: 5px;
    background-color: var(--brown); /* Your primary button color */
    color: var(--cream); /* Button text color */
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }


  .btn:hover {
    background-color: var(--beige); /* Slightly lighter color */
    transform: translateY(-2px); /* Subtle hover effect */
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
      max-width: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for a polished look */
    }
  }
`;


export default Landing;
