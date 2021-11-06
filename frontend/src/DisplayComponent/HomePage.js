import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../SharedComponent/Header';
import MainContent from '../SharedComponent/MainContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <MainContent />      
    </div>
  );
}

export default HomePage;
