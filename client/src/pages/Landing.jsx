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
  <div class="container_1">
    <div class="content">
      <svg id="more-arrows">
        <polygon class="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>
        <polygon class="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "/>
        <polygon class="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
      </svg>
    </div>
  </div>

    </Wrapper>


  );
};

const Wrapper = styled.section`


  nav {
    width: 100vw;
    margin: 0 auto;
    height: 4rem;
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-family: 'Lora', serif;
    font-weight: 700;
    font-size: 3rem;
    color: #FFFFFF;
    span {
      color: #57B894;
    }
    margin-bottom: 0.5rem;
  }

  p {
    font-family: 'Lora', serif;
    font-weight: 400;
    line-height: 1.8;
    font-size: 1.5rem;
    color: #FFFFFF;
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
    font-family: 'Lora', serif;
    font-size: 1.2rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-500);
    color: var(--cream);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .btn:hover {
    background-color: var(--beige);
    transform: translateY(-2px);
  }

  .container_1 {
    position: fixed; /* Fixes the container to the bottom of the viewport */
    bottom: 20px; /* Adds spacing from the bottom edge */
    left: 50%; /* Centers it horizontally */
    transform: translateX(-50%); /* Adjusts for centering */
    text-align: center;
    z-index: 100;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #more-arrows {
    width: 75px;
    height: 65px;
  }

  #more-arrows:hover polygon {
    fill: #FFF;
    transition: all 0.2s ease-out;
  }

  #more-arrows:hover polygon.arrow-bottom {
    transform: translateY(-18px);
  }

  #more-arrows:hover polygon.arrow-top {
    transform: translateY(18px);
  }

  polygon {
    fill: #FFF;
    transition: all 0.2s ease-out;
  }

  polygon.arrow-middle {
    opacity: 0.75;
  }

  polygon.arrow-top {
    opacity: 0.5;
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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

export default Landing;
