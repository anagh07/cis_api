import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

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
      <Footer />
    </div>
  );
}

export default HomePage;
