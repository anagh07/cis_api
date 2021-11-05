import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Divider from '@mui/material/Divider';

export const styles = StyleSheet.create({
  // toolbar: theme.mixins.toolbar,
  // title: {
  //   flexGrow: 1,
  //   // backgroundColor: theme.palette.background.default,
  //   padding: theme.spacing(3),
  // },
  content: {
    flexGrow: 1,
    padding: "50px",
  },
  fullWidth: {
    width: '100%',
    textAlign: "center",
  },
  questions : {
    margin: '30px',
  },
  paperContent : {
    padding : "40px"
  }
});

class SelfAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q1: "",
      q2: "",
      q3: "",
      q4: ""
    }
  }

  handleToggleChange = (e) => {
    const { name, value } = e.target
    const answer = (value == "yes") ? true : false; 
    this.setState({
      [name]: value
    })
    this.state[e.target.parentNode.getAttribute("id")] =  value;
  }
  
  handleSubmit = (event) => {
    const apiBaseUrl = "https://cis-6841.herokuapp.com/patient/selfassessment";
    const request = {
      a1: (this.state.q1 == "yes") ? true : false,
      a2 :(this.state.q2 == "yes") ? true : false,
      a3 :(this.state.q3 == "yes") ? true : false,
      a4 :(this.state.q4 == "yes") ? true : false,
    }
    axios.interceptors.response.use(null, (error) => {
      return Promise.reject(error);
    });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50Ijp7ImlkIjoxLCJlbWFpbCI6Im1lc3NpQGdtYWlsLmNvbSIsImF1dGgiOiJwYXRpZW50In0sImlhdCI6MTYzNjA1NDQ4MSwiZXhwIjoxNjM2MDkwNDgxfQ.PpHc9MyomliX5DdjbjAvJYSHBGW-0n19ehctO7f95lM";
    const headers = {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }    
    // console.log(request);
    axios.post(apiBaseUrl, request, {
      headers: headers
    })
    .then(function (response) {
      // TODO - Check response from the backend
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { q1, q2, q3, q4 } = this.state;

    return (
      <div className={css(styles.root)}>
      <Header />

      <div className={css(styles.toolbar)} />
      <Paper style = {{margin : "100px"}}>

      <div className={css(styles.content)}>
        <div className={css(styles.title)}>
          <Typography variant='h4'>SelfAssessment </Typography>
        </div>
          <FormControl style={{width:"100%"}}>
            <div className = {css(styles.questions)}><h3>Question1 : </h3>
              <p>Are you having difficulty breathing? For example, do you feel like you’re out of breath or suffocating?
              <br></br><b>OR</b><br></br>
              Do you have a lot of trouble breathing even when at rest, such as shortness of breath that makes it hard to speak?
              </p>
              <ToggleButtonGroup
                color="primary"
                value={this.state.q1}
                exclusive
                onChange={this.handleToggleChange}
                style={{float: "right"}}
                id="q1"
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

            <div className = {css(styles.questions)}><h3>Question2 : </h3>              
              <p>Are you experiencing <b>ANY</b> of the following symptoms?
                <ul>
                  <li>Fever (oral temperature 38.1°C (100.6°F) or higher)</li>
                  <li>Sudden loss of sense of smell (anosmia) without nasal congestion, with or without loss of taste</li>
                  <li>Recent cough or worsening of a chronic cough</li>
                  <li>Shortness of breath</li>
                  <li>Trouble breathing</li>
                  <li>Sore throat</li>
                </ul>
              </p>
              <ToggleButtonGroup
                color="primary"
                value={this.state.q2}
                exclusive
                onChange={this.handleToggleChange}
                style={{float: "right"}}
                id="q2"
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

            <div className = {css(styles.questions)}><h3>Question3 : </h3>              
              <p>Are you experiencing <b>at least 2</b> of the following symptoms?
                <ul>
                  <li>Stomach aches</li>
                  <li>Nausea or vomiting</li>
                  <li>Diarrhea</li>
                  <li>Major fatigue</li>
                  <li>Significant loss of appetite</li>
                  <li>Generalized muscle pain (not related to physical exertion)</li>
                  <li>Headache</li>
                </ul>
              </p>
              <ToggleButtonGroup
                color="primary"
                value={this.state.q3}
                exclusive
                onChange={this.handleToggleChange}
                style={{float: "right"}}
                id="q3"
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

            <div className = {css(styles.questions)}><h3>Question4 : </h3>              
              <p>Are you or the person who is going to get tested in one of the situations below?
                <ul>
                  <li>Is 0 to 3 months old</li>
                  <li>Is experiencing an obstruction of nasal passages other than normal congestion</li>
                  <li>Is currently having a nosebleed episode</li>
                  <li>Has had a nosebleed episode in the past week</li>
                  <li>Has undergone any of the following types of surgery:</li>
                  <ul>
                    <li>Mouth surgery in the past week?</li>
                    <li>Nose surgery in the past month (adult) OR </li>
                    <li>Nose surgery in the past 3 weeks (child)</li>
                  </ul>
                  <li>Is currently wheezing</li>
                </ul>
              </p>
              <ToggleButtonGroup
                color="primary"
                value={this.state.q4}
                exclusive
                onChange={this.handleToggleChange}
                style={{float: "right"}}
                id="q4"
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>

        <Button onClick={this.handleSubmit} variant="contained" style={{width:"20%", margin: '0 auto', display: "flex", backgroundColor: "#1ea694"}}>
          Submit
        </Button>
          </FormControl>          
        </div>
      </Paper>
    </div>

    );
  }
}

export default SelfAssessment