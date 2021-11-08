import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import DateIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Title from './Title';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { loadUser } from '../actions/auth';

// // Generate Order Data
// function createData(id, date, doctor_name, nurse_name, address) {
//   return {id, date, doctor_name, nurse_name, address };
// }

// const rows = [
//   createData(0, '16 Mar, 2021', 'doctor1', 'nurse1', 'address1'),
//   createData(1, '10 Jun, 2021', 'doctor2', 'nurse2', 'address2'),
//   createData(2, '29 Dec, 2021', 'doctor3', 'nurse3', 'address3')
// ];

const Information = (props) => {
  console.log(props);
  if (!props.user) props.loadUser();
  const { first_name, last_name, dob, email, address, phone } = props.user;
  return (
    <React.Fragment>
      <Title>Account Information</Title>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <PermIdentityIcon style={{ color: '#808080' }} />
          </ListItemAvatar>
          <ListItemText
            primary='Patient Name:'
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {first_name} {last_name}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <DateIcon style={{ color: '#808080' }} />
          </ListItemAvatar>
          <ListItemText
            primary='Date Of Birth:'
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {dob}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <EmailIcon style={{ color: '#808080' }} />
          </ListItemAvatar>
          <ListItemText
            primary='Email :'
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {email}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <PhoneIcon style={{ color: '#808080' }} />
          </ListItemAvatar>
          <ListItemText
            primary='Phone :'
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {phone}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <LocationOnIcon style={{ color: '#808080' }} />
          </ListItemAvatar>
          <ListItemText
            primary='Email :'
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='body2'
                  color='text.primary'
                >
                  {address}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(Information);
