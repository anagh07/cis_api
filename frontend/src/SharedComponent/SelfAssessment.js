import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Paper } from '@material-ui/core';
import {Link} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
}));

function SelfAssessment() {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.toolbar} />
      <Paper style = {{margin : "40px"}}>

      <div className={classes.content}>
        <div className={classes.title}>
          <Typography variant='h4'>SelfAssessment </Typography>
        </div>
          <FormControl>
            <div className = {classes.questions}><h3>Question1 : </h3>
              <p>Are you having difficulty breathing? For example, do you feel like you’re out of breath or suffocating?
              <br></br><b>OR</b><br></br>
              Do you have a lot of trouble breathing even when at rest, such as shortness of breath that makes it hard to speak?
              </p>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                style={{float: "right"}}
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

            <div className = {classes.questions}><h3>Question2 : </h3>              
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
                value={alignment}
                exclusive
                onChange={handleChange}
                style={{float: "right"}}
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

            <div className = {classes.questions}><h3>Question3 : </h3>              
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
                value={alignment}
                exclusive
                onChange={handleChange}
                style={{float: "right"}}
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

            <div className = {classes.questions}><h3>Question4 : </h3>              
              <p>Are you or the person who is going to get tested in one of the situations below?
              •	Is 0 to 3 months old
•	Is experiencing an obstruction of nasal passages other than normal congestion
•	Is currently having a nosebleed episode
•	Has had a nosebleed episode in the past week
•	Has undergone any of the following types of surgery:
•	Mouth surgery in the past week?
•	Nose surgery in the past month (adult) OR
•	Nose surgery in the past 3 weeks (child)
•	Is currently wheezing

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
                value={alignment}
                exclusive
                onChange={handleChange}
                style={{float: "right"}}
              >
                <ToggleButton value="yes">Yes</ToggleButton>
                <ToggleButton value="no">No</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Divider></Divider>

          </FormControl>          
        </div>
      </Paper>



      <Footer />
    </div>
    
  );
}

export default SelfAssessment;