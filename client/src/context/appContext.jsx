import React, { useReducer, useContext } from 'react';
import reducer from "./reducer"
import { 
  TEAM_T, 
  TEAM_CT,
  DUST,
  ANCIENT,
  ANUBIS,
  INFERNO,
  NUKE,
  OFFICE,
  OVERPASS,
  MIRAGE,
  TRAIN,
  VERTIGO,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  CLEAR_VALUES,




} from "./actions"


 const initialState = {
    t: false,
    ct: false,
    vertigo: false,
    train: false,
    overpass: false,
    office: false,
    nuke: false,
    mirage: false,
    inferno: false,
    dust: false,
    cache: false,
    anubis: false,
    ancient: false,
    score: '0',
    teamTypeOptions: ['CT', 'T', 'Both'],
    statusOptions: ['Pending', 'Accepted'],
    stratDescription:'',
    stratName:'',
    team:'Both',
    status:'Pending'

  
  }

  const AppContext = React.createContext()

  const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAPS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const selectTeamT = () => {
      dispatch({ type: TEAM_T })
    }

    const selectTeamCT = () => {
      dispatch({ type: TEAM_CT })
    }

    const dust_ = () => {
      dispatch({type: DUST })
    }

    const ancient_ = () => {
      dispatch({type: ANCIENT })
    }

    const anubis_ = () => {
      dispatch({type: ANUBIS })
    }

    const inferno_ = () => {
      dispatch({type: INFERNO })
    }

    const nuke_ = () => {
      dispatch({type: NUKE })
    }

    const office_ = () => {
      dispatch({type: OFFICE })
    }

    const overpass_ = () => {
      dispatch({type: OVERPASS })
    }

    const mirage_ = () => {
      dispatch({type: MIRAGE })
    }

    const train_ = () => {
      dispatch({type: TRAIN })
    }

    const vertigo_ = () => {
      dispatch({type: VERTIGO })
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ALERTS

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const displayAlert = () => {
      dispatch({ type: DISPLAY_ALERT });
      clearAlert();
    };

    const clearAlert = () => {
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERT });
      }, 3000);
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  


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
                selectTeamCT,
                selectTeamT,
                dust_,
                ancient_,
                anubis_,
                inferno_,
                nuke_,
                office_,
                overpass_,
                mirage_,
                train_,
                vertigo_,
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