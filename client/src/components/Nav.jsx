import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [state, setState] = useState({
    isUserLoggedIn: false,
    userName: '',
  });

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await customFetch.get('/auth/logout');
      setState({ isUserLoggedIn: false, userName: '' });
      toast.success('Logged out successfully!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await customFetch.get('/users/current-user');
      const { user } = response.data;
      if (user) {
        setState({
          isUserLoggedIn: true,
          userName: user.name,
        });
      } else {
        setState({
          isUserLoggedIn: false,
          userName: '',
        });
      }
    } catch (error) {
      // console.error('Error fetching current user:', error);
      setState({
        isUserLoggedIn: false,
        userName: '',
      });
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Nav>
      <div className="logo">
        <Link className="nav-link" to="/">Growbyte</Link>
      </div>
      <div className="nav-links">
        {state.isUserLoggedIn ? (
          <>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/Add-Plant">Add Device</Link>
            {state.userAdmin && <Link className="nav-link" to="/Admin">Admin</Link>}
            <button className="logout-btn" onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <Link className="login-btn" to="/login">Login</Link>
        )}
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0px 0px 4px var(--shadow-dark);
  z-index: 1000;

  .logo {
    flex: 1;
  }

  .nav-link {
    text-decoration: none;
    color: var(--cream);
    font-size: 1.2rem;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }

  .nav-link:hover {
    color: var(--brown);
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-end;
    flex: 2;
  }

  .login-btn, .logout-btn {
    text-decoration: none;
    background-color: var(--primary-500);
    color: var(--cream);
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: background-color 0.3s ease, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }

  .login-btn:hover, .logout-btn:hover {
    background-color: var(--beige);
    transform: translateY(-2px);
  }
`;

export default Navbar;
