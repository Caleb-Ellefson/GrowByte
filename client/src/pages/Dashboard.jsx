import React, { useEffect, useState } from 'react';
import NavBar from '../components/Nav';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import image2 from "../assets/flowers.svg";
import image3 from "../assets/temp.png";
import image4 from "../assets/light.png";
import Knob from '../components/pureknob';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  
  const fetchPlants = async () => {
    try {
      const response = await customFetch.get('/devices');
      setPlants(response.data.devices || []); // Ensure `plants` is always an array
    } catch (error) {
      if (error.response?.status === 404) {
        // Gracefully handle 404 by setting plants to an empty array
        setPlants([]);
      } else {
        console.error('Error fetching plants:', error);
        toast.error('Failed to fetch plants. Please try again later.');
      }
    }
  };
  

  const deletePlant = async (id) => {
    try {
      await customFetch.delete(`/devices/${id}`);
      toast.success('Plant deleted successfully!');
      fetchPlants(); // Re-fetch the plants after successful deletion
    } catch (error) {
      console.error('Error deleting plant:', error);
      toast.error('Failed to delete plant. Please try again.');
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Wrapper>
      <header>
        <h1>Your Plants Dashboard</h1>
        <Link to="/add-plant" className="add-btn">
          Add New Plant
        </Link>
      </header>
      <div className="cards-container">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant._id} className="plant-card">
              <h2>{plant.name}</h2>
              <div>
                <h1 className="card-heading">Soil Hydration</h1>
                <Knob
                  width={150}
                  height={150}
                  initialValue={plant.hydration}
                  min={0}
                  max={100}
                  readOnly={true}
                />
              </div>
              <div className="temp">
                <h1 className="card-heading">Soil Temp</h1>
                <img src={image3} width="50px" height="50px" className="temp-img" alt="temp icon" />
                <p>{plant.temperature}°F</p>
              </div>
              <div className="light">
                <h1 className="card-heading">Light</h1>
                <img src={image4} width="50px" height="50px" className="temp-img" alt="light icon" />
                <p>{plant.light}</p>
              </div>
              <button className="delete-btn" onClick={() => deletePlant(plant._id)}>
                Delete Plant
              </button>
            </div>
          ))
        ) : (
          <div className="no-plants">
            <h3>Uh Oh! No plants found.</h3>
            <img src={image2} alt="Plants monitoring" className="main-img" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem;
  min-height: 100vh;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 60px; /* KEEP THIS FOR THE NAV BAR SPACING */

    h1 {
      font-size: 2rem;
      font-family: var(--heading-font);
    }

    .add-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      color: var(--cream);
      background-color: var(--brown);
      border-radius: var(--borderRadius);
      text-decoration: none;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: var(--beige);
        transform: translateY(-3px);
      }
    }
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    min-height: 60vh;

    .plant-card {
      background-color: var(--beige);
      padding: 1.5rem;
      border-radius: var(--borderRadius);
      box-shadow: var(--shadow-2);
      text-align: center;

      h2 {
        font-size: 1.5rem;
        font-family: var(--heading-font);
        color: var(--brown);
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
        font-family: var(--body-font);
      }

      .card-heading {
        font-size: 1.5rem;
        font-family: var(--heading-font);
        color: var(--brown);
        margin-bottom: 1rem;
      }

      .temp-img {
        justify-content: left;
      }

      .delete-btn {
        background-color: #e74c3c;
        color: #fff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--borderRadius);
        font-size: 1rem;
        font-weight: bold;
        margin-top: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #c0392b;
        }
      }
    }

    .no-plants {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      grid-column: 1 / -1;
      height: 100%;

      h3 {
        font-size: 1.8rem;
        font-family: var(--heading-font);
        margin-bottom: 1.5rem;
      }

      .main-img {
        max-width: 50%;
        border-radius: 20px;
        margin-top: 1rem;
      }
    }
  }
`;

export default Dashboard;
