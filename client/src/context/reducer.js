import {
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
    throw new Error(`no such action : ${action.type}`)
}


export default reducer