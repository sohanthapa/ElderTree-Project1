import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
   },
   body: {
      fontSize: 14
   }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.background.default
      }
   }
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
   return { name, calories, fat, carbs, protein };
}

const rows = [
   createData(
      'John Snow',
      'The King in the North',
      80000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Arya Stark',
      'The Faceless Woman',
      75000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Daenerys Targaryen',
      'The Mad Queen',
      90000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Sansa Stark',
      'the Queen of WinterFell',
      65000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   ),
   createData(
      'Sandor Clegane',
      'The Hound',
      55000,
      <div>
         <button>Edit</button>
         <button>Delete</button>
      </div>
   )
];

const useStyles = makeStyles(theme => ({
   root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
   },
   table: {
      minWidth: 700
   }
}));

export default function CustomizedTables() {
   const classes = useStyles();

   return (
      <Paper className={classes.root}>
         <Table className={classes.table}>
            <TableHead>
               <TableRow>
                  <StyledTableCell>Employee</StyledTableCell>
                  <StyledTableCell align="right">Title</StyledTableCell>
                  <StyledTableCell align="right">Salary</StyledTableCell>
                  <StyledTableCell align="right">Edit/Delete</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map(row => (
                  <StyledTableRow key={row.name}>
                     <StyledTableCell component="th" scope="row">
                        {row.name}
                     </StyledTableCell>
                     <StyledTableCell align="right">
                        {row.calories}
                     </StyledTableCell>
                     <StyledTableCell align="right">{row.fat}</StyledTableCell>
                     <StyledTableCell align="right">
                        {row.carbs}
                     </StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </Paper>
   );
}
