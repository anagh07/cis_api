import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fullWidth: {
    width: '100%',
    textAlign: 'center',
  },
}));

const MainContent = (props) => {
  const classes = useStyles();

  const handleClick = (e) => {
    console.log('you rock');
    console.log(props.isAuthenticated);
  };

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
        {/* <Button component={Link} to="/patientdashboard" variant="contained">
          Patient Dashboard
        </Button> */}
      </div>
      {/* <Link to="/manager_dashboard">Manager Dashboard</Link> */}
    </main>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(MainContent);
