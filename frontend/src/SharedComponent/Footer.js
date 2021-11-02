import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Typography, MenuItem, Toolbar }  from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
  footer: {
    marginLeft: 20,
    fontSize: 17,
  },
  subFooter: {
    marginLeft: 10,
    fontSize: 15,
  }
}));

function Footer() {
  const classes = useStyles();
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <MenuItem>
          <Typography variant='h6' className={classes.footer}>
            Concordia University, Montreal, Quebec
          </Typography>
        </MenuItem>
        <MenuItem style={{ marginLeft: "auto", marginRight: -12 }}>
          <Typography variant='h6' className={classes.footer}>
            SOEN 6841 Fall 2021
          </Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
