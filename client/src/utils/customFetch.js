import axios from 'axios';

const customFetch = axios.create({
  baseURL: '/api/v1', // Matches the Vite proxy configuration
});

export default customFetch;