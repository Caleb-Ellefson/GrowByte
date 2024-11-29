import styled from 'styled-components';
import Reroll from '../assets/images/reroll.png';
import Typewriter from '../components/TyperWriter';
import Nav from '../components/Nav'
import { useState } from 'react';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/strats/all");
    return { data };
  } catch (error) {
    toast.error("Something went wrong getting strats");
    return 1;
  }
};

const Strat = () => {
  const { data } = useLoaderData();
  const { strat } = data;

  const [randomIndex, setRandomIndex] = useState(0); // Initialize with 0
  const [rerenderKey, setRerenderKey] = useState(0); // Add a rerender key to clear Typewriter


  const handleReroll = () => {
    const newIndex = Math.floor(Math.random() * strat.length);
    setRandomIndex(newIndex); // Update the random index
    setRerenderKey(prevKey => prevKey + 1); // Increment the rerender key
  }

  const handleNextStrat = () => {
    const newIndex = Math.floor(Math.random() * strat.length);
    setRandomIndex(newIndex); // Update the random index
    setRerenderKey(prevKey => prevKey + 1); // Increment the rerender key
  }
  return (
    <div className='under-color'>
      <div className='main-color'>
        <Wrapper>
          <Nav />
          <div className='body'>
            <h1 className='header'>0 - 16</h1>
            <div className='container-main'>
              <div className='screen'>
                <div className='text-container' key={rerenderKey}>
                  <h1 className='typeHeader'>
                    <Typewriter text={`Mission: ${strat[randomIndex]?.stratName}`} delay={100} />
                  </h1>
                  <p className='type'>
                    <Typewriter text={strat[randomIndex]?.stratDescription} delay={100} />
                  </p>
                </div>
              </div>
            </div>
            <div className='button-container'>
              <button className='buttons' onClick={handleReroll}>
                <img className='dice' draggable="false" src={Reroll} alt='reroll' />
                <h4 className='reroll'>REROLL</h4>
              </button>
              <button className='buttons' onClick={handleNextStrat}>
                <h4>NEXT STRAT</h4>
              </button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};




const Wrapper = styled.div`

  .body{
    width: 100%;
    height: calc(100vh - 220px);
  }
  .container-main {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .screen {
    width: 90%;
    max-width: 800px;
    height: 450px;
    background-color: black;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0px 0px 20px black;
    border: 10px solid #2C394B;
  }

  .header {
    text-align: center;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    margin-bottom:20px;
    font-family: var(--main-font);
    color: white;
    font-size: 4vw;
  }

  .button-container {
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: space-evenly;
    align-items: center;
  }

  .buttons {
    padding: .5rem;
    box-shadow: 0px 2px 15px black;
    margin-top: 20px;
    display: flex;
    width: 40%;
    max-width: 200px;
    height: 50px;
    align-items: center;
    justify-content: center;
    font-family: var(--main-font);
    border-radius: 10px;
    font-size: 1.25vw;
    font-weight: 700;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    border: none;
  }

  .buttons:hover {
    background-color: #333; /* Change to your desired hover background color */
    color: white; /* Change to your desired hover text color */
    border-radius: none;
  }

  .dice {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }

  .reroll {
    font-size: 1.5vw;
    font-weight: 700;
  }

  .type{
    margin-top: 30px;
    font-size: 24px;
    text-indent: 30px;
    color:#4AF626;
    font-family: var(--main-font);
  }
  .typeHeader{
    margin-top: 30px;
    font-size: 32px;
    text-indent: 30px;
    color:#4AF626;
    font-family: var(--main-font);
  }


  @media (max-width: 768px) {
    .header {
      font-size: 5vw;
    }
    .buttons {
      font-size: 3vw;
    }
    .reroll {
      font-size: 3.2vw;
    }
  }
`;

export default Strat;
