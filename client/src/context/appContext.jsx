import React, { useReducer, useContext } from 'react';
import reducer from "./reducer"
import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  CLEAR_VALUES,




} from "./actions"


 const initialState = {
    statusOptions: ['Pending', 'Accepted'],
    stratDescription:'',
    stratName:'',
    team:'Both',
    status:'Pending'

  
  }

  const AppContext = React.createContext()

  const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
//ALERTS
    const displayAlert = () => {
      dispatch({ type: DISPLAY_ALERT });
      clearAlert();
    };

    const clearAlert = () => {
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 3000);
    };
  


    const handleChange = ({ name, value }) => {
      dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
    };

    const clearValues = () => {
      dispatch({ type: CLEAR_VALUES });
    };


    return (
        <AppContext.Provider
            value={{
                ...state,
                clearValues,
                handleChange,
                displayAlert,
                clearAlert,

            }}
        >
            {children}
        </AppContext.Provider>
    )   
  }
  
const useAppContext = () => {
    return useContext(AppContext)
  }

  export { AppProvider, useAppContext, initialState }