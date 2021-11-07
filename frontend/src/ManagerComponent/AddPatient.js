import { React, Component } from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem';
import { Grid } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class AddPatient extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.state = {
      patients: [],
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      password: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { patients, firstName, lastName, email, dob, password } = this.state;
    patients.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      password: password,
    })
    this.setState({
      patients
    })
  }

  deleteTask = (index) => {
    const patients = this.state.patients;
    patients.splice(index, 1);
    this.setState({
      patients
    })
  }

  render() {
    const { patients, firstName, lastName, email, dob, password } = this.state;
    return(
      <Grid container spacing={12} className="root">
        <Grid item xs={7}>
          <Card>
            <CardContent>
              <h2 className="heading">List of Patients</h2>
              { patients.length <= 0 ?
                <div className="Alert-message heading">No patients has been added. Please add a patient to the list.</div> :
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { patients.map((patient, index) => {

                          return <ListItem key = {index}
                                           index = {index}
                                           deleteTask = {this.deleteTask}
                                           details = {patient}
                                  />
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <h3 className="heading">Add Patient</h3>
              <form>
                <label>First Name:</label>
                <input name='firstName'
                    onChange={this.handleChange}
                    type='text'
                    value={firstName}
                    className="Input-style"
                />
                <br/>
                <label>Last Name:</label>
                <input name='lastName'
                    onChange={this.handleChange}
                    type='text'
                    value={lastName}
                    className="Input-style"
                />
                <br/>
                <label>Date of Birth:</label>
                <input name='dob'
                    onChange={this.handleChange}
                    type='text'
                    value={dob}
                    className="Input-style"
                />
                <br/>
                <label>Email Address:</label>
                <input name='email'
                    onChange={this.handleChange}
                    type='text'
                    value={email}
                    className="Input-style"
                />
                <br/>
                <label>Password:</label>
                <input name='password'
                    onChange={this.handleChange}
                    type='password'
                    value={password}
                    className="Input-style"
                />
                <br/>
                <button className="Form-button" onClick={this.handleSubmit}>ADD PATIENT</button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default AddPatient;
