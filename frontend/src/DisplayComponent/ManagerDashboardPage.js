import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../SharedComponent/Header';
import ManagerDashboard from '../ManagerComponent/ManagerDashboard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function ManagerDashboardPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <ManagerDashboard />
    </div>
  );
}

export default ManagerDashboardPage;
