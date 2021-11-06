import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import {Link} from "react-router-dom";

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
}));

function MainContent() {
  const classes = useStyles();

  return (
    <main className={classes.fullWidth}>
      <div className={classes.toolbar} />
      <div className={classes.title}>
        <Typography variant='h6'>Collecting data for COVID-19 Patients</Typography>
      </div>
      <div className={classes.content}>
        <Button component={Link} to="/selfassessment" variant="contained">
          Self Assessment Test
        </Button>
      </div>
    </main>
  );
}

export default MainContent;
