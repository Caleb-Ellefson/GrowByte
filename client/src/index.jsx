import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Error, Landing, Login, Register, Dashboard, AddPlantForm } from './pages/Index.js';
import { QueryClient } from '@tanstack/react-query';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login.jsx';
import Navbar from './components/Nav'; // Import your Navbar component

// Layout with Navbar
const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet /> {/* Placeholder for child routes */}
  </>
);

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithNavbar />, // Use layout for these routes
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: '/Dashboard', element: <Dashboard /> },
      { path: '/Add-Plant', element: <AddPlantForm /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
