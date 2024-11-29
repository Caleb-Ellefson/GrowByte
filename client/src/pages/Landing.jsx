import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Nav';
import ImageCarousel from '../components/Carousel';
import HeroText from '../components/HeroText';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const Landing = () => {
  const [state, setState] = useState({
    isUserLoggedIn: false,
    userAdmin: false,
  });

  const logoutUser = async () => {
    await customFetch.get('/auth/logout');
    setState({ isUserLoggedIn: false, userAdmin: false });
    toast.success('Logging out...');
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await customFetch.get('/users/current-user');
      const status = data.user.role;
      setState({
        isUserLoggedIn: true,
        userAdmin: status === 'admin',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Wrapper>
      <Navbar
        isUserLoggedIn={state.isUserLoggedIn}
        userAdmin={state.userAdmin}
        logoutUser={logoutUser}
      />
      <HeroText />
      <ImageCarousel />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: linear-gradient(120deg, #2C5D3F, #A97C50);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export default Landing;
