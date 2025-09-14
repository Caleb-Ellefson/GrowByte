import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import customFetch from '../utils/customFetch'; // Assuming you use customFetch for API calls
import { toast } from 'react-toastify';
import NavBar from '../components/Nav'

const AddPlantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    deviceId: '',
  });

  const navigate = useNavigate(); // For redirecting after success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customFetch.post('/devices', formData);
      if (response.status === 201) {
        toast.success('Plant added successfully!');
        navigate('/dashboard'); // Redirect to dashboard on success
      }
    } catch (error) {
      console.error('Error adding plant:', error);
      toast.error('Failed to add plant. Please try again.');
    }
  };

  return (
    <Wrapper>
      <NavBar />
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add New Plant</h2>
        <div className="form-row">
          <label htmlFor="name">Device Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter plant name"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="deviceId">Device ID</label>
          <input
            type="text"
            id="deviceId"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            placeholder="Enter device ID"
            required
          />
        </div>
        <button type="submit" className="btn">
          Add Plant
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .form {
    background-color: var(--cream);
    border-radius: var(--borderRadius);
    padding: 2rem;
    box-shadow: var(--shadow-2);
    width: 100%;
    max-width: 400px;
  }

  h2 {
    text-align: center;
    color: var(--brown);
    font-family: var(--heading-font);
    margin-bottom: 1.5rem;
  }

  .form-row {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 1rem;
      font-family: var(--body-font);
      color: var(--brown);
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid var(--grey-400);
      border-radius: var(--borderRadius);
      background-color: var(--grey-50);
    }

    input:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 3px var(--primary-500);
    }
  }

  .btn {
    display: block;
    width: 100%;
    background-color: var(--brown);
    color: var(--cream);
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: var(--borderRadius);
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--beige);
    }
  }
`;

export default AddPlantForm;
