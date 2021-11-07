import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Link } from "react-router-dom";

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
      textDecoration: 'none'
    }
  },
  signupText: {
    paddingBottom: '5px'
  },
})

class SignUpContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      role: '',
      password: '',
      retypePassword: '',
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    const authUrl = "";
    const apiBaseUrl = "https://cis-6841.herokuapp.com/auth/";
    // const apiBaseUrl = "http://localhost:5000/cis/auth/";
    const { role } = this.state;
    const request = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      email: this.state.email,
      password :this.state.password,
    }
    axios.interceptors.response.use(null, (error) => {
      return Promise.reject(error);
    });
    const headers = {
      'Content-Type': 'application/json',
    }
    console.log(request);
    if (role === 'manager') {
      authUrl = apiBaseUrl + 'manager';
    } else if (role === 'patient') {
      authUrl = apiBaseUrl + 'patient';
    } else if (role === 'doctor') {
      authUrl = apiBaseUrl + 'doctor';
    } else {
      authUrl = apiBaseUrl + 'nurse';
    }
    axios.post(authUrl, request, {
      headers: headers
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { firstName, lastName, dob, email, password, retypePassword, role } = this.state;
    return (
      <Grid container spacing={4}>
        <Grid item xs></Grid>
        <Grid item xs={4} className={css(styles.root)}>
          <h3 className={css(styles.heading)}>SIGNUP</h3>
          <hr/><br/>
          <form>
            <label>First Name:</label>
            <input name='firstName'
                onChange={this.handleChange}
                type='text'
                value={firstName}
                className="Input-style"
            />
            <br/>
            <label>Last Name:</label>
            <input name='lastName'
                onChange={this.handleChange}
                type='text'
                value={lastName}
                className="Input-style"
            />
            <br/>
            <label>Date of Birth:</label>
            <input name='dob'
                onChange={this.handleChange}
                type='text'
                value={dob}
                className="Input-style"
            />
            <br/>
            <label>Email Address:</label>
            <input name='email'
                onChange={this.handleChange}
                type='text'
                value={email}
                className="Input-style"
            />
            <br/>
            <label>Role:</label><br/>
            <select name="role" onChange={this.handleChange} value={role} className="Input-style">
              <option value="patient">Patient</option>
              <option value="manager">Manager</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
            </select>
            <br/>
            <label>Password:</label>
            <input name='password'
                onChange={this.handleChange}
                type='password'
                value={password}
                className="Input-style"
            />
            <br/>
            <label>Re-type Password:</label>
            <input name='retypePassword'
                onChange={this.handleChange}
                type='password'
                value={retypePassword}
                className="Input-style"
            />
            <br/>
            <button className="Form-button" onClick={this.handleSubmit}>SIGNUP</button>
            <br/>
            <div className={css(styles.signupText)}>
              Already have an account?
              <Link className={css(styles.linkTag)} to='/login'>Login</Link>
            </div>
          </form>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    );
  }
}

export default SignUpContent
