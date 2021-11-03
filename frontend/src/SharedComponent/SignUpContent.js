import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';

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
    }
  },
})

class SignUpContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
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

  handleSubmit = (event) => {
    const apiBaseUrl = "http://localhost:5000/api/";
    const request = {
      name: this.state.name,
      email: this.state.email,
      password :this.state.password,
      retypePassword: this.state.retypePassword,
    }
    debugger
    console.log(request);
    axios.post(apiBaseUrl + 'signup', request).then(function (response) {
      // TODO - Check response from the backend
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { name, email, password, retypePassword } = this.state;
    return (
      <Grid container spacing={4}>
        <Grid item xs></Grid>
        <Grid item xs={4} className={css(styles.root)}>
          <h3 className={css(styles.heading)}>SIGNUP</h3>
          <hr/><br/>
          <form>
            <label>Name:</label>
            <input name='name'
                onChange={this.handleChange}
                type='text'
                value={name}
                className={css(styles.inputStyle)}
            />
            <br/>
            <label>Email Address:</label>
            <input name='email'
                onChange={this.handleChange}
                type='text'
                value={email}
                className={css(styles.inputStyle)}
            />
            <br/>
            <label>Password:</label>
            <input name='password'
                onChange={this.handleChange}
                type='password'
                value={password}
                className={css(styles.inputStyle)}
            />
            <br/>
            <label>Re-type Password:</label>
            <input name='retypePassword'
                onChange={this.handleChange}
                type='password'
                value={retypePassword}
                className={css(styles.inputStyle)}
            />
            <br/>
            <button className={css(styles.loginButton)} onClick={this.handleSubmit}>SIGNUP</button>
          </form>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    );
  }
}

export default SignUpContent
