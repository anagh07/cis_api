import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, doctor_name, nurse_name, address) {
  return {id, date, doctor_name, nurse_name, address };
}

const rows = [
  createData(0, '16 Mar, 2021', 'doctor1', 'nurse1', 'address1'),
  createData(1, '10 Jun, 2021', 'doctor2', 'nurse2', 'address2'),
  createData(2, '29 Dec, 2021', 'doctor3', 'nurse3', 'address3') 
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Appointments() {
  return (
    <React.Fragment>
      <Title>Your Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Doctor Name</TableCell>
            <TableCell>Nurse Name</TableCell>
            <TableCell>Address</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.doctor_name}</TableCell>
              <TableCell>{row.nurse_name}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more appointments
      </Link>
    </React.Fragment>
  );
}
