import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import { image1, image2, image3, image4, image5, image6, image7 } from '../assets/images/Images';
import { Link, Form, redirect, Outlet, useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { get } from 'mongoose';
import React, { useEffect } from 'react';

const images = [image1, image3, image2, image4, image5, image6, image7 ];

const Landing = () => {

  const logoutUser = async () => {
    await customFetch.get('/auth/logout');
    setState( state => {
      return {
        ...state,
        isUserLoggedIn: false,
        userAdmin: false
      }
      })
  
    toast.success('Logging out...');
    redirect('/')
  };

  let [state, setState] = React.useState({
    isUserLoggedIn : false,
    userAdmin : false,
  })
  const getCurrentUser = async () => {
    try {
      const { data } = await customFetch.get('/users/current-user');
      const status = data.user.role
        if (status === 'admin'){
           setState( state => {
            return {
              ...state,
              isUserLoggedIn: true,
              userAdmin: true
            }
            })
        }
        if (status === 'user'){
          setState( state => {
            return {
              ...state,
              isUserLoggedIn: true,
              userAdmin: false
            }
            })
        }
      return {status};
    } catch (error) {
      return null
    }
  }
    useEffect(() => {
      getCurrentUser()
    },[])

  return (
    <Wrapper>
      <div className='under-color'>
        <div className='main'>
          <nav className='navBar'>
            {state.isUserLoggedIn === true && <Link className='links' to={'/selection'}>Play</Link>}
            {state.isUserLoggedIn === false && <Link className='links' to={'/Login'}>Login</Link>}
            {state.isUserLoggedIn === true &&  <Link className='links' to={'/AddStrat'}>Add A Strat</Link>}
            {state.isUserLoggedIn === true && <Link className='links' onClick={logoutUser}>Logout </Link>}
            {state.userAdmin === true && <Link className='links' to={'/Admin'}>Admin</Link>}
            
          </nav>
          <div className='body'>
            <div className='text-container'>
              <div className='top-text'>
                <h2 className='orange'>COUNTERSTRIKE 2</h2>
                <h2 className='white'>COUNTERSTRIKE 2</h2>
                <h2 className='orange'>COUNTERSTRIKE 2</h2>
                <h2 className='white'>COUNTERSTRIKE 2</h2>
              </div>
              <div className='bottom-text'>
                <div className='bottom-text-container'>
                  <h2 className='white'>STRAT-ROULETTE</h2>
                  <h2 className='orange'>STRAT-ROULETTE</h2>
                  <h2 className='white'>STRAT-ROULETTE</h2>
                  <h2 className='orange'>STRAT-ROULETTE</h2>
                </div>
              </div>
            </div>
            <div className='img-container'>
              <div className='box'>
                <Carousel
                  showArrows={false}
                  useKeyboardArrows={false}
                  showStatus={false}
                  showThumbs={false}
                  autoPlay={true} // Enable automatic sliding
                  interval={3000} // Set the interval (in milliseconds) for each slide
                  infiniteLoop={true}
                >
                  {images.map((image, index) => (
                    <div key={index} className='slide'>
                      <img alt='sample_file' src={image} />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`

.links{
  text-decoration: none !important; 
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background-color: #FF4C29;
  padding-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 30px;
  opacity: 90%;
  box-shadow: 0px 0px 5px black;
  color: white;
}

.box {
    width: 100%;
    max-width: 90%; /* Adjust the maximum width as needed */
    margin: 0 auto;
    box-shadow: 0px 2px 15px black;
    display: flex;
    justify-content: center;
  }

  .slide {
    text-align: center;
  }

  .slide img {
    max-width: 100%;
    max-height: 1100px; /* Adjust the maximum height as needed */
    margin: 0 auto;
  }

.navBar {
    text-decoration: none; 
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: var(--main-font);
    font-size: 30px;
    gap: 100px;
    margin-top: 15px;
    margin-bottom:10px;
    margin-right: 120px;
    color: #ffff;
    text-shadow: 0px 5px 20px black;
  }

  .navBar-img {
    width: 50px;
    height: 50px;
  }

  .main {
    position: absolute;
    width: calc(100vw - 10px);
    height: calc(100vh - 10px);
    background-size: 100% 100%;
    background-repeat: no-repeat; /* Ensure the gradient does not repeat */
    background: linear-gradient(#3c4c5a, #0a1924);
    inset:0px 10px;
    user-select: none;
    overflow: hidden;
  }

  .img-container{
    display: flex;
    justify-content: center;
    padding: 4rem;

  }

  .text-container{
    width: 100vw;
    position: absolute;
    letter-spacing: .5px;
    line-height: 60px;
    font-size: 50px;
    font-family: var(--main-font);
    z-index: 10;
    display: flex; /* Add this line */
    justify-content: flex-end; /* Add this line to move 'bottom-text' to the right side */
    align-items: center; /* Align vertically if needed */
    flex-direction: column; /* Display text vertically */
  }

  .top-text{
    margin-left: 100px;
    height: 100%;
    width: 100vw;
  }

  .bottom-text{
    width: auto;
    position: fixed;
    bottom: 100px; /* Adjust the distance from the bottom as needed */
    right: 100px; /* Adjust the distance from the right as needed */
    text-align: right;
    z-index: 10;
  }

  .img-container {
    display: flex;
    justify-content: center;
    padding: 4rem;

    .box {
      width: 100%;
      max-width: 90%;
      margin: 0 auto;
      box-shadow: 0px 2px 15px black;
      display: flex;
      justify-content: center;
    }

    .slide {
      text-align: center;
    }

    .carousel-image {
      max-width: 100%;
      max-height: 85vh; /* Adjust the maximum height as needed */
      margin: 0 auto;
    }
  }


`

export default Landing
