import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    try {
      const response = await customFetch.get('/api/v1/plants');
      setPlants(response.data.plants);
    } catch (error) {
      console.error('Error fetching plants:', error);
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
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <h2>{plant.name}</h2>
            <p>Hydration: {plant.hydration}%</p>
          </div>
        ))}
        {plants.length === 0 && (
          <p className="no-plants">No plants found. Add a new plant to get started!</p>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem;
  min-height: 100vh;
  background-color: var(--cream);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      color: var(--brown);
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
        color: var(--dark-gray);
        font-family: var(--body-font);
      }
    }

    .no-plants {
      grid-column: span 3;
      text-align: center;
      color: var(--dark-gray);
      font-size: 1.2rem;
    }
  }
`;

export default Dashboard;
