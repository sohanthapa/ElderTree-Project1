/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import { mainListItems } from './listItems';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';
import EmployeeTable from './EmployeeTable';
import EmployeeService from '../../services/EmployeeService';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
   root: {
      display: 'flex'
   },
   toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
   },
   toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      })
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   menuButton: {
      marginRight: 36
   },
   menuButtonHidden: {
      display: 'none'
   },
   title: {
      flexGrow: 1
   },
   drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen
      })
   },
   drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
         width: theme.spacing(9)
      }
   },
   appBarSpacer: theme.mixins.toolbar,
   content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto'
   },
   container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
   },
   paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
   },
   fixedHeight: {
      height: 240
   }
}));

export default function Dashboard() {
   const classes = useStyles();
   const [open, setOpen] = useState(true);

   const [addModalVisible, setAddModalVisible] = useState(false);
   const [editModalVisible, setEditModalVisible] = useState(false);

   // single employee data
   const [id, setId] = useState();
   const [fName, setfName] = useState();
   const [lName, setlName] = useState();
   const [birthDate, setBirthDate] = useState();
   const [salary, setSalary] = useState();
   const [jobTitle, setJobTitle] = useState();
   const [gender, setGender] = useState();
   const [employees, setEmployees] = useState([]);
   const [employee, setEmployee] = useState({});

   const concatinateName = employee => {
      // eslint-disable-next-line no-param-reassign
      employee.Employee = employee.FirstName.concat(' ', employee.LastName);
      return employee;
   };

   useEffect(() => {
      async function fetchData() {
         EmployeeService.SelectAll(onGetEmployeesSuccess, onGetEmployeesError);
      }
      fetchData();
   }, []);

   const onGetEmployeesSuccess = response => {
      console.log('employees', response.data);
      const data = response.data.map(concatinateName);
      setEmployees(data);
   };

   const onGetEmployeesError = error => {
      console.log('Error', error.response);
   };

   const toggleAddModalVisibility = () => {
      console.log('in');
      if (addModalVisible) {
         setAddModalVisible(false);
      } else {
         setAddModalVisible(true);
      }
   };
   const toggleEditModalVisibility = () => {
      if (editModalVisible) {
         setEditModalVisible(false);
      } else {
         setEditModalVisible(true);
      }
   };

   const handleInputChange = event => {
      console.log(event.target.value);
      let newEmployee = null;
      switch (event.target.id) {
         case 'firstName':
            setfName(event.target.value);
            newEmployee = { ...employee, FirstName: event.target.value };
            setEmployee(newEmployee);
            break;
         case 'lastName':
            setlName(event.target.value);
            newEmployee = { ...employee, LastName: event.target.value };
            setEmployee(newEmployee);
            break;
         case 'birthDate':
            setBirthDate(event.target.value);
            newEmployee = { ...employee, DOB: event.target.value };
            setEmployee(newEmployee);

            break;
         case 'salary':
            setSalary(event.target.value);
            newEmployee = { ...employee, Salary: event.target.value };
            setEmployee(newEmployee);

            break;
         case 'jobTitle':
            setJobTitle(event.target.value);
            newEmployee = { ...employee, Title: event.target.value };
            setEmployee(newEmployee);

            break;
         case 'gender':
            setGender(event.target.value);
            newEmployee = { ...employee, Gender: event.target.value };
            setEmployee(newEmployee);

            break;
         default:
            break;
      }
   };

   const onEmployeeSubmitSuccess = response => {
      EmployeeService.SelectAll(onGetEmployeesSuccess, onGetEmployeesError);
   };

   const onEmployeeSubmitError = error => {
      console.log('submit error', error);
   };

   const handleNewEmployeeSubmission = () => {
      const employeeData = {
         Id: '0',
         FirstName: `${fName}`,
         LastName: `${lName}`,
         DOB: `${birthDate}`,
         Salary: `${salary}`,
         Title: `${jobTitle}`,
         Gender: `${gender}`
      };
      console.log('employee data', employeeData);
      EmployeeService.Insert(
         employee,
         onEmployeeSubmitSuccess,
         onEmployeeSubmitError
      );

      toggleAddModalVisibility();
   };

   const handleEditEmployeeSubmission = () => {
      console.log(employee);
      EmployeeService.Update(
         employee.Id,
         employee,
         onEmployeeSubmitSuccess,
         onEmployeeSubmitError
      );

      toggleEditModalVisibility();
   };

   const toggleDrawerState = () => {
      if (open) {
         setOpen(false);
      } else {
         setOpen(true);
      }
   };

   return (
      <div className={classes.root}>
         <CssBaseline />
         <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
         >
            <Toolbar className={classes.toolbar}>
               <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawerState}
                  className={clsx(
                     classes.menuButton,
                     open && classes.menuButtonHidden
                  )}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
               >
                  Elder Tree Dashboard
               </Typography>
            </Toolbar>
         </AppBar>
         <Drawer
            variant="permanent"
            classes={{
               paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
               )
            }}
            open={open}
         >
            <div className={classes.toolbarIcon}>
               <IconButton onClick={toggleDrawerState}>
                  <ChevronLeftIcon />
               </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
         </Drawer>
         <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
               {/* ADD BUTTON */}
               <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={toggleAddModalVisibility}
               >
                  <AddIcon className={classes.iconSmall} />
                  Add Employee
               </Button>

               <AddModal
                  modalState={addModalVisible}
                  handleClose={toggleAddModalVisibility}
                  handleSubmit={handleNewEmployeeSubmission}
                  handleChange={handleInputChange}
                  employee={employee}
               />

               <UpdateModal
                  modalState={editModalVisible}
                  handleClose={toggleEditModalVisibility}
                  handleSubmit={handleEditEmployeeSubmission}
                  handleChange={handleInputChange}
                  employee={employee}
               />

               <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                     <Paper>
                        {/* Employee table */}
                        <Box my={2}>
                           <EmployeeTable
                              toggleEditModalVisibility={
                                 toggleEditModalVisibility
                              }
                              setEmployees={setEmployees}
                              setEmployee={setEmployee}
                              employees={employees}
                           />
                        </Box>
                     </Paper>
                  </Grid>
               </Grid>
            </Container>
         </main>
      </div>
   );
}
