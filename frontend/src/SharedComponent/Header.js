import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Face';
import { MenuItem } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <MenuItem>
          <Typography variant='h6' className={classes.title}>
            COVID Info System
          </Typography>
        </MenuItem>
        <MenuItem style={{ marginLeft: "auto", marginRight: -12 }}>

              <Link to="/login" variant='h6'>Login</Link>                        
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
