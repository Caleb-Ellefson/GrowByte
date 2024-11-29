import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({ isUserLoggedIn, userAdmin, logoutUser }) => {
  return (
    <Nav>
      {isUserLoggedIn ? (
        <>
          <Link className="nav-link" to="/selection">Dashboard</Link>
          <Link className="nav-link" to="/AddDevice">Add Device</Link>
          {userAdmin && <Link className="nav-link" to="/Admin">Admin</Link>}
          <Link className="nav-link" onClick={logoutUser}>Logout</Link>
        </>
      ) : (
        <Link className="nav-link" to="/login">Login</Link>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  gap: 1.5rem;
  background-color: #4A6041;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  
  .nav-link {
    text-decoration: none;
    color: #F7F4E9;
    font-size: 1.2rem;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }

  .nav-link:hover {
    color: #D2B48C; /* Tan hover effect */
  }
`;

export default Navbar;
