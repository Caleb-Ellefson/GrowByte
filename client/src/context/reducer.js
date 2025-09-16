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
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,

}
from './actions.js'

import { initialState } from "./appContext"



const reducer = ( state, action) => {

    if (action.type === DISPLAY_ALERT) {
        return {
          ...state,
          showAlert: true,
          alertType: 'danger',
          alertText: 'Please provide all values!',
        };
      }
      if (action.type === CLEAR_ALERT) {
        return {
          ...state,
          showAlert: false,
          alertType: '',
          alertText: '',
        };
      }
    
      if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
      }
      if (action.type === SETUP_USER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: 'success',
          alertText: action.payload.alertText,
        };
      }
      if (action.type === SETUP_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }

      if (action.type === LOGOUT_USER) {
        return {
          ...initialState,
          userLoading: false,
        };
      }

      if (action.type === HANDLE_CHANGE) {
        return {
          ...state,
          page: 1,
          [action.payload.name]: action.payload.value,
        };
      }

      if (action.type === CLEAR_VALUES) {
        const initialState = {
          stratDescription: '',
          stratName: '',
          Team: 'Both',
          status: 'Pending',
        };
    
        return {
          ...state,
          ...initialState,
        };
      }


    if (action.type === TEAM_CT){
        return{
            ...state,
            ct: true,
            t: false,
        }
    }

    if (action.type === TEAM_T){
        return{
            ...state,
            t: true,
            ct: false,
        }
    }

    if (action.type === DUST){
        return{
            vertigo: false,
            train: false,
            overpass: false,
            office: false,
            nuke: false,
            mirage: false,
            inferno: false,
            dust: true,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }

    if (action.type === ANCIENT){
        return{
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
            ancient: true,
        }
    }

    if (action.type === ANUBIS){
        return{
            vertigo: false,
            train: false,
            overpass: false,
            office: false,
            nuke: false,
            mirage: false,
            inferno: false,
            dust: false,
            cache: false,
            anubis: true,
            ancient: false,
        }
    }

    if (action.type === INFERNO){
        return{
            vertigo: false,
            train: false,
            overpass: false,
            office: false,
            nuke: false,
            mirage: false,
            inferno: true,
            dust: false,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }

    if (action.type === NUKE){
        return{
            vertigo: false,
            train: false,
            overpass: false,
            office: false,
            nuke: true,
            mirage: false,
            inferno: false,
            dust: false,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }


    if (action.type === OFFICE){
        return{
            vertigo: false,
            train: false,
            overpass: false,
            office: true,
            nuke: false,
            mirage: false,
            inferno: false,
            dust: false,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }

    if (action.type === OVERPASS){
        return{
            vertigo: false,
            train: false,
            overpass: true,
            office: false,
            nuke: false,
            mirage: false,
            inferno: false,
            dust: false,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }

    if (action.type === MIRAGE){
        return{
            vertigo: false,
            train: false,
            overpass: false,
            office: false,
            nuke: false,
            mirage: true,
            inferno: false,
            dust: false,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }

    if (action.type === TRAIN){
        return{
            vertigo: false,
            train: true,
            overpass: false,
            office: false,
            nuke: false,
            mirage: false,
            inferno: false,
            dust: false,
            cache: false,
            anubis: false,
            ancient: false,
        }
    }

    if (action.type === VERTIGO){
        return{
            vertigo: true,
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
        }
    }
    



    throw new Error(`no such action : ${action.type}`)
}


export default reducer