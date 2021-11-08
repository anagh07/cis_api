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
  ({ first_name, last_name, dob, email, password, phone, address, role }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(role);
    let body = null;
    if (role == 'manager') {
      body = JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        admin_key: 'tintinadmin',
      });
      console.log(body);
    } else {
      body = JSON.stringify({
        first_name,
        last_name,
        dob,
        email,
        password,
        address,
        phone,
      });
    }

    try {
      const res = await axios.post(
        'https://cis-6841.herokuapp.com/' + role,
        body,
        config
      );
      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Load user
      dispatch(loadUser());
    } catch (err) {
      // Get errors array sent by api
      //   const errors = err.response.data.errors;
      //   if (errors) {
      //     errors.forEach((error) => console.log(error));
      //   }

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
    const res = await axios.post('https://cis-6841.herokuapp.com/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Load user
    dispatch(loadUser());
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
