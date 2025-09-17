import { createBrowserRouter,
 RouterProvider
} from 'react-router-dom'
import { Error, Landing, Login, Register, Dashboard, AddPlantForm, VerifyDevice} from './pages/Index.js'
import { QueryClient } from '@tanstack/react-query';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login.jsx'



const router = createBrowserRouter([  
  {
    path:'/',
    element:<Landing />,
    errorElement: <Error />,

  },
  {
    path:'/Login',
    element:<Login/>,
    action: loginAction(QueryClient),
    errorElement: <Error />
  },
  {
    path:'/Register',
    element:<Register/>,
    action: registerAction,
    errorElement: <Error />
  },
  {
  path:'/Dashboard',
  element:<Dashboard/>,
  errorElement: <Error />
},
{
  path:'/Add-Plant',
  element:<AddPlantForm/>,
  errorElement: <Error />
},
{
  path:'/Verify',
  element:<VerifyDevice/>,
  errorElement: <Error />
},
])

const App = () => {

  return (

      <div>
          <RouterProvider router={router} />
      </div>

  )
}

export default App