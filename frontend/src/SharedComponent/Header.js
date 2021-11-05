import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MenuItem } from '@material-ui/core';
import { Link } from "react-router-dom";

export const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#1ea694",
  },
  menuItem: {
    marginLeft: "10px",
  },
  menuLink: {
    color: "white",
    textDecoration: "none",
  }
});

function Header() {
  return (
    <AppBar position='fixed' className={css(styles.appBar)}>
      <Toolbar>
        <MenuItem>
          <Link to="/" className={css(styles.menuLink)}>
            COVID Info System
          </Link>
        </MenuItem>
        <MenuItem style={{ marginLeft: "auto", marginRight: -12 }}>
          <Link to="/signup" className={css(styles.menuLink)}>Signup</Link>
        </MenuItem>
        <MenuItem className={css(styles.menuItem)}>
          <Link to="/login" className={css(styles.menuLink)}>Login</Link>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
