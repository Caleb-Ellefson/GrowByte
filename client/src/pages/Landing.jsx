import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Nav';
import image1 from "../assets/plant.svg";
import image2 from "../assets/flowers.svg";
import image3 from "../assets/temp.png";
import image4 from "../assets/light.png";
import Knob from '../components/pureknob';
import { Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';

const Landing = () => {
  const [state, setState] = useState({
    isUserLoggedIn: false,
    userName: '',
  });

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
    <Wrapper>
      <Navbar />
      <div className="container page">
        <div className="info">
          {state.isUserLoggedIn ? (
            <>
              <h1 className="welcome-message">Welcome back, <span>{state.userName}!</span></h1>
              <p className="welcome-description">
                Let's get back to helping your plants thrive and grow to their fullest!
              </p>
              <Link to="/Dashboard" className="btn register-link">
                Dashboard
              </Link>
              <Link to="/add-plant" className="btn register-link">
                Add A new plant
              </Link>
            </>
          ) : (
            <>
              <p className='heading_1'>Learn what it takes to have your plants thrive</p>
              <h1>
                GrowByte <span>Tracking</span> App
              </h1>
              <p>
                Monitor and maintain your plants effortlessly with hydration tracking and smart alerts.
              </p>
              <Link to="/register" className="btn register-link">
                Get Started
              </Link>
            </>
          )}
        </div>
        <img src={image1} alt="Plants monitoring" className="main-img" />
        <div className="scroll-arrow">
          <svg id="more-arrows">
          <polygon className="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 " /> 
          <polygon className="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 " /> 
          <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 " />
          </svg>
        </div>
      </div>
      <div className='container_2'>
        <div className="info">
          <h2>Track Multiple Plants</h2>
          <p className="project-description">
            GrowByte helps you monitor your plants soil <strong>hydration</strong>, <strong>temperature</strong>, and <strong>light</strong> levels, keeping your plants happy and healthly. You can manage your plants <strong>anytime</strong>, from <strong>anywhere</strong>, making plant care simple and efficent.
          </p>
        </div>
        <div className="mock-cards">
          <div className="plant-card">
            <h2>Fiddle Leaf Fig</h2>
            <div>
              <h1 className="card-heading">Soil Hydration</h1>
              <Knob width={120} height={120} initialValue={75} min={0} max={100} readOnly={true} />
            </div>
            <div className="temp">
              <h1 className="card-heading">Soil Temp</h1>
              <img src={image3} width="50px" height="50px" alt="temp icon" />
              <p>72°F</p>
            </div>
            <div className="light">
              <h1 className="card-heading">Light</h1>
              <img src={image4} width="50px" height="50px" alt="light icon" />
              <p>Medium</p>
            </div>
          </div>

          <div className="plant-card">
            <h2>Snake Plant</h2>
            <div>
              <h1 className="card-heading">Soil Hydration</h1>
              <Knob width={120} height={120} initialValue={60} min={0} max={100} readOnly={true} />
            </div>
            <div className="temp">
              <h1 className="card-heading">Soil Temp</h1>
              <img src={image3} width="50px" height="50px" alt="temp icon" />
              <p>68°F</p>
            </div>
            <div className="light">
              <h1 className="card-heading">Light</h1>
              <img src={image4} width="50px" height="50px" alt="light icon" />
              <p>Low</p>
            </div>
          </div>

          <div className="plant-card">
            <h2>Monstera Deliciosa</h2>
            <div>
              <h1 className="card-heading">Soil Hydration</h1>
              <Knob width={120} height={120} initialValue={80} min={0} max={100} readOnly={true} />
            </div>
            <div className="temp">
              <h1 className="card-heading">Soil Temp</h1>
              <img src={image3} width="50px" height="50px" alt="temp icon" />
              <p>70°F</p>
            </div>
            <div className="light">
              <h1 className="card-heading">Light</h1>
              <img src={image4} width="50px" height="50px" alt="light icon" />
              <p>Medium</p>
            </div>
          </div>
        </div>
        <div className="scroll-arrow">
          <svg id="more-arrows">
            <polygon className="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 " />
            <polygon className="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 " />
            <polygon className="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 " />
          </svg>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* Enable snap scrolling on the wrapper */
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  .mock-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-left: 4rem; /* adds space between text and first card */
  }
  
  /* Pyramid effect: raise the middle card */
  .mock-cards .plant-card:nth-child(2) {
    transform: translateY(-20px); /* move the middle card up */
  }
  
  .mock-cards .plant-card {
    background-color: var(--beige);
    padding: 1.5rem;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    text-align: center;
    width: 250px;
    color: var(--brown);
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* smooth animation */
  }
  
  .mock-cards .plant-card:hover {
    transform: translateY(-10px) scale(1.03); /* lift and slightly enlarge */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); /* deeper shadow */
  }  
  
  nav {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    position: fixed;   /* stays on top */
    top: 0;
    left: 0;
    z-index: 10;
    }

  .page,
  .container_2 {
    scroll-snap-align: start;   /* each section snaps */
    height: 100vh;              /* full viewport height */
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;          /* offset for navbar */
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
    display: block;
    width: 100%;           /* take full width of its container */
    max-width: 700px;      /* optional: set a larger max width */
    height: auto;          /* maintain aspect ratio */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .page img:hover {
    transform: scale(1.05); /* subtle zoom on hover */
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

  @media (min-width: 992px) {
    .page {
      display: grid;
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
  }
  

  .container_2 {
    scroll-snap-align: start;
    height: 100vh;
    justify-content: center;
    padding: 4rem;
    gap: 2rem;
  }
  
  
  .container_2 .info h2 {
    font-size: 2.5rem;
    font-family: 'Lora', serif;
    margin-bottom: 1rem;
    color: #FFFFFF;
  }
  
  .container_2 .info p {
    font-size: 1.4rem;       /* slightly larger */
    line-height: 2;           /* more spacing for readability */
    max-width: 35em;
    color: #FFFFFF;
    margin-top: 1rem;
  }  
  
  .container_2 .mock-card {
    display: flex;
    justify-content: center;
  }
  
  .container_2 .plant-card {
    background-color: var(--beige); /* same as dashboard */
    padding: 1.5rem;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    text-align: center;
    width: 250px;
    color: var(--brown);
  }
  
  .container_2 .plant-card h2 {
    font-size: 1.5rem;
    color: var(--brown); /* match dashboard heading */
    margin-bottom: 1rem;
  }
  
  .container_2 .plant-card .card-heading {
    font-size: 1.2rem;
    color: var(--brown); /* same as dashboard */
    margin-top: 0.5rem;
  }
  
  .project-description {
    font-size: 1.4rem;    /* slightly larger */
    line-height: 2;       /* more space between lines */
    color: #FFFFFF;
    max-width: 35em;
    margin-top: 1rem;
  }

  @media (min-width: 992px) {
    .page {
      display: grid;
      grid-template-columns: 1fr 500px; /* optionally make the image wider */
      column-gap: 5rem;                 /* increases space between text and image */
    }
    .scroll-arrow {
      position: absolute;
      bottom: .5rem;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      animation: bounce 2s infinite;
    }
    
    .scroll-arrow svg {
      width: 100px;
      height: 100px;
      fill: #fff;
      opacity: 0.8;
      transition: opacity 0.3s ease;
    }
    
    .scroll-arrow:hover svg {
      opacity: 1;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    
    

`;


export default Landing;
