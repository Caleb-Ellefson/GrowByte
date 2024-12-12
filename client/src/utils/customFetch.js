import axios from 'axios';

const customFetch = axios.create({
  baseURL: '/api/v1',
  withCredentials: true, // Include cookies if necessary
});

customFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors gracefully
    if (error.response && error.response.status === 401) {
      console.log('Unauthenticated: Redirecting to login or showing limited access.');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default customFetch;
