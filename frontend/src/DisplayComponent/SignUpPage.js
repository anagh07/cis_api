import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../SharedComponent/Header';
import SignUpContent from '../SharedComponent/SignUpContent';

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
      <SignUpContent />
    </div>
  );
}

export default Login;
