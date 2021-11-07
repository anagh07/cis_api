import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <TableRow>
        <TableCell>{this.props.details.firstName}</TableCell>
        <TableCell>{this.props.details.lastName}</TableCell>
        <TableCell>{this.props.details.email}</TableCell>
        <TableCell>
          <button
            onClick={(event) => {this.props.deleteTask(this.props.index)}}
            className="Delete-button">
            Remove
          </button>
        </TableCell>
      </TableRow>
    )
  }
}

export default TodoItem;
