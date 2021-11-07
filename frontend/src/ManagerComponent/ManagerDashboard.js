import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

class ManagerDashboardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container spacing={12} className="root">
        <Grid item xs></Grid>
        <Grid item xs={10}>
          <h2 className="heading">Manager Dashboard</h2>
          <Card>
            <CardContent>
              <h3>Doctors Details:</h3>
              <CardActions>
                <Link to="/add_doctor">Add Doctor</Link>
              </CardActions>
              <div className="Text-default">
                <h4>Pending Doctors</h4>
                  <ul>
                    <li>
                      <span className="space-5x">Peg Legge</span>
                      <button className="Default-button">Add</button>
                    </li>
                    <li>
                      <span className="space-5x">Teri Dactyl</span>
                      <button className="Default-button">Add</button>
                    </li>
                    <li>
                      <span className="space-5x">Allie Grater</span>
                      <button className="Default-button">Add</button>
                    </li>
                  </ul>
              </div>
              <div>
                <h4>Active Doctors</h4>
                <p>Click <Link className="Link-style" to="/add_doctor">here</Link> to see "Active Doctors" or to add a new doctor.</p>
              </div>
            </CardContent>
          </Card>
          <br/>
          <Card>
            <CardContent>
              <h3>Nurses Details:</h3>
              <CardActions>
                <Link to="/add_nurse">Add Nurse</Link>
              </CardActions>
              <div className="Text-default">
                <h4>Pending Nurses</h4>
                  <ul>
                    <li>
                      <span className="space-5x">Peg Legge</span>
                      <button className="Default-button">Add</button>
                    </li>
                    <li>
                      <span className="space-5x">Teri Dactyl</span>
                      <button className="Default-button">Add</button>
                    </li>
                    <li>
                      <span className="space-5x">Allie Grater</span>
                      <button className="Default-button">Add</button>
                    </li>
                  </ul>
              </div>
              <div>
                <h4>Active Nurses</h4>
                <p>Click <Link className="Link-style" to="/add_nurse">here</Link> to see "Active Nurses" or to add a new nurse.</p>
              </div>
            </CardContent>
          </Card>
          <br/>
          <Card>
            <CardContent>
              <h3>Patient Details:</h3>
              <CardActions>
                <Link to="/add_patient">Add Patient</Link>
              </CardActions>
              <div className="Text-default">
                <h4>Pending Patients</h4>
                  <ul>
                    <li>
                      <span className="space-5x">Peg Legge</span>
                      <button className="Default-button">Add</button>
                    </li>
                    <li>
                      <span className="space-5x">Teri Dactyl</span>
                      <button className="Default-button">Add</button>
                    </li>
                    <li>
                      <span className="space-5x">Allie Grater</span>
                      <button className="Default-button">Add</button>
                    </li>
                  </ul>
              </div>
              <div>
                <h4>Active Patients</h4>
                <p>Click <Link className="Link-style" to="/add_patient">here</Link> to see "Active Patients" or to add a new patient.</p>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    );
  }
}

export default ManagerDashboardPage;
