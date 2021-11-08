import React, { Component, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { login, loadUser } from '../actions/auth';

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
  inputStyle: {
    margin: '5px 0 10px 0',
    padding: '5px',
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%',
    height: '40px',
  },
  loginButton: {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    backgroundColor: '#1ea694',
    width: '100%',
    fontSize: '15px',
    color: 'white',
    display: 'block',
    height: '40px',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#579e94',
    },
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

const LoginContent = (props) => {
  const [formData, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.login(email, password);
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

  // if (props.isAuthenticated === true) {
  //   return <Redirect to='/patientdashboard' />;
  // }

  return (
    <Grid container spacing={4}>
      <Grid item xs></Grid>
      <Grid item xs={4} className={css(styles.root)}>
        <h3 className={css(styles.heading)}>LOGIN</h3>
        <hr />
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Email Address:</label>
          <input
            name='email'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            value={email}
            className={css(styles.inputStyle)}
          />
          <br />
          <label>Password:</label>
          <input
            name='password'
            onChange={(e) => {
              handleChange(e);
            }}
            type='password'
            value={password}
            className={css(styles.inputStyle)}
          />
          <br />
          <button className={css(styles.loginButton)}>LOGIN</button>
          <br />
          <div className={css(styles.signupText)}>
            Don't have an account?
            <Link className={css(styles.linkTag)} to='/signup'>
              Sign up
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

export default connect(mapStateToProps, { login, loadUser })(LoginContent);
