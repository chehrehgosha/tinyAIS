//Login User
import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESSFUL,
  USER_LOADED,
  AUTH_ERROR,
  FILE_UPLOADED,
} from "./types";

//update logo and cover
export const upload = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users/upload", formData, config);
    console.log(res)
    dispatch({
      type: FILE_UPLOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
  }
};
