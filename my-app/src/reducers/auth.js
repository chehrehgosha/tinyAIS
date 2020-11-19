import {
    LOGIN_SUCCESSFUL,
    LOGIN_FAIL,
    LOGOUT,
    AUTH_ERROR,
    REGISTER_FAIL,
    FILE_UPLOADED
  } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    loggedIn: false,
    isAuthenticated: null,
    loading: true,
    file: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case LOGIN_SUCCESSFUL:
        localStorage.setItem("token", payload.token);
        return {
          ...state,
          ...payload,
          loggedIn: payload.loggedIn,
          isAuthenticated: true,
          loading: false,
        };
      case FILE_UPLOADED:
        return {
          ...state,
          file: payload.file
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case LOGOUT:
      case AUTH_ERROR:
        localStorage.removeItem("token");
        return {
          ...state,
          loggedIn: false,
          token: null,
          isAuthenticated: false,
          loading: false,
          role:null,
        };
      default:
        return state;
    }
  }
  