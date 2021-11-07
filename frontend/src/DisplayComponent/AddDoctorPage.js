import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../SharedComponent/Header';
import AddDoctor from '../ManagerComponent/AddDoctor';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function AddDoctorPage() {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <AddDoctor />
    </div>
  );
}

export default AddDoctorPage;
