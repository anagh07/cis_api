import React, { Component, useState } from 'react';
import { Grid } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { register, loadUser } from '../actions/auth';


export const styles = StyleSheet.create({
  root: {
    border: '1px solid #edf4f9',
    padding: '15px 50px',
    marginTop: '10%',
  },
  heading: {
    textAlign: 'center',
    marginTop: '8%',
    fontWeight: 'bold',
  },
  optionStyle: {
    fontSize: '15px',
  },
  linkTag: {
    color: '#55967e',
    fontWeight: 'bold',
    padding: '5px 0 10px 5px',
    width: '100%',
    ':hover': {
      color: '#285943',
      textDecoration: 'none',
    },
  },
  signupText: {
    paddingBottom: '5px',
  },  
});

const SignUpContent = (props) => {
  const [formData, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    dob: '',
    phone: '',
    address: '',
    email: '',
    role: '',
    password: '',
    retypePassword: '',
  });

  const {
    email,
    password,
    first_name,
    last_name,
    dob,
    role,
    retypePassword,
    phone,
    address,
  } = formData;

  const handleChange = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role == 'manager') {
      props.register({
        first_name,
        last_name,
        email,
        password,
        role,
      });
    } else
      props.register({
        first_name,
        last_name,
        email,
        dob,
        password,
        role,
        phone,
        address,
      });
  };

  if (props.isAuthenticated != false && props.user != null) {
    // redirect to dashboard
    // props.loadUser();
    console.log(props.user);
    if (props.user.auth === 'patient') {
      // redirect to patient dashboard
      return <Redirect to='/patientdashboard' />;
    } else if (props.user.auth === 'manager') {
      // redirect to manager dashboard
      return <Redirect to='/manager_dashboard' />;
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs></Grid>
      <Grid item xs={4} className={css(styles.root)}>
        <h3 className={css(styles.heading)}>SIGNUP</h3>
        <hr />
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          
          <label class="required">First Name </label>
          <input
            name='first_name'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={first_name}
            className='Input-style'
          />
          <br />
          <label class="required">Last Name </label>
          <input
            name='last_name'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={last_name}
            className='Input-style'
          />
          <br />
          <label class="required">Date of Birth </label>
          <input
            name='dob'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={dob}
            className='Input-style'
          />
          <br />
          <br />
          <label class="required">Address </label>
          <input
            name='address'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={address}
            className='Input-style'
          />
          <br />
          <br />
          <label class="required">phone </label>
          <input
            name='phone'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={phone}
            className='Input-style'
          />
          <br />
          <label class="required">Email Address </label>
          <input
            name='email'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={email}
            className='Input-style'
          />
          <br />
          <label class="required">Role </label>
          <br />
          <select
            name='role'
            onSelect={(e) => handleChange(e)}
            defaultValue='patient'
            onChange={(e) => {
              handleChange(e);
            }}
            value={role}
            className='Input-style'
          >
            <option value=''>Choose Option</option>
            <option value='patient'>Patient</option>
            <option value='manager'>Manager</option>
            <option value='doctor'>Doctor</option>
            <option value='nurse'>Nurse</option>
          </select>
          <br />
          <label class="required">Password </label>
          <input
            name='password'
            onChange={(e) => {
              handleChange(e);
            }}
            type='password'
            value={password}
            className='Input-style'
          />
          <br />
          <label class="required">Re-type Password </label>
          <input
            name='retypePassword'
            onChange={(e) => {
              handleChange(e);
            }}
            type='password'
            value={retypePassword}
            className='Input-style'
          />
          <br />
          <button className='Form-button'>SIGNUP</button>
          <br />
          <div className={css(styles.signupText)}>
            Already have an account?
            <Link className={css(styles.linkTag)} to='/login'>
              Login
            </Link>
          </div>
        </form>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { register, loadUser })(SignUpContent);
