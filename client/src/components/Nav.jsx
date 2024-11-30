import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({ isUserLoggedIn, userAdmin, logoutUser }) => {
  return (
    <Nav>
      <div className="nav-links">
      <Link className="nav-link" to="/">Growbyte</Link>
        {isUserLoggedIn && (
          <>
            <Link className="nav-link" to="/selection">Dashboard</Link>
            <Link className="nav-link" to="/AddDevice">Add Device</Link>
            {userAdmin && <Link className="nav-link" to="/Admin">Admin</Link>}
            <Link className="nav-link" onClick={logoutUser}>Logout</Link>
          </>
        )}
      </div>
      {!isUserLoggedIn && (
        <Link className="login-btn" to="/login">Login</Link>
      )}
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

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    text-decoration: none;
    color: var(--cream); /* Cream */
    font-size: 1.2rem;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }

  .nav-link:hover {
    color: var(--brown); /* Brown */
  }

  .login-btn {
    text-decoration: none;
    background-color: var(--brown); /* Brown */
    color: var(--cream); /* Cream */
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: background-color 0.3s ease, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-btn:hover {
    background-color: var(--beige); /* Beige */
    transform: translateY(-2px);
  }
`;

export default Navbar;
