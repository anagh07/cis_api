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

function Login() {
  const classes = useStyles();

  return (
    <div>
      This is login page
    </div>
  );
}

export default Login;
