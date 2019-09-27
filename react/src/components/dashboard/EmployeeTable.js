import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
// For later update modal
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import EmployeeService from '../../EmployeeService';

function getModalStyle() {
   const top = 50;
   const left = 50;
 
   return {
     top: `${top}%`,
     left: `${left}%`,
     transform: `translate(-${top}%, -${left}%)`,
   };
 }

const StyledTableCell = withStyles(theme => ({
   head: {
      backgroundColor: '#3f51b5',
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

const useStyles = makeStyles(theme => ({
   root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
   },
   table: {
      minWidth: 700
   },
   fab: {
      margin: theme.spacing(1)
   }
}));

export default function EmployeeTable() {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [modalStyle] = useState(getModalStyle);
   const [employees, setEmployees] = useState([]);

   const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
   useEffect(() => {
      async function fetchData() {
         EmployeeService.SelectAll(onGetEmployeesSuccess, onGetEmployeesError);
      }
      fetchData();
   }, []);

   const onGetEmployeesSuccess = response => {
      console.log('success');
      let data = response.data.map(concatinateName);
      setEmployees(data);
   };

   const onGetEmployeesError = error => {
      console.log('errorss', error.response);
   };

   const concatinateName = employee => {
      employee.Employee = employee.FirstName.concat(' ', employee.LastName);
      return employee;
   };

   const onDeleteEmployeesSuccess = response => {
      console.log('Success');
   };

   const onDeleteEmployeesError = error => {
      console.log('Successful Delete', error.response);
   };

   async function deleteEmployee(employeeId) {
      let res = await EmployeeService.Delete(employeeId);

      // console.log(res.status);
   }

    const handleDelete = (employeeId) => {

      deleteEmployee(employeeId);
      console.log(employeeId);
     
   }
   
   const onEditEmployeeSuccess = response => {
      console.log('Employee Information Updated');
   };

   const onEditEmployeeError = error => {
      console.log('Cannot Update Employee Information', error.response);
   };


   // Test - change to modal
   const handleEdit = (employeeId) => {
      console.log(employeeId);
   }

  
   return (
      <Paper className={classes.root}>
         <Table className={classes.table}>
            <TableHead>
               <TableRow>
                  <StyledTableCell>Employee</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Salary</StyledTableCell>
                  <StyledTableCell>Edit/Delete</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {employees.map(employee => (
                  <StyledTableRow key={employee.Id}>
                     <StyledTableCell component="th" scope="row">
                        {employee.Employee}
                     </StyledTableCell>
                     <StyledTableCell>{employee.Title}</StyledTableCell>
                     <StyledTableCell>{employee.Salary}</StyledTableCell>
                     <StyledTableCell>
                         <Fab onClick={() => handleEdit(employee.Id)} color="primary" aria-label="delete" className={classes.fab}>
                           <EditIcon  />
                        </Fab>
             
                        <Fab onClick={() => handleDelete(employee.Id)} aria-label="delete" className={classes.fab}>
                           <DeleteIcon  />
                        </Fab>
                     </StyledTableCell>
                  </StyledTableRow>
               ))}
            </TableBody>
         </Table>
      </Paper>
   );
}
