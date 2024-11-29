import React from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircle } from "react-icons/io";
import styled from 'styled-components';
import { Ct , T, Both } from '../assets/images/Images.js'
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

const Strat = ({
    _id,
    stratName,
    Team,
    stratDescription,
    statusOptions,
}) => {
    const navigate = useNavigate()

    const stratPicture = () => {
        if (Team === 'T'){
            return( <img className='main-icon' src={Ct} alt='logo'/>)
        }
        if (Team == 'CT'){

            return (<img  className='main-icon' src={T} alt='logo'/>)
        }
        else return (<img  className='main-icon' src={Both} alt='logo'/>)

    }

    const updateStrat = async () => {
      try {
        await customFetch.patch(`/strats/${_id}`)
        toast.success('Job Added')

        return navigate('/admin');
      } catch (error) {
        toast.error('Error adding strat.')
        return error
      }
    } 

    const deleteStrat = async ()  => {
      try {
        await customFetch.delete(`/strats/${_id}`)
        toast.success('Strat deleted')
        return navigate('/admin')
      } catch (error) {
        toast.error('Error deleting Strat.')
        return error
      }
    } 
    

  return (
    <Wrapper>
        <div className='tain'>
            <header>
                <div className='main-icon'>
                    {stratPicture()}   
                </div>
                <div className='info'>
                    <h5>{stratName}</h5>
                    <p>{stratDescription}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <button className='job-icon' onClick={()=> updateStrat(_id)}><IoMdCheckmarkCircle /></button>
                    <button className='job-icon'onClick={()=> deleteStrat(_id)}><ImCancelCircle /></button>

                </div>

            </div>
        </div>

    </Wrapper>
  )
}

const Wrapper = styled.article`
background-color: white;
max-width: 100vw;
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;

    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
      font-size: 20px;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 25px;


    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }

  .job-icon {
    font-size: 30px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
    transition: transform 0.2s ease-in-out; 
  }
  .job-icon:hover{
    transform: scale(1.05); 
  }
`;

export default Strat