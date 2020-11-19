//Login User
import axios from "axios";
import { LOGIN_FAIL, LOGIN_SUCCESSFUL, USER_LOADED, AUTH_ERROR } from "./types";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/users/login", body, config);
    dispatch({
      type: LOGIN_SUCCESSFUL,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const auth = (email, password) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    return dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors)
    return dispatch({
      type: AUTH_ERROR,
    });
  }
};
