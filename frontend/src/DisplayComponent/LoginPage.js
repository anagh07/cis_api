import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../SharedComponent/Header';
import LoginContent from '../SharedComponent/LoginContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <LoginContent />
    </div>
  );
}

export default Login;
