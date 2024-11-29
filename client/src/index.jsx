import { createBrowserRouter,
 RouterProvider
} from 'react-router-dom'
import {Selection, Map, Strat, Error, Landing, Login, AddStrat, Register, Admin } from './pages/Index.js'
import { QueryClient } from '@tanstack/react-query';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login.jsx'
import { loader as userLoader } from './pages/Admin.jsx'
import { action as submitAction } from './pages/AddStrat.jsx'
import { loader as stratLoader } from './pages/Strat.jsx'



const router = createBrowserRouter([  
  {
    path:'/',
    element:<Landing />,
    errorElement: <Error />,

  },
  {
    path:'/Map',
    element:<Map/>

  },
  {
    path:'/Strat',
    element:<Strat />,
    loader: stratLoader,
  },
  {
    path:'/Selection',
    element:<Selection/>,

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
    path:'/AddStrat',
    element:<AddStrat/>,
    action: submitAction(QueryClient),
  },
  {
    path:'/Admin',
    element:<Admin/>,
    loader: userLoader,
    errorElement: <Error />
  }
])

const App = () => {

  return (

      <div>
          <RouterProvider router={router} />
          
      </div>

  )
}

export default App