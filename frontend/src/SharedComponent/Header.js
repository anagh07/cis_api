import React, {Component} from 'react';
import { StyleSheet, css } from 'aphrodite';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MenuItem } from '@material-ui/core';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

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


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  token: state.auth.token,
  user: state.auth.user,
});

console.log(localStorage.token, mapStateToProps.isAuthenticated);

class Header extends Component {
  constructor(props) {
    super(props);    
  }

  
handleLogout = (event) => {
  localStorage.clear();
  window.location.href = '/';
}

  render() {
    return (
      <AppBar position='fixed' className={css(styles.appBar)}>
      <Toolbar>
        <MenuItem>
          <Link to="/" className={css(styles.menuLink)}>
            COVID Info System
          </Link>
        </MenuItem>
        { ( (localStorage.token === '') || (!localStorage.token)|| (this.props.isAuthenticated === false)  )?
        <div style={{ marginLeft: "auto", marginRight: -12 }}>
            <Link to="/signup" className={css(styles.menuLink)} style = {{marginRight: "20px"}}>Signup</Link>
            <Link to="/login" className={css(styles.menuLink)} style = {{marginRight: "20px"}}>Login</Link>
        </div>
        :
        <MenuItem style={{ marginLeft: "auto", marginRight: -12 }}>
          <Link to="/" className={css(styles.menuLink)} onClick={this.handleLogout}>Logout</Link>
        </MenuItem>
        }
      </Toolbar>
    </AppBar>

    );
  }
}

export default connect(mapStateToProps, {})(Header);
