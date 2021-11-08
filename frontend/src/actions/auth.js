import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispath) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('https://cis-6841.herokuapp.com/auth');
    console.log(res.data);
    dispath({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispath({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        'https://bug-task-tracker.herokuapp.com/api/users',
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Load user
      dispatch(loadUser());
    } catch (err) {
      // Get errors array sent by api
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => console.log(error));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    console.log(body);
    const res = await axios.post('https://cis-6841.herokuapp.com/auth', body, config);
    console.log(res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Load user
    // dispatch(loadUser());
  } catch (err) {
    // Get errors array sent by api
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => console.log(error));
    // }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
